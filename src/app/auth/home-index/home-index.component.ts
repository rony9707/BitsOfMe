import { Component } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { NavButtonsComponent } from '../../shared/header/nav-buttons/nav-buttons.component';
import { PostButtonsComponent } from '../../shared/header/post-buttons/post-buttons.component';
import { RouterOutlet } from '@angular/router';
import { HideScrollDirective } from '../../directive/hide-scroll/hide-scroll.directive';

@Component({
  selector: 'app-home-index',
  standalone: true,
  imports: [NavButtonsComponent,PostButtonsComponent,DividerModule,RouterOutlet,HideScrollDirective],
  templateUrl: './home-index.component.html',
  styleUrl: './home-index.component.css'
})
export class HomeIndexComponent {

}
