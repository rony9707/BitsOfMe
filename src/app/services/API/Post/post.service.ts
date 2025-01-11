import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { postDetails } from '../../../auth/home-index/create-posts/create-post.interface';

@Injectable({
  providedIn: 'root'
})
export class postService {

  constructor() { }


  //Declear Services here
  private http = inject(HttpClient)


  //Declare Backend Links here
  baseURL = environment.apiUrl
  createPostURL = `${this.baseURL}/post/createpost`


  //Create Posts for users
  createPosts(post: FormData) {
    return this.http.post<any>(this.createPostURL, post, {
      withCredentials: true
    })
  }

}
