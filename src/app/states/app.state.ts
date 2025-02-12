import { PostsState } from "./getPosts/posts.reducer";
import { getUserState } from "./getUser/getUser.reducer";

export interface AppState {
  user: getUserState
  posts: PostsState
}