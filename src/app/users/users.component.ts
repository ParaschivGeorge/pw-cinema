import { Component, OnInit, ViewChild } from '@angular/core';
import { LanguageService } from '../services/language.service';
import { UsersService } from '../services/users.service';
import { User } from '../models/user';
import { ReviewsService } from '../services/reviews.service';
import { Review } from '../models/review';
import { Router } from '@angular/router';
import { SocketIoService } from '../services/socket-io.service';
import { MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: User[] = [];
  reviews: Review[] = [];
  dataSource;
  dataSource1;
  dataSource2;
  query: string;
  
  displayedColumns: string[] = ['firstName', 'lastName', 'email'];
  displayedColumns1: string[] = ['name', 'email'];
  @ViewChild('matSort1') sort1: MatSort;
  @ViewChild(MatSort) sort2: MatSort;

  constructor(
    private usersService: UsersService,
    private reviewsService: ReviewsService,
    private router: Router,
    private socketIoService: SocketIoService,
    private langService: LanguageService) {
      this.langService.langSubject.asObservable().subscribe(data => {
        this.chartLabels = ['5 ' + this.usersTexts.daysAgo[this.selectedLang], '4 ' + this.usersTexts.daysAgo[this.selectedLang], '3 ' + this.usersTexts.daysAgo[this.selectedLang], '2 ' + this.usersTexts.daysAgo[this.selectedLang], '1 ' + this.usersTexts.dayAgo[this.selectedLang]];
        this.updateChart();
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
  // public onlineUsers;

  ngOnInit() {
    this.usersService.getAll().subscribe(users => {
      this.users = users;
      this.dataSource = new MatTableDataSource(users);
      this.dataSource.sort = this.sort1;
      const usersList = [];
      users.forEach(user => {
        usersList.push({name: user.firstName + ' ' + user.lastName, email: user.email});
      });
      this.dataSource1 = new MatTableDataSource(usersList);
      this.dataSource1.sort = this.sort2;
      console.log(this.dataSource1);
      console.log(this.dataSource);
      this.updateChart();
      if (this.reviews.length) {
        this.dataSource2 = new MatTableDataSource(this.getTopUsers());
      }
      console.log(users);
    },
    error => {
      console.log(error);
    });
    this.reviewsService.getAll(null, null).subscribe(reviews => {
      this.reviews = reviews;
      console.log(reviews);
      if (this.users.length) {
        this.dataSource2 = new MatTableDataSource(this.getTopUsers());
      }
    },
    error => {
      console.log(error);
    });
    this.socketIoService.getNumberOfUsers().subscribe(onlineUsers => {
      localStorage.setItem('onlineUsers', onlineUsers.toString());
    });
  }

  get onlineUsers() {
    return localStorage.getItem('onlineUsers');
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  updateChart() {
    let data = [];

    for (let index = 5; index >= 1; index--) {
      const dateIdaysAgo = new Date(new Date().setDate(new Date().getDate() - index)).setHours(0, 0, 0, 0);
      
      let userNumber = 0;
      this.users.forEach(user => {
        if (user.loggedInDays.some(date => {
          return new Date(date).getTime() === dateIdaysAgo;
        })) {
          userNumber++;
        }
      });
      data.push(userNumber);
    }
    console.log(data);
    this.chartDatasets = [
      { data: data, label: this.usersTexts.users5days[this.selectedLang] }
    ];
  }

  getTopUsers(): User[] {
    if (this.users.length) {
      return this.users.sort((a, b) => {
        let ra = this.reviews.filter(r => r.user._id === a._id).length;
        let rb = this.reviews.filter(r => r.user._id === b._id).length;
        return rb - ra;
      }).slice(0, 5);
    }
    return null;
  }

  getNumberOfReviews(user: User) {
    return this.reviews.filter(r => r.user._id === user._id).length;
  }

  goToUserProfile(user: User) {
    this.router.navigate(['users', user._id]);
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
