import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  standalone: true,
  selector: 'app-routing-list',
  imports: [CommonModule , RouterModule],
  templateUrl: './routing-list.component.html',
  styleUrl: './routing-list.component.css'
})
export class RoutingListComponent {

}
