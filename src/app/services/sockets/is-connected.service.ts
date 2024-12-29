import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class IsConnectedService {

  public socket:any;

  constructor() { 
    this.connect()
  }

  connect(): void {
    this.socket = io(environment.apiUrl);
  }
}
