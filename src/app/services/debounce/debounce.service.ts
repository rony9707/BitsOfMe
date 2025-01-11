import { Injectable } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DebounceService {

  constructor() { }

  private $inputSubject = new Subject<any>();

  
  debounce(){
     return this.$inputSubject.pipe(debounceTime(300))
  }

  //Next Value to the Subject
  sentToDebouncer(value:any){
    this.$inputSubject.next(value); 
  }
}
