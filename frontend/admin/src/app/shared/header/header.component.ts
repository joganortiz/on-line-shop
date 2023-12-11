import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Input() collapsed = false;
  @Input() screenWidth = 0;

  getHeadClass(): string {
    if(this.collapsed && this.screenWidth > 768) {
      return 'head-trimmed'
    }

    return 'head-md-screen';
  }
}
