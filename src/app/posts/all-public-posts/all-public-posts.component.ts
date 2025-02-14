import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { SearchPostsComponent } from '../search-posts/search-posts.component';
import { AllPostsComponent } from '../all-posts/all-posts.component';
import { getPosts } from '../../shared/interface/getPosts-interface';
import { Store } from '@ngrx/store';
import { AppState } from '../../states/app.state';
import { loadPosts } from '../../states/getPosts/posts.action';
import { combineLatest, delay, filter, map, Observable, startWith, Subscription, switchMap, take } from 'rxjs';
import { selectAllPosts } from '../../states/getPosts/posts.selector';
import { UserProfile } from '../../user/user-profile/user-profile.interface';
import * as getUserSelector from './../../states/getUser/getUser.selector';
import { AsyncPipe, CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from '../../services/common/common.service';

@Component({
  selector: 'app-all-public-posts',
  standalone: true,
  imports: [AllPostsComponent, AsyncPipe, CommonModule],
  templateUrl: './all-public-posts.component.html',
  styleUrl: './all-public-posts.component.css'
})
export class AllPublicPostsComponent {

// Observables
  $myPosts: Observable<getPosts[]>;
  $user: Observable<UserProfile | null>;

  // Local Variables
  username?: string;
  isLoading = true;
  SearcHSubscription!: Subscription;
  searchQuery?:string

  // Inject Store
  private store = inject(Store<AppState>);
  private activatedRoute = inject(ActivatedRoute);
  private commonServices = inject(CommonService)

  constructor() {
    // Select user profile from store
    this.$user = this.store.select(getUserSelector.getAllUser);

    // Select posts from store
    this.$myPosts = this.store.select(selectAllPosts).pipe(   
    startWith(undefined), // Start with undefined to indicate loading state
    map(posts => posts ?? []) // Ensure it always returns an array 
  );
  }

ngOnInit(): void {
  
  this.store.dispatch(loadPosts({ filters: { limit: 10, page: 1, db_postVisibility: 'public' } }));

  this.SearcHSubscription=this.commonServices.commonservice_currentFilterParams.subscribe((params)=>{
      const limit = params.limit;
      const page = params.page;
      const db_username = params.db_username;
      const tags = params.tags;
      // Update the posts observable based on whether a tag filter is applied.
      this.$myPosts = tags
        ? this.commonServices.searchPostsByFilters(params)
        : this.commonServices.getAllPosts();
    })


}

  ngOnDestroy(): void {
    if (this.SearcHSubscription) {
      this.SearcHSubscription.unsubscribe();
    }
  }

}
