import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(private langService: LanguageService) { }

  ngOnInit() {}

  get homeTexts() {
    return this.langService.homeTexts;
  }

  get selectedLang() {
    return this.langService.selectedLang;
  }
}
