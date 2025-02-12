import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { SearchPostsComponent } from '../search-posts/search-posts.component';
import { AllPostsComponent } from '../all-posts/all-posts.component';
import { getPosts } from '../../shared/interface/getPosts-interface';
import { Store } from '@ngrx/store';
import { AppState } from '../../states/app.state';
import { loadPosts } from '../../states/getPosts/posts.action';
import { delay, map, Observable, startWith, Subscription } from 'rxjs';
import { selectAllPosts } from '../../states/getPosts/posts.selector';
import { UserProfile } from '../../user/user-profile/user-profile.interface';
import * as getUserSelector from './../../states/getUser/getUser.selector';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-posts',
  standalone: true,
  imports: [SearchPostsComponent, AllPostsComponent, AsyncPipe, CommonModule],
  templateUrl: './my-posts.component.html',
  styleUrl: './my-posts.component.css'
})
export class MyPostsComponent implements OnInit, OnDestroy {

  // Observables
  $myPosts: Observable<getPosts[]>;
  $user: Observable<UserProfile | null>;

  // Local Variables
  username?: string;
  isLoading = true;
  userSubscription!: Subscription;

  // Inject Store
  private store = inject(Store<AppState>);

  constructor() {
    // Select user profile from store
    this.$user = this.store.select(getUserSelector.getAllUser);

    // Select posts from store
    this.$myPosts = this.store.select(selectAllPosts).pipe(   
    startWith(undefined), // Start with undefined to indicate loading state
    map(posts => posts ?? []), // Ensure it always returns an array 
    delay(3000)
  );
  }

  ngOnInit(): void {
    // Subscribe once to user and fetch posts
    this.userSubscription = this.$user.subscribe(user => {
      if (user?.db_username) {
        this.username = user.db_username;
        this.store.dispatch(loadPosts({ filters: { limit: 50, page: 1, db_username: this.username } }));
      }
    });
  }

  searchInput(searchTags: string) {
    if (this.username) {
      this.store.dispatch(loadPosts({ filters: { limit: 50, page: 1, db_username: this.username, tags: searchTags } }));
    }
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
