import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { fadeInOut, navbarData } from './nav-data';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
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
    fadeInOut,
    trigger('rotate', [
      transition(':enter', [
        animate('600ms',  keyframes([
          style({transform: 'rotate(0deg)', offset: '0'}),
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

  constructor(private router: Router){
    for (let index = 0; index < this.navData.length; index++) {
      const element = this.navData[index];
      
      if(this.getActiveClass(element) == "active") {
        this.navData[index].expanded = true
      }
    }
  }

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

  getActiveClass(data: INavbarData): string {
    return this.router.url.includes(data.routeLink) ? 'active' : '';
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
