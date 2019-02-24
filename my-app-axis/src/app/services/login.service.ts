import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import { map } from 'rxjs/operators';
import { tokenNotExpired } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  authToken: any;
  user: any;

  constructor(private http:Http) { }

  getUsers() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    return this.http.get('http://159.65.52.170:3000/users/getUsers', {headers: headers})
      .pipe(map(res => res.json()));  	
  }

  tokenizeUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    return this.http.post('http://159.65.52.170:3000/users/tokenize', user, {headers: headers})
      .pipe(map(res => res.json()));
  }  

  getProfile(): Observable<any[]> {
    this.user = localStorage.getItem('user');
    return Observable.of(this.user);
  }

  storeUserData(token, user) {
  	localStorage.setItem('id_token', token);
  	localStorage.setItem('user', JSON.stringify(user));
  	this.authToken = token;
  	this.user = user;
  }

  loggedIn() {
  	return tokenNotExpired('id_token');
  }  

}