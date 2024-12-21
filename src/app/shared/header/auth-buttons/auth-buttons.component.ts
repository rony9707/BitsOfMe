import { ChangeDetectionStrategy, Component, EventEmitter, inject, OnDestroy, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/API/auth.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { LoggerService } from '../../../services/logger/logger.service';
import * as getUserAction from './../../../states/getUser/getUser.action'
import { Store } from '@ngrx/store';
import { AppState } from '../../../states/app.state';
import { Observable, Subscription } from 'rxjs';
import { UserProfile } from '../../../user/user-profile/user-profile.interface';
import * as getUserSelector from './../../../states/getUser/getUser.selector'
import { SongService } from '../../../music/Music-Services/song.service';
import { CommonService } from '../../../services/common/common.service';

@Component({
  selector: 'app-auth-buttons',
  standalone: true,
  imports: [RouterModule, AsyncPipe, CommonModule],
  templateUrl: './auth-buttons.component.html',
  styleUrl: './auth-buttons.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthButtonsComponent implements OnDestroy {

  public authService = inject(AuthService)
  private router = inject(Router)
  public logger = inject(LoggerService)
  public songServices = inject(SongService)
  public commonservices = inject(CommonService)


  $user: Observable<UserProfile | null>;
  $error: Observable<string | null>;
  private store = inject(Store<AppState>);
 
  private logoutSubscription?:Subscription

  constructor() {
    this.$user = this.store.select(getUserSelector.getAllUser);
    this.$error = this.store.select(getUserSelector.selectUserError);
  }

  ngOnDestroy(): void {
      if(this.logoutSubscription){
        this.logoutSubscription.unsubscribe();
        console.log('logout was done')
      }
  }


  @Output() closeSidebarEvent = new EventEmitter<boolean>();

  closeSidebar(): void {
    this.closeSidebarEvent.emit(false); // Emit the event to close the sidebar
  }


  logout() {
    this.logoutSubscription=this.authService.logoutUser().subscribe({
      next: (value) => {
        this.commonservices.showSuccessMessage("Log out", value.message).then(() => {
          this.authService.$isLoggedIn.next(false)//set status to logged off

          this.songServices.toggleMusic(false); //Stop song when logout

          this.store.dispatch(getUserAction.logoutUser()) //Make the user data empty
          this.router.navigate(['/login'])//Navigate to login page
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
