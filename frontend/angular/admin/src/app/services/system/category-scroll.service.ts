import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryScrollService {

  constructor() { }

  scrollCat() {
    const sidebarWrapper:any = document.querySelectorAll('.sidebar-wrapper li.active')[0];
    if(sidebarWrapper?.offsetTop){
      const sidebarWrapperTop = sidebarWrapper?.offsetTop - 12;
      setTimeout(() => {
        const scroll = document.querySelector('.menu-categories');
        scroll!.scrollTop = sidebarWrapperTop;
      }, 50);
    }
  }
}
