import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../states/app.state';
import { Observable } from 'rxjs';
import { UserProfile } from '../../../user/user-profile/user-profile.interface';
import * as getUserSelector from './../../../states/getUser/getUser.selector'
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-pfp',
  standalone: true,
  imports: [RouterModule,AsyncPipe],
  templateUrl: './pfp.component.html',
  styleUrl: './pfp.component.css'
})
export class PfpComponent {

  $user: Observable<UserProfile | null>;
  $error: Observable<string | null>;

  private store = inject(Store<AppState>);


  constructor() {
    this.$user = this.store.select(getUserSelector.getAllUser);
    this.$error = this.store.select(getUserSelector.selectUserError);
  }
}
