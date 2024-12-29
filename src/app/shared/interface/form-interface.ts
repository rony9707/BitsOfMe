// https://www.youtube.com/watch?v=Qt2E558QiGE

export interface IForm{
  formTitle: string
  formControls: IFormControl[]
  submitBtn?: string
  resetBtn: string
}

export interface IFormControl {
  name: string
  label: string
  value: string
  placeholder: string
  inputClass: string
  labelClass: string
  type: string
  validators: IValidator[]
}

export interface IValidator {
  validatorName: string
  required?: boolean
  message: string
  email?: string
}