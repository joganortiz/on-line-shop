import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { navbarData } from './nav-data';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { MenuSidenavComponent } from './menu-sidenav/menu-sidenav.component';
import { INavbarData } from './menu-sidenav/interfaces';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, MenuSidenavComponent],
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
    trigger('rotate', [
      transition(':enter', [
        animate('1000ms',  keyframes([
          style({transform: 'totate(0deg)', offset: '0'}),
          style({transform: 'rotate(2turn)', offset: '1'})
        ]))
      ])
    ])
  ]
})
export class SidenavComponent implements OnInit {
  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed: boolean = false;
  screenWidth: number = 0;
  navData: INavbarData[] = navbarData;
  multiple: boolean = false;

  @HostListener("window:resize", ['$event'])
  onResize(event: any): void {
    this.screenWidth = window?.innerWidth;
    if(this.screenWidth <= 768) {
      this.collapsed = false;
      this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth})
    }
  }

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.screenWidth = window?.innerWidth;
    }
  }

  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth})
  }

  closeSidenav(): void {
    this.collapsed = false;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth})
  }

  onHandleClick(item: any): void {
    if(!this.multiple) {
      for (let index = 0; index < this.navData.length; index++) {
        const element = this.navData[index];

        if(item != element && element.expanded){
          this.navData[index].expanded = false;
        }

      }
    }

    item.expanded = !item.expanded;
  }
}
