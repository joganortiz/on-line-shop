import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from '../../../shared/components/table/table.component';

declare var $:any;

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [CommonModule, TableComponent ],
  templateUrl: './roles.component.html'
})
export default class RolesComponent{
  iconUrlShowHide: string = "assets/styles/css/icons/minus.svg";
  titleIconShowHide: string = "minus"
 

  

  ShowHide =  () => {
    const self = this;
    $('#toggleSlide').slideToggle (450, function() {
      if($("#toggleSlide").is(":visible")){
        self.iconUrlShowHide = "assets/styles/css/icons/minus.svg";
        self.titleIconShowHide = "minus"
      }else {
        self.iconUrlShowHide = "assets/styles/css/icons/plus.svg";
        self.titleIconShowHide = "plus"
      }
    })
  }

}
