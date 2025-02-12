import { inject, Injectable, OnDestroy, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoggerService } from '../../services/logger/logger.service';
import { LyricLine } from './song.interfect';
import { lyrics } from '../music-assets/MusicLysics/lyrics';

@Injectable({
  providedIn: 'root'
})
export class SongService implements OnDestroy{


  public audio = new Audio();
  music_status = signal(false);
  public music_volume = signal(40);
  music_url = signal('');//Stores the music which is playing at that time
  private songLinks = signal<string[]>([]); //Stores the full music list 
  private currentSongIndex = signal(0);
  songProgress: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  timer: BehaviorSubject<string> = new BehaviorSubject<string>('0:00');
  currentLyric: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private timerInterval: any;
  public knobValue: number = 0;
  imageLink = ''
  private lyrics: string[] = [];
  private lyricsSubject = new BehaviorSubject<string[]>(this.lyrics);

  lyrics$ = this.lyricsSubject.asObservable();


  //Inject services here
  private loggerService = inject(LoggerService)


  constructor() {
    this.audio.addEventListener('timeupdate', this.handleTimeUpdate);
  }
  
  handleTimeUpdate = () => {
    this.updateProgress();
    this.updateTimer();
    this.updateLyrics();
  };
  
  ngOnDestroy(): void {
    this.audio.removeEventListener('timeupdate', this.handleTimeUpdate);
  }

  addLyric(lyric: string): void {
    if (lyric.trim()) {
      this.lyrics.push(lyric);
  
      // Keep only the last 5 lyrics
      if (this.lyrics.length > 5) {
        this.lyrics.shift();
      }
  
      this.lyricsSubject.next([...this.lyrics]); // Emit new lyrics
    }
  }


  setKnobValue(value: number): void {
    this.knobValue = value;
  }

  getKnobValue(): number {
    return this.knobValue;
  }


  //Set and get Song Image Link
  setImage(image:string){
    this.imageLink=image
    this.loggerService.log("Image has been loaded", 'info')
  }

  getImage(){
    return this.imageLink
  }


  //Set the songs here
  setSongs(songLinks: string[]) {
    this.songLinks.set(songLinks);


    // Check if there are any songs in the list
    if (this.songLinks().length > 0) {
      const currentSongUrl = this.songLinks()[this.currentSongIndex()];

      // Set the current song URL signal
      this.music_url.set(currentSongUrl);

      // Load the song into the audio instance
      if (this.audio.src !== currentSongUrl) {
        this.audio.src = currentSongUrl;
        this.audio.load(); 
        this.loggerService.log("Song as been loaded", 'info')
      }
    }
  }



  //Toggle the start and stop of the song here
  toggleMusic(musicStatus: boolean) {
    this.audio.volume = this.music_volume() / 100;
    if (musicStatus) {
      if (this.music_url() && this.audio.src !== this.music_url()) {
        this.audio.src = this.music_url();
      }
      this.audio.play().then((val) => {
        this.music_status.set(musicStatus)
        this.startTimer();
      });
    } else {
      this.audio.pause();
      this.music_status.set(musicStatus)
      this.stopTimer();
    }
  }

  parseLyrics(lyricsText: string): { time: number; text: string }[] {
    return lyricsText
      .split('\n') // Split lyrics into lines
      .map(line => {
        const match = line.match(/\[(\d+):(\d+\.\d+)](.*)/); // Extract timestamp and text
        if (match) {
          const minutes = parseInt(match[1], 10);
          const seconds = parseFloat(match[2]);
          const text = match[3].trim();
          const timeInSeconds = minutes * 60 + seconds;
          return { time: timeInSeconds, text };
        }
        return null;
      })
      .filter(line => line !== null) as { time: number; text: string }[];
  }

  private updateLyrics() {
    const currentTime = this.audio.currentTime;
    const lyric = this.parseLyrics(lyrics)
      .slice()
      .reverse()
      .find((l) => currentTime >= l.time);
    if (lyric) {
      this.currentLyric.next(lyric.text);
    }
  }


  seekToPosition(position: number) {
    if (this.audio.duration) {
      this.audio.currentTime = (position / 100) * this.audio.duration;
    }
  }

  updateProgress() {
    if (this.audio && this.audio.duration) {
      const currentTime = this.audio.currentTime;
      const duration = this.audio.duration;
      const progress = (currentTime / duration) * 100;
      this.songProgress.next(isNaN(progress) ? 0 : progress);
    }
  }

  updateTimer() {
    if (this.audio && this.audio.currentTime) {
      const currentTime = this.audio.currentTime;
      const minutes = Math.floor(currentTime / 60);
      const seconds = Math.floor(currentTime % 60);
      this.timer.next(`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`);
    }
  }


  startTimer() {
    this.timerInterval = setInterval(() => this.updateTimer(), 1000);
  }

  stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }


  adjustVolumeSong(volume: number) {
    this.music_volume.set(volume);
    this.audio.volume = this.music_volume() / 100;
  }


}
