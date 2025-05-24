import { Component, OnInit } from '@angular/core';
import { ProductVersion } from '../../Model/ProductVersion';
import { ProductVersionService } from '../../app/services/productVersion.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Bom } from '../../Model/Bom';
import { Routing } from '../../Model/Routing';
import { ProductionVersionStatus } from '../../Model/ProductionVersionStatus';
import { BOMService } from '../../app/services/bom.service';
import { RoutingService } from '../../app/services/routing.service';

@Component({
  selector: 'app-production-version',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './production-version.component.html',
  styleUrls: ['./production-version.component.css']
})
export class ProductionVersionComponent implements OnInit {
  productVersions: ProductVersion[] = [];
  selectedProductVersion: ProductVersion | null = null;
  activeTab: number = 0;
  isEditMode: boolean = false;

  selectedBomId: number | null = null;
  selectedRoutingId: number | null = null;
  boms: Bom[] = [];
  routings: Routing[] = [];

  form: FormGroup;

  constructor(
    private service: ProductVersionService,
    private bomService: BOMService ,
    private routingService: RoutingService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      id: [0],
      versionCode: ['', Validators.required],
      description: ['']
    });
  }

  ngOnInit(): void {
    this.loadData();
    this.loadBOMs();
    this.getAllRoutings();
  }

  loadBOMs(): void {
    this.bomService.getAllBOMs().subscribe(data => {
      this.boms = data;
      console.log(data);
    });
  }

   getAllRoutings(): void {
   
    this.routingService.getAllRoutings().subscribe({
      next: (data) => {
        this.routings = data;
        
      },
      error: (err) => {
        
        console.error(err);
      }
    });
  }

  loadData(): void {
    this.service.getAll().subscribe({
      next: (data) => this.productVersions = data,
      error: (err) => console.error('Error loading product versions', err)
    });
  }

 submit(): void {
  if (this.form.invalid) return;

  const formValue = this.form.value;

  // Construction de l'objet ProductVersion
  const productVersion: ProductVersion = {
    id: formValue.id,
    versionCode: formValue.versionCode,
    description: formValue.description,
    productionVersionStatus: ProductionVersionStatus.ACTIVE, // Valeur par défaut à adapter
    bom: {} as Bom, // À remplacer si tu gères la sélection du BOM
    routing: {} as Routing // À remplacer si tu gères la sélection du Routing
  };

  if (this.isEditMode && formValue.id) {
    this.service.update(formValue.id, productVersion).subscribe({
      next: () => {
        console.log('aaaaa')
        this.loadData();
        this.resetForm();
      },
      error: (err) => console.error('Error updating product version', err)
    });
  } else {
    this.service.create(productVersion).subscribe({
      next: () => {
        this.loadData();
        this.resetForm();
      },
      error: (err) => console.error('Error creating product version', err)
    });
  }
}


  edit(item: ProductVersion): void {
    this.isEditMode = true;
    this.selectedProductVersion = item;
    this.form.patchValue({
      id: item.id,
      versionCode: item.versionCode,
      description: item.description
    });
    this.activeTab = 0;
  }

  delete(id: number): void {
    if (confirm('Are you sure you want to delete this product version?')) {
      // Implémentez delete dans votre service si nécessaire
      // this.service.delete(id).subscribe(() => this.loadData());
    }
  }

  resetForm(): void {
    this.form.reset({
      id: 0,
      versionCode: '',
      description: ''
    });
    this.isEditMode = false;
    this.selectedProductVersion = null;
  }

  initNewProductionVersion(): void {
    this.resetForm();
    this.activeTab = 0;
  }

  associateBOM(productionVersionId: number, bomId: number): void {
    
    if (!bomId) {
      alert('Please select a BOM');
      return;
    }
    this.service.addBOM(productionVersionId, bomId).subscribe({
      next: () => this.loadData(),
      error: (err) => console.error('Error associating BOM', err)
    });
  }

  associateRouting(productionVersionId: number, routingId: number): void {
    if (!routingId) {
      alert('Please select a Routing');
      return;
    }
    this.service.addRouting(productionVersionId, routingId).subscribe({
      next: () => this.loadData(),
      error: (err) => console.error('Error associating Routing', err)
    });
  }

  removeBOM(productionVersionId: number): void {
    if (confirm('Are you sure you want to remove the BOM association?')) {
      this.service.removeBOM(productionVersionId).subscribe({
        next: () => this.loadData(),
        error: (err) => console.error('Error removing BOM', err)
      });
    }
  }

  removeRouting(productionVersionId: number): void {
    if (confirm('Are you sure you want to remove the Routing association?')) {
      
      this.service.removeRouting(productionVersionId).subscribe({
        
        next: () => this.loadData(),
        
        error: (err) => console.error('Error removing Routing', err)
      });
    }
  }
}
