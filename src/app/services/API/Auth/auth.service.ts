import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { LoginFormInterface } from '../../../auth/login/loginData.interface';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { UserProfile } from '../../../user/user-profile/user-profile.interface';
import { Store } from '@ngrx/store';
import { AppState } from '../../../states/app.state';
import * as getUserSelector from '../../../states/getUser/getUser.selector'

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  // https://chatgpt.com/share/67607c20-5334-8013-aa41-548c4f5b26b6
  // https://www.youtube.com/watch?v=aFwrNSfthxU

  //public $isLoggedIn = new BehaviorSubject<boolean>(false);
  public $isLoggedIn = signal(false);
  public cookie = '';


  //Declear Services here
  private http = inject(HttpClient)
  private store = inject(Store<AppState>);


  //Declare Backend Links here
  baseURL = environment.apiUrl
  registerUserURL = `${this.baseURL}/user/register`
  loginURL = `${this.baseURL}/user/login`
  userDataURL = `${this.baseURL}/user/getUser`
  logoutURL = `${this.baseURL}/user/logout`


  $user: Observable<UserProfile | null>;
  $error: Observable<string | null>;


  //Declare Services here------------------------------------------------------------

  constructor() {
    this.$user = this.store.select(getUserSelector.getAllUser);
    this.$error = this.store.select(getUserSelector.selectUserError);
  }


  //Register User
  registerUser(formData: FormData) {
    return this.http.post<any>(this.registerUserURL, formData, {
      withCredentials: true
    })
  }

  //Login User
  loginUser(user: LoginFormInterface) {
    return this.http.post<any>(this.loginURL, user, {
      withCredentials: true
    })
  }

  //logout User
  logoutUser() {
    return this.http.post<any>(this.logoutURL, {}, {
      withCredentials: true
    })
  }

  //Get User Data After Login
  getUser(): Observable<UserProfile> {
    return this.http.get<UserProfile>(this.userDataURL, {
      withCredentials: true,
    })
  }

  // Getter for login status
  get isAuthenticated() {
    return this.$isLoggedIn();
  }

}
