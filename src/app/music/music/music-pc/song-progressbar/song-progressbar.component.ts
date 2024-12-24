import { AfterViewInit, Component, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { SongService } from '../../../Music-Services/song.service';

@Component({
  selector: 'app-song-progressbar',
  standalone: true,
  imports: [],
  templateUrl: './song-progressbar.component.html',
  styleUrl: './song-progressbar.component.css'
})
export class SongProgressbarComponent implements OnInit, AfterViewInit {

  songProgress = signal(0);
  songSeek = signal('0:00');
  @ViewChild('slider', { static: false }) slider?: ElementRef

  private progressSubscription: Subscription | undefined;
  // Inject Services here
  public songServices = inject(SongService);

  ngOnInit(): void {
    this.progressSubscription = this.songServices.timer.subscribe(progress => {
      this.songSeek.set(progress);
    });

    // Update the progress when the song is playing
    this.songServices.songProgress.subscribe(progress => {
      this.songProgress.set(progress);
    });
  }

  ngAfterViewInit(): void {
    if (this.slider) {
      this.slider.nativeElement.background = 'linear-gradient(to right, #555 0%, #555 100%)';
    }
  }

  // Getter for songProgress value to be used in the template
  get songProgressValue(): number {
    return this.songProgress();
  }


  // Setter for updating songProgress when slider is changed
  onProgressChange(event: Event): void {
    const progressElement = event.target as HTMLInputElement;
    const newProgress = parseFloat(progressElement.value);
    //this.updateSliderBackground(newProgress);
    this.songProgress.set(newProgress);
    this.songServices.seekToPosition(newProgress);
  }

  private updateSliderBackground(progress: number): void {
    if(this.slider){
      this.slider.nativeElement.style.background = `linear-gradient(to right, #00ff00 ${progress}%, #555 ${progress}%)`;
    }
  }

}
