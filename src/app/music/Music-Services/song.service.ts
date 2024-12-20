import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  constructor() { }

  music_status = signal(false)
}
