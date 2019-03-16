import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  public selectedLang = 0;
  public navbarTexts = {
    hello: ['Hello', 'Salut'],
    login: ['Login', 'Autentificare'],
    register: ['Register', 'Inregistrare'],
    movies: ['Movies', 'Filme'],
    users: ['Users', 'Utilizatori'],
    logout: ['Logout', 'Deconectare']
  };
  public loginTexts = {
    login: ['Login', 'Autentificare'],
    email: ['Email', 'Email'],
    password: ['Password', 'Parola']
  };
  public registerTexts = {
    email: ['Email', 'Email'],
    password: ['Password', 'Parola'],
    firstName: ['First name', 'Prenume'],
    lastName: ['Last name', 'Nume'],
    confirmPassword: ['Confirm password', 'Confirma parola'],
    register: ['Register', 'Inregistrare'],
  };

  constructor() { }

}
