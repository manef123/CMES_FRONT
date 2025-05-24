import { Component, OnInit } from '@angular/core';
import { ClassificationService } from '../../app/services/classification.service';
import { Classification } from '../../Model/Classification';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-classification',
  standalone: true,
  imports: [
    CommonModule,         
    ReactiveFormsModule,  
  ],
  templateUrl: './classification.component.html',
  styleUrls: ['./classification.component.css']
})
export class ClassificationComponent implements OnInit {
  classifications: Classification[] = [];
  selectedClassification: Classification | null = null;
  form: FormGroup;
  isEditMode = false;
  activeTab: number = 0;  // Gérer les onglets

  constructor(
    private classificationService: ClassificationService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      id: [],
      classNumber: [''],
      className: [''],
      classDescription: [''],
      classGroup: [''],
      classHierarchy: [''],
      classUsage: [''],
      classAuthorizationGroup: [''],
      classKeyDate: [''],
      validityStartDate: [''],
      validityEndDate: [''],
      isInherited: [false] 
    });
  }

  ngOnInit(): void {
    this.loadClassifications();
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

  onEdit(classification: Classification) {
    this.isEditMode = true;
    this.selectedClassification = classification;
    this.form.patchValue(classification);
  }

  onDelete(id: number) {
    if (confirm('Are you sure you want to delete this classification?')) {
      this.classificationService.delete(id).subscribe(
        () => {
          this.loadClassifications();
        },
        error => {
          console.error('Error deleting classification:', error);
        }
      );
    }
  }

  onSubmit() {
    const formValue = this.form.value;
  
    // Vérification si les champs obligatoires sont remplis
    if (!formValue.className || !formValue.classDescription) {
      console.log("Les champs requis sont manquants");
      return;
    }
  
    // Vérification des dates
    if (!formValue.validityStartDate || !formValue.validityEndDate) {
      console.log("Les dates sont manquantes");
      return;
    }
  
    // Nettoyage des champs vides
    Object.keys(formValue).forEach(key => {
      if (formValue[key] === null || formValue[key] === '') {
        delete formValue[key];
      }
    });
  
    console.log("Submitting form:", formValue);
  
    // Si le mode édition est activé et qu'un ID existe
    if (this.isEditMode && formValue.id) {
      this.classificationService.update(formValue.id, formValue).subscribe(() => {
        this.resetForm();
        this.loadClassifications();
      }, error => {
        console.error("Erreur lors de la mise à jour:", error);
      });
    } else {
      this.classificationService.create(formValue).subscribe(() => {
        console.log("Création réussie");
        this.resetForm();
        this.loadClassifications();
      }, error => {
        console.error("Erreur lors de la création:", error);
      });
    }
  }
  
  


  resetForm() {
    this.form.reset();
    this.isEditMode = false;
    this.selectedClassification = null;
  }

  initNewClassification() {
    this.resetForm();
  }
}
