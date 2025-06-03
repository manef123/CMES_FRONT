import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from '../../Model/Event';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'http://localhost:5118/api/events';

  constructor(private http: HttpClient) {}

  getAllEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.apiUrl);
  }

  getEventById(id: number): Observable<Event> {
    return this.http.get<Event>(`${this.apiUrl}/${id}`);
  }

  createEvent(event: Event): Observable<Event> {
    return this.http.post<Event>(this.apiUrl, event);
  }

  updateEvent(event: Event, id: number): Observable<Event> {
    return this.http.put<Event>(`${this.apiUrl}/${id}`, event);
  }

  deleteEvent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  addCharacteristicToEvent(eventId: number, characteristicId: number): Observable<Event> {
    return this.http.post<Event>(
      `${this.apiUrl}/${eventId}/add-characteristic/${characteristicId}`, 
      {}
    );
  }

  removeCharacteristicFromEvent(eventId: number, characteristicId: number): Observable<Event> {
    return this.http.delete<Event>(
      `${this.apiUrl}/${eventId}/remove-characteristic/${characteristicId}`
    );
  }
}
