import { Component } from '@angular/core';
import { CreatePostsHeaderComponent } from './create-posts-header/create-posts-header.component';
import { CreatePostsContentComponent } from './create-posts-content/create-posts-content.component';
import { postDetails } from './create-post.interface';

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
    postTopic: ''
  }
  selectedFiles: File[] = [];

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
