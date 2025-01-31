import { Component, HostListener, signal, ViewEncapsulation, WritableSignal } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-error404',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './error404.component.html',
  styleUrl: './error404.component.css',
  encapsulation: ViewEncapsulation.ShadowDom
})
export class Error404Component {

  windowWidth: WritableSignal<number> = signal(0);

  constructor() {
    this.windowWidth.set(window.innerWidth);
  }

  @HostListener('window:resize', ['$event'])
    onResize(event: any) {
      this.windowWidth.set(window.innerWidth);
    }

}
