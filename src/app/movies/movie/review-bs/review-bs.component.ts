import { Component, OnInit } from '@angular/core';
import { ReviewsService } from 'src/app/services/reviews.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';
import { MatBottomSheetRef } from '@angular/material';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-review-bs',
  templateUrl: './review-bs.component.html',
  styleUrls: ['./review-bs.component.scss']
})
export class ReviewBsComponent implements OnInit {

  reviewForm = new FormGroup({
    'rating': new FormControl(this.review ? this.review.rating : null, Validators.required),
    'comment': new FormControl(this.review ? this.review.comment : null, Validators.required),
  });

  ratings = [1, 2, 3, 4, 5];

  constructor(
    private reviewsService: ReviewsService,
    private usersService: UsersService,
    private bottomSheetRef: MatBottomSheetRef<ReviewBsComponent>,
    private langService: LanguageService) { }

  ngOnInit() {
  }

  get review() {
    return this.reviewsService.review;
  }

  get reviewSubject(): Subject<boolean> {
    return this.reviewsService.reviewSubject;
  }

  onSubmit(event: MouseEvent): void {
    if (this.reviewForm.valid) {
      if (this.review !== null) {
        this.reviewsService.update(
          this.review._id,
          this.user._id,
          this.reviewsService.movieId,
          this.reviewForm.get('rating').value,
          this.reviewForm.get('comment').value).subscribe(
            data => {
              this.reviewSubject.next(true);
              this.bottomSheetRef.dismiss();
            },
            error => {
              console.log(error);
            }
          );
      } else {
        this.reviewsService.create(
          this.user._id,
          this.reviewsService.movieId,
          this.reviewForm.get('rating').value,
          this.reviewForm.get('comment').value).subscribe(
            data => {
              this.reviewSubject.next(true);
              this.bottomSheetRef.dismiss();
            },
            error => {
              console.log(error);
            }
          );
      }
    }
  }

  get user(): User {
    return this.usersService.user;
  }

  get reviewBsTexts() {
    return this.langService.reviewBsTexts;
  }

  get selectedLang() {
    return this.langService.selectedLang;
  }
}
