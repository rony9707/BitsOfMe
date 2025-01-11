import { IForm } from "../interface/form-interface";

export const forgetPasswordConfig:IForm = {
  formTitle: "Forget Password",
  submitBtn:"Submit",
  resetBtn:"Reset",
  formControls:[
    {
      "name":"email",
      "label":"Email",
      "value":"",
      "placeholder":"Enter your email",
      "inputClass":"input-box",
      "labelClass":"label-box",
      "type":"email",
      "validators":[
        {
          "validatorName":"required",
          "required":true,
          "message":"Email is required"
        },
        {
          "validatorName":"email",
          "email":"email",
          "message":"Email is not valid"
        }
      ]
    }
  ]
}