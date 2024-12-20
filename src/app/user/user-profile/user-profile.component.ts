import { AfterViewInit, Component, ElementRef, inject, signal, ViewChild, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { UserProfile } from './user-profile.interface';
import { Store } from '@ngrx/store';
import { AppState } from '../../states/app.state';
import * as getUserSelector from './../../states/getUser/getUser.selector'
import { AsyncPipe, CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, AsyncPipe],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
  encapsulation: ViewEncapsulation.ShadowDom
})
export class UserProfileComponent implements AfterViewInit{

  //Declare Variables here
  $user: Observable<UserProfile | null>;
  $error: Observable<string | null>;
  isHovered = signal(false)
  @ViewChild('textarea') textarea?: ElementRef;


  private store = inject(Store<AppState>);

  constructor() {
    this.$user = this.store.select(getUserSelector.getAllUser);
    this.$error = this.store.select(getUserSelector.selectUserError);
  }

  ngAfterViewInit(): void {
      this.adjustHeight()
  }

  onHover(state: boolean) {
    this.isHovered.set(state);
  }

  //Adjust height of the textarea based on text written
  adjustHeight(): void {
    // Ensure textarea reference is available
    const textarea = this.textarea?.nativeElement;
    
    if (textarea) {  // Only proceed if the textarea element is defined
      if (textarea.scrollHeight > 76) {
        textarea.style.height = `${70}px`;
      } else {
        textarea.style.height = `${25}px`;
      }
    }
  }
  

}
