import { Component, input } from '@angular/core';
import { Prescription } from '../../models/prescription.model';

@Component({
  imports: [],
  selector: 'app-prescription-display',
  styleUrl: './prescription-display.component.scss',
  templateUrl: './prescription-display.component.html',
})
export class PrescriptionDisplayComponent {
  prescription = input.required<Prescription>();
}
