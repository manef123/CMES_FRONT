import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  standalone: true,
  selector: 'app-work-center-list',
  imports: [CommonModule , RouterModule],
  templateUrl: './work-center-list.component.html',
  styleUrl: './work-center-list.component.css'
})
export class WorkCenterListComponent {

}
