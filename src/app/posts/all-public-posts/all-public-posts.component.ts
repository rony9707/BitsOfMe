import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { SearchPostsComponent } from '../search-posts/search-posts.component';
import { AllPostsComponent } from '../all-posts/all-posts.component';
import { getPosts } from '../../shared/interface/getPosts-interface';
import { Store } from '@ngrx/store';
import { AppState } from '../../states/app.state';
import { combineLatest, delay, filter, map, Observable, startWith, Subscription, switchMap, take } from 'rxjs';
//import { selectAllPosts } from '../../states/getPosts/posts.selector';
import { UserProfile } from '../../user/user-profile/user-profile.interface';
import * as getUserSelector from './../../states/getUser/getUser.selector';
import { AsyncPipe, CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from '../../services/common/common.service';
import { loadPublicPosts } from '../../states/getPosts/posts.action';
import { selectAllPublicPosts, selectPublicPostsPage } from '../../states/getPosts/posts.selector';

@Component({
  selector: 'app-all-public-posts',
  standalone: true,
  imports: [AllPostsComponent, CommonModule],
  templateUrl: './all-public-posts.component.html',
  styleUrl: './all-public-posts.component.css'
})
export class AllPublicPostsComponent {

  // Observables
  $myPosts: Observable<getPosts[]>;
  $user: Observable<UserProfile | null>;
  publicPage$: Observable<number | undefined>;
  publicPage: number | undefined = 1;

  // Local Variables
  username?: string;
  isLoading = true;
  SearcHSubscription!: Subscription;
  searchQuery?: string

  // Inject Store
  private store = inject(Store<AppState>);
  private activatedRoute = inject(ActivatedRoute);
  private commonServices = inject(CommonService)

  constructor() {
    // Select user profile from store
    this.$user = this.store.select(getUserSelector.getAllUser);

    // Select posts from store
    this.$myPosts = this.store.select(selectAllPublicPosts).pipe(
      startWith(undefined), // Start with undefined to indicate loading state
      map(posts => posts ?? []), // Ensure it always returns an array 
    );

    this.publicPage$ = this.store.select(selectPublicPostsPage);
  }

  ngOnInit(): void {

    this.publicPage$.subscribe((page) => {
      this.publicPage = page;
    })

    this.store.select(selectAllPublicPosts)
      .pipe(take(1))
      .subscribe(posts => {

        if (!posts || posts.length === 0) {  // Check explicitly for undefined or empty array
          this.store.dispatch(loadPublicPosts({
            filters: { limit: 5, page: this.publicPage, db_postVisibility: 'public' }
          }));
        }
      });


    this.SearcHSubscription = this.commonServices.commonservice_currentFilterParams.subscribe((params) => {
      const limit = params.limit;
      const page = params.page;
      const db_username = params.db_username;
      const tags = params.tags;
      // Update the posts observable based on whether a tag filter is applied.
      this.$myPosts = tags
        ? this.commonServices.searchPostsByFilters(params, 'public')  // 'public' for AllPublicPostsComponent
        : this.commonServices.getAllPublicPosts();

    })


  }

  ngOnDestroy(): void {
    if (this.SearcHSubscription) {
      this.SearcHSubscription.unsubscribe();
    }

    // Reset filter params to avoid persisting previous search state
    this.commonServices.changeFilter({})
  }

}
