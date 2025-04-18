import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-bom-list',
  imports: [CommonModule , RouterModule],
  templateUrl: './bom-list.component.html',
  styleUrl: './bom-list.component.css'
})
export class BomListComponent {

}
