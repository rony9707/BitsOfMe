import { Component, inject, OnInit } from '@angular/core';
import { DiskComponent } from "../../music-assets/disk/disk.component";
import { PlayComponent } from "../../music-assets/play/play.component";
import { PauseComponent } from "../../music-assets/pause/pause.component";
import { SongService } from '../../Music-Services/song.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-music-pc',
  standalone: true,
  imports: [DiskComponent, PlayComponent, PauseComponent,CommonModule],
  templateUrl: './music-pc.component.html',
  styleUrl: './music-pc.component.css'
})
export class MusicPcComponent{


  //Inject Services here
  public songServices = inject(SongService)

  songPlay(songStatus:boolean){
    this.songServices.music_status.set(songStatus)
    this.songServices.toggleMusic(songStatus);
  }

}
