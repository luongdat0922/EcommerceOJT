import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';

const API_URL = 'http://localhost:8080/api/authorization/';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  currentUser: any;
  headers: HttpHeaders;

  constructor(private http: HttpClient, private storageService: StorageService) {
    this.currentUser = this.storageService.getUser();
    this.headers = new HttpHeaders().set('Authorization', `Bearer ${this.currentUser.accessToken}`);
  }
  
  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { headers: this.headers, responseType: 'text' });
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + 'mod', { headers: this.headers, responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { headers: this.headers, responseType: 'text' });
  }
}
