import { ChangeDetectionStrategy, Component, EventEmitter, inject, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Observable, take } from 'rxjs';
import { UserProfile } from '../../../user/user-profile/user-profile.interface';
import { Store } from '@ngrx/store';
import { AppState } from '../../../states/app.state';
import * as getUserSelector from './../../../states/getUser/getUser.selector'
import { AsyncPipe } from '@angular/common';
import { loadPosts } from '../../../states/getPosts/posts.action';
import { getPosts } from '../../interface/getPosts-interface';
import { selectAllPosts } from '../../../states/getPosts/posts.selector';

@Component({
  selector: 'app-post-buttons',
  standalone: true,
  imports: [RouterModule, AsyncPipe],
  templateUrl: './post-buttons.component.html',
  styleUrl: './post-buttons.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostButtonsComponent {

  @Output() closeSidebarEvent = new EventEmitter
  $user: Observable<UserProfile | null>;
  $posts: Observable<getPosts[] | null>;
  username?:string;

  private store = inject(Store<AppState>);
  private router = inject(Router)

  constructor() {
    this.$user = this.store.select(getUserSelector.getAllUser);
    this.$posts = this.store.select(selectAllPosts);
    this.$user.subscribe((user)=>{
      this.username= user?.db_username
    })
  }

  closeSidebar(): void {
    this.closeSidebarEvent.emit(false); // Emit the event to close the sidebar
  }

  // seeMyPosts(){
  //   this.store.dispatch(loadPosts({ filters: { limit: 50, page: 1, db_username: this.username } }))
  //   this.router.navigate(['my-posts'])
  // }
}
