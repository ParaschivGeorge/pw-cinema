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

  getStatus(): string {
    for (let index = 7; index >= 1; index--) {
      const dateIdaysAgo = new Date(new Date().setDate(new Date().getDate() - index)).setHours(0, 0, 0, 0);
      if (this.user.loggedInDays.some(d => new Date(d).getTime() === dateIdaysAgo)) {
        return 'Active';
      }
    }
    return 'Inactive';
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

  getPreferredCategories() {
    if (this.reviews) {
      const movieTypes = [];
      this.reviews.forEach(review => {
        movieTypes.push(review.movie.type);
      });
      return movieTypes.sort((a,b) =>
            movieTypes.filter(v => v === a).length
          - movieTypes.filter(v => v === b).length
      ).slice(0, 3);
    }

    return null;
  }

  arrayTwo(n: number): number[] {
    return [...Array.from(Array(n).keys())];
  }

  get loggedInUser() {
    return this.usersService.user;
  } 
  
  openBottomSheet(review: Review) {
    this.reviewsService.review = review;
    this.reviewsService.movieId = review.movie._id;
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
