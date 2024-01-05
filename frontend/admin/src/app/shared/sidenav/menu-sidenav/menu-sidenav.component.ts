import { Component,  Input } from '@angular/core';
import { INavbarData } from '../../../interfaces/menu-sidenav';

@Component({
  selector: 'app-menu-sidenav',
  standalone: true,
  imports: [],
  templateUrl: './menu-sidenav.component.html',
  styleUrl: './menu-sidenav.component.css'
})
export class MenuSidenavComponent {
  @Input({ required: true}) data!: INavbarData;
  @Input({ required: true}) collapsed: boolean = false;
  @Input({ required: true}) expanded: boolean|undefined = false;
  @Input({ required: true}) multiple: boolean = false;
  @Input({ required: true}) id!: string;


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
