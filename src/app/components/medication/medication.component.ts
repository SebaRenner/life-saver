import { Component, inject, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Medication } from '../../models/medication.model';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-medication',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButton],
  templateUrl: './medication.component.html',
  styleUrl: './medication.component.scss',
})
export class MedicationComponent {
  private readonly fb = inject(FormBuilder);
  protected readonly maxReasonLength = 120;

  addMedication = output<Medication>();

  form = this.fb.group({
    name: [null, Validators.required],
    dosage: [null, Validators.required],
    unit: [null, Validators.required],
    frequency: [null, Validators.required],
    reason: [null, Validators.maxLength(this.maxReasonLength)],
  });

  onSubmit(): void {
    if (this.form.valid) {
      const medication = this.form.value as unknown as Medication;
      this.addMedication.emit(medication);
      this.form.disable();
    }
  }
}

