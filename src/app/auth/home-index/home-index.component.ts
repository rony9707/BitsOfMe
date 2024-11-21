import { Component } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { NavButtonsComponent } from '../../shared/header/nav-buttons/nav-buttons.component';
import { PostButtonsComponent } from '../../shared/header/post-buttons/post-buttons.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home-index',
  standalone: true,
  imports: [NavButtonsComponent,PostButtonsComponent,DividerModule,RouterOutlet],
  templateUrl: './home-index.component.html',
  styleUrl: './home-index.component.css'
})
export class HomeIndexComponent {

}
