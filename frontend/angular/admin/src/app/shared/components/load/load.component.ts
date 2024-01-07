import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-load',
  standalone: true,
  imports: [],
  templateUrl: './load.component.html'
})
export class LoadComponent {
  @Input({ required: false}) screen:boolean = true;
}
