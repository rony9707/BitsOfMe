
import { AfterViewInit, Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { getPosts } from '../../shared/interface/getPosts-interface';
import { AsyncPipe, CommonModule } from '@angular/common';
import { CommonService } from '../../services/common/common.service';
import { PostImagesComponent } from './post-images/post-images.component';
import { PostTextComponent } from './post-text/post-text.component';
import { PostsTimeAgoPipe } from '../../pipes/posts-time-ago.pipe';
import { Observable, switchMap, timer } from 'rxjs';
import { UserProfile } from '../../user/user-profile/user-profile.interface';
import { Store } from '@ngrx/store';
import { AppState } from '../../states/app.state';
import * as getUserSelector from './../../states/getUser/getUser.selector';
import { CloseButtonComponent } from '../../shared/svg/close-button/close-button.component';
import { postService } from '../../services/API/Post/post.service';
import { LoaderButtonDirectiveDirective } from '../../shared/directives/loader-Directive/loaderButton-directive.directive';
import { TooltipDirective } from '../../shared/directives/tooltip-Directive/tooltip.directive';
import Swal from 'sweetalert2';
import { deleteSinglePublicPost, deleteSingleUserPost } from '../../states/getPosts/posts.action';
import { SinglePostComponent } from './single-post/single-post.component';
import { PostsSkeletonComponent } from "../../shared/components/posts-skeleton/posts-skeleton.component";
import { NoMorePostsComponent } from "../../shared/components/no-more-posts/no-more-posts.component";

@Component({
  selector: 'app-all-posts',
  standalone: true,
  imports: [CommonModule,
    SinglePostComponent,
    PostsSkeletonComponent, NoMorePostsComponent],
  templateUrl: './all-posts.component.html',
  styleUrl: './all-posts.component.css',
})


export class AllPostsComponent {

  //Decleare Variables here
  @Input() allPosts?: Observable<getPosts[]>;
  @Input() canDeleted?: boolean = false;

  // delayedPosts$?: Observable<getPosts[]>;

  // ngOnInit() {
  //   if (this.allPosts) {
  //     this.delayedPosts$ = timer(5000).pipe( // Add 2s delay
  //       switchMap(() => this.allPosts!)
  //     );
  //   }
  // }

}

