import { AsyncPipe, NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../states/app.state';
import { Observable } from 'rxjs';
import { UserProfile } from '../../../../user/user-profile/user-profile.interface';
import * as getUserSelector from './../../../../states/getUser/getUser.selector'
import { postVisibility } from '../../../../shared/enums/postS.enum';
import { PostManagerService } from '../create-post.service';


@Component({
  selector: 'app-create-posts-header',
  standalone: true,
  imports: [FormsModule, NgFor, AsyncPipe],
  templateUrl: './create-posts-header.component.html',
  styleUrl: './create-posts-header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreatePostsHeaderComponent implements OnInit {

  @Output() visibilityChange = new EventEmitter<string>();

  visibilityOptions = [
    { label: 'Public', value: postVisibility.Public },
    { label: 'Private', value: postVisibility.Private },
  ];
  selectedVisibility = this.visibilityOptions[0].value; // Default to 'public'
  $user: Observable<UserProfile | null>;
  $error: Observable<string | null>;

  private store = inject(Store<AppState>);
  public postManagerService = inject(PostManagerService)

  constructor() {
    this.$user = this.store.select(getUserSelector.getAllUser);
    this.$error = this.store.select(getUserSelector.selectUserError);
  }

  ngOnInit(): void {
    this.onVisibilityChange();
  }

  // Emit the selected visibility whenever it changes
  onVisibilityChange() {
    this.visibilityChange.emit(this.selectedVisibility);
  }

}
