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

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    let queryParams = new HttpParams().set('email', email);
    queryParams = queryParams.append('password', password);

    return this.http.request('get', environment.apiUrl + '/users', {params: queryParams});
  }

  register(email: string, password: string, firstName: string, lastName: string): Observable<any> {
    return this.http.request('post', environment.apiUrl + '/users', {body : {
      email: email,
      password: password,
      role: 'user',
      firstName: firstName,
      lastName: lastName
    }});
  }
}
