import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Routing } from '../../Model/Routing';

@Injectable({
  providedIn: 'root',
})
export class RoutingService {
  private apiUrl = 'http://localhost:5118/api/routing';

  constructor(private http: HttpClient) {}

  getAllRoutings(): Observable<Routing[]> {
    return this.http.get<Routing[]>(this.apiUrl);
  }

  getRoutingById(id: number): Observable<Routing> {
    return this.http.get<Routing>(`${this.apiUrl}/${id}`);
  }

  createRouting(dto: Routing): Observable<any> {
    return this.http.post(this.apiUrl, dto, { responseType: 'text' });
  }

  updateRouting(id: number, dto: Routing): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, dto, { responseType: 'text' });
  }
  

  addWorkCenterToRouting(routingId: number, workCenterId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${routingId}/workcenter/${workCenterId}`, {});
  }

  removeWorkCenterFromRouting(routingId: number, workCenterId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${routingId}/workcenter/${workCenterId}`);
  }
}