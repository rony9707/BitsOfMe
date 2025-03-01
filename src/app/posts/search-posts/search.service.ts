import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchResultsSubject = new BehaviorSubject<string>('');
  searchResults$ = this.searchResultsSubject.asObservable();

  setSearchResults(results: string) {
    this.searchResultsSubject.next(results);
  }

  // getSearchResults(): string[] {
  //   return this.searchResultsSubject.value;
  // }
}
