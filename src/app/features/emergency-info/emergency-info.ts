import { Component, inject } from '@angular/core';
import { BloodTypeComponent } from '../../components/blood-type/blood-type.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MedicationComponent } from '../../components/medication/medication.component';

@Component({
  selector: 'app-emergency-info',
  imports: [ReactiveFormsModule, BloodTypeComponent, MatButton, MedicationComponent],
  templateUrl: './emergency-info.html',
  styleUrl: './emergency-info.scss',
})
export class EmergencyInfo {
  private readonly fb = inject(FormBuilder);

  form = this.fb.group({
    bloodType: [null],
  });

  onSubmit(): void {
    console.log(this.form.value);
  }
}
