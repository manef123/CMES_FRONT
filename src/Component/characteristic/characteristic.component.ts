import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Characteristic } from '../../Model/characteristic';
import { CharacteristicService } from '../../app/services/characteristic.service';
import { DataType } from '../../Model/DataType';  // Import de l'énumération DataType
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-characteristic',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './characteristic.component.html',
  styleUrls: ['./characteristic.component.css']
})
export class CharacteristicComponent implements OnInit {
  characteristics: Characteristic[] = [];
  selectedCharacteristic: Characteristic | null = null;
  form!: FormGroup;
  dataTypes = Object.values(DataType); // Ajout des valeurs de l'énumération DataType
  isEditMode = false;

  constructor(private fb: FormBuilder, private service: CharacteristicService) {}

  ngOnInit(): void {
    this.initForm();
    this.loadCharacteristics();
  }

  // Initialisation du formulaire
  initForm(): void {
    this.form = this.fb.group({
      id: [],
      characteristicNumber: [''],
      characteristicName: [''],
      characteristicDescription: [''],
      dataType: [''],
      valueRange: [''],
      defaultValue: [''],
      unitOfMeasure: [''],
      isRequired: [false],
      isSingleValue: [false],
      CharacteristicGroup: [''],
      ValidityStartDate: [null],
      ValidityEndDate: [null]
    });
  }

  // Chargement des caractéristiques
  loadCharacteristics(): void {
    this.service.getAll().subscribe(
      data => this.characteristics = data,
      error => {
        console.error('Error loading characteristics:', error);
        alert('An error occurred while loading the characteristics.');
      }
    );
  }

  // Initialisation pour la création d'une nouvelle caractéristique
  initNewCharacteristic(): void {
    this.selectedCharacteristic = null;
    this.isEditMode = false;
    this.form.reset({ isRequired: false, isSingleValue: false });
  }

  // Mode édition d'une caractéristique existante
  edit(char: Characteristic): void {
    this.selectedCharacteristic = char;
    this.isEditMode = true;
    this.form.patchValue(char);
  }

  // Soumission du formulaire
  submit(): void {
    const char: Characteristic = this.form.value;
    console.log('Form data to be sent:', char);
  
    if (this.isEditMode && char.id) {
      this.service.update(char.id, char).subscribe(
        () => {
          this.loadCharacteristics();
          
        },
        (error) => {
          console.error('Error during update:', error);
        }
      );
    } else {
      this.service.create(char).subscribe(
        () => {
          this.loadCharacteristics();
          
         
        },
        (error) => {
          console.log('Validation errors:', error.error?.errors);
          console.error('Create failed:', error);
        }
      );
    }
  }
  
  

  // Suppression d'une caractéristique
  delete(id: number): void {
    if (confirm('Are you sure you want to delete this characteristic?')) {
      this.service.delete(id).subscribe(
        () => this.afterSave(),
        (error) => {
          
          alert('An error occurred while deleting the characteristic.');
        }
      );
    }
  }

  // Actions à effectuer après la sauvegarde (création, mise à jour, suppression)
  afterSave(): void {
    this.loadCharacteristics();  // Recharger les caractéristiques
    this.initNewCharacteristic();  // Réinitialiser le formulaire pour une nouvelle entrée
  }
}
