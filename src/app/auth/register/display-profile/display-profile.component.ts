import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, inject, Input, OnInit, Output, signal, WritableSignal } from '@angular/core';
import { registerFormInterface } from '../register-form.interface';

@Component({
  selector: 'app-display-profile',
  standalone: true,
  imports: [],
  templateUrl: './display-profile.component.html',
  styleUrl: './display-profile.component.css',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class DisplayProfileComponent {

  @Input() registerFormData?: registerFormInterface;
  @Input() uploadedImage: string | ArrayBuffer | null = null;
  displayProfileFlag = false
  windowWidth: WritableSignal<number> = signal(0);


  //Inject Services here------------------------------------------------------



  constructor(){
    this.windowWidth.set(window.innerWidth);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.windowWidth.set(window.innerWidth);
  }

  get firstName(): string {
    return this.registerFormData?.fullname?.split(' ')[0]?.toUpperCase() || '';
  }
  
  get lastName(): string {
    return this.registerFormData?.fullname?.split(' ')?.slice(1)?.join(' ') || '';
  }



}
