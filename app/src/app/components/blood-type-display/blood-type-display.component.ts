import { Component, input } from '@angular/core';
import { BloodType, BloodTypeLabels } from '../../models/blood-type.model';
import { MatIconModule } from '@angular/material/icon';

@Component({
  imports: [MatIconModule],
  selector: 'app-blood-type-display',
  styleUrl: './blood-type-display.component.scss',
  templateUrl: './blood-type-display.component.html',
})
export class BloodTypeDisplayComponent {
  readonly bloodType = input<BloodType | null | undefined>();
  protected readonly labels = BloodTypeLabels;
}
