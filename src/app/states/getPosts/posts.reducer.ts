import { createReducer, on } from '@ngrx/store';
import { loadPosts, loadPostsSuccess, loadPostsFailure, clearPostsWhenLogout, deleteSinglePost } from './posts.action';
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
    limit: 10,
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
    posts: mergeUniquePosts(state.posts, posts),
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
  on(deleteSinglePost, (state, { postID }) => ({
    ...state,
    posts: state.posts.filter(post => post._id !== postID) // Remove the post with the given ID
  }))
);


// Helper function to merge posts while avoiding duplicates
function mergeUniquePosts(existingPosts: getPosts[], newPosts: getPosts[]): getPosts[] {
  const postMap = new Map(existingPosts.map(post => [post._id, post])); // Use 'id' as the unique key
  newPosts.forEach(post => postMap.set(post._id, post)); // Add new posts, replacing duplicates
  return Array.from(postMap.values()); // Convert back to array
}