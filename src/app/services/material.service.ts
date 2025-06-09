import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Material } from '../../Model/Material';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {
  private baseUrl = 'http://localhost:5118/api/Material';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Material[]> {
    return this.http.get<Material[]>(this.baseUrl)
      .pipe(catchError(this.handleError));
  }

  getById(id: number): Observable<Material> {
    return this.http.get<Material>(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  create(material: Material): Observable<void> {
    return this.http.post<void>(this.baseUrl, material)
      .pipe(catchError(this.handleError));
  }

  update(id: number, material: Material): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, material)
      .pipe(catchError(this.handleError));
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  
 addClassificationToMaterial(materialId: number, classificationId: number): Observable<any> {
  return this.http.post(`${this.baseUrl}/${materialId}/classify?classNumber=${classificationId}`, {});
}




  private handleError(error: unknown) {
    let errorMessage = 'Une erreur inconnue est survenue';

    if (error instanceof HttpErrorResponse) {
      if (typeof ErrorEvent !== 'undefined' && error.error instanceof ErrorEvent) {
        errorMessage = `Erreur réseau : ${error.error.message}`;
      } else {
        let details = '';
        if (error.error && typeof error.error === 'object') {
          if (error.error.errors) {
            details = JSON.stringify(error.error.errors);
          } else {
            details = JSON.stringify(error.error);
          }
        } else if (error.message) {
          details = error.message;
        }
        errorMessage = `Code: ${error.status}\nMessage: ${error.statusText || 'Inconnu'}${details ? '\nDétails: ' + details : ''}`;
      }
    } else if (error && typeof error === 'object' && 'message' in error) {
      errorMessage = (error as any).message;
    }

    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
