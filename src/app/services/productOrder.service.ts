import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductOrder } from '../../Model/ProductOrder';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductOrderService {
  private baseUrl = 'http://localhost:5118/api/ProductOrders';

  constructor(private http: HttpClient) {}

    getAll(): Observable<ProductOrder[]> {
    return this.http.get<ProductOrder[]>(this.baseUrl);
  }

  getById(id: number): Observable<ProductOrder> {
    return this.http.get<ProductOrder>(`${this.baseUrl}/${id}`);
  }

  create(order: Partial<ProductOrder>): Observable<ProductOrder> {
    return this.http.post<ProductOrder>(this.baseUrl, order);
  }
}
