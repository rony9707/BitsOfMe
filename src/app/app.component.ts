import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import * as getUserAction from './states/getUser/getUser.action'
import * as getUserSelector from './states/getUser/getUser.selector'
import { Store } from '@ngrx/store';
import { AppState } from './states/app.state';
import { SongService } from './music/Music-Services/song.service';

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

  constructor() {
    this.store.dispatch(getUserAction.getUser())
    this.songServices.setSongs(['https://dl.dropboxusercontent.com/scl/fi/s76vxgn0794imk3y870ab/Preet.mp3?rlkey=9wsj6txwvcnvhc5ugz4uwv16q&e=1&st=3cy1eanf&dl=0'])

  }
}
