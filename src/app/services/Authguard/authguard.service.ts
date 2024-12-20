import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, MaybeAsync, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { catchError, delay, filter, first, map, Observable, of, switchMap, take, tap } from "rxjs";
import { AuthService } from "../API/auth.service";
import { CommonService } from "../common/common.service";
import { UserProfile } from "../../user/user-profile/user-profile.interface";
import { Store } from "@ngrx/store";
import * as getUserAction from './../../states/getUser/getUser.action'
import * as getUserSelector from './../../states/getUser/getUser.selector'


// @Injectable({
//   providedIn: 'root'
// })

// export class AuthGuardService implements CanActivate, Resolve<UserProfile | null> {

//   private authService = inject(AuthService)
//   private router = inject(Router)
//   private common = inject(CommonService)
//   private store = inject(Store)


//   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
//     boolean | Observable<boolean> | Promise<boolean> {
//     return this.authService.isAuthenticated.pipe(
//       take(1), // Take the first emitted value from the BehaviorSubject
//       map(isLoggedIn => {
//         if (isLoggedIn) {
//           return true; // Allow access
//         } else {
//           this.common.showErrorMessage('Error', 'Please login first').then
//             (() => { this.router.navigate(['/login']) })
//           return false; // Block route access
//         }
//       })
//     );
//   }

//   resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UserProfile | null> {
//     return this.store.select(getUserSelector.getAllUser).pipe(
//       tap((loaded) => {
//         if (!loaded) {
//           this.store.dispatch(getUserAction.getUser());
//         }
//       }),
//       filter((loaded:any) => loaded),
//       take(1)
//     );
//   }




// }

export const CanActivateUser = (): 
boolean | Observable<boolean> | Promise<boolean> => {

  // Inject Services here
  const authService = inject(AuthService)
  const router = inject(Router)
  const common = inject(CommonService)

  return authService.isAuthenticated.pipe(
    take(1), // Take the first emitted value from the BehaviorSubject
    map(isLoggedIn => {
      if (isLoggedIn) {
        return true; // Allow access
      } else {
        common.showErrorMessage('Error', 'Please login first').then
          (() => { router.navigate(['/login']) })
        return false; // Block route access
      }
    })
  );
};


export const userResolve = (): Observable<UserProfile | null> => {
  // Inject Services here
  const store = inject(Store);

  return store.select(getUserSelector.getAllUser).pipe(
    tap((loaded) => {
      if (!loaded) {
        store.dispatch(getUserAction.getUser());
      }
    }),
    filter((loaded:any) => loaded),
    take(1)
  );
};