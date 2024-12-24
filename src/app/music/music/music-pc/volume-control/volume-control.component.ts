import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, inject, input, Input, OnInit, Output, QueryList, signal, ViewChild, ViewChildren, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SongService } from '../../../Music-Services/song.service';

@Component({
  selector: 'app-volume-control',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './volume-control.component.html',
  styleUrl: './volume-control.component.css'
})
export class VolumeControlComponent implements AfterViewInit {


  @ViewChild('inputRange', { static: false }) slider?: ElementRef
  @ViewChildren('baseNotches') baseNotches?: QueryList<ElementRef>
  @ViewChild('knob', { static: false }) knob?: ElementRef
  @ViewChild('knobShadow', { static: false }) knobShadow?: ElementRef
  @ViewChild('knobNotch', { static: false }) knobNotch?: ElementRef
  @ViewChild('value', { static: false }) value?: ElementRef
  @Input() volume: number | undefined;
  @Output() volumeUpdate = new EventEmitter<number>();
  knobIndex: number = 0;

  //Inject Services here
  public songServices = inject(SongService);

  ngAfterViewInit(): void {
    if (this.knob) {
      this.knob.nativeElement.style.transform = `rotate(${(270 * this.songServices.music_volume()) / 100 - 135}deg)`;
    }

    if (this.baseNotches) {
      const volume = this.volume ?? 0; // Default to 0 if volume is undefined
      const activeNotches = Math.floor(volume / 10) + 1; // This determines how many notches should be active

      this.baseNotches.forEach((el, index) => {
        // Check if the notch index is less than the active notches count
        if (index < activeNotches) {
          el.nativeElement.classList.add('notch-active');
        } else {
          el.nativeElement.classList.remove('notch-active');
        }
      });
    }
  }



  knobTouchHandler(event: TouchEvent | MouseEvent) {
    let { top, left, width, height } = this.knob?.nativeElement.getBoundingClientRect();
    let y: number = top + height / 2;
    let x: number = left + width / 2;



    const tracker = (e: MouseEvent | TouchEvent): void => {
      let pointerY: number | null = null;
      let pointerX: number | null = null;

      // Handle mouse events
      if (['mousedown', 'mouseup', 'mousemove', 'mouseover', 'mouseout', 'mouseenter', 'mouseleave'].includes(event.type)) {
        const mouseEvent = e as MouseEvent;
        pointerX = mouseEvent.pageX;
        pointerY = mouseEvent.pageY;
      }
      // Handle touch events
      else if (['touchstart', 'touchmove', 'touchend', 'touchcancel'].includes(event.type)) {
        const touchEvent = e as TouchEvent;
        const touch = touchEvent.touches[0] || touchEvent.changedTouches[0];
        pointerX = touch.pageX;
        pointerY = touch.pageY;
      }

      if (pointerX !== null && pointerY !== null) {
        let rad = Math.atan2(pointerY - y, pointerX - x);
        if (rad < 0) {
          rad = 2 * Math.PI + rad;
        }
        let deg = 180 * rad / Math.PI - 135;

        if (deg > -135 && deg < -90) {
          deg = 225 + (135 + deg);
        }
        if (deg < 0) {
          deg = deg < -45 ? 270 : 0;
        }

        // Update the slider and knob
        if (this.slider && this.knob) {
          const knobValue = deg / 270 * (this.slider.nativeElement.max - this.slider.nativeElement.min) + this.slider.nativeElement.min;
          this.slider.nativeElement.value = knobValue;
          this.knob.nativeElement.style.transform = `rotate(${deg}deg)`;
          this.updateComponentState();
        }
      }
    };

    // Start dragging
    const startDragging = (e: MouseEvent | TouchEvent) => {
      document.addEventListener('mousemove', tracker);
      document.addEventListener('touchmove', tracker);
    };

    // Stop dragging
    const stopDragging = (e: MouseEvent | TouchEvent) => {
      document.removeEventListener('mousemove', tracker);
      document.removeEventListener('touchmove', tracker);
    };

    // Event listeners for starting and stopping dragging
    if (event.type === 'mousedown' || event.type === 'touchstart') {
      startDragging(event);
    }

    document.addEventListener('mouseup', stopDragging);
    document.addEventListener('touchend', stopDragging);
  }



  updateComponentState() {
    if (this.knob && this.slider) {
      this.knob.nativeElement.style.transform = `rotate(${(270 * this.songServices.music_volume()) / 100 - 135}deg)`;
      this.volume = this.slider.nativeElement.value
      this.volumeUpdate.emit(this.volume)

      if (+this.slider.nativeElement.value > +this.slider.nativeElement.min) {
        this.knob.nativeElement.classList.add("knob-active");
        this.knobNotch?.nativeElement.classList.add("notch-active");
        this.value?.nativeElement.classList.add("value-active");
      }
      else {
        this.knob.nativeElement.classList.remove("knob-active");
        this.knobNotch?.nativeElement.classList.remove("notch-active");
        this.value?.nativeElement.classList.remove("value-active");
      }

      this.baseNotches?.forEach((notch, index) => {
        if ((this.slider?.nativeElement.value - this.slider?.nativeElement.min) / ((this.slider?.nativeElement.max - this.slider?.nativeElement.min) - 1) > index / (this.baseNotches!.length - 1)) {
          notch.nativeElement.classList.add("notch-active");
        } else {
          notch.nativeElement.classList.remove("notch-active");
        }
      });
    }
  }





}
