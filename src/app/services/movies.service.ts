import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Movie } from '../models/movie';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HttpClient) { }

  public movie = null;
  public movieSubject = new Subject<boolean>();

  getAll(titleLike: string, type: string): Observable<Movie[]> {
    let queryParams = new HttpParams();
    if (titleLike !== null) {
      queryParams = queryParams.set('title_like', titleLike);
    }
    if (type !== null) {
      queryParams = queryParams.set('type', type);
    }
    return this.http.request<Movie[]>('get', environment.apiUrl + '/movies', {params: queryParams});
  }

  get(id: number): Observable<Movie> {
    return this.http.request<Movie>('get', environment.apiUrl + '/movies/' + id);
  }

  delete(id: number): Observable<any> {
    return this.http.request<any>('delete', environment.apiUrl + '/movies/' + id);
  }

  create(releaseDate: string, title: string, description: string, photoUrl: string, type: string): Observable<Movie> {
    return this.http.request<Movie>('post', environment.apiUrl + '/movies', {body: {
      releaseDate: releaseDate,
      title: title,
      description: description,
      photoUrl: photoUrl,
      type: type
    }});
  }

  update(id: number, releaseDate: string, title: string, description: string, photoUrl: string, type: string): Observable<Movie> {
    return this.http.request<Movie>('put', environment.apiUrl + '/movies/' + id, {body: {
      releaseDate: releaseDate,
      title: title,
      description: description,
      photoUrl: photoUrl,
      type: type
    }});
  }
}
