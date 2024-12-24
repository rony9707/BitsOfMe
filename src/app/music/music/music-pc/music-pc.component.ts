import { Component, inject, OnInit, signal } from '@angular/core';
import { DiskComponent } from "../../music-assets/disk/disk.component";
import { PlayComponent } from "../../music-assets/play/play.component";
import { PauseComponent } from "../../music-assets/pause/pause.component";
import { SongService } from '../../Music-Services/song.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { VolumeControlComponent } from "./volume-control/volume-control.component";
import { SongProgressbarComponent } from "./song-progressbar/song-progressbar.component";

@Component({
  selector: 'app-music-pc',
  standalone: true,
  imports: [DiskComponent, PlayComponent, PauseComponent, CommonModule, FormsModule, VolumeControlComponent, SongProgressbarComponent],
  templateUrl: './music-pc.component.html',
  styleUrl: './music-pc.component.css'
})
export class MusicPcComponent{


  // Inject Services here
  public songServices = inject(SongService);

  
  songPlay(songStatus: boolean) {
    this.songServices.toggleMusic(songStatus);
  }

  VolumeUpdate(volume: number) {
    this.songServices.adjustVolumeSong(volume);
  }


}
