import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';
import { User } from '../models/user';

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

  constructor(private usersService: UsersService, private router: Router) { }

  ngOnInit() {
    this.loginForm = new FormGroup({'email': this.emailFormControl, 'password': this.passwordFormControl});
  }

  onSubmit() {
    if (this.loginForm.valid) {
      // this._userService.login(
      //   this.loginForm.get('email').value,
      //   this.loginForm.get('password').value
      // ).subscribe(
      //   data => {
      //     localStorage.setItem('token', data['token']);
      //     console.log(jwt_decode(localStorage.getItem('token')));
      //     const user: User = jwt_decode(localStorage.getItem('token'))['user'];
      //     if (user.role.toLowerCase() === 'donor') {
      //       this._router.navigate(['donor-profile']);
      //     } else if (user.role.toLowerCase() === 'admin') {
      //       this._router.navigate(['admin']);
      //     } else {
      //       this._router.navigate(['requests']);
      //     }
      //   }
      // );
      console.log(this.loginForm);
    }
  }

}
