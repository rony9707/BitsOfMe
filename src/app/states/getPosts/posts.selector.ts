import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PostsState } from './posts.reducer';

// Feature selector for the 'posts' state
export const selectPostsState = createFeatureSelector<PostsState>('posts');

// Selector to get all posts
export const selectAllPosts = createSelector(
  selectPostsState,
  (state) => state.posts ?? [] 
);

// Selector to get loading error
export const selectPostsError = createSelector(
  selectPostsState,
  (state) => state.error ?? null
);

// Selector to get filters
export const selectPostsFilters = createSelector(
  selectPostsState,
  (state) => state.filters
);

