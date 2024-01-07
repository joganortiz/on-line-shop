import { Injectable, inject } from '@angular/core';
import PerfectScrollbar from 'perfect-scrollbar';

import { SidebarFunctionalityService } from './sidebar-functionality.service';
import { DesktopResolutionService } from './desktop-resolution.service';
import { MobileResolutionService } from './mobile-resolution.service';
import { ToggleFunctionService } from './toggle-function.service';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private sidebar = inject(SidebarFunctionalityService);
  private _desktopResolution = inject(DesktopResolutionService)
  private _mobileResolution = inject(MobileResolutionService)
  private toggleFunction = inject(ToggleFunctionService)

  constructor() { }

  start(): void {
    this.init('layout');
  }

  private init(layout: string) {
    this.toggleFunction.overlay();

    /*
      Desktop Resoltion fn
    */
    this._desktopResolution.onRefresh();
    this._desktopResolution.onResize();

    /*
      Mobile Resoltion fn
    */
    this._mobileResolution.onRefresh();
    this._mobileResolution.onResize();


    // sidebar
    this.sidebar.init();

    if (typeof document != "undefined"){
      
      if(document.querySelector('.menu-categories')) {
        new PerfectScrollbar('.menu-categories', {
            wheelSpeed:.2,
            swipeEasing:!0,
            minScrollbarLength:40,
            maxScrollbarLength:300
        });
      }
    }
  }

}
