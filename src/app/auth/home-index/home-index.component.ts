import { Component, ElementRef, ViewChild, AfterViewInit, inject, signal, OnInit } from '@angular/core';
import { NavButtonsComponent } from '../../shared/header/nav-buttons/nav-buttons.component';
import { PostButtonsComponent } from '../../shared/header/post-buttons/post-buttons.component';
import { NavigationEnd, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { DividerComponent } from '../../shared/components/divider/divider.component';
import { Subscription } from 'rxjs';
import { CommonService } from '../../services/common/common.service';

@Component({
  selector: 'app-home-index',
  standalone: true,
  imports: [NavButtonsComponent, PostButtonsComponent, RouterOutlet, DividerComponent],
  templateUrl: './home-index.component.html',
  styleUrls: ['./home-index.component.css']
})
export class HomeIndexComponent implements AfterViewInit, OnInit {

  private routeSubscription!: Subscription;
  private isOnRootRoute = true;
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;
  private previousScrollTop = signal(0); 


  private router = inject(Router);
  private commonServices = inject(CommonService);

  // Throttled scroll function
  throttledOnScroll: (event: Event) => void;

  constructor() {
    // Initialize the throttled function with a 200ms limit
    this.throttledOnScroll = this.commonServices.throttle(this.onScroll.bind(this), 500);
  }

  ngOnInit(): void {
    // Subscribe to router events to track the current route
    this.routeSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isOnRootRoute = event.url === '/';
      }
    });
  }

  ngAfterViewInit(): void {
    // Ensure the scroll container exists
    if (!this.scrollContainer) {
      console.error('Scroll container not found.');
      return;
    }
  }

  ngOnDestroy(): void {
    // Clean up the router subscription
    this.routeSubscription.unsubscribe();
  }


  onScroll(event: Event): void {
    if (!this.isOnRootRoute) return;
  
    const container = this.scrollContainer.nativeElement;
    const scrollTop = container.scrollTop; // Current scroll position from the top
    const scrollHeight = container.scrollHeight; // Total height of the scrollable content
    const offsetHeight = container.offsetHeight; // Height of the visible container
  
    // Calculate the percentage of scroll completed
    const scrollPercentage = ((scrollTop + offsetHeight) / scrollHeight) * 100;
  
    // Only trigger loadImages() if scrolling down and 70% of scroll is done
    if (scrollTop > this.previousScrollTop() && scrollPercentage >= 70) {
      this.loadImages();
    }
  
    // Update previous scroll position for the next scroll event
    this.previousScrollTop.set(scrollTop);
  }

  loadImages(): void {
    console.log('Load more images');
    // Add logic to fetch and load new images
  }

  onSwipe(visibility:boolean) {
    this.commonServices.changeVisibility(visibility)
  }


}
