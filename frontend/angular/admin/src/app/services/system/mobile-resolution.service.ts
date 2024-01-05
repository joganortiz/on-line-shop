import { Injectable, inject } from '@angular/core';
import { MediaSize } from './helpers';
import { CategoryScrollService } from './category-scroll.service';
import { ToggleFunctionService } from './toggle-function.service';

@Injectable({
  providedIn: 'root'
})
export class MobileResolutionService {
  private categoryScroll = inject(CategoryScrollService)
  private toggleFunction = inject(ToggleFunctionService)
  constructor() { }

  onRefresh() {
    if(typeof window != 'undefined') {
      const windowWidth = window.innerWidth;
      if ( windowWidth <= MediaSize.md ) {
        this.categoryScroll.scrollCat();
        this.toggleFunction.sidebar();
      }
    }
  }

  onResize() {
    if(typeof window != 'undefined') {
      const self = this;
      window.addEventListener('resize', function(event) {
        event.preventDefault();
        var windowWidth = window.innerWidth;
        if ( windowWidth <= MediaSize.md ) {
          self.toggleFunction.offToggleSidebarSubmenu();
        }
      });
    }
  }
}
