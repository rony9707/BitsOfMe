export interface postDetails {
  posttext: string;
  visibility:string;
  postTopic:string;
  username:string | undefined;
  [key: string]: string | undefined; 
}