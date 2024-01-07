import { Component } from '@angular/core';
import { LoadComponent } from '../../../shared/components/load/load.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [LoadComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export default class DashboardComponent {

}
