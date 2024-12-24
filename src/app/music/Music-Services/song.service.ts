import { Injectable, OnDestroy, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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
  private timerInterval: any;
  public knobValue: number = 0;



  constructor() {
    this.audio.addEventListener('timeupdate', this.handleTimeUpdate);
  }
  
  handleTimeUpdate = () => {
    this.updateProgress();
    this.updateTimer();
  };
  
  ngOnDestroy(): void {
    this.audio.removeEventListener('timeupdate', this.handleTimeUpdate);
  }

  setKnobValue(value: number): void {
    this.knobValue = value;
  }

  getKnobValue(): number {
    return this.knobValue;
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
        console.log("Song is loaded")
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
