import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, delay, firstValueFrom, map, Observable, of, take, pipe, tap } from "rxjs";
import { AuthService } from "../API/auth.service";
import { CommonService } from "../common/common.service";
import { UserProfile } from "../../user/user-profile/user-profile.interface";
import { LoggerService } from "../logger/logger.service";
import { select, Store } from "@ngrx/store";
import * as getUserSelector from './../../states/getUser/getUser.selector'
import * as getUserAction from './../../states/getUser/getUser.action'


//Can Activate User Route Guard
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



//User Resolve Route Guar
export const userResolve = (): Observable<UserProfile | null> => {
  const userService = inject(AuthService);
  const logger = inject(LoggerService)
  const store = inject(Store)

  return store.pipe(
    select(getUserSelector.getAllUser),
    tap((users) => {

      if (!users) {
        store.dispatch(getUserAction.getUser())
      }

    }),
   //delay(2000) // To simular Resolve route delay
  )

};