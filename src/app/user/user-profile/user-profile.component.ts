import { Component, ElementRef, inject, signal, ViewChild, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { UserProfile } from './user-profile.interface';
import { Store } from '@ngrx/store';
import { AppState } from '../../states/app.state';
import * as getUserSelector from './../../states/getUser/getUser.selector'
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, AsyncPipe],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
  encapsulation: ViewEncapsulation.ShadowDom
})
export class UserProfileComponent {

  //Declare Variables here------------------------------------------------------------
  $user: Observable<UserProfile | null>;
  $error: Observable<string | null>;
  isHovered = signal(false)
  @ViewChild('textarea') textarea?: ElementRef;


  //Declare Services here------------------------------------------------------------
  private store = inject(Store<AppState>);


  constructor() {
    this.$user = this.store.select(getUserSelector.getAllUser);
    this.$error = this.store.select(getUserSelector.selectUserError);
  }

  //Font color change on hover
  onHover(state: boolean) {
    this.isHovered.set(state);
  }

}
