import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Characteristic } from '../../Model/characteristic';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CharacteristicService {
  private apiUrl = 'http://localhost:5117/api/Characteristics';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Characteristic[]> {
    return this.http.get<Characteristic[]>(this.apiUrl);
  }

  getById(id: number): Observable<Characteristic> {
    return this.http.get<Characteristic>(`${this.apiUrl}/${id}`);
  }

  create(characteristic: Partial<Characteristic>): Observable<any> {
    return this.http.post(this.apiUrl, characteristic, { responseType: 'text' });
  }
  

  update(id: number, characteristic: Partial<Characteristic>): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, characteristic, { responseType: 'text' });
  }
  
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' });
  }
}
