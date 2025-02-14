import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import swal from 'sweetalert2';
import { AppState } from '../../states/app.state';
import { AuthService } from '../API/Auth/auth.service';
import * as getUserAction from './../../states/getUser/getUser.action'
import { BehaviorSubject, distinctUntilChanged, filter, map, Observable, of, switchMap, take, tap } from 'rxjs';
import { clearPostsWhenLogout, loadPosts, loadPostsSuccess } from '../../states/getPosts/posts.action';
import { getPosts } from '../../shared/interface/getPosts-interface';
import { selectAllPosts } from '../../states/getPosts/posts.selector';
import { GetPostsFilter } from '../../shared/interface/getPostParams-interface';
import { postService } from '../API/Post/post.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  //Inject Services here-------------------------------------------------------------
  private route = inject(Router)
  private store = inject(Store<AppState>);
  public router = inject(Router)
  public authService = inject(AuthService)
  public postService = inject(postService)

  embedLink(text: string): string {
    const urlPattern = /(https?:\/\/[^\s]+)/g;
    text = text.replace(urlPattern, '<a href="$1" class="embedded-link" target="_blank">$1</a>');
    return text;
  }

  formattedMessage(text: string): string {
    return this.embedLink(text).replace(/\n/g, '<br>');
  }

  //sweetalert 2 error and success msg
  showErrorMessage(title: string, text: string) {
    return swal.fire({ title, text, icon: 'error', timer: 1500, showConfirmButton: false });
  }

  showSuccessMessage(title: string, text: string) {
    return swal.fire({ title, text, icon: 'success', timer: 1500, showConfirmButton: false });
  }


  //Compate route dynamic name with current name so if someone changes it, it goes to 404 page
  compareRoutes(routeParam: string | null, param: string | undefined) {
    if (routeParam != param) {
      this.route.navigate(['**'])
    }
  }


  //Check for file format during upload of post and profile pic
  checkFileFormat(file: File): boolean {
    const allowedFormats = /image\/(jpeg|jpg|png|webp)/;
    return allowedFormats.test(file.type);
  }

  codeToRunDuringLogout() {
    this.store.dispatch(getUserAction.logoutUser());
    this.store.dispatch(clearPostsWhenLogout());
    this.authService.$isLoggedIn.set(false);
    this.router.navigate(['/login']);
  }


  // Custom throttle function
  throttle(func: (...args: any[]) => void, limit: number): (...args: any[]) => void {
    let inThrottle = false;
    return function (...args: any[]) {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }


  //Slider Open and Close with finger Gestures
  private commonservice_sliderVisble = new BehaviorSubject<boolean>(false)

  commonservice_currentSliverVisible = this.commonservice_sliderVisble.asObservable();

  changeVisibility(message: boolean) {
    this.commonservice_sliderVisble.next(message)
  }


  //Share Filter Params
  private commonservice_filterParams = new BehaviorSubject<GetPostsFilter>({limit:10, page:1})

  commonservice_currentFilterParams = this.commonservice_filterParams.asObservable();

  changeFilter(filter: GetPostsFilter) {
    this.commonservice_filterParams.next(filter)
  }




  //Function to filter posts store
searchPostsByFilters(filters: GetPostsFilter): Observable<getPosts[]> {
  const { limit = 10, page, db_postTopic, tags, db_postVisibility, db_username } = filters;
  const tagsArray = tags ? tags.split(',').map(tag => new RegExp(tag.trim(), 'i')) : [];

  return this.store.select(selectAllPosts).pipe(
    take(1),
    switchMap((posts) => {
      // Filter existing posts based on the search criteria
      const filteredPosts = posts.filter(post => {
        return (
          (!db_postTopic || post.db_postTopic.includes(db_postTopic)) &&
          (!db_postVisibility || post.db_postVisibility === db_postVisibility) &&
          (!db_username || post.db_username === db_username) &&
          (tagsArray.length === 0 || post.db_tags.some(tag => tagsArray.some(regex => regex.test(tag))))
        );
      });

      // If we already have enough posts in the store, return them without calling the API
      if (filteredPosts.length >= limit) {
        return of(filteredPosts);
      }

      // Calculate remaining posts to fetch
      const remainingCount = limit - filteredPosts.length;

      // Call the API only if additional posts are needed
      return this.postService.getPosts({ ...filters, limit: remainingCount }).pipe(
        map((newPosts) => {
          // Remove duplicates: filter out posts already in the store
          const trulyNewPosts = newPosts.filter(newPost =>
            !filteredPosts.some(existingPost => existingPost._id === newPost._id)
          );

          if (trulyNewPosts.length > 0) {
            // Dispatch new posts only if we received new ones
            this.store.dispatch(loadPostsSuccess({ posts: [...posts, ...trulyNewPosts] }));
          } 

          // Return updated posts list
          return [...filteredPosts, ...trulyNewPosts];
        })
      );
    })
  );
}





  getAllPosts(): Observable<getPosts[]> {
    return this.store.select(selectAllPosts);
  }


}
