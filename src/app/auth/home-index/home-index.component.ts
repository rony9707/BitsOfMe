import { Component, ElementRef, ViewChild, AfterViewInit, OnInit, OnDestroy, inject, signal } from '@angular/core';
import { NavButtonsComponent } from '../../shared/header/nav-buttons/nav-buttons.component';
import { PostButtonsComponent } from '../../shared/header/post-buttons/post-buttons.component';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { DividerComponent } from '../../shared/components/divider/divider.component';
import { distinctUntilChanged, Observable, Subject, take, takeUntil } from 'rxjs';
import { CommonService } from '../../services/common/common.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../states/app.state';
import { selectPublicPostsPage, selectUserPostsPage } from '../../states/getPosts/posts.selector';
import { loadPublicPostsSuccess, loadUserPostsSuccess } from '../../states/getPosts/posts.action';
import { GetPostsFilter } from '../../shared/interface/getPostParams-interface';
import { UserProfile } from '../../user/user-profile/user-profile.interface';
import * as getUserSelector from './../../states/getUser/getUser.selector';
import { SearchService } from '../../posts/search-posts/search.service';
import { postService } from '../../services/API/Post/post.service';

@Component({
  selector: 'app-home-index',
  standalone: true,
  imports: [NavButtonsComponent, PostButtonsComponent, RouterOutlet, DividerComponent],
  templateUrl: './home-index.component.html',
  styleUrls: ['./home-index.component.css']
})
export class HomeIndexComponent implements AfterViewInit, OnInit, OnDestroy {

  private destroy$ = new Subject<void>();
  private isOnRootRoute = true;

  @ViewChild('scrollContainer') scrollContainer!: ElementRef;
  private previousScrollTop = signal(0);

  publicPage$: Observable<number | undefined>;
  userPage$: Observable<number | undefined>;
  $user: Observable<UserProfile | null>;

  publicPage: number | undefined = 1;
  userPage: number | undefined = 1;
  username?: string;

  private router = inject(Router);
  private commonServices = inject(CommonService);
  private store = inject(Store<AppState>);
  private searchService = inject(SearchService);
  private postAPI = inject(postService);

  throttledOnScroll: (event: Event) => void;

  constructor() {
    this.throttledOnScroll = this.commonServices.throttle(this.onScroll.bind(this), 500);
    this.publicPage$ = this.store.select(selectPublicPostsPage);
    this.userPage$ = this.store.select(selectUserPostsPage);
    this.$user = this.store.select(getUserSelector.getAllUser);
  }

  ngOnInit(): void {
    this.router.events.pipe(takeUntil(this.destroy$)).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isOnRootRoute = event.url === '/' || event.url === '/my-posts';
      }
    });

    this.publicPage$.pipe(takeUntil(this.destroy$)).subscribe(page => {
      this.publicPage = page;
    });

    this.userPage$.pipe(takeUntil(this.destroy$)).subscribe(page => {
      this.userPage = page;
    });

    this.$user.pipe(takeUntil(this.destroy$)).subscribe(user => {
      this.username = user?.db_username;
    });
  }

  ngAfterViewInit(): void {
    if (!this.scrollContainer) {
      console.error('Scroll container not found.');
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onScroll(event: Event): void {
    if (!this.isOnRootRoute) return;

    const container = this.scrollContainer.nativeElement;
    const scrollTop = container.scrollTop;
    const scrollHeight = container.scrollHeight;
    const offsetHeight = container.offsetHeight;

    const scrollPercentage = ((scrollTop + offsetHeight) / scrollHeight) * 100;

    if (scrollTop > this.previousScrollTop() && scrollPercentage >= 70) {
      // Listen to search results only once (no need to unsubscribe/resubscribe each scroll event)
      this.searchService.searchResults$
        .pipe(takeUntil(this.destroy$), distinctUntilChanged())
        .subscribe(searchVal => {
          if (!searchVal) {
            // Trigger load logic based on the current route
            this.loadMorePosts();
          }
        });
    }

    this.previousScrollTop.set(scrollTop);
  }

  /**
   * Decides which load method to call based on current route.
   */
  private loadMorePosts(): void {
    if (this.router.url === '/') {
      this.loadPostsForPublic();
    } else if (this.router.url === '/my-posts') {
      this.loadPostsForUser();
    }
  }

  private loadPostsForPublic(): void {
    this.commonServices.commonservice_currentFilterParams
      .pipe(take(1))
      .subscribe(params => {
        this.publicPage = this.publicPage ?? 1;
        this.publicPage++;

        const updatedParams: GetPostsFilter = {
          ...params,
          limit: 5,
          page: this.publicPage,
          db_postVisibility: 'public'
        };

        this.postAPI.getPosts(updatedParams)
          .pipe(take(1))
          .subscribe({
            next: (posts) => {
              if (posts.length > 0) {
                this.store.dispatch(loadPublicPostsSuccess({ posts }));
              } else {
                this.publicPage!--;  // No posts found, revert page increment
              }
            },
            error: (err) => {
              console.error('Failed to load public posts:', err);
              this.publicPage!--;  // Revert page increment on error
            }
          });
      });
  }

  private loadPostsForUser(): void {
    this.commonServices.commonservice_currentFilterParams
      .pipe(take(1))
      .subscribe(params => {
        this.userPage = this.userPage ?? 1;
        this.userPage++;

        const updatedParams: GetPostsFilter = {
          ...params,
          limit: 5,
          page: this.userPage,
          db_username: this.username
        };

        this.postAPI.getPosts(updatedParams)
          .pipe(take(1))
          .subscribe({
            next: (posts) => {
              if (posts.length > 0) {
                this.store.dispatch(loadUserPostsSuccess({ posts }));
              } else {
                this.userPage!--;  // No posts found, revert page increment
              }
            },
            error: (err) => {
              console.error('Failed to load user posts:', err);
              this.userPage!--;  // Revert page increment on error
            }
          });
      });
  }

  onSwipe(visibility: boolean) {
    this.commonServices.changeVisibility(visibility);
  }
}
