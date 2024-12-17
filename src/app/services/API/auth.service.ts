import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

// https://chatgpt.com/share/67607c20-5334-8013-aa41-548c4f5b26b6


  //Declear Services here
  private http = inject(HttpClient)


  //Declare Backend Links here
  baseURL = environment.apiUrl
  registerUserURL = `${this.baseURL}/user/register`


  //Register User
  registerUser(formData: FormData) {
    return this.http.post<any>(this.registerUserURL, formData, {
      withCredentials: true
    })
  }


}
