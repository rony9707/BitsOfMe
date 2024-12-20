import { Component, inject } from '@angular/core';
import { CreatePostsHeaderComponent } from './create-posts-header/create-posts-header.component';
import { CreatePostsContentComponent } from './create-posts-content/create-posts-content.component';
import { postDetails } from './create-post.interface';
import { Store } from '@ngrx/store';
import { AppState } from '../../../states/app.state';
import { Observable } from 'rxjs';
import { UserProfile } from '../../../user/user-profile/user-profile.interface';
import * as getUserSelector from './../../../states/getUser/getUser.selector'

@Component({
  selector: 'app-create-posts',
  standalone: true,
  imports: [CreatePostsHeaderComponent, CreatePostsContentComponent],
  templateUrl: './create-posts.component.html',
  styleUrl: './create-posts.component.css'
})
export class CreatePostsComponent {

  //Data to sent to backend when a user makes a post
  postDetails: postDetails = {
    posttext: '',
    visibility: '',
    postTopic: '',
    username: ''
  }
  selectedFiles: File[] = [];
  $user: Observable<UserProfile | null>;
  $error: Observable<string | null>;

  private store = inject(Store<AppState>);

  constructor() {
    this.$user = this.store.select(getUserSelector.getAllUser);
    this.$error = this.store.select(getUserSelector.selectUserError);
    this.$user.subscribe((user)=>{
      this.postDetails.username = user?.db_username
    })
  }


  onVisibilityChange(newVisibility: string) {
    this.postDetails.visibility = newVisibility
  }

  handleMessage(message: string) {
    this.postDetails.posttext = message
  }

  handleSelectedFiles(files: File[]) {
    this.selectedFiles = files
  }

  handleSelectedOption(option: string) {
    this.postDetails.postTopic = option
  }

  onPostClicked() {
    console.log(this.postDetails)
    console.log(this.selectedFiles)
  }

}
