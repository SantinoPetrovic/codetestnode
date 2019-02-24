import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SitesService {
	user: any;
  site: any;
  constructor(private http:Http) { }

  getSitesForUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');    
    this.user = {id: JSON.parse(user).id};    
    return this.http.post('http://159.65.52.170:3000/sites', this.user, {headers: headers})
      .pipe(map(res => res.json()));  	
  }  

  getDeviceForSite(site) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');    
    return this.http.get('http://159.65.52.170:3000/sites/'+site+'/devices', {headers: headers})
      .pipe(map(res => res.json()));    
  }

  getAlarmZoneForSite(site) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');    
    return this.http.get('http://159.65.52.170:3000/sites/'+site+'/alarmZones', {headers: headers})
      .pipe(map(res => res.json()));    
  }  

}
