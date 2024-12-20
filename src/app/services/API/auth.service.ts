import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { LoginFormInterface } from '../../auth/login/loginData.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserProfile } from '../../user/user-profile/user-profile.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  // https://chatgpt.com/share/67607c20-5334-8013-aa41-548c4f5b26b6

  //public $isLoggedIn = new BehaviorSubject<boolean>(false);
  public $isLoggedIn = new BehaviorSubject<boolean | null>(true);


  //Declear Services here
  private http = inject(HttpClient)


  //Declare Backend Links here
  baseURL = environment.apiUrl
  registerUserURL = `${this.baseURL}/user/register`
  loginURL = `${this.baseURL}/user/login`
  userDataURL = `${this.baseURL}/user/getUser`
  logoutURL = `${this.baseURL}/user/logout`


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
      withCredentials: true
    });
  }

  // Fetch user state during initialization
  // Fetch user state during initialization
  initializeAuthState(): void {
    this.getUser().subscribe({
      next: (user) => {
        console.log('User authenticated:', user);
        this.$isLoggedIn.next(true);
      },
      error: (error) => {
        console.error('Error fetching user:', error);
        this.$isLoggedIn.next(false);
      },
      complete: () => {
        console.log('Authentication state check completed.');
      }
    });
  }



  // Getter for login status
  get isAuthenticated() {
    return this.$isLoggedIn.asObservable();
  }





}
