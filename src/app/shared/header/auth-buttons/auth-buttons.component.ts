import { ChangeDetectionStrategy, Component, EventEmitter, inject, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/API/auth.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import swal from 'sweetalert2';
import { LoggerService } from '../../../services/logger/logger.service';
import * as getUserAction from './../../../states/getUser/getUser.action'
import { Store } from '@ngrx/store';
import { AppState } from '../../../states/app.state';
import { Observable } from 'rxjs';
import { UserProfile } from '../../../user/user-profile/user-profile.interface';
import * as getUserSelector from './../../../states/getUser/getUser.selector'

@Component({
  selector: 'app-auth-buttons',
  standalone: true,
  imports: [RouterModule, AsyncPipe, CommonModule],
  templateUrl: './auth-buttons.component.html',
  styleUrl: './auth-buttons.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthButtonsComponent {

  public authService = inject(AuthService)
  private router = inject(Router)
  public logger = inject(LoggerService)


  $user: Observable<UserProfile | null>;
  $error: Observable<string | null>;

  private store = inject(Store<AppState>);

  constructor() {
    this.$user = this.store.select(getUserSelector.getAllUser);
    this.$error = this.store.select(getUserSelector.selectUserError);
  }



  @Output() closeSidebarEvent = new EventEmitter<boolean>();

  closeSidebar(): void {
    this.closeSidebarEvent.emit(false); // Emit the event to close the sidebar
  }


  logout() {
    this.authService.logoutUser().subscribe({
      next: (value) => {
        swal.fire({
          title: "Log out",
          text: value.message,
          icon: "success",
          timer: 1000, // Auto close after 2 seconds
          timerProgressBar: true, // Show progress bar
          showConfirmButton: false // Hide the "OK" button
        }).then(() => {
          this.authService.$isLoggedIn.next(false)
          this.store.dispatch(getUserAction.logoutUser())
          this.router.navigate(['/login'])
        });
        this.logger.log('The User is logged out of the system', 'log')
      },
      error: (err) => {
        this.logger.log('There is an error when the user tried to logout', 'error')
        console.log(err)
      },
    })
  }

}
