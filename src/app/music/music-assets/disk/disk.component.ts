import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-disk',
  standalone: true,
  imports: [],
  templateUrl: './disk.component.html',
  styleUrl: './disk.component.css'
})
export class DiskComponent implements OnInit {
  imageUrl?: string;

  ngOnInit() {
    // Imagine this URL comes from an API
    this.imageUrl = 'https://picsum.photos/id/104/3840/2160';
  }
}
