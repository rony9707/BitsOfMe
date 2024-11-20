import { Component, HostListener, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthButtonsComponent } from './auth-buttons/auth-buttons.component';
import { RouterModule } from '@angular/router';
import { HeaderSidenavbarComponent } from './header-sidenavbar/header-sidenavbar.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [AuthButtonsComponent,RouterModule,HeaderSidenavbarComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  //Declare objects to use in the DOM-----------------------------------------
  pageTitle = signal('')
  windowWidth: WritableSignal<number> = signal(0);


  //Inject Services here------------------------------------------------------
  private TitleService = inject(Title);



  constructor() {
    this.windowWidth.set(window.innerWidth);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.windowWidth.set(window.innerWidth);
  }


  ngOnInit(): void {

    // Get the current title
    this.pageTitle.set(this.TitleService.getTitle());
  }
}
