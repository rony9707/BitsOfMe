import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { postDetails } from '../../../auth/home-index/create-posts/create-post.interface';
import { Observable } from 'rxjs';
import { getPosts } from '../../../shared/interface/getPosts-interface';

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
  getPostsURL = `${this.baseURL}/post/getPosts`


  //Create Posts for users
  createPosts(post: FormData) {
    return this.http.post<any>(this.createPostURL, post, {
      withCredentials: true
    })
  }


  //Get Posts for users
  getPosts(filters: any): Observable<getPosts[]> {
    let params = new HttpParams();
    Object.keys(filters).forEach((key) => {
      if (filters[key] !== undefined && filters[key] !== null) {
        params = params.set(key, filters[key]);
      }
    });

    return this.http.get<getPosts[]>(this.getPostsURL, { params ,withCredentials: true, });
  }


}
