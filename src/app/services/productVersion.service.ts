import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductVersion } from '../../Model/ProductVersion';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductVersionService {

  private apiUrl = 'http://localhost:5118/api/ProductionVersion';

  constructor(private http: HttpClient) { }

  // Récupérer toutes les production versions
  getAll(): Observable<ProductVersion[]> {
    return this.http.get<ProductVersion[]>(this.apiUrl);
  }

  // Récupérer une production version par ID
  getById(id: number): Observable<ProductVersion> {
    return this.http.get<ProductVersion>(`${this.apiUrl}/${id}`);
  }

  // Créer une nouvelle production version
  create(productVersion: ProductVersion): Observable<any> {
  return this.http.post(this.apiUrl, productVersion, { responseType: 'text' });
}


  // Mettre à jour une production version existante
 update(id: number, productVersion: ProductVersion): Observable<any> {
  return this.http.put(`${this.apiUrl}/${id}`, productVersion, { responseType: 'text' });
}


 // ✅ Ajouter un routing à une production version
addRouting(productionVersionId: number, routingId: number): Observable<any> {
  return this.http.post(`${this.apiUrl}/${productionVersionId}/addrouting/${routingId}`, {}, {
    responseType: 'text'
  });
}

// ✅ Supprimer le routing d’une production version
removeRouting(productionVersionId: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}/${productionVersionId}/removerouting`, {
    responseType: 'text'
  });
}

// ✅ Ajouter un BOM à une production version
addBOM(productionVersionId: number, bomId: number): Observable<any> {
  return this.http.post(`${this.apiUrl}/${productionVersionId}/addbom/${bomId}`, {}, {
    responseType: 'text'
  });
}

// ✅ Supprimer le BOM d’une production version
removeBOM(productionVersionId: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}/${productionVersionId}/removebom`, {
    responseType: 'text'
  });
}
}
