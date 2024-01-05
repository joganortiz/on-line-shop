import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { INavbarData } from '../../interfaces/menu-sidenav';
import { navbarData } from './nav-data';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MenuSidenavComponent } from './menu-sidenav/menu-sidenav.component';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MenuSidenavComponent],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({opacity: 0}),
        animate('350ms', style({opacity: 1}))
      ]),
      transition(':leave', [
        style({opacity: 1}),
        animate('50ms', style({opacity: 0}))
      ])
    ]),
    trigger('submenu', [
      state('hidden', style({
        height: '0',
        overflow: 'hidden'
      })),
      state('visible', style({
        height: '*'
      })),
      transition('visible <=> hidden', [style({overflow: "hidden"}), animate('{{transitionParams}}')]),
      transition('void => *', animate(0))
    ])
  ]
})
export class SidenavComponent {
  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed: boolean = false;
  screenWidth: number = 0;
  navData: INavbarData[] = navbarData;
  multiple: boolean = false;
  expand: boolean = false;

  @HostListener("window:resize", ['$event'])
  onResize(event: any): void {
    //this.screenWidth = window?.innerWidth;
    if(this.screenWidth <= 1278) {
      this.expand = false;
      this.collapsed = true;
      //this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth})
    }else {
      this.expand = true;
    }
  }


  toggleCollapsed(): void {
    //   const cs_action = document.querySelectorAll(".crancy-smenu, .crancy-header, .crancy-adashboard");
    //   cs_action.forEach((el) => {
    //     el.classList.toggle("crancy-close");
    //  });
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth})
  }

  onHandleClick(item: INavbarData): void {
    if(!this.multiple) {
      for (let index = 0; index < this.navData.length; index++) {
        const element = this.navData[index];

        if(item != element && element.expanded){
          this.navData[index].expanded = false;
        }

      }
    }
    
    item.expanded = !item.expanded;

    this.expand = item.expanded
  }


}
