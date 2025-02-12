import { CommonModule } from '@angular/common';
import { Component, ComponentRef, inject, OnDestroy, signal, ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PasswordHideComponent } from '../../shared/svg/password-hide/password-hide.component';
import { PasswordShowComponent } from '../../shared/svg/password-show/password-show.component';
import { LoggerService } from '../../services/logger/logger.service';
import { LoginFormInterface } from './loginData.interface';
import { AuthService } from '../../services/API/Auth/auth.service';
import { Router } from '@angular/router';
import { CommonService } from '../../services/common/common.service';
import { Subscription } from 'rxjs';
import { ForgetPasswordComponent } from '../forget-password/forget-password.component';
import { broadCastChannel } from '../../app.component';
import { LoaderButtonDirectiveDirective } from '../../shared/directives/loaderButton-directive.directive';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,
    PasswordHideComponent,
    PasswordShowComponent,
    FormsModule,
    ReactiveFormsModule,
    LoaderButtonDirectiveDirective],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnDestroy {

  passwordEyeFlag = signal(false)
  isLoading = false

  loginForm: FormGroup;

  @ViewChild('forgetPasswordContainer', { read: ViewContainerRef, static: true })
  container!: ViewContainerRef;
  private forgetpasswordComponentRef?: ComponentRef<ForgetPasswordComponent>;


  //Inject Services here------------------------------------------------------
  private logger = inject(LoggerService)
  private authService = inject(AuthService)
  private router = inject(Router)
  private common = inject(CommonService)
  private loginSubscription?: Subscription

  constructor() {
    this.loginForm = new FormGroup({
      username: new FormControl(localStorage.getItem('rememberMeUsername'), [Validators.required]),
      password: new FormControl('Qwerty123.', [Validators.required]),
      rememberMe: new FormControl(localStorage.getItem('rememberMeCheckbox') === 'true')//Here conversion is done from string to boolean as in local stroage stores data in string
    })
  }
  ngOnDestroy(): void {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }

    if (this.forgetpasswordComponentRef) {
      this.forgetpasswordComponentRef.destroy();
    }
  }


  //Adds class when input element is focused
  inputFocus(label: HTMLLabelElement): void {
    label.classList.add('focused');
  }

  // This function will bring the label back if the input is empty
  inputBlur(label: HTMLLabelElement, input: HTMLInputElement): void {
    if (!input.value) {
      label.classList.remove('focused');
    }
  }


  //Password Eye function
  passwordEye() {
    this.passwordEyeFlag.update(prev => !prev)
  }


  //Code for input field validator text start---------------------------------------------------
  get usernameValidator() {
    return this.loginForm.get('username');
  }

  get passwordValidator() {
    return this.loginForm.get('password');
  }

  //Code for input field validator text end--------------------------------------------------- 


  //Remember me code
  rememberMeLogicSave() {
    const username = this.loginForm.value.username || '';
    if (this.loginForm.value.rememberMe == true) {
      localStorage.setItem('rememberMeUsername', username)
      localStorage.setItem('rememberMeCheckbox', JSON.stringify(true))
      this.logger.log('Username saved in Localstorage', 'log')
    }
    else if (this.loginForm.value.rememberMe == false) {
      localStorage.removeItem('rememberMeUsername')
      localStorage.setItem('rememberMeCheckbox', JSON.stringify(false))
      this.logger.log('Username Removed from Localstorage', 'log')
    }
  }


  loginUser() {
    if (!this.loginForm.valid) {
      this.common.showErrorMessage('Error', 'Please fill all required fields correctly.')
      return;
    } else {
      this.isLoading=true

      //Remember me code
      this.rememberMeLogicSave()

      //Update the form Data
      let loginDataToSentToBackend = this.loginForm.value
      delete loginDataToSentToBackend.rememberMe


      //Sent Data to Backend
      this.sentDataToBackend(loginDataToSentToBackend)
    }
  }


  sentDataToBackend(loginDataToSentToBackend: LoginFormInterface) {
    this.loginSubscription = this.authService.loginUser(loginDataToSentToBackend).subscribe({
      next: (value) => {
        this.common.showSuccessMessage('Success', value.message).then(() => {
          this.isLoading=false
          // Navigate to login form
          this.router.navigate([''])
          broadCastChannel.postMessage('login')//Login in the other tabs also
        });
      },
      error: (err) => {
        this.isLoading=false
        this.common.showErrorMessage('Error', err.error.message)
      },
    })
  }


  forgetPassword(username: string) {
    this.container.clear();

    // Dynamically create the component and assign the reference
    this.forgetpasswordComponentRef = this.container.createComponent(ForgetPasswordComponent);

    // Pass data to the component instance
    this.forgetpasswordComponentRef.instance.username_email = username;

    // Pass a destruction callback to the child
    this.forgetpasswordComponentRef.instance.closeCompomponent = () => this.destroyComponent();
  }


  destroyComponent() {
    // Destroy the dynamic component if it exists
    if (this.forgetpasswordComponentRef) {
      this.forgetpasswordComponentRef.destroy();
      this.forgetpasswordComponentRef = undefined; // Reset the reference
    }
  }

}
