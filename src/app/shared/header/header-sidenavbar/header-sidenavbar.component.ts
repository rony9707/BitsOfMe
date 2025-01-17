import { Component, ElementRef, HostListener, inject, OnInit, signal, ViewChild, WritableSignal } from '@angular/core';
import { AuthButtonsComponent } from '../auth-buttons/auth-buttons.component';
import { LoggerService } from '../../../services/logger/logger.service';
import { NavButtonsComponent } from '../nav-buttons/nav-buttons.component';
import { PostButtonsComponent } from '../post-buttons/post-buttons.component';
import { RouterModule } from '@angular/router';
import { DividerComponent } from '../../components/divider/divider.component';
import { CloseButtonComponent } from "../../svg/close-button/close-button.component";
import { PfpComponent } from "../../components/pfp/pfp.component";
import { CommonService } from '../../../services/common/common.service';

@Component({
  selector: 'app-header-sidenavbar',
  standalone: true,
  imports: [
    AuthButtonsComponent,
    NavButtonsComponent,
    PostButtonsComponent,
    RouterModule,
    DividerComponent, CloseButtonComponent,
    PfpComponent
],
  templateUrl: './header-sidenavbar.component.html',
  styleUrl: './header-sidenavbar.component.css'
})
export class HeaderSidenavbarComponent implements OnInit {


  //Declare Variables here---------------------------------------------------
  sidebarVisible = signal(false)
  windowWidth: WritableSignal<number> = signal(0);
  @ViewChild('slider', { static: false }) slider?: ElementRef;

  //Inject Services here--------------------------------------------------
  private commonServices = inject(CommonService)

  constructor() {
    this.windowWidth.set(window.innerWidth);
  }

  ngOnInit(): void {
      this.commonServices.commonservice_currentSliverVisible.subscribe((visibility)=>{
        this.sidebarVisible.set(visibility)
      })
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.windowWidth.set(window.innerWidth);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (
      this.sidebarVisible() && // Sidebar is open
      this.slider &&
      !this.slider.nativeElement.contains(event.target) // Click is outside the slider
    ) {
      this.sidebarVisible.set(false); // Close the sidebar
    }
  }

  toggleSidebar(event: MouseEvent): void {
    event.stopPropagation(); // Prevent triggering document click
    this.sidebarVisible.set(true); // Open the sidebar
  }


  //Close the slider when cliking buttons
  closeSidebar(dataFromChild: boolean): void {
    this.sidebarVisible.set(dataFromChild)
  }

  onSwipe(visibility:boolean) {
    this.commonServices.changeVisibility(visibility)
  }

}
