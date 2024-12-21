import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  constructor() { }


  public audio = new Audio();
  music_status = signal(false);
  music_volume = signal(50);
  music_url=signal('');//Stores the music which is playing at that time
  private songLinks = signal<string[]>([]); //Stores the full music list 
  private currentSongIndex = signal(0);



  //Set the songs here
  setSongs(songLinks: string[]) {
    this.songLinks.set(songLinks);
    if (this.songLinks().length > 0) {
      this.music_url.set(this.songLinks()[this.currentSongIndex()]);
    }
  }


  //Toggle the start and stop of the song here
  toggleMusic(musicStatus: boolean) {
    this.audio.volume = this.music_volume() / 100;
    if (musicStatus) {
      if (this.music_url() && this.audio.src !== this.music_url()) {
        this.audio.src = this.music_url();
      }
      this.audio.play().then((val)=>{
        console.log("Music has started playing")
        this.music_status.set(musicStatus)
      });
    } else {
      this.audio.pause();
      this.music_status.set(musicStatus)
    }
  }

  


}
