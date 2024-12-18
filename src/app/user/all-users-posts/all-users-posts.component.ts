import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UserProfile } from '../user-profile/user-profile.interface';
import { Store } from '@ngrx/store';
import { AppState } from '../../states/app.state';
import * as getUserAction from './../../states/getUser/getUser.action'
import * as getUserSelector from './../../states/getUser/getUser.selector'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-all-users-posts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './all-users-posts.component.html',
  styleUrl: './all-users-posts.component.css'
})
export class AllUsersPostsComponent {

  //Declare Variables here
  $user: Observable<UserProfile | null>;
  $error: Observable<string | null>;

  private store = inject(Store<AppState>);

  constructor() {
    this.store.dispatch(getUserAction.getUser())
    this.$user = this.store.select(getUserSelector.getAllUser);
    this.$error = this.store.select(getUserSelector.selectUserError);
  }

}
