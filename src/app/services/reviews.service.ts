import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Review } from '../models/review';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  constructor(private http: HttpClient) { }

  getAll(movieId: number, userId: number): Observable<Review[]> {
    let queryParams = new HttpParams();
    if (movieId !== null) {
      queryParams = queryParams.set('movieId', movieId.toString());
    }
    if (userId !== null) {
      queryParams = queryParams.set('userId', userId.toString());
    }
    return this.http.request<Review[]>('get', environment.apiUrl + '/reviews', {params: queryParams});
  }

  get(id: number): Observable<Review> {
    return this.http.request<Review>('get', environment.apiUrl + '/reviews/' + id);
  }

  delete(id: number): Observable<any> {
    return this.http.request<any>('delete', environment.apiUrl + '/reviews/' + id);
  }

  create(userId: number, movieId: number, rating: number, comment: string): Observable<Review> {
    return this.http.request<Review>('post', environment.apiUrl + '/reviews', {body: {
      userId: userId,
      movieId: movieId,
      rating: rating,
      comment: comment
    }});
  }

  update(id: number, userId: number, movieId: number, rating: number, comment: string): Observable<Review> {
    return this.http.request<Review>('post', environment.apiUrl + '/reviews/' + id, {body: {
      userId: userId,
      movieId: movieId,
      rating: rating,
      comment: comment
    }});
  }
}
