import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { AllPostsComponent } from '../all-posts/all-posts.component';
import { getPosts } from '../../shared/interface/getPosts-interface';
import { Store } from '@ngrx/store';
import { AppState } from '../../states/app.state';
import { delay, filter, map, Observable, startWith, Subscription, switchMap, take } from 'rxjs';
//import { selectAllPosts } from '../../states/getPosts/posts.selector';
import { UserProfile } from '../../user/user-profile/user-profile.interface';
import * as getUserSelector from './../../states/getUser/getUser.selector';
import { AsyncPipe, CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from '../../services/common/common.service';
import { selectAllUserPosts, selectUserPostsPage } from '../../states/getPosts/posts.selector';
import { loadUserPosts } from '../../states/getPosts/posts.action';


@Component({
  selector: 'app-my-posts',
  standalone: true,
  imports: [AllPostsComponent, CommonModule],
  templateUrl: './my-posts.component.html',
  styleUrl: './my-posts.component.css'
})
export class MyPostsComponent implements OnInit, OnDestroy {

  // Observable streams for posts and user profile data.
  $myPosts: Observable<getPosts[]>;
  $user: Observable<UserProfile | null>;
  userPage$: Observable<number | undefined>;

  // Local component state and variables.
  username?: string;
  isLoading = true;
  searchQuery?: string;
  private searchSubscription!: Subscription;
  userPage: number | undefined = 1;


  // Inject dependencies: NgRx store, ActivatedRoute, and a common service.
  private store = inject(Store<AppState>);
  private activatedRoute = inject(ActivatedRoute);
  private commonServices = inject(CommonService);

  constructor() {
    // Retrieve the current user profile from the store.
    this.$user = this.store.select(getUserSelector.getAllUser);

    // Retrieve posts from the store.
    // Use 'startWith' to emit undefined initially (indicating a loading state)
    // and ensure the stream always returns an array.
    this.$myPosts = this.store.select(selectAllUserPosts).pipe(
      startWith(undefined), // Emit undefined at the start to signal loading.
      map(posts => posts ?? []) // Return an empty array if posts is null or undefined.
    );

    this.userPage$ = this.store.select(selectUserPostsPage);
  }

  ngOnInit(): void {


    this.userPage$.subscribe((page) => {
      this.userPage = page;
    })


    // Once a valid user is available, check if posts have been loaded.
    // If not, dispatch an action to load posts for that user.
    this.$user.pipe(
      filter(user => !!user?.db_username), // Continue only if the user has a valid username.
      take(1), // Only consider the first user emission.
      switchMap(user => {
        this.username = user?.db_username;
        // Check the initial posts state (first emission from posts stream).
        return this.$myPosts.pipe(take(1));
      })
    ).subscribe(posts => {
      if (!posts || posts.length === 0) {
        // If there are no posts, dispatch an action to load them.
        this.store.select(selectAllUserPosts)
          .pipe(take(1))
          .subscribe(posts => {

            if (!posts || posts.length === 0) {  // Check explicitly for undefined or empty array
              this.store.dispatch(loadUserPosts({
                filters: { limit: 5, page: this.userPage, db_username: this.username }
              }));
            }
          });
      }
    });

    // Subscribe to query parameters to handle search filters and pagination.
    // If a 'tags' parameter exists, use the search service; otherwise, fetch all posts.
    this.searchSubscription = this.commonServices.commonservice_currentFilterParams.subscribe((params) => {
      this.$myPosts = params.tags
        ? this.commonServices.searchPostsByFilters(params, 'user')
        : this.commonServices.getAllUserPosts();

    });


  }

  ngOnDestroy(): void {
    // Unsubscribe from the query parameters subscription to avoid memory leaks.
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }

    // Reset filter params to avoid persisting previous search state
    this.commonServices.changeFilter({})
  }
}
