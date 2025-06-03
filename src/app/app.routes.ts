import { Routes } from '@angular/router';

// Material
import { MaterialListComponent } from '../Component/Material/material-list/material-list.component';
import { MaterialFormComponent } from '../Component/Material/material-form/material-form.component';

// BOM
import { BOMListComponent } from '../Component/BOM/bom-list/bom-list.component';
import { BomFormComponent } from '../Component/BOM/bom-form/bom-form.component';

// Routing
import { RoutingListComponent } from '../Component/Routing/routing-list/routing-list.component';
import { RoutingFormComponent } from '../Component/Routing/routing-form/routing-form.component';

// Work Centre
import { WorkCenterListComponent } from '../Component/WorkCenter/work-center-list/work-center-list.component';
import { WorkCenterFormComponent } from '../Component/WorkCenter/work-center-form/work-center-form.component';
import { AlternativeBomComponent } from '../Component/alternative-bom/alternative-bom.component';
import { ClassificationComponent } from '../Component/classification/classification.component';

import { CharacteristicComponent } from '../Component/characteristic/characteristic.component';

import { ProductionVersionComponent } from '../Component/production-version/production-version.component';
import { ProductOrderComponent } from '../Component/product-order/product-order.component';


import { CharacteristicAssignmentComponent } from '../Component/characteristic-assignment/characteristic-assignment.component';
import { EventComponent } from '../Component/event/event.component';

export const AppRoutes: Routes = [
  // Redirections vers les pages de liste par défaut
  { path: 'material', redirectTo: 'material/list', pathMatch: 'full' },
  { path: 'bom', redirectTo: 'bom/list', pathMatch: 'full' },
  { path: 'routing', redirectTo: 'routing/list', pathMatch: 'full' },
  { path: 'work-centre', redirectTo: 'work-centre/list', pathMatch: 'full' },
  { path: 'alternative-bom', redirectTo: 'alternative-bom', pathMatch: 'full' },
  { path: 'classification', redirectTo: 'classification', pathMatch: 'full' },
  { path: 'product-version', redirectTo: 'product-version', pathMatch: 'full' },
   { path: 'product-order', redirectTo: 'product-order', pathMatch: 'full' },

  // Material
  { path: 'material/list', component: MaterialListComponent },
  { path: 'material/form', component: MaterialFormComponent },

  // BOM
  { path: 'bom/list', component: BOMListComponent },
  { path: 'bom/form', component: BomFormComponent },

  // Routing
  { path: 'routing/list', component: RoutingListComponent },
  { path: 'routing/form', component: RoutingFormComponent },

  // Work Centre
  { path: 'work-centre/list', component: WorkCenterListComponent },
  { path: 'work-centre/form', component: WorkCenterFormComponent },

  //alternatibe bom
  { path: 'alternative-bom', component: AlternativeBomComponent },

  //classification
  { path: 'classification', component: ClassificationComponent },
  
  //characteristic
  { path: 'characteristic', component: CharacteristicComponent },

  //production version
   { path: 'product-version', component: ProductionVersionComponent },
  
   //product-order
   { path: 'product-order', component: ProductOrderComponent },


    { path: 'characteristic-assignment', component: CharacteristicAssignmentComponent },
    
    
    { path: 'event', component: EventComponent },

  // Redirection par défaut
  { path: '', redirectTo: 'material/list', pathMatch: 'full' }
];
