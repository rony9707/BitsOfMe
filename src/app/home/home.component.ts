import { Component, inject, signal } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { Event, NavigationEnd, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { FooterComponent } from '../shared/footer/footer.component';
import { AuthService } from '../services/API/auth.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { LoginComponent } from '../auth/login/login.component';
import { LoaderComponent } from '../shared/svg/loader/loader.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, RouterOutlet, FooterComponent,LoaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  showloader = signal(false)

  public authService = inject(AuthService)
  private router = inject(Router)

  ngOnInit(): void {
    this.router.events.subscribe((routerEvent:Event) => {
      if(routerEvent instanceof NavigationStart){
        this.showloader.set(true)
      }

      if(routerEvent instanceof NavigationEnd){
        this.showloader.set(false)
      }
    })
  }

}
