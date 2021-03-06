import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { LanguageService } from '../services/language.service';
import * as jwt_decode from "jwt-decode";

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required
  ]);

  matcher = new MyErrorStateMatcher();

  constructor(
    private usersService: UsersService,
    private router: Router,
    private langService: LanguageService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({'email': this.emailFormControl, 'password': this.passwordFormControl});
  }

  onSubmit() {
    this.loginForm.get('password').setErrors(null);
    this.loginForm.get('email').setErrors(null);
    this.loginForm.updateValueAndValidity();
    if (this.loginForm.valid) {
      this.usersService.login(
        this.loginForm.get('email').value,
        this.loginForm.get('password').value
      ).subscribe(
        token => {
          this.usersService.token = token;
          this.usersService.user = jwt_decode(token).sub;
          this.router.navigate(['movies']);
        },
        error => {
          console.log(error);
          this.loginForm.get('password').setErrors(['invalid']);
          this.loginForm.get('email').setErrors(['invalid']);
        }
      );
    }
  }

  get loginTexts() {
    return this.langService.loginTexts;
  }

  get selectedLang() {
    return this.langService.selectedLang;
  }
}
