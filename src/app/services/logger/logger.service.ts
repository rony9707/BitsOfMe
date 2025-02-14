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

  log(message: string | unknown, typeConsole: string): void {
    const timestamp = this.getCurrentTime();
    let style = '';

    switch (typeConsole.toLowerCase()) {
      case 'log':
        style = 'color: green; font-weight: bold;';
        console.log(`%c[${timestamp}] [LOG]:`, style, message);
        break;
      case 'warn':
        style = 'color: orange; font-weight: bold;';
        console.warn(`%c[${timestamp}] [WARN]:`, style, message);
        break;
      case 'error':
        style = 'color: red; font-weight: bold; background: black; padding: 2px;';
        console.error(`%c[${timestamp}] [ERROR]:`, style, message);
        break;
      case 'info':
        style = 'color: blue; font-weight: bold;';
        console.info(`%c[${timestamp}] [INFO]:`, style, message);
        break;
      case 'table':
        console.table(message);
        break;
      default:
        style = 'color: gray; font-weight: bold;';
        console.log(`%c[${timestamp}] [LOG]:`, style, message);
        break;
    }
  }
}
