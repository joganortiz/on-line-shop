import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarFunctionalityService {
  constructor() {}

  init() {
    if(typeof window != 'undefined') {
      this.sidebarCloser();
      const self = this;
      window.addEventListener('resize', function (event) {
       self.sidebarMobCheck();
      });
    }
  }

  private sidebarCloser() {
    if (window.innerWidth <= 991) {
      if (!document.querySelector('body')?.classList.contains('alt-menu')) {
        document.querySelector("#container")?.classList.add('sidebar-closed');
        document.querySelector('.overlay')?.classList.remove('show');
      } else {
        document.querySelector(".navbar")?.classList.remove('expand-header');
        document.querySelector('.overlay')?.classList.remove('show');
        document.querySelector("#container")?.classList.remove('sbar-open');
        document.querySelector('html, body')?.classList.remove('sidebar-noneoverflow');
      }
    } else if (window.innerWidth > 991) {
      if (!document.querySelector('body')?.classList.contains('alt-menu')) {
        document.querySelector("#container")?.classList.remove('sidebar-closed');
        document.querySelector(".navbar")?.classList.remove('expand-header');
        document.querySelector('.overlay')?.classList.remove('show');
        document.querySelector("#container")?.classList.remove('sbar-open');
        document.querySelector('html, body')?.classList.remove('sidebar-noneoverflow');
      } else {
        document.querySelector('html, body')?.classList.add('sidebar-noneoverflow');
        document.querySelector("#container")?.classList.add('sidebar-closed');
        document.querySelector(".navbar")?.classList.add('expand-header');
        document.querySelector('.overlay')?.classList.add('show');
        document.querySelector("#container")?.classList.add('sbar-open');
        document.querySelector('.sidebar-wrapper [aria-expanded="true"]')?.parentNode?.querySelector('.collapse')?.classList.remove('show');
      }
    }
  }

  private sidebarMobCheck() {
    if (window.innerWidth <= 991) {
      if ( document .querySelector('.main-container') ?.classList.contains('sbar-open') ) {
        return;
      } else {
        this.sidebarCloser();
      }
    } else if (window.innerWidth > 991) {
      this.sidebarCloser();
    }
  }
}
