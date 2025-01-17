import { Directive, ElementRef, Input, Renderer2, ViewContainerRef, ComponentFactoryResolver, inject } from '@angular/core';
import { Loader1Component } from '../components/loader1/loader1.component';

@Directive({
  selector: '[appLoaderButtonDirective]',
  standalone: true
})
export class LoaderButtonDirectiveDirective {

  private loaderElementRef: any = null;  // To hold the reference to the loader component

  @Input() set appLoaderButtonDirective(loading: boolean) {
    if (loading) {
      this.showLoader();
      this.hideButton(); // Hide the button when loading
    } else {
      this.hideLoader();
      this.showButton(); // Show the button when loading is complete
    }
  }

  private el = inject(ElementRef);
  private renderer = inject(Renderer2);
  private viewContainerRef = inject(ViewContainerRef);  // ViewContainerRef to add component
  private componentFactoryResolver = inject(ComponentFactoryResolver);  // To resolve component dynamically

  constructor() {}

  private showLoader() {
    if (!this.loaderElementRef) {
      const factory = this.componentFactoryResolver.resolveComponentFactory(Loader1Component);
      this.loaderElementRef = this.viewContainerRef.createComponent(factory);  // Create the component dynamically

      // Append the loader after the button
      this.renderer.appendChild(this.el.nativeElement.parentElement, this.loaderElementRef.location.nativeElement);
    }
  }

  private hideLoader() {
    if (this.loaderElementRef) {
      this.loaderElementRef.destroy();  // Destroy the component when hiding the loader
      this.loaderElementRef = null;
    }
  }

  private hideButton() {
    this.renderer.setStyle(this.el.nativeElement, 'display', 'none'); // Hide the button
  }

  private showButton() {
    this.renderer.removeStyle(this.el.nativeElement, 'display'); // Show the button again
  }
}
