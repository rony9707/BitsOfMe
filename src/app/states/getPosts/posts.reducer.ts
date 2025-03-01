import { createReducer, on } from '@ngrx/store';
import {  loadPostsFailure, clearPostsWhenLogout, loadPublicPosts, loadUserPosts, loadPublicPostsSuccess, loadUserPostsSuccess, deleteSinglePublicPost, deleteSingleUserPost, loadPostsWhenSearchedSuccess } from './posts.action';
import { getPosts } from '../../shared/interface/getPosts-interface';
import { GetPostsFilter } from '../../shared/interface/getPostParams-interface';


export interface PostsState {
  publicPosts: getPosts[];
  userPosts: getPosts[];
  searchedPosts: getPosts[];
  publicFilters: GetPostsFilter;
  userFilters: GetPostsFilter;
  searchedPostsFilters: GetPostsFilter;
  error: any | null;
}


export const initialPostsState: PostsState = {
  publicPosts: [],
  userPosts: [],
  searchedPosts: [],
  publicFilters: {
    limit: 5,
    page: 1,
    db_postVisibility: 'public'
  },
  userFilters: {
    limit: 5,
    page: 1
  },
  searchedPostsFilters: {
    limit: 5,
    page: 1
  },
  error: null
};


export const postReducer = createReducer(
  initialPostsState,
  on(loadPublicPosts, (state, { filters }) => ({
    ...state,
    publicFilters: filters,
    publicPosts: [...state.publicPosts] // Clear previous public posts before loading new ones
  })),
  on(loadUserPosts, (state, { filters }) => ({
    ...state,
    userFilters: filters,
    userPosts: [...state.userPosts] // Clear previous user posts before loading new ones
  })),
  on(loadPostsWhenSearchedSuccess, (state, { posts }) => ({
    ...state,
    searchedPosts: mergeUniquePosts(state.searchedPosts, posts), // Clear previous user posts before loading new ones
  })),
  on(loadPublicPostsSuccess, (state, { posts }) => ({
    ...state,
    publicPosts: mergeUniquePosts(state.publicPosts, posts),
  })),
  on(loadUserPostsSuccess, (state, { posts }) => ({
    ...state,
    userPosts: mergeUniquePosts(state.userPosts, posts)
  })),
  on(loadPostsFailure, (state, { error }) => ({
    ...state,
    error
  })),
  on(clearPostsWhenLogout, (state) => ({
    ...state,
    publicPosts: [],
    userPosts: [],
    publicFilters: initialPostsState.publicFilters,
    userFilters: initialPostsState.userFilters,
    error: null
  })),
  on(deleteSinglePublicPost, (state, { postID }) => ({
    ...state,
    publicPosts: state.publicPosts.filter(post => post._id !== postID)
  })),
  on(deleteSingleUserPost, (state, { postID }) => ({
    ...state,
    userPosts: state.userPosts.filter(post => post._id !== postID)
  }))
);



// Helper function to merge posts while avoiding duplicates
function mergeUniquePosts(existingPosts: getPosts[], newPosts: getPosts[]): getPosts[] {
  const postMap = new Map(existingPosts.map(post => [post._id, post])); // Use 'id' as the unique key
  newPosts.forEach(post => postMap.set(post._id, post)); // Add new posts, replacing duplicates
  return Array.from(postMap.values()); // Convert back to array
}