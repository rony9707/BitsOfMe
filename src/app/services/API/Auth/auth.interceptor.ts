import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { take, mergeMap } from 'rxjs';
import { AppState } from '../../../states/app.state';
import * as getUserSelector from './../../../states/getUser/getUser.selector';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(Store<AppState>);

  return store.select(getUserSelector.getAllUser).pipe(
    take(1), // Take only the latest value and complete
    mergeMap(user => {
      const username = user?.db_username;

      // Clone the request and add the username to headers
      const modifiedReq = req.clone({
        setHeaders: {
          'X-Username': username || '' // Pass username in headers
        }
      });

      return next(modifiedReq);
    })
  );
};
