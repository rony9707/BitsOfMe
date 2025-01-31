import { Component, ElementRef, inject, ViewChildren, QueryList, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { SongService } from '../../../Music-Services/song.service';
import { distinctUntilChanged, Subscription } from 'rxjs';

@Component({
  selector: 'app-song-lyrics',
  standalone: true,
  imports: [],
  templateUrl: './song-lyrics.component.html',
  styleUrl: './song-lyrics.component.css'
})
export class SongLyricsComponent implements OnInit,OnDestroy {

  currentLyric: string = '';
  allLyrics: string[] = [];
  private lastLyric: string = '';
  private lyricSubcriber!: Subscription;
  private currentlLyricSubcriber!: Subscription;


  private songService = inject(SongService);



  constructor() {

  }

  ngOnInit(): void {
    this.lyricSubcriber = this.songService.lyrics$.subscribe(lyrics => this.allLyrics = lyrics);

    this.currentlLyricSubcriber = this.songService.currentLyric.subscribe(lyric => {
      if (lyric && lyric !== this.lastLyric) { // Compare with last stored lyric
        this.lastLyric = lyric;
        this.songService.addLyric(lyric);
      }
    });
  }

  ngOnDestroy(): void {
    this.lyricSubcriber.unsubscribe();
    this.currentlLyricSubcriber.unsubscribe();
  }

}
