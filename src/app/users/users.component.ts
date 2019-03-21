import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../services/language.service';
import { UsersService } from '../services/users.service';
import { User } from '../models/user';
import { ReviewsService } from '../services/reviews.service';
import { Review } from '../models/review';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: User[] = [];
  reviews: Review[] = [];

  constructor(
    private usersService: UsersService,
    private reviewsService: ReviewsService,
    private router: Router,
    private langService: LanguageService) {
      this.langService.langSubject.asObservable().subscribe(data => {
        this.chartLabels = ['5 ' + this.usersTexts.daysAgo[this.selectedLang], '4 ' + this.usersTexts.daysAgo[this.selectedLang], '3 ' + this.usersTexts.daysAgo[this.selectedLang], '2 ' + this.usersTexts.daysAgo[this.selectedLang], '1 ' + this.usersTexts.dayAgo[this.selectedLang]];
        this.chartDatasets = [
          { data: [65, 59, 80, 81, 56], label: this.usersTexts.users5days[this.selectedLang] }
        ];
      });
     }

  public chartType: string = 'line';
  public chartDatasets: Array<any> = [
    { data: [65, 59, 80, 81, 56], label: this.usersTexts.users5days[this.selectedLang] }
  ];
  public chartLabels: Array<any> = ['5 ' + this.usersTexts.daysAgo[this.selectedLang], '4 ' + this.usersTexts.daysAgo[this.selectedLang], '3 ' + this.usersTexts.daysAgo[this.selectedLang], '2 ' + this.usersTexts.daysAgo[this.selectedLang], '1 ' + this.usersTexts.dayAgo[this.selectedLang]];
  public chartColors: Array<any> = [
    {
      backgroundColor: 'rgba(105, 0, 132, .2)',
      borderColor: 'rgba(200, 99, 132, .7)',
      borderWidth: 2,
    },
    {
      backgroundColor: 'rgba(0, 137, 132, .2)',
      borderColor: 'rgba(0, 10, 130, .7)',
      borderWidth: 2,
    }
  ];
  public chartOptions: any = {
    responsive: true
  };
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }

  ngOnInit() {
    this.usersService.getAll().subscribe(users => {
      this.users = users;
    },
    error => {
      console.log(error);
    });
    this.reviewsService.getAll(null, null).subscribe(reviews => {
      this.reviews = reviews;
    },
    error => {
      console.log(error);
    });
  }

  getTopUsers(): User[] {
    if (this.users.length  && this.reviews.length) {
      return this.users.sort((a, b) => {
        let ra = this.reviews.filter(r => r.userId === a.id).length;
        let rb = this.reviews.filter(r => r.userId === b.id).length;
        return rb - ra;
      }).slice(0, 5);
    }
    return null;
  }

  getNumberOfReviews(user: User) {
    return this.reviews.filter(r => r.userId === user.id).length;
  }

  onlineUsers(): string {
    return localStorage.getItem('connectedUsers') ? localStorage.getItem('connectedUsers') : '0';
  }

  goToUserProfile(user: User) {
    this.router.navigate(['users', user.id]);
  }

  get user() {
    return this.usersService.user;
  }

  get usersTexts() {
    return this.langService.usersTexts;
  }

  get selectedLang() {
    return this.langService.selectedLang;
  }
}
