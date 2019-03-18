import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { ReviewsService } from 'src/app/services/reviews.service';
import { LanguageService } from 'src/app/services/language.service';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { Review } from 'src/app/models/review';
import { MatBottomSheet } from '@angular/material';
import { ReviewBsComponent } from 'src/app/movies/movie/review-bs/review-bs.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(
    private usersService: UsersService,
    private reviewsService: ReviewsService,
    private langService: LanguageService,
    private route: ActivatedRoute,
    private bottomSheet: MatBottomSheet
  ) {
    this.reviewSubject.asObservable().subscribe(data => {
      this.getReviews();
    });
  }

  user: User = null;
  reviews: Review[] = [];

  ngOnInit() {
    this.usersService.get(this.route.snapshot.params['id']).subscribe(
      user => {
        this.user = user;
        console.log(user);
      },
      error => {
        console.log(error);
      }
    );
    this.getReviews();
  }

  getReviews() {
    this.reviewsService.getAll(null, this.route.snapshot.params['id']).subscribe(
      reviews => {
        this.reviews = reviews;
        console.log(reviews);
      },
      error => {
        console.log(error);
      }
    );
  }

  arrayTwo(n: number): number[] {
    return [...Array.from(Array(n).keys())];
  }
  
  get loggedInUser() {
    return this.usersService.user;
  } 
  
  openBottomSheet(review: Review) {
    this.reviewsService.review = review;
    this.bottomSheet.open(ReviewBsComponent);
  }

  deleteReview(reviewId: number) {
    this.reviewsService.delete(reviewId).subscribe(data => this.getReviews());
  }

  get reviewSubject(): Subject<boolean> {
    return this.reviewsService.reviewSubject;
  }
  
  get userTexts() {
    return this.langService.userTexts;
  }

  get selectedLang() {
    return this.langService.selectedLang;
  }
}
