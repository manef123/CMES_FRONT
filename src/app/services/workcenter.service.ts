import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WorkCenter } from '../../Model/WorkCenter';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WorkCenterService {
  private baseUrl = 'http://localhost:5118/api/WorkCenter'; 

  constructor(private http: HttpClient) {}

  getAll(): Observable<WorkCenter[]> {
    return this.http.get<WorkCenter[]>(this.baseUrl);
  }

  getById(id: number): Observable<WorkCenter> {
    return this.http.get<WorkCenter>(`${this.baseUrl}/${id}`);
  }

  create(workCenter: Omit<WorkCenter, 'id'>): Observable<any> {
    return this.http.post(this.baseUrl, workCenter);
  }

  update(workCenter: WorkCenter): Observable<any> {
    return this.http.put(`${this.baseUrl}/${workCenter.id}`, workCenter);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
