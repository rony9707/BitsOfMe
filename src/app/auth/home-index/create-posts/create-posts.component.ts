import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CreatePostsHeaderComponent } from './create-posts-header/create-posts-header.component';
import { CreatePostsContentComponent } from './create-posts-content/create-posts-content.component';
import { postDetails } from './create-post.interface';
import { Store } from '@ngrx/store';
import { AppState } from '../../../states/app.state';
import { Observable, Subscription } from 'rxjs';
import { UserProfile } from '../../../user/user-profile/user-profile.interface';
import * as getUserSelector from './../../../states/getUser/getUser.selector'
import { postService } from '../../../services/API/Post/post.service';
import { CommonService } from '../../../services/common/common.service';

@Component({
  selector: 'app-create-posts',
  standalone: true,
  imports: [CreatePostsHeaderComponent, CreatePostsContentComponent],
  templateUrl: './create-posts.component.html',
  styleUrl: './create-posts.component.css'
})
export class CreatePostsComponent implements OnDestroy, OnInit {

  private createPostSubscription?: Subscription

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

  isLoading=false


  private store = inject(Store<AppState>);
  private postService = inject(postService);
  private commonService = inject(CommonService)


  private userSubscription: Subscription;


  constructor() {
    this.$user = this.store.select(getUserSelector.getAllUser);
    this.$error = this.store.select(getUserSelector.selectUserError);
    this.userSubscription = this.$user.subscribe((user) => {
      this.postDetails.username = user?.db_username
    })
  }

  ngOnInit(): void {
    this.commonService.commonservice_currentIsLoader.subscribe((isVisi) => {
      this.isLoading = isVisi
    })
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
    if (this.createPostSubscription) {
      this.createPostSubscription.unsubscribe();
    }
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
    const formDataToSendToBackend = new FormData();

    // Append images
    this.selectedFiles.forEach((file: File) => {
      formDataToSendToBackend.append('images', file);
    });


    // Append other post details (postDetails object)
    for (const key in this.postDetails) {
      if (this.postDetails.hasOwnProperty(key)) {
        // Cast the key to string explicitly
        const keyString = key as string;

        // Append the value of postDetails, which is a string or undefined
        if (this.postDetails[keyString] !== undefined) {
          formDataToSendToBackend.append(keyString, this.postDetails[keyString] as string);
        }
      }
    }
    //Sent Data to backend
    this.createPost(formDataToSendToBackend)
   
  }


  createPost(formDataToSendToBackend: FormData) {
    this.createPostSubscription = this.postService.createPosts(formDataToSendToBackend).subscribe({
      next: (value) => {
        this.commonService.showSuccessMessage('Success', value.message).then(() => {
          this.commonService.changeIsLoader(false); // Hide loader
        });
      },
      error: (err) => {
        this.commonService.changeIsLoader(false); 
        console.log(err)
        this.commonService.showErrorMessage('Error', err.error.message)
      },
    })
  }



}
