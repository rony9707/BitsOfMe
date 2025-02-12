export interface getPosts {
  tags: any;
  postID: number;
  _id: string;
  db_username: string;
  db_username_pfp:string;
  db_postTopic: string;
  db_postText?: string;
  db_postVisibility: 'public' | 'private';
  db_postCreationDate: string;
  db_postModificationDate: string;
  db_tags: string[];
  db_postPics?: string[];
}
