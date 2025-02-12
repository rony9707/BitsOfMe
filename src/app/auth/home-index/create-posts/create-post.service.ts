import { inject, Injectable, OnDestroy, signal } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { postService } from '../../../services/API/Post/post.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../states/app.state';
import { loadPosts } from '../../../states/getPosts/posts.action';
import { initialPostsState } from '../../../states/getPosts/posts.reducer';

@Injectable({
  providedIn: 'root',
})
export class PostManagerService implements OnDestroy{
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  private successMessageSubject = new BehaviorSubject<string | null>(null);
  private errorMessageSubject = new BehaviorSubject<string | null>(null);
  private postSubscription!: Subscription;

  private message = new BehaviorSubject<string>('');
  private selectedFilesSubject =  new BehaviorSubject<{ uploadedImages: string; title: string }[]>([]); // Initialize with empty array

  isLoading$ = this.isLoadingSubject.asObservable();
  successMessage$ = this.successMessageSubject.asObservable();
  errorMessage$ = this.errorMessageSubject.asObservable();
  message$ = this.message.asObservable()
  selectedFilesSubject$ = this.selectedFilesSubject.asObservable();

  public post_fields_disabled_status = signal(false)


  private postService = inject(postService);
  private store= inject(Store<AppState>);

  ngOnDestroy(): void {
    this.postSubscription.unsubscribe()
  }
  

  createPost(formData: FormData) {
    this.isLoadingSubject.next(true);
    this.post_fields_disabled_status.set(true)

    this.postSubscription = this.postService.createPosts(formData).subscribe({
      next: (response) => {
        this.isLoadingSubject.next(false);
        this.successMessageSubject.next(response.message);
        this.post_fields_disabled_status.set(false)

        // Clear the message and selected files after a successful post
        this.selectedFilesSubject.next([]); // Clears the selected files array
        this.message.next(''); // Clears the selected files array

        //Load the posts state after a successfull post
        this.store.dispatch(loadPosts(initialPostsState));
      },
      error: (error) => {
        this.isLoadingSubject.next(false);
        this.post_fields_disabled_status.set(false)
        this.errorMessageSubject.next(error.message);
      },
    });
  }


  // Add a method to reset the state
  resetState() {
    this.successMessageSubject.next(null);
    this.errorMessageSubject.next(null);
    this.isLoadingSubject.next(false);
  }
}
