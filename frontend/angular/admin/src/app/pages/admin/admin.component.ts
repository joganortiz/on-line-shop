import { AfterContentChecked, AfterViewChecked, AfterViewInit, Component, OnChanges, OnInit, inject } from '@angular/core';
import { SidenavComponent } from '../../shared/sidenav/sidenav.component';
import { AppService } from '../../services/system/app.service';


@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [SidenavComponent],
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
