import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserProfile } from '../user-profile/user-profile.interface';
import { Store } from '@ngrx/store';
import { AppState } from '../../states/app.state';
import * as getUserSelector from '../../states/getUser/getUser.selector';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { SearchPostsComponent } from "../../posts/search-posts/search-posts.component";
import { getPosts } from '../../shared/interface/getPosts-interface';
import { selectPostsError } from '../../states/getPosts/posts.selector';
import { GetPostsFilter } from '../../shared/interface/getPostParams-interface';
import { CommonService } from '../../services/common/common.service';

@Component({
  selector: 'app-posts-main',
  standalone: true,
  imports: [CommonModule, SearchPostsComponent,RouterOutlet],
  templateUrl: './posts-main.component.html',
  styleUrls: ['./posts-main.component.css'],
})
export class PostsMainComponent implements OnInit{
  //Declare Variables
  user: UserProfile | null = null;
  $userError: Observable<string | null>;

  posts: getPosts[] | undefined;
  $postsError: Observable<string | null>;

  //Declare Services
  private store = inject(Store<AppState>);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router)
  private commonServices = inject(CommonService)

  constructor() {
    // // Retrieve resolved user data
    // this.user = this.activatedRoute.snapshot.data['user'];

    // // Select error from the store
    this.$userError = this.store.select(getUserSelector.selectUserError);
    this.$postsError = this.store.select(selectPostsError);
  }

  ngOnInit(): void {
    this.user = this.activatedRoute.snapshot.data['user_Data'];
  }


  //Search Input Data from from Search Posts Component. This function is debounced.
  searchInput(searchTags: string) {
  const queryParamsUserUserName: GetPostsFilter = {
    limit: 10,
    page: 1,
    db_postVisibility: 'public',
    db_username: this.user?.db_username || '', // Ensure it's a string
    tags: searchTags
  };

  const queryParams: GetPostsFilter = {
    limit: 10,
    page: 1,
    db_postVisibility: 'public',
    tags: searchTags
  };

  // Get the current route path
    const currentRoute = this.activatedRoute.firstChild?.snapshot.url.map(segment => segment.path).join('/') || '';

  // Determine which query params to pass
  const paramsToPass = currentRoute === 'my-posts' ? queryParamsUserUserName : queryParams;

  // Navigate while merging query params
  this.commonServices.changeFilter(paramsToPass)
  // this.router.navigate([], {
  //   relativeTo: this.activatedRoute,
  //   queryParams: paramsToPass,
  //   queryParamsHandling: 'merge', // Keeps existing query params
  // });
}


}
