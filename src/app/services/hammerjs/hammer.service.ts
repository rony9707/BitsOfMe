import { Injectable } from '@angular/core';
import { HammerGestureConfig } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})

export class MyHammerConfig extends HammerGestureConfig {
  override = <any>{
    swipe: { direction: (window as any).Hammer.DIRECTION_ALL },
  };
}
