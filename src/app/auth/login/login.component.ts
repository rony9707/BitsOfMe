import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PasswordHideComponent } from '../../shared/svg/password-hide/password-hide.component';
import { PasswordShowComponent } from '../../shared/svg/password-show/password-show.component';
import { CheckboxModule } from 'primeng/checkbox';
import { LoggerService } from '../../services/logger/logger.service';
import swal from 'sweetalert2';
import { LoginFormInterface } from './loginData.interface';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../services/API/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,
    PasswordHideComponent,
    PasswordShowComponent,
    CheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  passwordEyeFlag = signal(false)

  loginForm: FormGroup;


  //Inject Services here------------------------------------------------------
  private logger = inject(LoggerService)
  private authService = inject(AuthService)
  private router = inject(Router)

  constructor() {
    this.loginForm = new FormGroup({
      username: new FormControl(localStorage.getItem('rememberMeUsername'), [Validators.required]),
      password: new FormControl('Qwerty123.', [Validators.required]),
      rememberMe: new FormControl(localStorage.getItem('rememberMeCheckbox') === 'true')//Here conversion is done from string to boolean as in local stroage stores data in string
    })
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

  //sweetalert 2 error and success msg
  showErrorMessage(title: string, text: string) {
    swal.fire({ title, text, icon: 'error', timer: 1500, showConfirmButton: false });
  }

  showSuccessMessage(title: string, text: string) {
    return swal.fire({ title, text, icon: 'success', timer: 1500, showConfirmButton: false });
  }


  loginUser() {
    if (!this.loginForm.valid) {
      this.showErrorMessage('Error', 'Please fill all required fields correctly.')
      return;
    } else {

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
    this.authService.loginUser(loginDataToSentToBackend).subscribe({
      next:(value) =>{
        this.showSuccessMessage('Success', value.message).then(() => {
          // Navigate to login form
          this.router.navigate([''])
        });
      },
      error:(err)=>{
        this.showErrorMessage('Error', err.error.message)
      },
    })
  }

}
