import { Component, inject, Input } from '@angular/core';
import { getPosts } from '../../../shared/interface/getPosts-interface';
import { Observable } from 'rxjs';
import { UserProfile } from '../../../user/user-profile/user-profile.interface';
import { Store } from '@ngrx/store';
import { AppState } from '../../../states/app.state';
import { postService } from '../../../services/API/Post/post.service';
import { CommonService } from '../../../services/common/common.service';
import * as getUserSelector from './../../../states/getUser/getUser.selector';
import Swal from 'sweetalert2';
import { deleteSinglePublicPost, deleteSingleUserPost } from '../../../states/getPosts/posts.action';
import { PostsTimeAgoPipe } from '../../../pipes/posts-time-ago.pipe';
import { AsyncPipe } from '@angular/common';
import { PostTextComponent } from '../post-text/post-text.component';
import { PostImagesComponent } from '../post-images/post-images.component';
import { CloseButtonComponent } from '../../../shared/svg/close-button/close-button.component';
import { LoaderButtonDirectiveDirective } from '../../../shared/directives/loader-Directive/loaderButton-directive.directive';
import { TooltipDirective } from '../../../shared/directives/tooltip-Directive/tooltip.directive';

@Component({
  selector: 'app-single-post',
  standalone: true,
  imports: [PostsTimeAgoPipe, AsyncPipe,TooltipDirective, PostTextComponent, PostImagesComponent, CloseButtonComponent, LoaderButtonDirectiveDirective],
  templateUrl: './single-post.component.html',
  styleUrl: './single-post.component.css'
})
export class SinglePostComponent {
  @Input() post!: getPosts;
  $user: Observable<UserProfile | null>;
  tooltipVisible = false;
  tooltipText = '';
  tooltipX = 0;
  tooltipY = 0;
  isLoading: boolean = false;

  // Inject Services
  private store = inject(Store<AppState>);
  public postServices = inject(postService);
  public commonServices = inject(CommonService);

  constructor() {
    this.$user = this.store.select(getUserSelector.getAllUser);
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
    this.isLoading = true;

    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deletePostInBackend(postID);
      } else {
        this.isLoading = false;
      }
    });
  }

  deletePostInBackend(postID: string) {
    this.postServices.deletePost({ postID }).subscribe({
      next: (response) => {
        this.commonServices.showSuccessMessage('Success', response.message).then(() => {
          this.isLoading = false;
          this.store.dispatch(deleteSinglePublicPost({ postID }));
          this.store.dispatch(deleteSingleUserPost({ postID }));
        });
      },
      error: (err) => {
        this.isLoading = false;
        this.commonServices.showErrorMessage('Error', err.error.message);
      }
    });
  }
}
