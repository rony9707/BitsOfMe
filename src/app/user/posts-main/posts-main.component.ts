import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UserProfile } from '../user-profile/user-profile.interface';
import { Store } from '@ngrx/store';
import { AppState } from '../../states/app.state';
import * as getUserSelector from '../../states/getUser/getUser.selector';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchPostsComponent } from "../../posts/search-posts/search-posts.component";
import { AllPostsComponent } from '../../posts/all-posts/all-posts.component';

@Component({
  selector: 'app-posts-main',
  standalone: true,
  imports: [CommonModule, SearchPostsComponent,AllPostsComponent],
  templateUrl: './posts-main.component.html',
  styleUrls: ['./posts-main.component.css'],
})
export class PostsMainComponent {
  // Declare Variables
  user: UserProfile | null = null;
  $error: Observable<string | null>;

  // Declare Services
  private store = inject(Store<AppState>);
  private activatedRoute = inject(ActivatedRoute);

  constructor() {
    // Retrieve resolved user data
    this.user = this.activatedRoute.snapshot.data['user'];

    // Select error from the store
    this.$error = this.store.select(getUserSelector.selectUserError);
  }

  //Search Input Data from from Search Posts Component. This function is debounced.
  searchInput(searchTags: String) {
    console.log(searchTags)
  }
}
