import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseUrl = 'http://localhost:8080/api/product_category';

  constructor(private http: HttpClient) { }

  getCategories(): Observable<ProductCategory[]> {
    return this.http.get<GetResponseProductCategory>(this.baseUrl).pipe(
      map(response => response._embedded.productCategory)
    )
  }

  addCategory(payload: ProductCategory) {
    return this.http.post<ProductCategory>(this.baseUrl, payload);
  }
}

interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  }
}
