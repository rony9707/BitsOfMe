import { createAction, props } from '@ngrx/store';
import { getPosts } from '../../shared/interface/getPosts-interface';
import { GetPostsFilter } from '../../shared/interface/getPostParams-interface';


export const loadPublicPosts = createAction(
  '[Post] Load Public Posts',
  props<{ filters: GetPostsFilter }>()
);

export const loadUserPosts = createAction(
  '[Post] Load User Posts',
  props<{ filters: GetPostsFilter }>()
);

export const loadPublicPostsSuccess = createAction(
  '[Post] Load Public Posts Success',
  props<{ posts: getPosts[] }>()
);

export const loadUserPostsSuccess = createAction(
  '[Post] Load User Posts Success',
  props<{ posts: getPosts[] }>()
);

export const loadPostsFailure = createAction(
  '[Post] Load Posts Failure',
  props<{ error: any }>()
);

export const loadPostsWhenSearchedSuccess = createAction(
  '[Post] Load Posts whne Searched',
  props<{ posts: getPosts[] }>()
);

export const clearPostsWhenLogout = createAction(
  '[AuthButton Component] Clear Posts When Logout'
);


export const deleteSinglePublicPost = createAction(
  '[Post] Delete Single Public Post',
  props<{ postID: string }>()
);

export const deleteSingleUserPost = createAction(
  '[Post] Delete Single User Post',
  props<{ postID: string }>()
);
