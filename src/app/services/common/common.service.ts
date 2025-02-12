import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import swal from 'sweetalert2';
import { AppState } from '../../states/app.state';
import { AuthService } from '../API/Auth/auth.service';
import * as getUserAction from './../../states/getUser/getUser.action'
import { BehaviorSubject } from 'rxjs';
import { clearPostsWhenLogout } from '../../states/getPosts/posts.action';

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


  //convert time for show posts
  // Convert time for showing posts
postTimeAgo(postDateString: string): string {
    // Convert "10th Feb, 2025 at 16:00:09 IST" to "10 Feb 2025 16:00:09"
    let formattedDate = postDateString
        .replace(/(\d+)(st|nd|rd|th)/, '$1') // Remove ordinal suffix (th, st, nd, rd)
        .replace("at", "") // Remove "at"
        .trim(); // Remove extra spaces

    // Parse the date correctly by appending IST manually
    const postDate = new Date(formattedDate + " GMT+0530"); // Ensuring IST is considered

    if (isNaN(postDate.getTime())) {
        return "Invalid date format";
    }

    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - postDate.getTime()) / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInDays >= 1) {
        return postDateString; // Show original timestamp if more than 1 day old
    } else if (diffInHours >= 1) {
        return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    } else if (diffInMinutes >= 1) {
        return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
    } else {
        return 'Just now';
    }
}









}
