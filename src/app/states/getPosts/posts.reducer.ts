import { createReducer, on } from '@ngrx/store';
import { loadPosts, loadPostsSuccess, loadPostsFailure, clearPostsWhenLogout } from './posts.action';
import { getPosts } from '../../shared/interface/getPosts-interface';


export interface PostsState{
    posts: getPosts[];
    error:any|null;
    filters: any;
}

export const initialPostsState: PostsState = {
  posts: [],
  error: null,
  filters: {
    limit: 50,
    page: 1,
    db_postVisibility:'public'
  },
};

export const postReducer = createReducer(
  initialPostsState,
  on(loadPosts, (state, { filters }) => ({
    ...state,
    filters,
    posts: [] // Clear previous posts before loading new ones
  })),
  on(loadPostsSuccess, (state, { posts }) => ({
    ...state,
    posts,
  })),
  on(loadPostsFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  //If user logs out
  on(clearPostsWhenLogout, (state) => ({
      ...state,
      posts: [],      // Clear posts
      filters: null,  // Reset filters (optional)
      error: null,    // Clear errors (optional)
  })),
);
