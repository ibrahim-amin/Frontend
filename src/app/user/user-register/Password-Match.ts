import { createPlatform } from "@angular/core";
import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function mustMach():ValidatorFn{

    return (ctrl:AbstractControl):ValidationErrors|null => {
      const passwordControl=ctrl.get('password');

      const confirmPasswordControl=ctrl.get('confirmPassword');

      if(confirmPasswordControl.errors && !confirmPasswordControl.errors['mustMach']){
        return null;
      }

      if(passwordControl.value!==confirmPasswordControl.value){
        confirmPasswordControl.setErrors({mustMach:true})

      }
      else{
        confirmPasswordControl.setErrors(null);
      }
      return null
    }
}
