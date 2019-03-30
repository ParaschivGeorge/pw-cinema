import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef, ErrorStateMatcher} from '@angular/material';
import { MoviesService } from 'src/app/services/movies.service';
import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { Movie } from 'src/app/models/movie';
import { Subject } from 'rxjs';
import { LanguageService } from 'src/app/services/language.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-movie-bs',
  templateUrl: './movie-bs.component.html',
  styleUrls: ['./movie-bs.component.scss']
})
export class MovieBsComponent implements OnInit {

  constructor(
    private bottomSheetRef: MatBottomSheetRef<MovieBsComponent>,
    private moviesService: MoviesService,
    private langService: LanguageService) {}

  movieForm = new FormGroup({
    'title': new FormControl(this.movie ? this.movie.title : null, Validators.required),
    'releaseDate': new FormControl(this.movie ? new Date(this.movie.releaseDate) : new Date(), Validators.required),
    'type': new FormControl(this.movie ? this.movie.type : null, Validators.required),
    'photoUrl': new FormControl(this.movie ? this.movie.photoUrl : null, Validators.required),
    'description': new FormControl(this.movie ? this.movie.description : null, Validators.required),
  });

  movieTypes = ['action', 'adventure', 'animation', 'comedy', 'drama', 'fantasy', 'historical', 'horror', 'mystery', 'philosophical', 'romance', 'science fiction', 'thriller'];
  matcher = new MyErrorStateMatcher();

  ngOnInit() {
    console.log('aa');
  }

  onSubmit(event: MouseEvent): void {
    if (this.movieForm.valid) {
      const releaseDate = this.movieForm.get('releaseDate').value;
      const datestring = releaseDate.getDate()  + '.' + (releaseDate.getMonth() + 1) + '.' + releaseDate.getFullYear();

      if (this.movie !== null) {
        this.moviesService.update(
          this.movie._id,
          datestring,
          this.movieForm.get('title').value,
          this.movieForm.get('description').value,
          this.movieForm.get('photoUrl').value,
          this.movieForm.get('type').value).subscribe(
            data => {
              this.movieSubject.next(true);
              this.bottomSheetRef.dismiss();
            },
            error => {
              console.log(error);
            }
          );
      } else {
        this.moviesService.create(
          datestring,
          this.movieForm.get('title').value,
          this.movieForm.get('description').value,
          this.movieForm.get('photoUrl').value,
          this.movieForm.get('type').value).subscribe(
            data => {
              this.movieSubject.next(true);
              this.bottomSheetRef.dismiss();
            },
            error => {
              console.log(error);
            }
          );
      }
    }
  }

  get movie(): Movie {
    return this.moviesService.movie;
  }

  get movieSubject(): Subject<boolean> {
    return this.moviesService.movieSubject;
  }

  get moviesBsTexts() {
    return this.langService.moviesBsTexts;
  }

  get selectedLang() {
    return this.langService.selectedLang;
  }
}
