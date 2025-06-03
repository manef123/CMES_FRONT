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
  private baseUrl = 'http://localhost:5118/api/Material';

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

  private handleError(error: unknown) {
  let errorMessage = 'An error occurred';
  
  // Vérifier que l'erreur est bien un HttpErrorResponse
  if (error instanceof HttpErrorResponse) {
    // Vérifier que ErrorEvent est défini ET que error.error est une instance de ErrorEvent
    if (typeof ErrorEvent !== 'undefined' && error.error instanceof ErrorEvent) {
      // Erreur côté client ou réseau
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Erreur côté serveur
      let details = '';
      if (error.error && typeof error.error === 'object') {
        if (error.error.errors) {
          details = JSON.stringify(error.error.errors);
        } else if (error.status === 400 && error.error.title === 'One or more validation errors occurred.') {
          details = JSON.stringify(error.error.errors);
        } else {
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
  } else if (error && typeof error === 'object' && 'message' in error) {
    // Gestion des erreurs génériques avec un message
    errorMessage = (error as any).message;
  }

  console.error(errorMessage);
  return throwError(() => new Error(errorMessage));
}
}
