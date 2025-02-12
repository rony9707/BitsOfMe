
import { AfterViewInit, Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { getPosts } from '../../shared/interface/getPosts-interface';
import { CommonModule } from '@angular/common';
import { CommonService } from '../../services/common/common.service';
import { PostImagesComponent } from './post-images/post-images.component';
import { PostTextComponent } from './post-text/post-text.component';
import { PostsTimeAgoPipe } from '../../pipes/posts-time-ago.pipe';

@Component({
  selector: 'app-all-posts',
  standalone: true,
  imports: [CommonModule,PostsTimeAgoPipe,PostImagesComponent,PostTextComponent],
  templateUrl: './all-posts.component.html',
  styleUrl: './all-posts.component.css',
})


export class AllPostsComponent implements AfterViewInit {


  //Decleare Variables here
  @Input() allPosts?: getPosts[] = []; 
  
  tooltipVisible = false;
  tooltipText = '';
  tooltipX = 0;
  tooltipY = 0;
  expandedPosts: { [key: string]: boolean } = {}; // Track expansion state per post
  showMoreButtons: { [key: string]: boolean } = {}; // Track if "Show More" is needed per post

  @ViewChild('postText') postText!: ElementRef;
  

  //Inject Services here------------
  public commonServices = inject(CommonService);

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

}

