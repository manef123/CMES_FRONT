import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ControlModel } from '../../Model/ControlModel';
import { Material } from '../../Model/Material';
import { Characteristic } from '../../Model/Characteristic';

@Injectable({
  providedIn: 'root'
})
export class ControlModelService {

  private apiUrl = 'http://localhost:5118/api/ControlModels'; // à adapter

  constructor(private http: HttpClient) {}

  // Obtenir tous les modèles de contrôle
  getAll(): Observable<ControlModel[]> {
    return this.http.get<ControlModel[]>(`${this.apiUrl}`);
  }

  // Obtenir un modèle par ID
  getById(id: number): Observable<ControlModel> {
    return this.http.get<ControlModel>(`${this.apiUrl}/${id}`);
  }

  // Créer un modèle de contrôle simple
  create(model: Partial<ControlModel>): Observable<any> {
    return this.http.post(`${this.apiUrl}`, model);
  }

  // Créer un modèle avec des matériaux
  createWithMaterials(dto: { description: string; isPrincipal: boolean; modelType: number; materialIds: number[] }): Observable<any> {
    return this.http.post(`${this.apiUrl}/with-materials`, dto);
  }

  // Mettre à jour un modèle
  update(id: number, model: Partial<ControlModel>): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, model);
  }

  // Supprimer un modèle
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Ajouter une caractéristique
  addCharacteristic(controlModelId: number, characteristicId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${controlModelId}/add-characteristic/${characteristicId}`, {});
  }

  // Retirer une caractéristique
  removeCharacteristic(controlModelId: number, characteristicId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${controlModelId}/remove-characteristic/${characteristicId}`, {});
  }

  // Ajouter un matériau
  addMaterial(controlModelId: number, materialId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${controlModelId}/add-material/${materialId}`, {});
  }

  // Retirer un matériau
  removeMaterial(controlModelId: number, materialId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${controlModelId}/remove-material/${materialId}`, {});
  }

  // Récupérer les matériaux associés à un ControlModel
  getMaterials(controlModelId: number): Observable<Material[]> {
    return this.http.get<Material[]>(`${this.apiUrl}/${controlModelId}/materials`);
  }

  // Récupérer les matériaux par caractéristique
  getMaterialsByCharacteristic(characteristicId: number): Observable<Material[]> {
    return this.http.get<Material[]>(`${this.apiUrl}/materials/by-characteristic/${characteristicId}`);
  }
}
