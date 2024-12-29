import { Component, inject } from '@angular/core';
import { ActivatedRoute, Event, NavigationStart, Router, RouterOutlet } from '@angular/router';
import * as getUserAction from './states/getUser/getUser.action'
import * as getUserSelector from './states/getUser/getUser.selector'
import { Store } from '@ngrx/store';
import { AppState } from './states/app.state';
import { SongService } from './music/Music-Services/song.service';
import { IsConnectedService } from './services/sockets/is-connected.service';
import { Observable, take } from 'rxjs';
import { UserProfile } from './user/user-profile/user-profile.interface';
import { AuthService } from './services/API/auth.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {


  //Inject Services here---------------------------------
  private store = inject(Store<AppState>);
  public songServices = inject(SongService)
  public websocket = inject(IsConnectedService)
  public router = inject(Router)
  $user: Observable<UserProfile | null>;
  public authService = inject(AuthService)
  IsLoggedIn:boolean | null | undefined


  constructor() {
    
    this.authService.isAuthenticated.subscribe((isLoggedIn)=>{
      this.IsLoggedIn=isLoggedIn
    })

    this.$user = this.store.select(getUserSelector.getAllUser);
    //If in any route except root and page is reloaded,make a Auth call to the server
    this.router.events.subscribe((routerEvent:Event) => {
      if(routerEvent instanceof NavigationStart){
        if(routerEvent.url!='/' && this.IsLoggedIn==true){
          //If No User data is present, then dispath the User action
          this.$user.pipe(take(1)).subscribe((user) => {
            if (!user) {
              this.store.dispatch(getUserAction.getUser());
            }
          });
        }
      }
    })
    //this.store.dispatch(getUserAction.getUser())
    this.songServices.setSongs(['https://dl.dropboxusercontent.com/scl/fi/s76vxgn0794imk3y870ab/Preet.mp3?rlkey=9wsj6txwvcnvhc5ugz4uwv16q&e=1&st=3cy1eanf&dl=0'])
  }
}
