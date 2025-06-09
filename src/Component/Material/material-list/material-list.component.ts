import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialService } from '../../../app/services/material.service';
import { Material } from '../../../Model/Material';
import { MaterialType } from '../../../Model/MaterialType';
import { ClassificationService } from '../../../app/services/classification.service';
import { Classification } from '../../../Model/Classification';
import { ControlModelType } from '../../../Model/enums';

@Component({
  selector: 'app-material-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './material-list.component.html',
  styleUrls: ['./material-list.component.css']
})
export class MaterialListComponent implements OnInit {
  materials: Material[] = [];
  selectedMaterial: Material | null = null;
  isEditMode = false;
  activeTab = 0;
  classifications: Classification[] = [];
  selectedClassificationId: number | null = null;

  materialTypeOptions = [
    { value: MaterialType.ROH, label: 'ROH' },
    { value: MaterialType.Halb, label: 'HALB' },
    { value: MaterialType.FERT, label: 'FERT' }
  ];

  constructor(
    private materialService: MaterialService,
    private classificationService: ClassificationService
  ) {}

  ngOnInit(): void {
    this.loadMaterials();
    this.loadClassifications();
  }

  loadMaterials(): void {
    this.materialService.getAll().subscribe({
      next: (data) => this.materials = data,
      error: (err) => console.error('Erreur lors du chargement des matériaux :', err)
    });
  }

  loadClassifications(): void {
    this.classificationService.getAll().subscribe({
      next: (data) => this.classifications = data,
      error: (err) => console.error('Erreur lors du chargement des classifications :', err)
    });
  }

  initNewMaterial(): void {
    this.selectedMaterial = {
      id: 0,
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
      classifications: [],
      controlModels: [],
      principalControlModelId: 0,
      principalControlModel: {
        id: 5,
        description: 'Control A',
        modelType: ControlModelType.PAC,
        name: '',
        isPrincipal: false,
        materials: [],
        characteristics: [],
        events: []
      },
      characteristicAssignments: []
    };
    this.isEditMode = false;
    this.activeTab = 0;
  }

  selectMaterial(material: Material): void {
    if (!material.id) {
      console.error('Material ID is required to select a material.');
      return;
    }
    this.materialService.getById(material.id).subscribe({
      next: (data) => {
        this.selectedMaterial = { ...data };
        this.isEditMode = true;
        this.activeTab = 0;
      },
      error: (err) => console.error('Erreur lors du chargement du matériau :', err)
    });
  }

  private toPascalCase(obj: any): any {
    if (!obj || typeof obj !== 'object') return obj;

    const result: any = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const pascalKey = key.charAt(0).toUpperCase() + key.slice(1);
        result[pascalKey] = obj[key];
      }
    }
    return result;
  }

  addClassificationToMaterial(): void {
    if (!this.selectedMaterial || this.selectedClassificationId === null) return;

   const selectedId = Number(this.selectedClassificationId);
   const selectedClassification = this.classifications.find(c => c.id === selectedId);


    if (!selectedClassification) {
      console.error('Classification sélectionnée introuvable.');
      return;
    }

    if (this.selectedMaterial.classifications?.some(c => c.id === selectedId)) {
      console.warn('Classification déjà ajoutée.');
      return;
    }

    this.materialService.addClassificationToMaterial(this.selectedMaterial.id!, selectedId).subscribe({
      next: () => {
        const material = this.selectedMaterial!;
        if (!material.classifications) {
          material.classifications = [];
        }
        material.classifications.push(selectedClassification);
        this.selectedClassificationId = null;
        console.log('Classification ajoutée avec succès');
        this.loadMaterials();
      },
      error: (err: any) => {
        console.error('Erreur lors de l\'ajout de classification:', err);
      }
    });
  }



  saveMaterial(): void {
    if (!this.selectedMaterial) {
      console.error('Aucun matériau sélectionné pour la sauvegarde.');
      return;
    }

    // Préparation des données à envoyer
    const materialToSend = { ...this.selectedMaterial } as any;

    // Conversion du materialType en valeur numérique si nécessaire
    if (typeof materialToSend.materialType === 'string') {
      const option = this.materialTypeOptions.find(opt => opt.label === materialToSend.materialType);
      materialToSend.materialType = option ? option.value : MaterialType.ROH;
    } else if (materialToSend.materialType == null) {
      materialToSend.materialType = MaterialType.ROH;
    }

    // Si création, supprimer l'id
    if (!this.isEditMode) {
      delete materialToSend.id;
    }

    // Convertir les clés en PascalCase pour correspondre à l'API backend
    const materialDataPascalCase = this.toPascalCase(materialToSend);

    if (this.isEditMode && this.selectedMaterial.id) {
      this.materialService.update(this.selectedMaterial.id, materialDataPascalCase).subscribe({
        next: () => {
          this.loadMaterials();
          this.selectedMaterial = null;
        },
        error: (error) => console.error('Erreur lors de la mise à jour du matériau :', error)
      });
    } else {
      this.materialService.create(materialDataPascalCase).subscribe({
        next: () => {
          this.loadMaterials();
          this.selectedMaterial = null;
        },
        error: (error) => console.error('Erreur lors de la création du matériau :', error)
      });
    }
  }

  confirmDelete(id: number, event: MouseEvent): void {
    event.stopPropagation();
    if (confirm('Voulez-vous vraiment supprimer ce matériau ?')) {
      this.materialService.delete(id).subscribe({
        next: () => {
          this.loadMaterials();
          if (this.selectedMaterial?.id === id) {
            this.selectedMaterial = null;
          }
        },
        error: (err) => console.error('Erreur lors de la suppression du matériau :', err)
      });
    }
  }
}
