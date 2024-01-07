import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css',
})
export class SidenavComponent {
  @Output() onToggleSideNav: EventEmitter<any> = new EventEmitter();
  collapsed: boolean = true;
  screenWidth: number = 0;

  // @HostListener('window:resize', ['$event'])
  // onResize(event: any): void {
  //   //this.screenWidth = window?.innerWidth;
  //   if (this.screenWidth <= 1278) {
  //     this.expand = false;
  //     this.collapsed = true;
  //     //this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth})
  //   } else {
  //     this.expand = true;
  //   }
  // }

  toggleCollapsed(): void {
    //   const cs_action = document.querySelectorAll(".crancy-smenu, .crancy-header, .crancy-adashboard");
    //   cs_action.forEach((el) => {
    //     el.classList.toggle("crancy-close");
    //  });
    // this.collapsed = !this.collapsed;
    // this.onToggleSideNav.emit({
    //   collapsed: this.collapsed,
    //   screenWidth: this.screenWidth,
    // });

    // if(!this.collapsed) {
    //   document.querySelector("html")?.classList.add("sidebar-noneoverflow")
    // }else {
    //   document.querySelector("html")?.classList.remove("sidebar-noneoverflow")
    // }
  }

  // onHandleClick(item: any): void {
  //   if (!this.multiple) {
  //     for (let index = 0; index < this.navData.length; index++) {
  //       const element = this.navData[index];

  //       if (item != element && element.expanded) {
  //         this.navData[index].expanded = false;
  //       }
  //     }
  //   }

  //   item.expanded = !item.expanded;

  //   this.expand = item.expanded;
  // }
}
