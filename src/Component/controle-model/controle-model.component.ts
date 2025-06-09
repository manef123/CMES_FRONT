import { Component, OnInit } from '@angular/core';
import { ControlModelService } from '../../app/services/controle-model.service';
import { MaterialService } from '../../app/services/material.service';
import { CharacteristicService } from '../../app/services/characteristic.service';
import { ControlModel } from '../../Model/ControlModel';
import { Material } from '../../Model/Material';
import { Characteristic } from '../../Model/Characteristic';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ControlModelType } from '../../Model/enums';

@Component({
  selector: 'app-controle-model',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './controle-model.component.html',
  styleUrls: ['./controle-model.component.css'],
})
export class ControleModelComponent implements OnInit {
  controlModels: ControlModel[] = [];
  selectedControlModel: ControlModel | null = null;
  availableMaterials: Material[] = [];
  availableCharacteristics: Characteristic[] = [];
  filteredMaterials: Material[] = [];
  
  // Form related
  controlModelForm: FormGroup;
  isEditMode = false;
  activeTab = 0;
  
  // Selection dropdowns
  selectedMaterialId: number | null = null;
  selectedCharacteristicId: number | null = null;
  filterCharacteristicId: number | null = null;
  
  // ControlModel types for dropdown
  controlModelTypes = [
    { value: ControlModelType.PAC, label: 'PAC' },
    { value: ControlModelType.TPV, label: 'TPV' }
  ];

  constructor(
    private controlModelService: ControlModelService,
    private materialService: MaterialService,
    private characteristicService: CharacteristicService,
    private fb: FormBuilder
  ) {
    this.controlModelForm = this.fb.group({
      id: [null],
      modelType: ['', Validators.required],
      description: ['', Validators.required],
      name: ['', Validators.required],
      isPrincipal: [false]
    });
  }

  ngOnInit(): void {
    this.loadControlModels();
    this.loadAvailableMaterials();
    this.loadAvailableCharacteristics();
  }

  loadControlModels(): void {
    this.controlModelService.getAll().subscribe({
      next: (data) => {
        this.controlModels = data;
      },
      error: (error) => {
        console.error('Failed to load control models', error);
      }
    });
  }

  loadAvailableMaterials(): void {
    this.materialService.getAll().subscribe({
      next: (data) => {
        this.availableMaterials = data;
      },
      error: (error) => {
        console.error('Failed to load materials', error);
      }
    });
  }

  loadAvailableCharacteristics(): void {
    this.characteristicService.getAll().subscribe({
      next: (data) => {
        this.availableCharacteristics = data;
      },
      error: (error) => {
        console.error('Failed to load characteristics', error);
      }
    });
  }

  loadMaterialsByCharacteristic(characteristicId: number | null): void {
    if (!characteristicId) {
      this.filteredMaterials = [];
      return;
    }

    this.controlModelService.getMaterialsByCharacteristic(characteristicId).subscribe({
      next: (data) => {
        this.filteredMaterials = data;
      },
      error: (error) => {
        console.error('Failed to load materials by characteristic', error);
      }
    });
  }

  selectControlModel(id: number): void {
    this.controlModelService.getById(id).subscribe({
      next: (data) => {
        this.selectedControlModel = data;
        this.isEditMode = false;
        this.activeTab = 0;
      },
      error: (error) => {
        console.error('Failed to load control model details', error);
      }
    });
  }

  initNewControlModel(): void {
    this.selectedControlModel = null;
    this.controlModelForm.reset();
    this.isEditMode = false;
    this.activeTab = 0;
  }

  createControlModel(): void {
    if (this.controlModelForm.invalid) return;

    const model = this.controlModelForm.value;
    this.controlModelService.create(model).subscribe({
      next: (createdModel) => {
        this.controlModels.push(createdModel);
        this.selectedControlModel = createdModel;
        this.isEditMode = false;
      },
      error: (error) => {
        console.error('Failed to create control model', error);
      }
    });
  }

  updateControlModel(): void {
    if (this.controlModelForm.invalid || !this.selectedControlModel) return;

    const model = { ...this.selectedControlModel, ...this.controlModelForm.value };
    this.controlModelService.update(model.id, model).subscribe({
      next: (updatedModel) => {
        const index = this.controlModels.findIndex(m => m.id === updatedModel.id);
        if (index !== -1) {
          this.controlModels[index] = updatedModel;
        }
        this.selectedControlModel = updatedModel;
        this.isEditMode = false;
      },
      error: (error) => {
        console.error('Failed to update control model', error);
      }
    });
  }

  deleteControlModel(id: number): void {
    if (!confirm('Are you sure you want to delete this control model?')) return;

    this.controlModelService.delete(id).subscribe({
      next: () => {
        this.controlModels = this.controlModels.filter(m => m.id !== id);
        if (this.selectedControlModel?.id === id) {
          this.selectedControlModel = null;
        }
      },
      error: (error) => {
        console.error('Failed to delete control model', error);
      }
    });
  }

  addCharacteristic(): void {
    if (!this.selectedCharacteristicId || !this.selectedControlModel) return;

    this.controlModelService.addCharacteristic(
      this.selectedControlModel.id,
      this.selectedCharacteristicId
    ).subscribe({
      next: () => {
        this.selectControlModel(this.selectedControlModel!.id);
        this.selectedCharacteristicId = null;
      },
      error: (error) => {
        console.error('Failed to add characteristic', error);
      }
    });
  }

  removeCharacteristic(controlModelId: number, characteristicId: number): void {
    if (!confirm('Are you sure you want to remove this characteristic?')) return;

    this.controlModelService.removeCharacteristic(controlModelId, characteristicId).subscribe({
      next: () => {
        this.selectControlModel(controlModelId);
      },
      error: (error) => {
        console.error('Failed to remove characteristic', error);
      }
    });
  }

  addMaterial(): void {
    if (!this.selectedMaterialId || !this.selectedControlModel) return;

    this.controlModelService.addMaterial(
      this.selectedControlModel.id,
      this.selectedMaterialId
    ).subscribe({
      next: () => {
        this.selectControlModel(this.selectedControlModel!.id);
        this.selectedMaterialId = null;
      },
      error: (error) => {
        console.error('Failed to add material', error);
      }
    });
  }

  removeMaterial(controlModelId: number, materialId: number): void {
    if (!confirm('Are you sure you want to remove this material?')) return;

    this.controlModelService.removeMaterial(controlModelId, materialId).subscribe({
      next: () => {
        this.selectControlModel(controlModelId);
      },
      error: (error) => {
        console.error('Failed to remove material', error);
      }
    });
  }

  cancelEdit(): void {
    if (this.selectedControlModel) {
      this.controlModelForm.patchValue(this.selectedControlModel);
    } else {
      this.controlModelForm.reset();
    }
    this.isEditMode = false;
  }

  startEdit(): void {
    if (!this.selectedControlModel) return;
    
    this.controlModelForm.patchValue(this.selectedControlModel);
    this.isEditMode = true;
    this.activeTab = 0;
  }

  
}