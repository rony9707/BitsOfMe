import { Component, inject, OnInit } from '@angular/core';
import { MusicDiskComponent } from '../../../shared/svg/music-disk/music-disk.component';
import { SongService } from '../../Music-Services/song.service';

@Component({
  selector: 'app-disk',
  standalone: true,
  imports: [MusicDiskComponent],
  templateUrl: './disk.component.html',
  styleUrl: './disk.component.css'
})
export class DiskComponent implements OnInit {
  imageUrl?: string;

  public songService = inject(SongService)

  ngOnInit() {
    // Imagine this URL comes from an API
    this.imageUrl = 'https://images.alphacoders.com/138/1383009.jpg';
  }
}
