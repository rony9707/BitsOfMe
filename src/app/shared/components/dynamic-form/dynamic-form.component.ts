import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IForm, IFormControl, IValidator } from '../../interface/form-interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.css'
})
export class DynamicFormComponent implements OnInit {

  @Input() form!: IForm;
  formBuilder = inject(FormBuilder);
  @Output() formData = new EventEmitter<FormGroup>();

  dynamicFormGroup: FormGroup = this.formBuilder.group({});

  ngOnInit(): void {
    if (this.form?.formControls) {
      let formGroup: any = {};

      // Build individual form controls and their validators
      this.form.formControls.forEach((control: IFormControl) => {
        let controlValidators: any = [];
        if (control.validators) {
          control.validators.forEach((val: IValidator) => {
            if (val.validatorName === 'required') controlValidators.push(Validators.required);
            if (val.validatorName === 'email') controlValidators.push(Validators.email);
            if (val.validatorName === 'minLength' && val.minLength !== undefined) {
              controlValidators.push(Validators.minLength(val.minLength));
            }
            if (val.validatorName === 'maxLength' && val.maxLength !== undefined) {
              controlValidators.push(Validators.maxLength(val.maxLength));
            }
            if (val.validatorName === 'pattern' && val.pattern) {
              controlValidators.push(Validators.pattern(val.pattern));
            }
          });
        }
        formGroup[control.name] = [control.value || '', controlValidators];
      });

      // Initialize the form group
      this.dynamicFormGroup = this.formBuilder.group(formGroup, {
        validators: this.matchPasswords('password', 'confirmPassword')  // Apply form-level validator
      });
    }
  }

  /**
   * Custom form-level validator to check if password and confirmPassword match
   */
  matchPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (formGroup: FormGroup) => {
      const password = formGroup.get(passwordKey)?.value;
      const confirmPassword = formGroup.get(confirmPasswordKey)?.value;

      if (password && confirmPassword && password !== confirmPassword) {
        formGroup.get(confirmPasswordKey)?.setErrors({ passwordMismatch: true });
      } else {
        const errors = formGroup.get(confirmPasswordKey)?.errors;
        if (errors) {
          delete errors['passwordMismatch'];
          if (Object.keys(errors).length === 0) {
            formGroup.get(confirmPasswordKey)?.setErrors(null);
          } else {
            formGroup.get(confirmPasswordKey)?.setErrors(errors);
          }
        }
      }
    };
  }

  onSubmit() {
    this.formData.emit(this.dynamicFormGroup.value);
  }

  resetForm() {
    this.dynamicFormGroup.reset();
  }

  getValidationErrors(control: IFormControl): string {
    const myFormControl = this.dynamicFormGroup.get(control.name);
    if (!myFormControl || !myFormControl.errors) return '';

    let errorMessage = '';
    control.validators.forEach((val) => {
      if (myFormControl.hasError(val.validatorName)) {
        errorMessage = val.message; // First matching error message
      }
    });

    // Check for password mismatch error
    if (control.name === 'confirmPassword' && myFormControl.hasError('passwordMismatch')) {
      errorMessage = 'Passwords do not match';
    }

    return errorMessage;
  }
}
