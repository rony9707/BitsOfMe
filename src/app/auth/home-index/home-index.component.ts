import { Component } from '@angular/core';
import { NavButtonsComponent } from '../../shared/header/nav-buttons/nav-buttons.component';
import { PostButtonsComponent } from '../../shared/header/post-buttons/post-buttons.component';
import { RouterOutlet } from '@angular/router';
import { DividerComponent } from "../../shared/components/divider/divider.component";

@Component({
  selector: 'app-home-index',
  standalone: true,
  imports: [NavButtonsComponent, PostButtonsComponent, RouterOutlet, DividerComponent],
  templateUrl: './home-index.component.html',
  styleUrl: './home-index.component.css'
})
export class HomeIndexComponent {

}
