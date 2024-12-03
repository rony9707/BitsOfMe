import { Component, HostListener, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { DisplayProfileComponent } from './display-profile/display-profile.component';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { TooltipModule } from 'primeng/tooltip';
import { PasswordHideComponent } from '../../shared/svg/password-hide/password-hide.component';
import { PasswordShowComponent } from '../../shared/svg/password-show/password-show.component';
import swal from 'sweetalert2';
import { RouterModule } from '@angular/router';
import { LoggerService } from '../../services/logger/logger.service';
import { countryCode } from '../../shared/BitsOfLifeData/DialingCodeCountry';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    DisplayProfileComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
    TooltipModule,
    PasswordHideComponent,
    PasswordShowComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  //Declare objects to use in the DOM-----------------------------------------
  windowWidth: WritableSignal<number> = signal(0);
  activeDiv = signal('div3')// Keeps track of the active div
  uploadedImage: string | ArrayBuffer | null = null;
  defaultImageUrl: string = 'assets/images/avatar.jpg';
  passwordEyeFlag = signal(false)
  toolTip = `Password must be 8-16 characters long,
   containing at least one lowercase, one uppercase, one number, and one special character.`;
  countryCode = signal(countryCode)



  //Form Code
  //FormGroup and FormControl Validators Code
  registerForm: FormGroup;
  myPfp: File[] = []


  //Inject Services here------------------------------------------------------
  private logger = inject(LoggerService)



  constructor() {
    this.windowWidth.set(window.innerWidth);
    this.logger.log(`The window width is ${this.windowWidth()}px`, 'info')

    //Declare Form Group and Form Controls here
    this.registerForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      password: new FormControl(
        '', [Validators.required,
        Validators.minLength(8),
        Validators.maxLength(16),
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&.])[A-Za-z\d$@$!%*?&.].{8,16}')]),
      confirmPassword: new FormControl('', [Validators.required]),
      fullname: new FormControl('', [Validators.required]),
      dob: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      aboutme: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      countryCode: new FormControl('+91', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required, Validators.pattern("^[0-9]{10}$")]),
      address: new FormControl('', [Validators.required]),
    })

  }


  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.windowWidth.set(window.innerWidth);
  }

  //Password Eye function
  passwordEye() {
    this.passwordEyeFlag.update(prev => !prev)
  }

  //Determines which div is active set on click of the 3 main buttons
  setActiveDiv(div: string): void {
    this.activeDiv.set(div);
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

  //When the image i suploaded
  onImageUpload(event: any): void {
    const file = event.target.files[0]; // Get the first file
    if (file) {
      // Create a URL for the uploaded file
      this.myPfp = file
      const imageUrl = URL.createObjectURL(file);
      this.uploadedImage = imageUrl

    } else {
      this.logger.log(`No file selected`, 'error')
    }
  }

  //Function which will help to type only and numbers
  onlyNumbers(event: KeyboardEvent) {
    var charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode > 47 && charCode < 58)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

  // Function to allow only alphabets and numbers, no spaces or special characters
  onlyAlphabetsAndNumbers(event: KeyboardEvent) {
  var charCode = (event.which) ? event.which : event.keyCode;
  
  // Allow numbers (48-57), uppercase letters (65-90), lowercase letters (97-122),
  // backspace (8) and delete (46)
  if (
    (charCode > 64 && charCode < 91) || // A-Z
    (charCode > 96 && charCode < 123) || // a-z
    (charCode > 47 && charCode < 58) || // 0-9
    charCode === 8 || // Backspace
    charCode === 46 // Delete
  ) {
    return true;
  } else {
    event.preventDefault();
    return false;
  }
}
  



  //Code for input field validator text start---------------------------------------------------
  get usernameValidator() {
    return this.registerForm.get('username');
  }

  get passwordValidator() {
    return this.registerForm.get('password');
  }

  get confirmPasswordValidator() {
    return this.registerForm.get('confirmPassword');
  }

  get fullnameValidator() {
    return this.registerForm.get('fullname');
  }

  get dobValidator() {
    return this.registerForm.get('dob');
  }

  get genderValidator() {
    return this.registerForm.get('gender');
  }

  get aboutmeValidator() {
    return this.registerForm.get('aboutme');
  }

  get emailValidator() {
    return this.registerForm.get('email');
  }

  get phoneNumberValidator() {
    return this.registerForm.get('phoneNumber');
  }

  get addressValidator() {
    return this.registerForm.get('address');
  }
  //Code for input field validator text end--------------------------------------------------- 



  //Account Info Valid or Invalid------------------------------------------------------------------------------------
  sectionInfoValid(InfoType: string): boolean | undefined {
    if (InfoType == 'AI') {
      const usernameValid = this.registerForm.get('username')?.valid;
      const passwordValid = this.registerForm.get('password')?.valid;
      const confirmPasswordValid = this.registerForm.get('confirmPassword')?.valid;

      return usernameValid && passwordValid && confirmPasswordValid;
    }
    else if (InfoType == 'PI') {
      const fullnameValid = this.registerForm.get('fullname')?.valid;
      const dobValid = this.registerForm.get('dob')?.valid;
      const genderValid = this.registerForm.get('gender')?.valid;
      const aboutmeValid = this.registerForm.get('aboutme')?.valid;
      return fullnameValid && dobValid && genderValid && aboutmeValid
    }
    else if (InfoType == 'CI') {
      const emailValid = this.registerForm.get('email')?.valid;
      const phoneNumberValid = this.registerForm.get('phoneNumber')?.valid;
      const addressValid = this.registerForm.get('address')?.valid;
      return emailValid && phoneNumberValid && addressValid;
    }
    return false;
  }

  //Account Info Invalid------------------------------------------------------------------------------------
  sectionInfoInvalid(InfoType: string): boolean | undefined {
    if (InfoType === 'AI') {
      const usernameInvalid = this.registerForm.get('username')?.touched && !this.registerForm.get('username')?.valid;
      const passwordInvalid = this.registerForm.get('password')?.touched && !this.registerForm.get('password')?.valid;
      const confirmPasswordInvalid = this.registerForm.get('confirmPassword')?.touched && !this.registerForm.get('confirmPassword')?.valid;
      return usernameInvalid || passwordInvalid || confirmPasswordInvalid;

    } else if (InfoType === 'PI') {
      const fullnameInvalid = this.registerForm.get('fullname')?.touched && !this.registerForm.get('fullname')?.valid;
      const dobInvalid = this.registerForm.get('dob')?.touched && !this.registerForm.get('dob')?.valid;
      const genderInvalid = this.registerForm.get('gender')?.touched && !this.registerForm.get('gender')?.valid;
      const aboutmeInvalid = this.registerForm.get('aboutme')?.touched && !this.registerForm.get('aboutme')?.valid;
      return fullnameInvalid || dobInvalid || genderInvalid || aboutmeInvalid;

    } else if (InfoType === 'CI') {
      const emailInvalid = this.registerForm.get('email')?.touched && !this.registerForm.get('email')?.valid;
      const phoneNumberInvalid = this.registerForm.get('phoneNumber')?.touched && !this.registerForm.get('phoneNumber')?.valid;
      const addressInvalid = this.registerForm.get('address')?.touched && !this.registerForm.get('address')?.valid;
      return emailInvalid || phoneNumberInvalid || addressInvalid;

    }
    return false;
  }


  //Resets the form
  resetForm() {
    this.registerForm.reset()
    this.uploadedImage = this.defaultImageUrl;
    this.logger.log(`Registration form is reset`, 'info')
  }

  //On Modal open
  openModal(dialog: HTMLDialogElement): void {
    dialog.showModal();
  }

  //On Modal Close
  closeModal(dialog: HTMLDialogElement): void {
    dialog.close();
  }

  showErrorMessage(title: string, text: string) {
    swal.fire({ title, text, icon: 'error', timer: 1500, showConfirmButton: false });
  }


  registerUser() {

    if (!this.registerForm.valid) {
      this.showErrorMessage('Error', 'Please fill all required fields correctly.')
      return;
    }
    else if (this.myPfp.length == 0) {
      this.showErrorMessage('Error', 'Please upload your profile pic')
      this.logger.log(`Profile Picture not uploaded`, 'error')
      return;
    }
    else if (this.registerForm.valid) {

      this.logger.log(this.registerForm.value, 'table')
      console.log(this.myPfp)

    }
  }



}
