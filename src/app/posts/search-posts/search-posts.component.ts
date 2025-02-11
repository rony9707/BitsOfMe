import { Component, EventEmitter, inject, OnDestroy, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DebounceService } from '../../services/debounce/debounce.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search-posts',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-posts.component.html',
  styleUrl: './search-posts.component.css'
})
export class SearchPostsComponent implements OnDestroy {

  searchInput = signal('')
  @Output() searchInputEmitter = new EventEmitter<string>();
  private debounceSubscription: Subscription;


  //Inject Services here-----------------------------
  debounceService = inject(DebounceService)


  constructor(){

    //Debouncing
    this.debounceSubscription=this.debounceService.debounce().subscribe(value => {
      this.searchInput.set(value); // Update the message
      this.emitSearchInput(this.searchInput());
    });
  }

  ngOnDestroy(): void {
      if(this.debounceSubscription){
        this.debounceSubscription.unsubscribe()
      }
  }

  //Input box Input event listener
  searchText(e:HTMLInputElement){
    this.debounceService.sentToDebouncer(e.value)
  }

  //Emit the data to the parent
  public emitSearchInput(inputString:string) {
    // Split the input text into an array by spaces
    const inputData = inputString
      .split(/\s+/) // Split by one or more spaces
      .filter(item => item.trim() !== ''); // Remove empty strings
    // Join the array into a comma-separated string
    const commaSeparatedString = inputData.join(',');
    this.searchInputEmitter.emit(commaSeparatedString);
  }

}
