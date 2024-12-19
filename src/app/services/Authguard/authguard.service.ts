import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { filter, map, Observable, take, tap } from "rxjs";
import { AuthService } from "../API/auth.service";
import { CommonService } from "../common/common.service";
import { Store } from "@ngrx/store";
import { UserProfile } from "../../user/user-profile/user-profile.interface";
import * as getUserSelector from './../../states/getUser/getUser.selector' 
import * as getUserAction from './../../states/getUser/getUser.action' 



//Can Activate User Route Guard
export const CanActivateUser = (): boolean | Observable<boolean> | Promise<boolean> => {

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


export const userResolve = (): Observable<any | null> => {
  const store = inject(Store);

  // return store.select(getUserSelector.getAllUser).pipe(
  //   tap((loaded) => {
  //     if (!loaded) {
  //       store.dispatch(getUserAction.getUser());
  //     }
  //   }),
  //   filter((loaded: any) => !!loaded), // Ensure loaded is truthy
  //   take(1),
  //   map((loaded: any) => loaded as UserProfile | null) // Ensure the return type matches
  // );

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
