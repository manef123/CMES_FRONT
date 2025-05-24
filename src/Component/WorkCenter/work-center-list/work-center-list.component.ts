import { Component, OnInit } from '@angular/core';
import { WorkCenter } from '../../../Model/WorkCenter';
import { WorkCenterService } from '../../../app/services/workcenter.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-workcenter-list',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './work-center-list.component.html',
  styleUrls: ['./work-center-list.component.css']
})
export class WorkCenterListComponent implements OnInit {
  workCenters: WorkCenter[] = [];
  selectedWorkCenter: WorkCenter | null = null;
  activeTab: number = 0;
  tabs: { label: string; workCenter?: WorkCenter }[] = [{ label: 'WorkCenter Form' }];
  form: FormGroup;
  isEditMode: boolean = false;

  constructor(private service: WorkCenterService, private fb: FormBuilder) {
    this.form = this.fb.group({
      id: [0],
      workCenterNumber: ['', Validators.required],
      description: ['', Validators.required],
      plant: [''],
      costCenter: [''],
      capacity: [0, Validators.required],
      capacityUnit: [''],
      workCenterType: ['', Validators.required],
      isActive: [true],
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.service.getAll().subscribe(data => this.workCenters = data);
  }

  submit(): void {
    const dto = this.form.value;
    if (dto.id === 0) {
      this.service.create(dto).subscribe(() => this.loadData());
    } else {
      this.service.update(dto).subscribe(() => this.loadData());
    }
    this.form.reset({ id: 0, isActive: true });
    this.activeTab = 0;
    this.selectedWorkCenter = null; // Reset selected work center after submission
  }

  edit(item: WorkCenter): void {
    this.isEditMode = true;
    this.form.patchValue(item);  // Remplir le formulaire avec les données du WorkCenter sélectionné
    this.selectedWorkCenter = item;
    this.activeTab = 0; 
  }
  

  delete(id: number): void {
    
      this.service.delete(id).subscribe(() => this.loadData());
    
  }

  closeTab(index: number): void {
    this.tabs.splice(index, 1);
    if (this.tabs.length > 0) {
      this.activeTab = Math.min(this.activeTab, this.tabs.length - 1);
    }
  }

  initNewWorkCenter(): void {
    this.isEditMode = false;
    this.form.reset({ id: 0, isActive: true });
    this.selectedWorkCenter = null;
    this.activeTab = 0;
    
  }
}
