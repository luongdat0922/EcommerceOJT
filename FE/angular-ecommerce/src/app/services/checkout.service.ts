import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Purchase } from '../common/purchase';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private purchaseUrl = 'http://localhost:8080/api/checkout/purchase';

  currentUser: any;
  headers: HttpHeaders;

  constructor(private httpClient: HttpClient) {
    this.headers = new HttpHeaders().set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtb2QiLCJpYXQiOjE2OTE0ODcwMzUsImV4cCI6MTY5MTU3MzQzNX0.bksg1G8m5880t4SJghnakb4fUsSIIEDrxWEvK9_Nj3E')
    .set('Content-Type', 'application/json; charset=utf-8');;
  }

  placeOrder(purchase: Purchase): Observable<any> {
    return this.httpClient.post<Purchase>(this.purchaseUrl, JSON.stringify(purchase), { headers: this.headers });
  }
}
