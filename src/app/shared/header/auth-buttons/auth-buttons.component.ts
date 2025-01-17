import { ChangeDetectionStrategy, Component, EventEmitter, inject, OnDestroy, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/API/Auth/auth.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { LoggerService } from '../../../services/logger/logger.service';
import * as getUserAction from './../../../states/getUser/getUser.action'
import { Store } from '@ngrx/store';
import { AppState } from '../../../states/app.state';
import { Subscription } from 'rxjs';
import { SongService } from '../../../music/Music-Services/song.service';
import { CommonService } from '../../../services/common/common.service';
import { PfpComponent } from "../../components/pfp/pfp.component";
import { broadCastChannel } from '../../../app.component';
import { LoaderButtonDirectiveDirective } from '../../directives/loaderButton-directive.directive';

@Component({
  selector: 'app-auth-buttons',
  standalone: true,
  imports: [RouterModule, CommonModule, PfpComponent,LoaderButtonDirectiveDirective],
  templateUrl: './auth-buttons.component.html',
  styleUrl: './auth-buttons.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthButtonsComponent implements OnDestroy {


  private logoutSubscription?: Subscription
  isLoading=false;


  public authService = inject(AuthService)
  public logger = inject(LoggerService)
  public songServices = inject(SongService)
  public commonservices = inject(CommonService)
  private commonService = inject(CommonService)



  ngOnDestroy(): void {
    if (this.logoutSubscription) {
      this.logoutSubscription.unsubscribe();
    }
  }


  @Output() closeSidebarEvent = new EventEmitter<boolean>();

  closeSidebar(): void {
    this.closeSidebarEvent.emit(false); // Emit the event to close the sidebar
  }


  logout() {
    this.isLoading=true;
    this.logoutSubscription = this.authService.logoutUser().subscribe({
      next: (value) => {
        this.commonservices.showSuccessMessage("Log out", value.message).then(() => {

          this.isLoading=false;

          this.songServices.toggleMusic(false); //Stop song when logout

          this.commonService.codeToRunDuringLogout()

          broadCastChannel.postMessage('logout')

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
