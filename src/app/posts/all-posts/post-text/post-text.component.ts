import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { PostsFormatTextPipe } from '../../../pipes/posts-format-text/posts-format-text.pipe';
import { getPosts } from '../../../shared/interface/getPosts-interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-text',
  standalone: true,
  imports: [PostsFormatTextPipe,CommonModule],
  templateUrl: './post-text.component.html',
  styleUrl: './post-text.component.css'
})
export class PostTextComponent implements AfterViewInit {

  //Inject Variables here------------
  @Input() post!: getPosts; 

  expanded: boolean = false; // Track if the post is expanded
  showMore: boolean = false; // Show "Show More" button conditionally

  @ViewChild('postTextEl') postTextEl!: ElementRef;

  //Inject Services here------------
  private cdr = inject(ChangeDetectorRef)

  ngAfterViewInit() {
    if (this.post) {
      const postTextElement = this.postTextEl.nativeElement;
      if (postTextElement.scrollHeight > postTextElement.clientHeight) {
        this.showMore = true;
      }
    }
    this.cdr.detectChanges()
  }

  toggleExpand() {
    this.expanded = !this.expanded;
  }
}
