import { ChangeDetectorRef, Component, ElementRef, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/API/Auth/auth.service';
import { Subscription } from 'rxjs';
import { CommonService } from '../../services/common/common.service';
import { PasswordShowComponent } from '../../shared/svg/password-show/password-show.component';
import { PasswordHideComponent } from '../../shared/svg/password-hide/password-hide.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoaderButtonDirectiveDirective } from '../../shared/directives/loader-Directive/loaderButton-directive.directive';


@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [PasswordShowComponent, PasswordHideComponent, CommonModule, ReactiveFormsModule, FormsModule, LoaderButtonDirectiveDirective],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent implements OnInit {

  private resetPasswordSubscription?: Subscription
  passwordEyeFlag = signal(false)
  resetPasswordForm!: FormGroup;
  usernname?: string
  toolTip = `Password must be 8-16 characters long,
 containing at least one lowercase, one uppercase, one number, and one special character.`;
  isLoading = false;

  private activatedRoute = inject(ActivatedRoute)
  private authServices = inject(AuthService)
  private route = inject(Router)
  private cdr = inject(ChangeDetectorRef)
  private commonServices = inject(CommonService)


  ngOnInit(): void {
    this.resetPasswordForm = new FormGroup({
      username: new FormControl({ value: this.activatedRoute.snapshot.paramMap.get('username'), disabled: true }),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(16),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,16}$/)
      ]),
      confirmPassword: new FormControl('', Validators.required)
    });



    let usernameIDParam = this.activatedRoute.snapshot.paramMap.get('username');
    let tokenIDParam = this.activatedRoute.snapshot.paramMap.get('token');

    console.log(usernameIDParam)
    console.log(tokenIDParam)
    this.resetPasswordSubscription = this.authServices.resetPasswordGet(usernameIDParam, tokenIDParam).subscribe({
      next: (data: any) => {
        if (data.message == "TokenExpiredError") {
          this.commonServices.showErrorMessage("Token Expired", "Token has expired")
          this.route.navigate([''])
        }

        if (data.message == "JsonWebTokenError") {
          this.route.navigate(['**'])
        }


        //If Link is changed, then 404 route will be called
        if (usernameIDParam != data.response.username || tokenIDParam != data.response.token) {
          this.route.navigate(['**'])
        }
        else {
          this.commonServices.showSuccessMessage("Success", "Your one time link to reset your password has activated")
        }
      },
      error: (err) => {
        this.commonServices.showErrorMessage('error', err.error.message)
      },
    })
  }


  inputFocus(label: HTMLLabelElement): void {
    label.classList.add('focused');
  }

  // This function will bring the label back if the input is empty
  inputBlur(label: HTMLLabelElement, input: HTMLInputElement): void {
    if (!input.value) {
      label.classList.remove('focused');
    }
  }

  //Code for input field validator text start---------------------------------------------------
  get usernameValidator() {
    return this.resetPasswordForm?.get('username');
  }

  get passwordValidator() {
    return this.resetPasswordForm?.get('password');
  }

  get confirmPasswordValidator() {
    return this.resetPasswordForm?.get('confirmPassword');
  }

  //Code for input field validator text end--------------------------------------------------- 


  //Password Eye function
  passwordEye() {
    this.passwordEyeFlag.update(prev => !prev)
  }


  submitForm() {
    if (this.resetPasswordForm.valid) {
      this.isLoading = true;
      // Submit logic 
      const formValue = {
        password: this.resetPasswordForm.value.password,
        token: this.activatedRoute.snapshot.paramMap.get('token')
      };
      this.sentDataToBackend(formValue)
    } else {
      this.resetPasswordForm.markAllAsTouched();
    }
  }


  sentDataToBackend(data: Object) {
    this.authServices.updatePassword(data).subscribe({
      next: (data: any) => {
        this.isLoading = false;
        this.commonServices.showSuccessMessage('Password updated', data.message)

        setTimeout(() => {
          this.route.navigate(['/login'])
        }, 500)
      },
      error: (err) => {
        this.isLoading = false;
        this.commonServices.showErrorMessage('error', err.error.message)
      },
    })
  }



}
