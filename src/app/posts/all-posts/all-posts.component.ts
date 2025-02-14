
import { AfterViewInit, Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { getPosts } from '../../shared/interface/getPosts-interface';
import { AsyncPipe, CommonModule } from '@angular/common';
import { CommonService } from '../../services/common/common.service';
import { PostImagesComponent } from './post-images/post-images.component';
import { PostTextComponent } from './post-text/post-text.component';
import { PostsTimeAgoPipe } from '../../pipes/posts-time-ago.pipe';
import { Observable } from 'rxjs';
import { UserProfile } from '../../user/user-profile/user-profile.interface';
import { Store } from '@ngrx/store';
import { AppState } from '../../states/app.state';
import * as getUserSelector from './../../states/getUser/getUser.selector';
import { CloseButtonComponent } from '../../shared/svg/close-button/close-button.component';
import { postService } from '../../services/API/Post/post.service';
import { deleteSinglePost, loadPosts } from '../../states/getPosts/posts.action';
import { LoaderButtonDirectiveDirective } from '../../shared/directives/loader-Directive/loaderButton-directive.directive';
import { TooltipDirective } from '../../shared/directives/tooltip-Directive/tooltip.directive';

@Component({
  selector: 'app-all-posts',
  standalone: true,
  imports: [CommonModule,PostsTimeAgoPipe,
    PostImagesComponent,
    PostTextComponent,
    AsyncPipe,
    CloseButtonComponent,
    LoaderButtonDirectiveDirective,
    TooltipDirective],
  templateUrl: './all-posts.component.html',
  styleUrl: './all-posts.component.css',
})


export class AllPostsComponent implements AfterViewInit {
  
  $user: Observable<UserProfile | null>;

  //Decleare Variables here
  @Input() allPosts?: getPosts[] = []; 
  @Input() canDeleted?: boolean=false; 
  
  tooltipVisible = false;
  tooltipText = '';
  tooltipX = 0;
  tooltipY = 0;
  expandedPosts: { [key: string]: boolean } = {}; // Track expansion state per post
  showMoreButtons: { [key: string]: boolean } = {}; // Track if "Show More" is needed per post
  isLoading: { [key: string]: boolean } = {};


  @ViewChild('postText') postText!: ElementRef;
  

  //Inject Services here------------
  public commonServices = inject(CommonService);
  private store = inject(Store<AppState>);
  public postServices=inject(postService)

    constructor() {
      // Select user profile from store
      this.$user = this.store.select(getUserSelector.getAllUser);

    }

  ngAfterViewInit() {
    if (this.allPosts) {
      this.allPosts.forEach((post) => {
        const postTextElement = document.getElementById(`post-text-${post._id}`);
        if (postTextElement && postTextElement.scrollHeight > postTextElement.clientHeight) {
          this.showMoreButtons[post._id] = true;
        } else {
          this.showMoreButtons[post._id] = false;
        }
      });
    }
  }

  toggleExpand(postId: string) {
    this.expandedPosts[postId] = !this.expandedPosts[postId];
  }

  showCreatePostTime(createTime: string, event: MouseEvent) {
    this.tooltipText = createTime.replace("at", "");
    this.tooltipX = event.clientX + 10;
    this.tooltipY = event.clientY + 10;
    this.tooltipVisible = true;
  }

  hideCreatePostTime() {
    this.tooltipVisible = false;
  }

  deletePost(postID: string) {
  this.isLoading[postID] = true;

  //post id to be sent to backend
  const postId={
    postID:postID
  }
  

  //Data sent to backend
  this.postServices.deletePost(postId).subscribe({
    next: (deletePostResponse) => {
      this.commonServices.showSuccessMessage('Success', deletePostResponse.message).then(() => {
        this.isLoading[postID] = false;
        this.store.dispatch(deleteSinglePost({ postID }));
      });
    },
    error: (err) => {
      this.isLoading[postID] = false;
      this.commonServices.showErrorMessage('Error', err.error.message);
    }
  });
}


}

