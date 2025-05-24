import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Bom } from '../../../Model/Bom';
import { ProductionVersionStatus } from '../../../Model/ProductionVersionStatus';
import { BOMService } from '../../../app/services/bom.service';
import { ProductVersion } from '../../../Model/ProductVersion';
import { MaterialService } from '../../../app/services/material.service';
import { Material } from '../../../Model/Material';

@Component({
  selector: 'app-bom-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bom-list.component.html',
  styleUrls: ['./bom-list.component.css']
})
export class BOMListComponent implements OnInit {
  boms: Bom[] = [];
  selectedBOM: Bom = this.resetBOM();
  isEditing = false;
  materialIdToAdd: number = 0;
   materials: Material[] = []
  selectedTab = 0; // Ajoutez cette propriété pour gérer l'onglet sélectionné
  tabs = [
    { title: 'BOM Form' }, 
    { title: 'Onglet 1' },
    { title: 'Onglet 2' }
  ]; // Définir vos onglets dynamiques

  constructor(private bomService: BOMService , private materialService: MaterialService) {}

  ngOnInit(): void {
    this.loadBOMs();
    this.loadMaterials();
  }

  loadBOMs(): void {
    this.bomService.getAllBOMs().subscribe(data => {
      this.boms = data;
    });
  }

  loadMaterials(): void {
    this.materialService.getAll().subscribe({
      next: (data) => this.materials = data,
      error: (err) => console.error('Error loading materials', err)
    });
  }

  saveBOM(): void {
    if (this.isEditing) {
      
      this.bomService.updateBOM(this.selectedBOM.id, this.selectedBOM).subscribe(() => {
        this.loadBOMs();
        this.resetForm();
      });
    } else {
      
      this.bomService.createBOM(this.selectedBOM ).subscribe(() => {
        this.loadBOMs();
        this.resetForm();
      });
    }
  }

  editBOM(bom: Bom): void {
    this.selectedBOM = JSON.parse(JSON.stringify(bom));
    this.isEditing = true;
  }

  deleteMaterial(bomId: number, materialId: number): void {
    this.bomService.removeMaterialFromBOM(bomId, materialId).subscribe(() => {
      this.loadBOMs();
    });
  }

  addMaterial(): void {
    if (this.materialIdToAdd && this.selectedBOM.id) {
      this.bomService.addMaterialToBOM(this.selectedBOM.id, this.materialIdToAdd).subscribe(() => {
        this.loadBOMs();
        this.materialIdToAdd = 0;
      });
    }
  }

  resetForm(): void {
    this.selectedBOM = this.resetBOM();
    this.isEditing = false;
    this.materialIdToAdd = 0;
  }

  resetBOM(): Bom {
    return {
      id: 0,
      bomNumber: '',
      alternativeBomNumber: '',
      bomStatus: 'ACTIVE',
      validityStartDate: new Date(),
      validityEndDate: new Date(),
      baseQuantity: '',
      unitOfMeasure: '',
      bomDescription: '',
      principalMaterialId: 0,
      productVersion: [],
      principalMaterial: undefined,
      materials: [],
      routing: {
        id: 0,
        routingNumber: '',
        materialNumber: '',
        routingStatus: ProductionVersionStatus.ACTIVE,
        validityStartDate: new Date(),
        validityEndDate: new Date(),
        baseQuantity: 0,
        unitOfMeasure: '',
        description: '',
        productVersion: {} as ProductVersion 

      },
      alternativeBOMs: []
    };
  }

  selectTab(index: number): void {
    this.selectedTab = index; // Fonction pour changer l'onglet sélectionné
  }

  addNewBOM(): void {
    this.resetForm();
    this.selectedTab = 0; // Sélectionner l'onglet de création pour un nouveau BOM
  }

  cancelEdit(): void {
    this.resetForm();
    this.selectedTab = 0; // Retour à l'onglet de création après annulation
  }
}
