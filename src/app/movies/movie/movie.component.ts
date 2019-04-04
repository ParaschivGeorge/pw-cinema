import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MoviesService } from 'src/app/services/movies.service';
import { ReviewsService } from 'src/app/services/reviews.service';
import { Movie } from 'src/app/models/movie';
import { Review } from 'src/app/models/review';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';
import { MatBottomSheet } from '@angular/material';
import { Subject } from 'rxjs';
import { ReviewBsComponent } from './review-bs/review-bs.component';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private moviesService: MoviesService,
    private reviewsService: ReviewsService,
    private usersService: UsersService,
    private bottomSheet: MatBottomSheet,
    private langService: LanguageService) {
      this.reviewSubject.asObservable().subscribe(data => {
        this.getReviews();
      });
     }

  movie: Movie = null;
  reviews: Review[] = [];

  ngOnInit() {
    this.reviewsService.movieId = this.route.snapshot.params['id'];
    this.moviesService.get(this.route.snapshot.params['id']).subscribe(
      movie => {
        this.movie = movie;
        console.log(movie);
      },
      error => {
        console.log(error);
      }
    );
    this.getReviews();
  }

  getReviews() {
    this.reviewsService.getAll(this.route.snapshot.params['id'], null).subscribe(
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

  addedReview(): boolean {
    return this.reviews.some(r => r.user._id === this.user._id);
  }

  get user(): User {
    return this.usersService.user;
  }

  getStars(): string {
    let sum = 0;
    this.reviews.forEach(review => {
      sum += review.rating;
    });

    return (sum / this.reviews.length).toFixed(1);
  }

  goToUserProfile(user: User) {
    this.router.navigate(['users', user._id]);
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

  get movieTexts() {
    return this.langService.movieTexts;
  }

  get selectedLang() {
    return this.langService.selectedLang;
  }
}
