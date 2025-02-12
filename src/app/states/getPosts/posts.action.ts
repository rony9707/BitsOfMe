import { createAction, props } from '@ngrx/store';
import { getPosts } from '../../shared/interface/getPosts-interface';


export const loadPosts = createAction(
  '[Post] Load Posts',
  props<{ filters: any }>() // Accept filters dynamically
);

export const loadPostsSuccess = createAction(
  '[Post] Load Posts Success',
  props<{ posts: getPosts[] }>()
);

export const loadPostsFailure = createAction(
  '[Post] Load Posts Failure',
  props<{ error: any }>()
);

export const clearPostsWhenLogout = createAction(
  '[AuthButton Component] crearPostsWhenLogout'
)