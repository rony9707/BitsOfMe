import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import * as getUserAction from './states/getUser/getUser.action'
import * as getUserSelector from './states/getUser/getUser.selector'
import { Store } from '@ngrx/store';
import { AppState } from './states/app.state';

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

  constructor() {
    this.store.dispatch(getUserAction.getUser())
  }
}
