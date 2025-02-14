import { Directive, ElementRef, HostListener, inject, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTooltip]',
  standalone: true
})
export class TooltipDirective {

  @Input('appTooltip') tooltipText: string = ''; // Input for tooltip text
  private tooltipElement: HTMLElement | null = null;

  constructor() {}

  private el = inject(ElementRef)
   private renderer = inject(Renderer2)

  @HostListener('mouseenter') onMouseEnter() {
    if (!this.tooltipElement) {
      this.createTooltip();
    }
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.removeTooltip();
  }

  private createTooltip() {
    const rect = this.el.nativeElement.getBoundingClientRect(); // Get accurate position
    this.tooltipElement = this.renderer.createElement('div');
    this.renderer.appendChild(this.tooltipElement, this.renderer.createText(this.tooltipText));

    this.renderer.setStyle(this.tooltipElement, 'position', 'fixed'); // Use fixed positioning
    this.renderer.setStyle(this.tooltipElement, 'background', 'black');
    this.renderer.setStyle(this.tooltipElement, 'color', 'white');
    this.renderer.setStyle(this.tooltipElement, 'padding', '5px 10px');
    this.renderer.setStyle(this.tooltipElement, 'border-radius', '4px');
    this.renderer.setStyle(this.tooltipElement, 'font-size', '12px');
    this.renderer.setStyle(this.tooltipElement, 'white-space', 'nowrap');
    this.renderer.setStyle(this.tooltipElement, 'z-index', '1000');
    this.renderer.setStyle(this.tooltipElement, 'transition', 'opacity 0.2s');
    this.renderer.setStyle(this.tooltipElement, 'opacity', '0');

    // Positioning relative to the host element
    this.renderer.setStyle(this.tooltipElement, 'top', `${rect.top - 30}px`);
    this.renderer.setStyle(this.tooltipElement, 'left', `${rect.left}px`);

    this.renderer.appendChild(document.body, this.tooltipElement);

    setTimeout(() => {
      if (this.tooltipElement) {
        this.renderer.setStyle(this.tooltipElement, 'opacity', '1');
      }
    }, 10);
  }

  private removeTooltip() {
    if (this.tooltipElement) {
      this.renderer.removeChild(document.body, this.tooltipElement);
      this.tooltipElement = null;
    }
  }

}
