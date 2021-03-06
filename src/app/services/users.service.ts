import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpParams, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  public user: User = null;
  public token: string;

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<string> {

    return this.http.request<string>('post', environment.apiUrl + '/users/auth/login', {body: {email: email, password: password}});
  }

  getAll(): Observable<User[]> {
    const queryParams = new HttpParams().set('role', 'user');

    return this.http.request<User[]>('get', environment.apiUrl + '/users', {params: queryParams});
  }

  register(email: string, password: string, firstName: string, lastName: string): Observable<User> {
    return this.http.request<User>('post', environment.apiUrl + '/users/auth/register', {body: {
      email: email,
      password: password,
      role: 'user',
      firstName: firstName,
      lastName: lastName
    }});
  }

  update(id: number, email: string, password: string, firstName: string, lastName: string): Observable<User> {
    return this.http.request<User>('put', environment.apiUrl + '/users/' + id, {body: {
      email: email,
      password: password,
      role: 'user',
      firstName: firstName,
      lastName: lastName
    }});
  }

  delete(id: number): Observable<any> {
    return this.http.request('delete', environment.apiUrl + '/users/' + id);
  }

  get(id: number): Observable<User> {
    return this.http.request<User>('get', environment.apiUrl + '/users/' + id);
  }
}
