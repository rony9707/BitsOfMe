import { Component, inject, OnDestroy, signal } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { Event, NavigationEnd, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { FooterComponent } from '../shared/footer/footer.component';
import { AuthService } from '../services/API/Auth/auth.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { LoginComponent } from '../auth/login/login.component';
import { LoaderComponent } from '../shared/svg/loader/loader.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, RouterOutlet, FooterComponent, LoaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnDestroy {

  //Declare Variables here--------------------------------
  showloader = signal(false)


  //Inject Services here---------------------------------
  public authService = inject(AuthService)
  private router = inject(Router)
  private routerSubscription?: Subscription

  ngOnInit(): void {

    //For Showing Loader 
    this.routerSubscription = this.router.events.subscribe((routerEvent: Event) => {
      if (routerEvent instanceof NavigationStart) {
        this.showloader.set(true)
      }

      if (routerEvent instanceof NavigationEnd) {
        this.showloader.set(false)
      }
    })
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe()
    }
  }

}
