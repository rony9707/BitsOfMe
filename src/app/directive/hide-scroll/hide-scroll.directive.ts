import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDisableScrollOnHover]',
  standalone: true
})
export class HideScrollDirective {

  constructor(private element: ElementRef, private renderer: Renderer2) {
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.renderer.removeClass(this.element.nativeElement, 'enableScroll');
  }

  // Listen to the mouseleave event
  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.addClass(this.element.nativeElement, 'enableScroll');
  }

}
