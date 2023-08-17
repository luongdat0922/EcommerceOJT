import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderResponse } from '../common/order-rep';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  private baseUrl = "http://localhost:8080/api/orders";

  constructor(private http: HttpClient) { }

  getOrders(start: string, end: string): Observable<OrderResponse[]> {
    const params = new HttpParams()
      .set('startDate', start)
      .set('endDate', end);

    return this.http
      .get<any>(this.baseUrl)
      .pipe(
        map((data) =>
          data._embedded.orders.map((order: any) => ({
            id: order.id,
            orderTrackingNumber: order.orderTrackingNumber,
            totalQuantity: order.totalQuantity,
            totalPrice: order.totalPrice,
            status: order.status,
            dateCreated: order.dateCreated,
            lastUpdated: order.lastUpdated,
          } as OrderResponse))
        )
      );
  }
}
