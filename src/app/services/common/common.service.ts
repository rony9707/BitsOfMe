import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import swal from 'sweetalert2';
import { AppState } from '../../states/app.state';
import { AuthService } from '../API/Auth/auth.service';
import * as getUserAction from './../../states/getUser/getUser.action'

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



}
