import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private fb = inject(FormBuilder);
  private router = inject(Router);

  loginForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
    password: ['', [Validators.required, Validators.maxLength(20)]],
    remember: [false]
  });

  login() {
    const {remember, ...rest} = this.loginForm.value;
    /* if(remember){
      localStorageSystem.save(localStorageKeys.REMEMBER, rest.username);
    }else{
      localStorageSystem.clearItem(localStorageKeys.REMEMBER);
    } */

    this.router.navigateByUrl('/admin');
    console.log(this.loginForm.value)
  }
}
