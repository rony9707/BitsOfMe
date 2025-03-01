import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PostsState } from './posts.reducer';

// Feature selector for the 'posts' state
export const selectPostsState = createFeatureSelector<PostsState>('posts');

// Select all public posts
export const selectAllPublicPosts = createSelector(
  selectPostsState,
  (state) => [...(state.publicPosts ?? [])].sort((a, b) => 
    new Date(b.db_postCreationDateUTC).getTime() - new Date(a.db_postCreationDateUTC).getTime()
  )
);

// Select all user posts
export const selectAllUserPosts = createSelector(
  selectPostsState,
  (state) => [...(state.userPosts ?? [])].sort((a, b) => 
    new Date(b.db_postCreationDateUTC).getTime() - new Date(a.db_postCreationDateUTC).getTime()
  )
);

// Select filters
export const selectPublicPostsFilters = createSelector(
  selectPostsState,
  (state) => state.publicFilters
);

export const selectUserPostsFilters = createSelector(
  selectPostsState,
  (state) => state.userFilters
);

export const selectSearchedPostsFilters = createSelector(
  selectPostsState,
  (state) => state.searchedPostsFilters
);

// Select error
export const selectPostsError = createSelector(
  selectPostsState,
  (state) => state.error ?? null
);

export const selectPublicPostsPage = createSelector(
  selectPostsState,
  (state: PostsState) => state.publicFilters.page
);

export const selectUserPostsPage = createSelector(
  selectPostsState,
  (state: PostsState) => state.userFilters.page
);

export const selectSearchedrPostsPage = createSelector(
  selectPostsState,
  (state: PostsState) => state.searchedPostsFilters.page
);
