import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Classification } from '../../Model/Classification';

@Injectable({
  providedIn: 'root'
})
export class ClassificationService {
  private baseUrl = 'http://localhost:5117/api/Classification'; 

  constructor(private http: HttpClient) {}

  getAll(): Observable<Classification[]> {
    return this.http.get<Classification[]>(this.baseUrl);
  }

  getById(id: number): Observable<Classification> {
    return this.http.get<Classification>(`${this.baseUrl}/${id}`);
  }

  create(classification: Classification): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}`, classification);
  }

  update(id: number, classification: Classification): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, classification);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  assignCharacteristic(classificationId: number, characteristicNumber: string): Observable<void> {
    return this.http.post<void>(
      `${this.baseUrl}/${classificationId}/assign-characteristic`,
      { characteristicNumber }
    );
  }

  removeCharacteristic(classificationId: number, characteristicNumber: string): Observable<void> {
    return this.http.post<void>(
      `${this.baseUrl}/${classificationId}/remove-characteristic`,
      { characteristicNumber }
    );
  }
}
