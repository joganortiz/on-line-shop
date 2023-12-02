import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SidenavComponent } from '../../shared/sidenav/sidenav.component';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, SidenavComponent, RouterOutlet ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export default class AdminComponent {
  
  isSideNavCollapsed = false;
  screenWidth = 0;

  onToggleSideNav(data: SideNavToggle): void {
    this.isSideNavCollapsed = data.collapsed;
    this.screenWidth = data.screenWidth;
  }

  getBodyClass():string {

    if(this.isSideNavCollapsed &&  this.screenWidth > 768) {
      return 'body-trimmed'
    }else if(this.isSideNavCollapsed &&  this.screenWidth <= 768 && this.screenWidth > 0) {
      return 'body-md-screen'
    }

    return '';
  }

}
