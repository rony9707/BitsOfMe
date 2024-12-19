import { Component, inject, signal, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { UserProfile } from './user-profile.interface';
import { Store } from '@ngrx/store';
import { AppState } from '../../states/app.state';
import * as getUserSelector from './../../states/getUser/getUser.selector'

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
  encapsulation: ViewEncapsulation.ShadowDom
})
export class UserProfileComponent {

  //Declare Variables here
  $user: Observable<UserProfile | null>;
  $error: Observable<string | null>;
  isHovered = signal(false)


  private store = inject(Store<AppState>);

  constructor() {
    this.$user = this.store.select(getUserSelector.getAllUser);
    this.$error = this.store.select(getUserSelector.selectUserError);
  }

  onHover(state: boolean) {
    this.isHovered.set(state);
  }

}
