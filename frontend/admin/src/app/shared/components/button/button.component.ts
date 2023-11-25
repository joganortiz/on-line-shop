import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

type Color = 'primary'|'info'|'success'|'warning'|'secondary'|'danger'|'dark';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html'
})
export class ButtonComponent {
  @Input({ required: false }) color: Color = "primary";
  @Input({ required: false }) cssClass!: string;
  @Input({ required: false }) disabled: boolean = false;
}
