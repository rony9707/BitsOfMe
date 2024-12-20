import { Component, HostListener, signal, WritableSignal } from '@angular/core';
import { MusicPcComponent } from './music-pc/music-pc.component';
import { MusicPhoneComponent } from './music-phone/music-phone.component';

@Component({
  selector: 'app-music',
  standalone: true,
  imports: [MusicPcComponent,MusicPhoneComponent],
  templateUrl: './music.component.html',
  styleUrl: './music.component.css'
})
export class MusicComponent {
  windowWidth: WritableSignal<number> = signal(0);


  //Inject Services here------------------------------------------------------



  constructor() {
    this.windowWidth.set(window.innerWidth);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.windowWidth.set(window.innerWidth);
  }
}
