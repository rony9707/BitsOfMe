import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as getUserActions from './getUser.action'
import { catchError, map, mergeMap, of } from 'rxjs';
import { AuthService } from "../../services/API/auth.service";


@Injectable()
export class getUserEffect {

  private getUser = inject(AuthService)
  action$ = inject(Actions)


  loadUser$ = createEffect(() =>
    this.action$.pipe(
      ofType(getUserActions.getUser),
      mergeMap(
        action => {
          console.log('Request for user made'); // Log when request is initiated
          return this.getUser.getUser().pipe(
            map((res) => {
              console.log('Request for user succeeded'); // Log when request succeeds
              this.getUser.$isLoggedIn.next(true)
              return getUserActions.getUserSuccess({ user: res });
            }),
            catchError(err => {
              this.getUser.$isLoggedIn.next(false)
              return of(getUserActions.getUserError({ errorMessage: err.message || 'Failed to load users' }));
            })
          );
        }
      )
    )
  );

}