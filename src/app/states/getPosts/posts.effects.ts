import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { loadPosts, loadPostsSuccess, loadPostsFailure } from './posts.action';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { postService } from '../../services/API/Post/post.service';
import { LoggerService } from '../../services/logger/logger.service';
import { Router } from '@angular/router';

@Injectable()
export class PostEffects {

  postsService=inject(postService)
  actions$=inject(Actions)
  private logger = inject(LoggerService)
  router=inject(Router)

  loadPosts$ = createEffect(() =>
  this.actions$.pipe(
    ofType(loadPosts),
    mergeMap(({ filters }) =>
      this.postsService.getPosts(filters || {}).pipe( // Ensure filters exist
        map((posts) => loadPostsSuccess({ posts })),
        catchError((error) => {
          this.logger.log(error.message, 'error');
          return of(loadPostsFailure({ error }));
        })
      )
    )
  )
);


}
