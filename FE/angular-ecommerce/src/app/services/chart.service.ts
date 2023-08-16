import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Chart } from '../common/chart';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  private baseUrl = "http://localhost:8080/api/orders";

  constructor(private http: HttpClient) { }

  get() {
    return this.http.get<Chart>(this.baseUrl);
  }
}
