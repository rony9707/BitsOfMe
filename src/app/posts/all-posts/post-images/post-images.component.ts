import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-post-images',
  standalone: true,
  imports: [],
  templateUrl: './post-images.component.html',
  styleUrl: './post-images.component.css'
})
export class PostImagesComponent {
  //Inject Variables here------------
  @Input() images?: string[] | undefined;
}
