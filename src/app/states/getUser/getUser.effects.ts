import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as getUserActions from './getUser.action'
import { catchError, map, mergeMap, of } from 'rxjs';
import { AuthService } from "../../services/API/Auth/auth.service";
import { LoggerService } from "../../services/logger/logger.service";
import * as getUserSelector from '../../states/getUser/getUser.selector'
import { Store } from "@ngrx/store";
import { AppState } from "../app.state";

@Injectable()
export class getUserEffect {

  private getUser = inject(AuthService)
  private action$ = inject(Actions)
  private logger = inject(LoggerService)
  private store = inject(Store<AppState>);


  loadUser$ = createEffect(() =>
    this.action$.pipe(
      ofType(getUserActions.getUser),
      mergeMap(
        action => {
          this.logger.log('Request for user made', 'log') // Log when request is initiated
          return this.getUser.getUser().pipe(
            map((res) => {
              this.logger.log('Request for user succeeded', 'log')  // Log when request succeeds
              this.getUser.$isLoggedIn.set(true)
              return getUserActions.getUserSuccess({ user: res });
            }),
            catchError(err => {
              this.getUser.$isLoggedIn.set(false)
              this.logger.log(err.message, 'error')  // Log when request error
              return of(getUserActions.getUserError({ errorMessage: err.message || 'Failed to load users' }));
            })
          );
        }
      )
    )
  );

}