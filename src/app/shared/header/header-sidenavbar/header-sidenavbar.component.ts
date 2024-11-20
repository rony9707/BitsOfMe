import { Component, HostListener, inject, signal, ViewChild, WritableSignal } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { AuthButtonsComponent } from '../auth-buttons/auth-buttons.component';
import { DividerModule } from 'primeng/divider';
import { LoggerService } from '../../../services/logger/logger.service';
import { NavButtonsComponent } from '../nav-buttons/nav-buttons.component';
import { PostButtonsComponent } from '../post-buttons/post-buttons.component';

@Component({
  selector: 'app-header-sidenavbar',
  standalone: true,
  imports: [SidebarModule,AuthButtonsComponent,DividerModule,NavButtonsComponent,PostButtonsComponent],
  templateUrl: './header-sidenavbar.component.html',
  styleUrl: './header-sidenavbar.component.css'
})
export class HeaderSidenavbarComponent {


  //Declare Variables here
  sidebarVisible = false
  windowWidth: WritableSignal<number> = signal(0);

  //Inject Services here
  private logger=inject(LoggerService)



  constructor() {
    this.windowWidth.set(window.innerWidth);
    this.logger.log(`The window width is ${this.windowWidth()}px`, 'info')
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.windowWidth.set(window.innerWidth);
  }

  closeSidebar(dataFromChild:boolean): void {
    this.sidebarVisible=dataFromChild
  }

}
