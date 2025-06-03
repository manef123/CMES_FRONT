import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CharacteristicAssignment } from '../../Model/CharacteristicAssignment';

@Injectable({
  providedIn: 'root'
})
export class CharacteristicAssignmentService {
  private apiUrl = 'http://localhost:5118/api/CharacteristicAssignment';

  constructor(private http: HttpClient) { }

  getAllAssignments(): Observable<CharacteristicAssignment[]> {
    return this.http.get<CharacteristicAssignment[]>(this.apiUrl);
  }

  getAssignmentById(id: number): Observable<CharacteristicAssignment> {
    return this.http.get<CharacteristicAssignment>(`${this.apiUrl}/${id}`);
  }

  createAssignment(assignment: CharacteristicAssignment): Observable<CharacteristicAssignment> {
  return this.http.post<CharacteristicAssignment>(
    this.apiUrl,
    assignment,
    { withCredentials: true }
  );
}

  updateAssignment(id: number, assignment: CharacteristicAssignment): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, assignment);
  }

  deleteAssignment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}