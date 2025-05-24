import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Routing } from '../../../Model/Routing';
import { WorkCenter } from '../../../Model/WorkCenter';
import { RoutingService } from '../../../app/services/routing.service';
import { WorkCenterService } from '../../../app/services/workcenter.service';

@Component({
  selector: 'app-routing-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './routing-list.component.html',
  styleUrls: ['./routing-list.component.css']
})
export class RoutingListComponent implements OnInit {
  routings: Routing[] = [];
  workCenters: WorkCenter[] = [];
  form: FormGroup;
  isEditMode: boolean = false;
  activeTab = 0;
  isLoading: boolean = false;
  errorMessage: string = '';
  selectedRoutingId: number | null = null;
  selectedWorkCenterId: number | null = null;

 


  constructor(
    private routingService: RoutingService,
    private workCenterService: WorkCenterService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      id: [0],
      routingNumber: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.required],
     
      //workCenterIds: [[], Validators.required]

    });
  }

  ngOnInit(): void {
    this.getAllRoutings();
    //this.getAllWorkCenters();
    this.loadDataworkcenter();
  }

  getWorkCenterName(id: number): string {
    const wc = this.workCenters.find(wc => wc.id === id);
    return wc ? `${wc.workCenterNumber} - ${wc.description}` : 'Unknown';
  }

  loadDataworkcenter(): void {
    this.workCenterService.getAll().subscribe(data => this.workCenters = data);
  }
  
  

  selectRouting(routing: Routing): void {
    this.selectedRoutingId = routing.id;
  }

  getAllRoutings(): void {
    this.isLoading = true;
    this.routingService.getAllRoutings().subscribe({
      next: (data) => {
        this.routings = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = 'Failed to load routings. Please try again later.';
        console.error(err);
      }
    });
  }

  getAllWorkCenters(): void {
    this.isLoading = true;
    this.workCenterService.getAll().subscribe({
      next: (data) => {
        this.workCenters = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = 'Failed to load work centers. Please try again later.';
        console.error(err);
      }
    });
  }

  initNewRouting(): void {
    this.isEditMode = false;
    this.form.reset({
      id: 0,
      routingStatus: 'ACTIVE',
      baseQuantity: 0,
      workCenterIds: []
    });
    this.activeTab = 0;
    this.errorMessage = '';
  }

  editRouting(routing: Routing): void {
    this.isEditMode = true;
    this.form.patchValue({
      ...routing,
      validityStartDate: this.formatDateForInput(routing.validityStartDate),
      validityEndDate: this.formatDateForInput(routing.validityEndDate)
    });
    this.activeTab = 0;
    this.errorMessage = '';
  }

  formatDateForInput(date: any): string {
    if (!date) return '';
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) return '';
    return parsedDate.toISOString().split('T')[0];
  }
  

  submit(): void {
    // Vérifier si le formulaire est invalide
    if (this.form.invalid) {
      this.errorMessage = 'Please fill all required fields correctly';
      return;
    }
  
    this.isLoading = true;
    this.errorMessage = '';
  
    // Récupération des données du formulaire
    const routing: Routing = { ...this.form.value };
  
    // Vérification si un WorkCenter est sélectionné
    if (!this.selectedWorkCenterId) {
      this.errorMessage = 'Please select a Work Center';
      this.isLoading = false;
      return;
    }
  
    // Affecter dynamiquement les IDs des work centers
    routing.workCenterIds = [this.selectedWorkCenterId];
  
    // Déterminer si c'est une mise à jour ou une création
    const isUpdate = this.isEditMode && routing.id;
    const request$ = isUpdate
      ? this.routingService.updateRouting(routing.id, routing)
      : this.routingService.createRouting(routing);
  
    // Exécuter la requête HTTP
    request$.subscribe({
      next: (response) => {
        console.log(isUpdate ? 'Routing updated:' : 'Routing created:', response);
        this.reloadData(); // recharge la liste
        this.form.reset();
        this.selectedWorkCenterId = null;
        this.isEditMode = false;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('HTTP error:', err);
        this.errorMessage = err.error?.message || 'Operation failed. Please try again.';
        this.isLoading = false;
      }
    });
  }
  
  

  

  reloadData(): void {
    this.getAllRoutings();
    this.initNewRouting();
  }

  deleteRouting(id: number): void {
    if (confirm('Are you sure you want to delete this routing?')) {
      this.isLoading = true;
      const routing = this.routings.find(r => r.id === id);
      
      if (routing?.workCenterIds?.length) {
        // Supprimer d'abord tous les work centers associés
        routing.workCenterIds.forEach(wcId => {
          this.routingService.removeWorkCenterFromRouting(id, wcId).subscribe({
            error: (err) => {
              this.errorMessage = 'Failed to remove work center from routing.';
              console.error(err);
            }
          });
        });
      }
      
      // Ici vous devriez avoir une méthode pour supprimer le routing lui-même
      //this.errorMessage = 'Delete routing functionality needs to be implemented on the backend.';
      this.isLoading = false;
    }
  }

  addWorkCenter(routingId: number, workCenterId: number): void {
    this.routingService.addWorkCenterToRouting(routingId, workCenterId).subscribe({
      next: () => this.getAllRoutings(),
      error: (err) => {
        this.errorMessage = 'Failed to add work center to routing.';
        console.error(err);
      }
    });
  }

  removeWorkCenter(routingId: number, workCenterId: number): void {
    this.routingService.removeWorkCenterFromRouting(routingId, workCenterId).subscribe({
      next: () => this.getAllRoutings(),
      error: (err) => {
        this.errorMessage = 'Failed to remove work center from routing.';
        console.error(err);
      }
    });
  }
}