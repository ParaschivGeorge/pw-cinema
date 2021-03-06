import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(
    private usersService: UsersService,
    private langService: LanguageService) { }

  ngOnInit() {
  }

  logout() {
    this.usersService.user = null;
    this.usersService.token = null;
  }

  get user() {
    return this.usersService.user;
  }

  get navbarTexts() {
    return this.langService.navbarTexts;
  }

  get selectedLang() {
    return this.langService.selectedLang;
  }

  selectRo() {
    this.langService.selectedLang = 1;
    this.langService.langSubject.next(true);
  }

  selectUS() {
    this.langService.selectedLang = 0;
    this.langService.langSubject.next(true);
  }
}
