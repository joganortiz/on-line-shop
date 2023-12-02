import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { INavbarData } from './interfaces';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-menu-sidenav',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './menu-sidenav.component.html',
  styleUrl: './menu-sidenav.component.css',
  animations: [
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
export class MenuSidenavComponent {
  @Input() data: INavbarData = {
    routeLink: '',
    icon: '',
    label: '',
    items: []
  }

  @Input() collapsed: boolean = false;
  @Input() animating: boolean = false;
  @Input() expanded: boolean = false;
  @Input() multiple: boolean = false;

  onHandleClick(item: any): void {
    if(!this.multiple) {
      if(this.data.items && this.data.items.length > 0) {
        for (let index = 0; index < this.data.items.length; index++) {
          const element = this.data.items[index];

          if(item !== element && element.expanded) {
            this.data.items[index].expanded = false;
          }
          
        }
      }
    }

    item.expanded = !item.expanded;
  }
}
