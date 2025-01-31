
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-all-posts',
  standalone: true,
  imports: [],
  templateUrl: './all-posts.component.html',
  styleUrl: './all-posts.component.css',
})
export class AllPostsComponent {

  @Input() data?: string

  array: number[] = Array.from({ length: 21 }, (_, i) => i);


}
