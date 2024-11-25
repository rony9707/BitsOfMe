import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  embedLink(text: string): string {
    const urlPattern = /(https?:\/\/[^\s]+)/g;
    text = text.replace(urlPattern, '<a href="$1" class="embedded-link" target="_blank">$1</a>');
    return text;
  }

  formattedMessage(text:string): string {
    return this.embedLink(text).replace(/\n/g, '<br>');
  }
}
