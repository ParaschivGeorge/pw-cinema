import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  public selectedLang = 0;
  public navbarTexts = {
    hello: ['Hello', 'Buna'],
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
    add: ['Add a review', 'Adauga o recenzie'],
    user: ['User', 'Utilizator']
  };
  public reviewBsTexts = {
    rating: ['Rating', 'Evaluare'],
    comment: ['Comment', 'Comentariu'],
    submit: ['Submit', 'Confirma']
  };
  public usersTexts = {
    yourProfile: ['Your profile', 'Profilul tau'],
    top5: ['Top 5 users', 'Top 5 utilizatori'],
    mostReviews: ['most reviews', 'cele mai multe recenzii'],
    reviews: ['reviews', 'recenzii'],
    connectedUsers: ['Connected users', 'Utilizatori conectati'],
    daysAgo: ['days ago', 'zile in urma'],
    dayAgo: ['day ago', 'zi in urma'],
    allUsers: ['All users', 'Toti utilizatorii'],
    users5days: ['Users in the last 5 days', 'Utilizatori in ultimele 5 zile']
  };
  public userTexts = {
    firstname: ['Firstname', 'Prenume'],
    lastname: ['Lastname', 'Nume'],
    email: ['Email', 'Email'],
    nrReviews: ['Number of reviews', 'Numar de recenzii'],
    reviews: ['Reviews', 'Recenzii'],
    movie: ['Movie', 'Film'],
    status: ['Status', 'Status'],
    prefCategories: ['Preferred categories', 'Categorii preferate'],
    edit: ['Edit', 'Modifica'],
    delete: ['Delete', 'Sterge'],
  };

  constructor() { }

}
