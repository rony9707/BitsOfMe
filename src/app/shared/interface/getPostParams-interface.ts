export interface GetPostsFilter {
  limit?: number;
  page?: number;
  db_postTopic?: string;
  tags?: string; // Optional since it may not always be provided
  db_postVisibility?: 'public' | 'private';
  db_username?: string
}
