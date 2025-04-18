import { Routes } from '@angular/router';

// Material
import { MaterialListComponent } from '../Component/Material/material-list/material-list.component';
import { MaterialFormComponent } from '../Component/Material/material-form/material-form.component';

// BOM
import { BomListComponent } from '../Component/BOM/bom-list/bom-list.component';
import { BomFormComponent } from '../Component/BOM/bom-form/bom-form.component';

// Routing
import { RoutingListComponent } from '../Component/Routing/routing-list/routing-list.component';
import { RoutingFormComponent } from '../Component/Routing/routing-form/routing-form.component';

// Work Centre
import { WorkCenterListComponent } from '../Component/WorkCenter/work-center-list/work-center-list.component';
import { WorkCenterFormComponent } from '../Component/WorkCenter/work-center-form/work-center-form.component';

export const AppRoutes: Routes = [
  // Redirections vers les pages de liste par défaut
  { path: 'material', redirectTo: 'material/list', pathMatch: 'full' },
  { path: 'bom', redirectTo: 'bom/list', pathMatch: 'full' },
  { path: 'routing', redirectTo: 'routing/list', pathMatch: 'full' },
  { path: 'work-centre', redirectTo: 'work-centre/list', pathMatch: 'full' },

  // Material
  { path: 'material/list', component: MaterialListComponent },
  { path: 'material/form', component: MaterialFormComponent },

  // BOM
  { path: 'bom/list', component: BomListComponent },
  { path: 'bom/form', component: BomFormComponent },

  // Routing
  { path: 'routing/list', component: RoutingListComponent },
  { path: 'routing/form', component: RoutingFormComponent },

  // Work Centre
  { path: 'work-centre/list', component: WorkCenterListComponent },
  { path: 'work-centre/form', component: WorkCenterFormComponent },

  // Redirection par défaut
  { path: '', redirectTo: 'material/list', pathMatch: 'full' }
];
