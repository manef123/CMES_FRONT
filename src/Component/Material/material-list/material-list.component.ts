import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importer FormsModule pour ngModel
import { MaterialService } from '../../../app/services/material.service';
import { Material } from '../../../Model/Material';
import { MaterialType } from '../../../Model/MaterialType';
import { ClassificationService } from '../../../app/services/classification.service';
import { Classification } from '../../../Model/Classification';

@Component({
  selector: 'app-material-list',
  standalone: true,
  imports: [CommonModule, FormsModule], // Utiliser FormsModule au lieu de ReactiveFormsModule
  templateUrl: './material-list.component.html',
  styleUrls: ['./material-list.component.css']
})
export class MaterialListComponent implements OnInit {
  materials: Material[] = [];
  selectedMaterial: Material | null = null;
  isEditMode = false;
  activeTab = 0;
    classifications: Classification[] = [];
  

  // Options pour le type de matériau avec valeurs numériques
  materialTypeOptions = [
    { value: 0, label: 'ROH' },
    { value: 1, label: 'HALB' },
    { value: 2, label: 'FERT' }
  ];

  // Garder materialTypes pour la compatibilité avec le template si besoin
  materialTypes = Object.values(MaterialType);

  constructor(private materialService: MaterialService, private classificationService: ClassificationService) {}

  ngOnInit(): void {
    this.loadMaterials();
    this.loadClassifications();
  }

  loadMaterials(): void {
    this.materialService.getAll().subscribe({
      next: (data) => this.materials = data,
      error: (err) => console.error('Error loading materials', err)
    });
  }

  loadClassifications() {
    this.classificationService.getAll().subscribe(
      data => {
        this.classifications = data;
      },
      error => {
        console.error('Error loading classifications:', error);
      }
    );
  }

  initNewMaterial(): void {
    this.selectedMaterial = {
      materialNumber: '',
      materialType: MaterialType.ROH,
      description: '',
      baseUnitOfMeasure: '',
      materialGroup: '',
      division: '',
      batchManagement: false,
      serialNumberManagement: false,
      taxClassification: '',
      industrySector: '',
      oldMaterialNumber: '',
      materialHierarchy: '',
      materialStatus: '',
      procurementType: '',
      mrpType: '',
      mrpController: '',
      lotSize: '',
      purchasingGroup: '',
      purchasingValueKey: '',
      accountAssignmentGroup: '',
      valuationClass: '',
      standardPrice: 0,
      movingAveragePrice: 0,
      taxData: '',
      classificationData: '',
      classifications: []
    };
    this.isEditMode = false;
    this.activeTab = 0;
  }

  selectMaterial(material: Material): void {
    this.materialService.getById(material.id!).subscribe({
      next: (data) => {
        // Créer une copie pour éviter de modifier directement la liste
        this.selectedMaterial = { ...data }; 
        this.isEditMode = true;
        this.activeTab = 0;
      },
      error: (err) => console.error('Error loading material', err)
    });
  }

  // Fonction utilitaire pour convertir camelCase en PascalCase
  toPascalCase(obj: any): any {
    if (obj === null || obj === undefined || typeof obj !== 'object') {
      return obj;
    }
    
    const result: any = {};
    
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        // Convertir la première lettre en majuscule
        const pascalKey = key.charAt(0).toUpperCase() + key.slice(1);
        result[pascalKey] = obj[key];
      }
    }
    
    return result;
  }

  saveMaterial(): void {
    if (this.selectedMaterial) {
      // Préparer les données à envoyer
      const materialToSend = { ...this.selectedMaterial } as any;

      // Assurer que materialType est numérique pour l'envoi
      if (typeof materialToSend.materialType === 'string') {
        const option = this.materialTypeOptions.find(opt => opt.label === materialToSend.materialType);
        materialToSend.materialType = option ? option.value : 0; // Défaut à 0 (ROH)
      } else if (materialToSend.materialType === undefined || materialToSend.materialType === null) {
        materialToSend.materialType = 0; // Assurer une valeur numérique par défaut
      }
      
      // Supprimer l'ID pour la création
      if (!this.isEditMode) {
        delete materialToSend.id;
      }
      // Supprimer les classifications si le backend ne les attend pas dans le DTO
      delete materialToSend.classifications;

      // IMPORTANT: Convertir les clés de camelCase en PascalCase pour le backend
      const materialDataPascalCase = this.toPascalCase(materialToSend);

      console.log('--- Données avant transformation ---');
      console.log(materialToSend);
      console.log('--- Données après transformation en PascalCase ---');
      console.log(materialDataPascalCase);

      if (this.isEditMode && this.selectedMaterial.id) {
        // Utiliser le service qui enveloppe dans { dto: ... }
        this.materialService.update(this.selectedMaterial.id, materialDataPascalCase).subscribe({
          next: () => {
            this.loadMaterials();
            this.selectedMaterial = null;
          },
          error: (error) => {
            console.error('Erreur lors de la mise à jour du matériau:', error);
          }
        });
      } else {
        // Utiliser le service qui enveloppe dans { dto: ... }
        this.materialService.create(materialDataPascalCase).subscribe({
          next: () => {
            this.loadMaterials();
            this.selectedMaterial = null;
          },
          error: (error) => {
            console.error('Erreur lors de la création du matériau:', error);
          }
        });
      }
    } else {
      console.error('Aucun matériau sélectionné pour la sauvegarde.');
    }
  }

  confirmDelete(id: number, event: MouseEvent): void {
    event.stopPropagation();
    if (confirm('Are you sure you want to delete this material?')) {
      this.materialService.delete(id).subscribe({
        next: () => {
          this.loadMaterials();
          if (this.selectedMaterial?.id === id) {
            this.selectedMaterial = null;
          }
        },
        error: (err) => console.error('Error deleting material', err)
      });
    }
  }
}
