import { Component } from '@angular/core';
import { DisplayProfileComponent } from './display-profile/display-profile.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [DisplayProfileComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

}
