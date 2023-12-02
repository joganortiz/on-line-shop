import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { TextInputComponent } from '../../../shared/components/text-input/text-input.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { localStorageSystem } from '../../../plugins';
import { localStorageKeys } from '../../../interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent,TextInputComponent],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginForm = this.fb.group({
    username: [localStorageSystem.getInString(localStorageKeys.REMEMBER), [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
    password: ['', [Validators.required, Validators.maxLength(20)]],
    remember: [false]
  });

  constructor(private fb: FormBuilder,  private router: Router) { }

  
  /**
   * @description login project
   * @date 11/25/2023 - 12:58:12 AM
   * @author Jogan Ortiz Muñoz
   */
  login() {
    const {remember, ...rest} = this.loginForm.value;
    if(remember){
      localStorageSystem.save(localStorageKeys.REMEMBER, rest.username);
    }else{
      localStorageSystem.clearItem(localStorageKeys.REMEMBER);
    }

    this.router.navigateByUrl('/admin');
    console.log(this.loginForm.value)
  }

  /**
   * @description capture errors in the email field
   * @date 11/25/2023 - 12:47:38 AM
   * @author Jogan Ortiz Muñoz
   *
   * @readonly
   * @type {("The field is required" | "Must be at least 4 characters" | "Must have a maximum of 30 characters" | "")}
   */
  get errosUsername() {
    if(this.loginForm.get('email')?.touched && this.loginForm.get('email')?.hasError("required")) {
      return "The field is required"
    }

    if(this.loginForm.get('email')?.touched && this.loginForm.get('email')?.hasError("minlength")) {
      return "Must be at least 4 characters";
    }

    if(this.loginForm.get('email')?.touched && this.loginForm.get('email')?.hasError("maxlength")) {
      return "Must have a maximum of 30 characters";
    }
    
    return ""
  }
  
  /**
   * @description capture errors in the password field
   * @date 11/25/2023 - 12:48:29 AM
   * @author Jogan Ortiz Muñoz
   *
   * @readonly
   * @type {("The field is required" | "Must have a maximum of 20 characters" | "")}
   */
  get errorsPassword() {
    if(this.loginForm.get('password')?.touched && this.loginForm.get('password')?.hasError("required")) {
      return "The field is required"
    }
    
    if(this.loginForm.get('password')?.touched && this.loginForm.get('password')?.hasError("maxlength")) {
      return "Must have a maximum of 20 characters";
    }

    return ""
  }
}
