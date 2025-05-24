import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Material } from '../../Model/Material';

// Interface pour l'enveloppe DTO utilisée par le backend
interface MaterialDtoWrapper {
  dto: Material; // Ou CreateMaterialDto si le type est différent pour la création/mise à jour
}

@Injectable({
  providedIn: 'root'
})
export class MaterialService {
  private baseUrl = 'http://localhost:5117/api/Material';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Material[]> {
    return this.http.get<Material[]>(this.baseUrl).pipe(
      catchError(this.handleError)
    );
  }

  getById(id: number): Observable<Material> {
    return this.http.get<Material>(`${this.baseUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  create(material: Material): Observable<void> {
    return this.http.post<void>(this.baseUrl, material);
  }
  
  
  update(id: number, material: Material): Observable<any> { 
    // Création de l'enveloppe DTO pour le backend, comme l'exige l'erreur
    return this.http.put<void>(`${this.baseUrl}/${id}`, material);
  }
  
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      let details = '';
      if (error.error && typeof error.error === 'object') {
        if (error.error.errors) {
          details = JSON.stringify(error.error.errors);
        } else if (error.status === 400 && error.error.title === 'One or more validation errors occurred.') {
           details = JSON.stringify(error.error.errors);
        } else {
           // Tentative de capture spécifique des erreurs vues
           if (error.error.dto || error.error['$.materialType']) {
             details = JSON.stringify(error.error);
           } else {
             details = JSON.stringify(error.error); 
           }
        }
      } else if (error.message) {
        details = error.message;
      }
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.statusText || 'Http failure response'}${details ? '\nDetails: ' + details : ''}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
