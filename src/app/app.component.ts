import { Component, inject, OnDestroy } from '@angular/core';
import { ActivatedRoute, Event, NavigationStart, Router, RouterOutlet } from '@angular/router';
import * as getUserAction from './states/getUser/getUser.action'
import * as getUserSelector from './states/getUser/getUser.selector'
import { Store } from '@ngrx/store';
import { AppState } from './states/app.state';
import { SongService } from './music/Music-Services/song.service';
import { Observable, take } from 'rxjs';
import { UserProfile } from './user/user-profile/user-profile.interface';
import { AuthService } from './services/API/Auth/auth.service';
import { CommonService } from './services/common/common.service';
import { lyrics } from './music/music-assets/MusicLysics/lyrics';

export const broadCastChannel = new BroadcastChannel("authentication")

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {


  //Declare Variables here--------------------------------
  $user: Observable<UserProfile | null>;


  //Inject Services here---------------------------------
  private store = inject(Store<AppState>);
  public songServices = inject(SongService)
  public router = inject(Router)
  public authService = inject(AuthService)
  public commonService = inject(CommonService)


  constructor() {

    this.$user = this.store.select(getUserSelector.getAllUser);
    //If in any route except root and page is reloaded,make a Auth call to the server
    this.router.events.subscribe((routerEvent: Event) => {
      if (routerEvent instanceof NavigationStart) {
        if ((routerEvent.url != '/' && this.authService.isAuthenticated) || routerEvent.url== '/music') {
          //If No User data is present, then dispath the User action
          this.$user.pipe(take(1)).subscribe((user) => {
            if (!user) {
              this.store.dispatch(getUserAction.getUser());
            }
          });
        }
      }
    })

    this.songServices.setSongs(['https://dl.dropbox.com/scl/fi/o6jnyr7fbgv2s0wekjjih/paradox-128-ytshorts.savetube.me.mp3?rlkey=839eb70vjeag2850csk7w5cjq&e=1&st=t8kdosn2&dl=0'])
    this.songServices.setImage('https://images.alphacoders.com/138/1383009.jpg')


    broadCastChannel.onmessage = (event) => {
      //  If logout is clicked on one tab, it will go to logout in other tabs also
      if (event.data === 'logout') {
        this.commonService.codeToRunDuringLogout()
        //  If login is clicked on one tab, it will login in other tabs also
      } else if (event.data === 'login') {
        this.authService.$isLoggedIn.set(true);
        this.store.dispatch(getUserAction.getUser())
        
        this.router.navigate(['']);
      }
    };

  }
}
