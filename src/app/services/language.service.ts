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
  public moviesTexts = {
    add: ['Add a movie', 'Adauga un film'],
    reviews: ['Reviews', 'Recenzii'],
    edit: ['Edit', 'Modifica'],
    delete: ['Delete', 'Sterge']
  };
  public moviesBsTexts = {
    title: ['Title', 'Titlu'],
    type: ['Type', 'Gen'],
    releaseDate: ['Release date', 'Data aparitie'],
    photoUrl: ['Poster photo url', 'Url poza afis'],
    description: ['Description', 'Descriere'],
    submit: ['Submit', 'Confirma']
  };
  public movieTexts = {
    reviews: ['Reviews', 'Recenzii'],
    edit: ['Edit', 'Modifica'],
    delete: ['Delete', 'Sterge'],
    add: ['Add a review', 'Adauga o recenzie']
  };
  public reviewBsTexts = {
    rating: ['Rating', 'Evaluare'],
    comment: ['Comment', 'Comentariu'],
    submit: ['Submit', 'Confirma']
  };

  constructor() { }

}
