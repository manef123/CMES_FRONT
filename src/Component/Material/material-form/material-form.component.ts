import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-material-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './material-form.component.html'
})
export class MaterialFormComponent {
  material = {
    id: null,
    materialNumber: '',
    materialDescription: '',
    baseUnitOfMeasure: ''
  };

  onSubmit() {
    if (this.material.id) {
      console.log('Update material:', this.material);
    } else {
      console.log('Add new material:', this.material);
    }
  }
}
