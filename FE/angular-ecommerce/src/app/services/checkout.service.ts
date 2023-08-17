import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Purchase } from '../common/purchase';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private purchaseUrl = 'http://localhost:8080/api/checkout/purchase';

  currentUser: any;
  headers: HttpHeaders;

  constructor(private httpClient: HttpClient, private storageService: StorageService) {
    this.currentUser = this.storageService.getUser();
    console.log(this.currentUser.accessToken);
    this.headers = new HttpHeaders().set('Authorization', `Bearer ${this.currentUser.accessToken}`)
    .set('Content-Type', 'application/json; charset=utf-8');;
  }

  placeOrder(purchase: Purchase): Observable<any> {
    return this.httpClient.post<Purchase>(this.purchaseUrl, JSON.stringify(purchase), { headers: this.headers });
  }
}
