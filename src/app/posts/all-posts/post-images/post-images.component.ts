import { Component, Input } from '@angular/core';
import { GalleryMainComponent } from "../../../../../node_modules/gallery-ang/src/lib/gallery-main/gallery-main.component";


@Component({
  selector: 'app-post-images',
  standalone: true,
  imports: [GalleryMainComponent],
  templateUrl: './post-images.component.html',
  styleUrl: './post-images.component.css'
})
export class PostImagesComponent {
  //Inject Variables here------------
  @Input() images?: string[];
}
