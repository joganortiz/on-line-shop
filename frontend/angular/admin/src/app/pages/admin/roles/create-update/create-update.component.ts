import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit } from '@angular/core';
import { KeyFilterModule } from 'primeng/keyfilter';

@Component({
  selector: 'app-create-update',
  standalone: true,
  //changeDetection: ChangeDetectionStrategy.Default,
  imports: [KeyFilterModule],
  templateUrl: './create-update.component.html',
})
export class CreateUpdateComponent implements OnChanges {
  @Input({ required: false}) id!: string;

  ngOnChanges(): void {
    console.log(this.id)
  }
}
