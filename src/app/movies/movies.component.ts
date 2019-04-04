import { Component, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MoviesService } from '../services/movies.service';
import { ReviewsService } from '../services/reviews.service';
import { Movie } from '../models/movie';
import { EventEmitter } from 'events';
import { UsersService } from '../services/users.service';
import { User } from '../models/user';
import {MatBottomSheet} from '@angular/material';
import { MovieBsComponent } from './movie-bs/movie-bs.component';
import { Subject } from 'rxjs';
import { LanguageService } from '../services/language.service';
import { query } from '@angular/animations';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  movies: Movie[] = [];
  query: string;
  filteredMovies: Movie[] = [];

  constructor(
    private router: Router,
    private moviesService: MoviesService,
    private usersService: UsersService,
    private bottomSheet: MatBottomSheet,
    private langService: LanguageService) {
      this.movieSubject.asObservable().subscribe(data => {
        this.getMovies();
      });
    }

  ngOnInit() {
    this.getMovies();
  }

  getMovies() {
    this.moviesService.getAll(null, null).subscribe(
      movies => {
        this.movies = movies;
        this.query = '';
        this.filteredMovies = movies;
        console.log(movies);
      },
      error => {
        console.log(error);
        this.movies = [];
      }
    );
  }

  filter() {
    this.filteredMovies = this.movies.filter(movie => movie.title.toLowerCase().indexOf(this.query.toLowerCase()) > -1);
  }

  selectMovie(movieId: number) {
    this.router.navigate(['movies', movieId]);
  }

  deleteMovie(movieId: number)  {
    this.moviesService.delete(movieId).subscribe(data => {
      this.getMovies();
    },
    error => {
      console.log(error);
    });
  }

  get user(): User {
    return this.usersService.user;
  }

  openBottomSheet(movie: Movie) {
    this.moviesService.movie = movie;
    this.bottomSheet.open(MovieBsComponent);
  }

  get movieSubject(): Subject<boolean> {
    return this.moviesService.movieSubject;
  }

  get moviesTexts() {
    return this.langService.moviesTexts;
  }

  get selectedLang() {
    return this.langService.selectedLang;
  }
}
