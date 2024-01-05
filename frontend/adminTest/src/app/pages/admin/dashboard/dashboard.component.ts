import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelModule } from 'primeng/panel';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, PanelModule],
  templateUrl: './dashboard.component.html',
})
export default class DashboardComponent {

}
