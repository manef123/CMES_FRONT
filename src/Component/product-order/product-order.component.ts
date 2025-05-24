import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductOrderService } from '../../app/services/productOrder.service';
import { ProductOrder } from '../../Model/ProductOrder';
import { CommonModule } from '@angular/common';
import { Material } from '../../Model/Material';
import { ProductVersion } from '../../Model/ProductVersion';
import { MaterialService } from '../../app/services/material.service';
import { ProductVersionService } from '../../app/services/productVersion.service';

@Component({
  selector: 'app-product-order',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './product-order.component.html',
  styleUrls: ['./product-order.component.css']
})
export class ProductOrderComponent implements OnInit {
  productOrders: ProductOrder[] = [];
  form: FormGroup;
  activeTab = 0;
  isEditMode = false;
  selectedProductOrder: ProductOrder | null = null;
  materials: Material[] = [];            
  productVersions: ProductVersion[] = [];

  orderStatuses: string[] = ['CREATED', 'In Progress', 'RELEASED','CONFIRMED','CLOSED','CANCELLED'];

  constructor(
    private fb: FormBuilder,
    private productOrderService: ProductOrderService,
     private materialService: MaterialService,               // injecter service
    private productVersionService: ProductVersionService  
  ) {
    this.form = this.fb.group({
      orderNumber: ['', Validators.required],
      orderDescription: ['', Validators.required],
      status: ['', Validators.required],
      quantity: [0, [Validators.required, Validators.min(1)]],
      ordertDate: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      MaterialId: [null, Validators.required],
      ProductionVersionId: [null, Validators.required],
      plannedQuantity: [0, Validators.required],
      actualQuantity: [0, Validators.required],
      unitOfMeasure: ['', Validators.required],
      materialNumber: ['', Validators.required],
      productionVersionCode: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadProductOrders();
        this.loadMaterials();
    this.loadProductVersions();
  }

   loadMaterials(): void {
    this.materialService.getAll().subscribe((data) => {
      this.materials = data;
    });
  }

  loadProductVersions(): void {
    this.productVersionService.getAll().subscribe((data) => {
      this.productVersions = data;
    });
  }

  loadProductOrders(): void {
    this.productOrderService.getAll().subscribe((orders) => {
      this.productOrders = orders;
    });
  }

  initNewProductOrder(): void {
    this.selectedProductOrder = null;
    this.isEditMode = false;
    this.form.reset();
  }

  editProductOrder(order: ProductOrder): void {
    this.selectedProductOrder = order;
    this.isEditMode = true;
    this.form.patchValue(order);
  }

submit(): void {

  console.log(' aaaaaa');
 

  const orderData = this.form.value;
  console.log('Données à envoyer:', orderData);

  this.productOrderService.create(orderData).subscribe({
    next: () => {
      console.log('Création réussie');
      this.form.reset();
      this.loadProductOrders();
    },
    error: (err) => {
      console.error('Erreur lors de la création:', err);
    }
  });
}


  switchTab(index: number): void {
    this.activeTab = index;
  }
}
