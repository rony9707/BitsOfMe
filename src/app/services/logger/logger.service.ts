import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor() { }

  public getCurrentTime(): string {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }

  log(message: string| unknown, typeConsole: string): void {
    const timestamp = this.getCurrentTime();

    switch (typeConsole.toLowerCase()) {
      case 'log':
        console.log(`[${timestamp}] [LOG]: ${message}`);
        break;
      case 'warn':
        console.warn(`[${timestamp}] [WARN]: ${message}`);
        break;
      case 'error':
        console.error(`[${timestamp}] [ERROR]: ${message}`);
        break;
      case 'info':
        console.info(`[${timestamp}] [INFO]: ${message}`);
        break;
      case 'table':
        console.table(message);
        break;
      default:
        console.log(`[${timestamp}] [LOG]: ${message}`);
        break;
    }
  }
}
