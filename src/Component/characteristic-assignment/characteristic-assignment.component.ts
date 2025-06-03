import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CharacteristicAssignment } from '../../Model/CharacteristicAssignment';
import { Material } from '../../Model/Material';
import { Characteristic } from '../../Model/Characteristic';
import { CharacteristicAssignmentService } from '../../app/services/characteristic-assignment.service';
import { MaterialService } from '../../app/services/material.service';
import { CharacteristicService } from '../../app/services/characteristic.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-characteristic-assignment',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './characteristic-assignment.component.html',
  styleUrls: ['./characteristic-assignment.component.css']
})
export class CharacteristicAssignmentComponent implements OnInit {
  assignments: CharacteristicAssignment[] = [];
  materials: Material[] = [];
  characteristics: Characteristic[] = [];
  selectedAssignment: CharacteristicAssignment | null = null;
  isEditMode = false;
  assignmentForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private assignmentService: CharacteristicAssignmentService,
    private materialService: MaterialService,
    private characteristicService: CharacteristicService
  ) {
    this.assignmentForm = this.fb.group({
      id: [0],
      materialId: ['', Validators.required],
      characteristicId: ['', Validators.required],
      valueRange: [''],
      defaultValue: [''],
      unitOfMeasure: [''],
      isRequired: [false]
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.assignmentService.getAllAssignments().subscribe(assignments => {
      this.assignments = assignments;
    });

    this.materialService.getAll().subscribe(materials => {
      this.materials = materials;
    });

    this.characteristicService.getAll().subscribe(characteristics => {
      this.characteristics = characteristics;
    });
  }

  initNewAssignment(): void {
    this.selectedAssignment = new CharacteristicAssignment();
    this.isEditMode = false;
    this.assignmentForm.reset({
      id: 0,
      isRequired: false
    });
  }

  editAssignment(assignment: CharacteristicAssignment): void {
    this.selectedAssignment = assignment;
    this.isEditMode = true;
    this.assignmentForm.patchValue(assignment);
  }

  submitForm(): void {
  if (this.assignmentForm.invalid) return;

  const formData = this.assignmentForm.value;

  const assignment: CharacteristicAssignment = {
    id: formData.id,
    materialId: formData.materialId,
    characteristicId: formData.characteristicId,
    valueRange: formData.valueRange,
    defaultValue: formData.defaultValue,
    unitOfMeasure: formData.unitOfMeasure,
    isRequired: formData.isRequired,
    material: {
  id: formData.materialId
} as Material,

characteristic: {
  id: formData.characteristicId
} as Characteristic

  };

  if (this.isEditMode) {
    this.assignmentService.updateAssignment(assignment.id, assignment).subscribe({
      next: () => {
        this.loadData();
        this.cancelForm();
      },
      error: (err) => console.error('Error updating assignment', err)
    });
  } else {
    this.assignmentService.createAssignment(assignment).subscribe({
      next: () => {
        this.loadData();
        this.cancelForm();
      },
      error: (err) => console.error('Error creating assignment', err)
    });
  }
}


  deleteAssignment(id: number): void {
    if (confirm('Are you sure you want to delete this assignment?')) {
      this.assignmentService.deleteAssignment(id).subscribe({
        next: () => this.loadData(),
        error: (err) => console.error('Error deleting assignment', err)
      });
    }
  }

  cancelForm(): void {
    this.selectedAssignment = null;
    this.assignmentForm.reset({
      id: 0,
      isRequired: false
    });
  }

  getMaterialName(materialId: number): string {
    const material = this.materials.find(m => m.id === materialId);
    return material ? material.materialNumber : 'N/A';
  }

  getCharacteristicName(characteristicId: number): string {
    const characteristic = this.characteristics.find(c => c.id === characteristicId);
    return characteristic ? characteristic.characteristicName : 'N/A';
  }
}