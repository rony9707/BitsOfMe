import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, delay, firstValueFrom, map, Observable, of, take, pipe, tap, switchMap, filter } from "rxjs";
import { AuthService } from "../API/Auth/auth.service";
import { CommonService } from "../common/common.service";
import { UserProfile } from "../../user/user-profile/user-profile.interface";
import { LoggerService } from "../logger/logger.service";
import { select, Store } from "@ngrx/store";
import * as getUserSelector from './../../states/getUser/getUser.selector'
import * as getUserAction from './../../states/getUser/getUser.action'


//Can Activate User Route Guard
export const CanActivateUserOpposite = (): Observable<boolean> => {
  // Inject Services here
  const authService = inject(AuthService);
  const router = inject(Router);
  const common = inject(CommonService);
  const store = inject(Store);

  return store.select(getUserSelector.getAllUser).pipe(
    switchMap((user) => {
      if (user) {
        // User is already available in the store
        return [false]; // Return an observable of true
      } else {
        // Dispatch the action to fetch user data
        return [true]; // Return an observable of true
      }
    })
  );
};








