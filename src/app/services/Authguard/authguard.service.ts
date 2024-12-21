import { inject } from "@angular/core";
import {  Router } from "@angular/router";
import { catchError, delay, firstValueFrom, map, Observable, of, take } from "rxjs";
import { AuthService } from "../API/auth.service";
import { CommonService } from "../common/common.service";
import { UserProfile } from "../../user/user-profile/user-profile.interface";
import { LoggerService } from "../logger/logger.service";


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
export const userResolve = async (): Promise<UserProfile | null> => {
  const userService = inject(AuthService);
  const logger = inject(LoggerService)

  try {
    return await firstValueFrom(
      userService.getUser().pipe(
        catchError((error) => {
          console.error("Error from Authguard",error)
          return of(null);
        }),
         //delay(2000)  //to test resolve guard
      )

    );
  } catch (error) {
    logger.log(error, 'error')
    return null;
  }
};