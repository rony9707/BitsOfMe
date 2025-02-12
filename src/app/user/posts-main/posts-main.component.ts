import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { UserProfile } from '../user-profile/user-profile.interface';
import { Store } from '@ngrx/store';
import { AppState } from '../../states/app.state';
import * as getUserSelector from '../../states/getUser/getUser.selector';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { SearchPostsComponent } from "../../posts/search-posts/search-posts.component";
import { AllPostsComponent } from '../../posts/all-posts/all-posts.component';
import { getPosts } from '../../shared/interface/getPosts-interface';
import { selectPostsError } from '../../states/getPosts/posts.selector';

@Component({
  selector: 'app-posts-main',
  standalone: true,
  imports: [CommonModule, SearchPostsComponent,AllPostsComponent],
  templateUrl: './posts-main.component.html',
  styleUrls: ['./posts-main.component.css'],
})
export class PostsMainComponent implements OnInit, OnDestroy{
  //Declare Variables
  user: UserProfile | null = null;
  $userError: Observable<string | null>;

  posts: getPosts[] | undefined;
  $postsError: Observable<string | null>;

  activateRouteSubscriber!: Subscription

  //Declare Services
  private store = inject(Store<AppState>);
  private activatedRoute = inject(ActivatedRoute);

  constructor() {
    // // Retrieve resolved user data
    // this.user = this.activatedRoute.snapshot.data['user'];

    // // Select error from the store
    this.$userError = this.store.select(getUserSelector.selectUserError);
    this.$postsError = this.store.select(selectPostsError);
  }

  ngOnInit(): void {

    this.activateRouteSubscriber=this.activatedRoute.data.subscribe((data)=>{
      const resolveData = data['user_posts_Data'];
      if(resolveData){
        this.user=resolveData.user;
        this.posts=resolveData.posts || [];
      }
    })

  }

  ngOnDestroy(): void {
    this.activateRouteSubscriber.unsubscribe()
  }

  //Search Input Data from from Search Posts Component. This function is debounced.
  searchInput(searchTags: String) {
    console.log(searchTags)
  }
}
