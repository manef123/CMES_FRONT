import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bom } from '../../Model/Bom';

@Injectable({
  providedIn: 'root'
})
export class BOMService {
  private apiUrl = 'http://localhost:5118/api/bom';  
  
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

  // Récupérer tous les BOMs
  getAllBOMs(): Observable<Bom[]> {
    return this.http.get<Bom[]>(`${this.apiUrl}`);
  }

  // Récupérer un BOM par ID
  getBOMById(id: number): Observable<Bom> {
    return this.http.get<Bom>(`${this.apiUrl}/${id}`);
  }

  // Créer un BOM
  createBOM(bom: Bom): Observable<Bom> {
    return this.http.post<Bom>(`${this.apiUrl}`, bom , this.httpOptions);
  }

  // Mettre à jour un BOM
  updateBOM(id: number, bom: Bom): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, bom, this.httpOptions);
  }
  
  

  // Ajouter un matériau à un BOM
  addMaterialToBOM(bomId: number, materialId: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${bomId}/materials/${materialId}`, {});
  }

  // Supprimer un matériau d'un BOM
  removeMaterialFromBOM(bomId: number, materialId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${bomId}/materials/${materialId}`);
  }
}
