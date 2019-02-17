import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:Http) { }

  getUsers() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    return this.http.get('http://159.65.52.170:3000/users/getUsers', {headers: headers})
      .pipe(map(res => res.json()));  	
  }  
}
