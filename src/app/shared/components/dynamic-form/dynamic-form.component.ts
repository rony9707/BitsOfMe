import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IForm, IFormControl, IValidator } from '../../interface/form-interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,FormsModule],
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.css'
})
export class DynamicFormComponent implements OnInit{

  @Input() form !: IForm;

  formBuilder = inject(FormBuilder);
  @Output() formData = new EventEmitter<FormGroup>();

  dynamicFormGroup:FormGroup = this.formBuilder.group({});

  ngOnInit(): void {
      if(this.form?.formControls){
        let formGroup:any={};

        this.form.formControls.forEach((control:IFormControl)=>{
          let controlValidators:any = [];
          if(control.validators){
            control.validators.forEach((val:IValidator)=>{
              if(val.validatorName === 'required') controlValidators.push(Validators.required);
              if(val.validatorName === 'email') controlValidators.push(Validators.email);
            })
          }
          formGroup[control.name]=[control.value || '', controlValidators]
          
        })
        this.dynamicFormGroup = this.formBuilder.group(formGroup)
      }
  }

  onSubmit(){
    this.formData.emit(this.dynamicFormGroup.value)
  }

  resetForm(){
    this.dynamicFormGroup.reset()
  }

  getValidationErrors(control: IFormControl): string {
    const myFormControl = this.dynamicFormGroup.get(control.name);
    if (!myFormControl || !myFormControl.errors) return '';
  
    let errorMessage = '';
    control.validators.forEach((val) => {
      if (myFormControl.hasError(val.validatorName)) {
        errorMessage = val.message; // Use the first matching message
      }
    });
    return errorMessage;
  }
  

}
