import { Routes } from '@angular/router';

// Composants liés aux routes de la sidebar
import { CharacteristicAssignmentComponent } from '../component/characteristic-assignment/characteristic-assignment.component';
import { CharacteristicComponent } from '../component/characteristic/characteristic.component';
//import { CharacteristicValueComponent } from '../Component/characteristic-value/characteristic-value.component';
import { ClassificationComponent } from '../component/classification/classification.component';
//import { ControleModelComponent } from '../Component/controle-model/controle-model.component';
import { EventComponent } from '../component/event/event.component';
import { MaterialListComponent } from '../component/Material/material-list/material-list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'material', pathMatch: 'full' },

  // Routes principales correspondant au menu
  { path: 'characteristic-assignment', component: CharacteristicAssignmentComponent },
  { path: 'characteristic', component: CharacteristicComponent },
  //{ path: 'characteristic-value', component: CharacteristicValueComponent },
  { path: 'classification', component: ClassificationComponent },
  //{ path: 'controle-model', component: ControleModelComponent },
  { path: 'event', component: EventComponent },
  { path: 'material', component: MaterialListComponent },

  // Fallback
  { path: '**', redirectTo: 'characteristic' }
];
