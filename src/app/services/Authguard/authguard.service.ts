import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, delay, firstValueFrom, map, Observable, of, take, pipe, tap, switchMap, filter, concatMap, mergeMap, timeout } from "rxjs";
import { AuthService } from "../API/Auth/auth.service";
import { CommonService } from "../common/common.service";
import { UserProfile } from "../../user/user-profile/user-profile.interface";
import { LoggerService } from "../logger/logger.service";
import { select, Store } from "@ngrx/store";
import * as getUserSelector from './../../states/getUser/getUser.selector'
import * as getUserAction from './../../states/getUser/getUser.action'
import { AppState } from "../../states/app.state";
import { forkJoin, combineLatest } from 'rxjs';
import { getPosts } from '../../shared/interface/getPosts-interface';

import { getAllUser } from '../../states/getUser/getUser.selector';
import { getUser } from '../../states/getUser/getUser.action';
import * as getPostsSelector from './../../states/getPosts/posts.selector';
import * as getPostsAction from './../../states/getPosts/posts.action';
import { initialPostsState } from '../../states/getPosts/posts.reducer';
import { postService } from "../API/Post/post.service";


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
export const userAndPostsResolve = (): Observable<{ user: UserProfile | null; posts: getPosts[] }> => {
  const store = inject(Store);
  const authService = inject(AuthService);
  const PostService = inject(postService); // Fixed case issue

  // Fetch User if not already in Store
  const user$ = store.pipe(
    select(getUserSelector.getAllUser),
    //tap((user) => console.log("User from selector before API call:", user)), // Debugging
    take(1),
    switchMap((user) => {
      if (user) {
       // console.log("User already present in store.");
        return of(user);
      }
      return authService.getUser().pipe(
        tap((fetchedUser) => {
          if (fetchedUser) {
           // console.log("User fetched from API:", fetchedUser);
            authService.$isLoggedIn.set(true);
            store.dispatch(getUserAction.getUserSuccess({ user: fetchedUser })); // Update Store
          }
        }),
        catchError((error) => {
          //console.error("Error fetching user, allowing navigation:", error);
          authService.$isLoggedIn.set(false);
          store.dispatch(getUserAction.getUserError({ errorMessage: 'Failed to fetch user' }));
          return of(null);
        })
      );
    })
  );

  // Fetch Posts if not already in Store
  const posts$ = store.pipe(
    select(getPostsSelector.selectAllPosts),
    //tap((posts) => console.log("Posts from selector before API call:", posts)), // Debugging
    take(1),
    switchMap((posts) => {
      // if (posts.length > 0) {
      //   return of(posts);
      // }

      return PostService.getPosts(initialPostsState.filters).pipe(
        tap((fetchedPosts) => {
          // if (fetchedPosts.length > 0) {
            store.dispatch(getPostsAction.loadPostsSuccess({ posts: fetchedPosts })); // Update Store
          // }
        }),
        catchError((error) => {
          authService.$isLoggedIn.set(false);
            store.dispatch(getPostsAction.loadPostsFailure({ error: 'Failed to fetch posts' })); // Dispatch error
          return of([]);
        })
      );
    })
  );

  // Combine Results
  return combineLatest([user$, posts$]).pipe(
    // tap(([user, posts]) => console.log("Final resolved values:", { user, posts })), // Debugging
    map(([user, posts]) => ({ user, posts })),
    delay(2000),
    catchError(() => {
      authService.$isLoggedIn.set(false);
      return of({ user: null, posts: [] });
    })
  );
};
