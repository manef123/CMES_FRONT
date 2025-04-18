import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { Material } from "../../../Model/Material";
import { MaterialType } from "../../../Model/MaterialType";

@Component({
  selector: 'app-material-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './material-list.component.html',
  styleUrls: ['./material-list.component.css']
})
export class MaterialListComponent {
  materials: Material[] = [
    {
      materialNumber: 'MAT001',
      description: 'Cable',
      materialType: MaterialType.FERT,
      baseUnitOfMeasure: 'M',
      materialGroup: 'CableGroup',
      division: 'DivisionA',
      batchManagement: false,
      serialNumberManagement: false,
      taxClassification: 'A',
      industrySector: 'Electronics',
      oldMaterialNumber: 'OLD001',
      materialHierarchy: 'H1',
      materialStatus: 'Active',
      procurementType: 'Internal',
      MRPType: 'PD',
      MRPController: 'MC01',
      lotSize: '100',
      purchasingGroup: 'PG1',
      purchasingValueKey: 'PVK1',
      accountAssignmentGroup: 'AAG1',
      valuationClass: 'VC1',
      standardPrice: 120,
      movingAveragePrice: 110,
      taxData: 'TAX',
      classificationData: 'DATA'
    }
  ];

  selectedMaterial: Material = this.initEmptyMaterial();

  tabs = [
    { title: 'Add / Update Material' },
    { title: 'Onglet 2' },
    { title: 'Onglet 3' },
    { title: 'Onglet 4' }
  ];
  selectedTab = 0;

  selectTab(index: number) {
    this.selectedTab = index;
  }

  onSelect(material: Material) {
    this.selectedMaterial = { ...material };
  }

  onSubmit(event: Event) {
    event.preventDefault();
    const index = this.materials.findIndex(m => m.materialNumber === this.selectedMaterial.materialNumber);
    if (index !== -1) {
      this.materials[index] = { ...this.selectedMaterial };
    } else {
      this.materials.push({ ...this.selectedMaterial });
    }
    this.selectedMaterial = this.initEmptyMaterial();
  }

  initEmptyMaterial(): Material {
    return {
      materialNumber: '',
      description: '',
      materialType: MaterialType.ROH,
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
      MRPType: '',
      MRPController: '',
      lotSize: '',
      purchasingGroup: '',
      purchasingValueKey: '',
      accountAssignmentGroup: '',
      valuationClass: '',
      standardPrice: 0,
      movingAveragePrice: 0,
      taxData: '',
      classificationData: ''
    };
  }
}
