import { Component, OnInit, inject } from '@angular/core';
import { SidenavComponent } from '../../shared/components/sidenav/sidenav.component';
import { AppService } from '../../services/system/app.service';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { RouterOutlet } from '@angular/router';
import { LoadComponent } from '../../shared/components/load/load.component';


@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SidenavComponent, LoadComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  system = inject(AppService);
  //isSideNavCollapsed = true;
  //screenWidth = 0;

  onToggleSideNav(data: any): void {
    //this.isSideNavCollapsed = data.collapsed;
    //this.screenWidth = data.screenWidth;
  }

  ngOnInit  (): void {
    setTimeout(() => {
      this.system.start();
    }, 1000);
  }
}
