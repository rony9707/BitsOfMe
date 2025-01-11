import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, delay, firstValueFrom, map, Observable, of, take, pipe, tap, switchMap, filter, concatMap, mergeMap } from "rxjs";
import { AuthService } from "../API/Auth/auth.service";
import { CommonService } from "../common/common.service";
import { UserProfile } from "../../user/user-profile/user-profile.interface";
import { LoggerService } from "../logger/logger.service";
import { select, Store } from "@ngrx/store";
import * as getUserSelector from './../../states/getUser/getUser.selector'
import * as getUserAction from './../../states/getUser/getUser.action'
import { AppState } from "../../states/app.state";


//Can Activate User Route Guard
export const CanActivateUser = (): Observable<boolean> => {
  // Inject Services here
  const authService = inject(AuthService);
  const router = inject(Router);
  const common = inject(CommonService);
  const store = inject(Store);

  return store.select(getUserSelector.getAllUser).pipe(
    take(1), // Take the current value of user in the store
    switchMap((user) => {
      if (user) {
        // User exists in the store, allow route activation
        return [true];
      } else {
        // User not in the store, fetch from backend and update store
        return authService.getUser().pipe(
          tap((fetchedUser) => {
            if (fetchedUser) {
              authService.$isLoggedIn.set(true)
              // Update the store with fetched user data
              store.dispatch(getUserAction.getUserSuccess({ user: fetchedUser }));
            }
          }),
          map((fetchedUser) => {
            if (fetchedUser) {
              return true; // Allow route activation if user is fetched successfully
            } else {
              throw new Error('User not authenticated');
            }
          }),
          catchError(() => {
            // Redirect to login if user is not authenticated
            authService.$isLoggedIn.set(false)
            common.showErrorMessage('Error', 'Please login first').then(() => {
              router.navigate(['/login']);
            });
            return [false];
          })
        );
      }
    })
  );
};


  







//User Resolve Route Guar
export const userResolve = (): Observable<UserProfile | null> => {
  const store = inject(Store);

  return store.pipe(
    select(getUserSelector.getAllUser),
    tap((user) => {
      if (!user) {
        // Dispatch action to fetch user data if not found
        store.dispatch(getUserAction.getUser());
      }
    }),
    switchMap((user) => {
      if (user) {
        return of(user); // Emit the user if present in the store
      } else {
        // Allow the route to proceed even if user is null initially
        return store.pipe(
          select(getUserSelector.getAllUser),
          take(1), // Wait for one emission
          delay(1000), // Add a small delay to give time for the user data to load
          catchError((error) => {
            console.error('Error fetching user:', error);
            return of(null); // Return null in case of error
          })
        );
      }
    }),
    take(1) // Ensure the observable completes after one emission
  );
};


