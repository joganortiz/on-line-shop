import { HostListener, Injectable, inject } from '@angular/core';
import { MediaSize } from './helpers';
import { CategoryScrollService } from './category-scroll.service';
import { ToggleFunctionService } from './toggle-function.service';

@Injectable({
  providedIn: 'root'
})
export class DesktopResolutionService {
  private categoryScroll = inject(CategoryScrollService)
  private toggleFunction = inject(ToggleFunctionService)
  constructor() { }

  onRefresh() {
    if(typeof window != 'undefined') {
      const windowWidth = window.innerWidth;
      if ( windowWidth > MediaSize.md ) {
        this.categoryScroll.scrollCat();
        this.toggleFunction.sidebar();
        this.toggleFunction.onToggleSidebarSubmenu();
      }
    }
  }

  //@HostListener("window:resize", ['$event'])
  onResize() {
    const self = this;
    if(typeof window != 'undefined') {
      window.addEventListener('resize', function(event) {
      event.preventDefault();
        var windowWidth = window.innerWidth;
        if ( windowWidth > MediaSize.md ) {
          self.toggleFunction.onToggleSidebarSubmenu();
        }
      });
    }
  }
}
