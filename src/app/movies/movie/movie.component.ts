import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MoviesService } from 'src/app/services/movies.service';
import { ReviewsService } from 'src/app/services/reviews.service';
import { Movie } from 'src/app/models/movie';
import { Review } from 'src/app/models/review';

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
    private reviewsService: ReviewsService) { }

  movie: Movie = null;
  reviews: Review[] = [];

  ngOnInit() {
    this.route.snapshot.params.subscribe(params => {
      this.moviesService.get(params['id']).subscribe(
        movie => {
          this.movie = movie;
          console.log(movie);
        },
        error => {
          console.log(error);
        }
      );
      this.reviewsService.getAll(params['id'], null).subscribe(
        reviews => {
          this.reviews = reviews;
          console.log(reviews);
        },
        error => {
          console.log(error);
        }
      );
    });
  }

}
