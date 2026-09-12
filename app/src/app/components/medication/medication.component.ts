import { Component, inject, input, OnInit, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DosageUnit, DosageUnitLabels, Prescription } from '../../models/prescription.model';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButton } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-medication',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButton],
  templateUrl: './medication.component.html',
  styleUrl: './medication.component.scss',
})
export class MedicationComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  protected readonly maxIndicationLength = 400;
  protected readonly dosageUnits = Object.values(DosageUnit);
  protected readonly dosageUnitLabels = DosageUnitLabels;

  prescription = input<Prescription>();
  addPrescription = output<Prescription>();

  form = this.fb.group({
    medicationName: [null as string | null, Validators.required],
    dosageAmount: [null as number | null, Validators.required],
    dosageUnit: [null as DosageUnit | null, Validators.required],
    dailySchedule: this.fb.group({
      morning: [0, [Validators.required, Validators.min(0)]],
      afternoon: [0, [Validators.required, Validators.min(0)]],
      evening: [0, [Validators.required, Validators.min(0)]],
      night: [0, [Validators.required, Validators.min(0)]],
    }),
    indication: [null as string | null, Validators.maxLength(this.maxIndicationLength)],
  });

  ngOnInit(): void {
    const prescription = this.prescription();
    if (prescription) {
      this.form.patchValue(prescription);
      this.form.disable();
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      const prescription = this.form.value as unknown as Prescription;
      this.addPrescription.emit(prescription);
      this.form.disable();
    }
  }
}