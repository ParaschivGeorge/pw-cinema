import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';
import { LanguageService } from '../services/language.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  matcher = new MyErrorStateMatcher();

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);

  firstNameFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('[a-zA-Z ]*')
  ]);

  lastNameFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('[a-zA-Z ]*')
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')
  ]);

  passwordConfirmFormControl = new FormControl('', [
    Validators.required,
    this.passwordConfirmValidator.bind(this)
  ]);

  constructor(
    private usersService: UsersService,
    private router: Router,
    private langService: LanguageService
  ) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      'email': this.emailFormControl,
      'firstName': this.firstNameFormControl,
      'lastName': this.lastNameFormControl,
      'password': this.passwordFormControl,
      'confirm-password': this.passwordConfirmFormControl
    });
  }

  passwordConfirmValidator(control: FormControl): {[s: string]: boolean} {
    if (control.value === this.passwordFormControl.value) {return null; }
    return {'passwordsNotMatching': true};
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.usersService.register(
        this.registerForm.get('email').value,
        this.registerForm.get('password').value,
        this.registerForm.get('firstName').value,
        this.registerForm.get('lastName').value
      ).subscribe(data => {
        console.log(data);
        this.router.navigate(['login']);
      });
      console.log(this.registerForm);
    }
  }

  get registerTexts() {
    return this.langService.registerTexts;
  }

  get selectedLang() {
    return this.langService.selectedLang;
  }
}
