import { IForm } from "../interface/form-interface";

export const resetPasswordConfig: IForm = {
  formTitle: "Reset Password",
  submitBtn: "Submit",
  formControls: [
    {
      name: "email",
      label: "Email",
      value: "",
      placeholder: "Enter your email",
      inputClass: "input-box",
      labelClass: "label-box",
      type: "email",
      validators: [
        {
          validatorName: "required",
          required: true,
          message: "Email is required"
        },
        {
          validatorName: "email",
          message: "Invalid email format"
        }
      ]
    },
    {
      name: "password",
      label: "Password",
      value: "",
      placeholder: "Enter your password",
      inputClass: "input-box",
      labelClass: "label-box",
      type: "password",
      validators: [
        {
          validatorName: "required",
          required: true,
          message: "Password is required"
        },
        {
          validatorName: "pattern",
          pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>\\/?]).{8,16}$",
          message: "Password must be 8-16 characters long, containing at least one lowercase, one uppercase, one number, and one special character."
        }
      ]
    },
    {
      name: "confirmPassword",
      label: "Confirm Password",
      value: "",
      placeholder: "Enter your password again",
      inputClass: "input-box",
      labelClass: "label-box",
      type: "password",
      validators: [
        {
          validatorName: "required",
          required: true,
          message: "Confirm Password is required"
        },
        {
          validatorName: "pattern",
          pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>\\/?]).{8,16}$",
          message: "Password must be 8-16 characters long, containing at least one lowercase, one uppercase, one number, and one special character."
        }
      ]
    }
  ]
}
