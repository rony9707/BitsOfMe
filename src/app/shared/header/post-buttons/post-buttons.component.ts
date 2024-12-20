import { ChangeDetectionStrategy, Component, EventEmitter, inject, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { UserProfile } from '../../../user/user-profile/user-profile.interface';
import { Store } from '@ngrx/store';
import { AppState } from '../../../states/app.state';
import * as getUserSelector from './../../../states/getUser/getUser.selector'
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-post-buttons',
  standalone: true,
  imports: [RouterModule,AsyncPipe],
  templateUrl: './post-buttons.component.html',
  styleUrl: './post-buttons.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostButtonsComponent {

  @Output() closeSidebarEvent = new EventEmitter
  $user: Observable<UserProfile | null>;

  private store = inject(Store<AppState>);

  constructor(){
    this.$user = this.store.select(getUserSelector.getAllUser);
  }

  closeSidebar(): void {
    this.closeSidebarEvent.emit(false); // Emit the event to close the sidebar
  }
}
