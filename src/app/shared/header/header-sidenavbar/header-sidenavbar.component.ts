import { Component, HostListener, inject, signal, WritableSignal } from '@angular/core';
import { AuthButtonsComponent } from '../auth-buttons/auth-buttons.component';
import { LoggerService } from '../../../services/logger/logger.service';
import { NavButtonsComponent } from '../nav-buttons/nav-buttons.component';
import { PostButtonsComponent } from '../post-buttons/post-buttons.component';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../states/app.state';
import { Observable } from 'rxjs';
import { UserProfile } from '../../../user/user-profile/user-profile.interface';
import * as getUserSelector from './../../../states/getUser/getUser.selector'
import { AsyncPipe } from '@angular/common';
import { DividerComponent } from '../../components/divider/divider.component';
import { CloseButtonComponent } from "../../svg/close-button/close-button.component";

@Component({
  selector: 'app-header-sidenavbar',
  standalone: true,
  imports: [
    AuthButtonsComponent,
    NavButtonsComponent,
    PostButtonsComponent,
    RouterModule,
    AsyncPipe,
    DividerComponent, CloseButtonComponent],
  templateUrl: './header-sidenavbar.component.html',
  styleUrl: './header-sidenavbar.component.css'
})
export class HeaderSidenavbarComponent {


  //Declare Variables here---------------------------------------------------
  sidebarVisible = signal(false)
  windowWidth: WritableSignal<number> = signal(0);
  $user: Observable<UserProfile | null>;
  $error: Observable<string | null>;

  //Inject Services here--------------------------------------------------
  private store = inject(Store<AppState>);

  constructor() {
    this.windowWidth.set(window.innerWidth);
    this.$user = this.store.select(getUserSelector.getAllUser);
    this.$error = this.store.select(getUserSelector.selectUserError);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.windowWidth.set(window.innerWidth);
  }

  closeSidebar(dataFromChild: boolean): void {
    this.sidebarVisible.set(dataFromChild)
  }

}
