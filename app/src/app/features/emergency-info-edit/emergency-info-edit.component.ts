import { Component, inject, OnInit, signal } from '@angular/core';
import { BloodTypeSelectComponent } from '../../components/blood-type-select/blood-type-select.component';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MedicationComponent } from '../../components/medication/medication.component';
import { QrCodeService } from '../../services/qr-code.service';
import { StlService } from '../../services/stl.service';
import { downloadBlob } from '../../utils/download.utils';
import { AuthStore } from '../../store/auth.store';
import { UserProfileService } from '../../services/user-profile.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { UserProfileUpdateRequest } from '../../models/user-profile.model';
import { format } from 'date-fns';
import { SpinnerComponent } from '../../components/spinner/spinner.component';
import { BloodType } from '../../models/blood-type.model';
import { Prescription } from '../../models/prescription.model';

@Component({
  selector: 'app-emergency-info-edit',
  imports: [
    ReactiveFormsModule,
    BloodTypeSelectComponent,
    MatButton,
    MedicationComponent,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    SpinnerComponent,
  ],
  templateUrl: './emergency-info-edit.component.html',
  styleUrl: './emergency-info-edit.component.scss',
})
export class EmergencyInfoEditComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly qrCodeService = inject(QrCodeService);
  private readonly stlService = inject(StlService);
  private readonly authStore = inject(AuthStore);
  private readonly userProfileService = inject(UserProfileService);

  isLoading = signal(true);

  form = this.fb.group({
    firstName: [null as string | null, Validators.maxLength(100)],
    lastName: [null as string | null, Validators.maxLength(100)],
    dateOfBirth: [null as string | null],
    bloodType: [null as BloodType | null],
    prescriptions: this.fb.array([]),
  });

  existingPrescriptions: Prescription[] = [];
  newPrescriptionRows: number[] = [0];

  get prescriptions(): FormArray {
    return this.form.get('prescriptions') as FormArray;
  }

  ngOnInit(): void {
    const userId = this.authStore.userId();
    if (userId) {
      this.userProfileService.getById(userId).subscribe((userProfile) => {
        this.form.patchValue({
          firstName: userProfile.firstName,
          lastName: userProfile.lastName,
          dateOfBirth: userProfile.dateOfBirth,
          bloodType: userProfile.bloodType,
        });

        this.existingPrescriptions = userProfile.prescriptions ?? [];
        this.existingPrescriptions.forEach((prescription) => {
          this.prescriptions.push(this.createPrescriptionGroup(prescription));
        });

        this.isLoading.set(false);
      });
    }
  }

  onPrescriptionAdded(prescription: Prescription): void {
    this.prescriptions.push(this.createPrescriptionGroup(prescription));
    this.newPrescriptionRows.push(this.newPrescriptionRows.length);
  }

  private createPrescriptionGroup(prescription: Prescription): FormGroup {
    return this.fb.group({
      medicationName: [prescription.medicationName],
      dosageAmount: [prescription.dosageAmount],
      dosageUnit: [prescription.dosageUnit],
      dailySchedule: this.fb.group({
        morning: [prescription.dailySchedule.morning],
        afternoon: [prescription.dailySchedule.afternoon],
        evening: [prescription.dailySchedule.evening],
        night: [prescription.dailySchedule.night],
      }),
      indication: [prescription.indication],
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const userId = this.authStore.userId();
      const { firstName, lastName, dateOfBirth, bloodType, prescriptions } = this.form.value;
      const updateRequest: UserProfileUpdateRequest = {
        firstName: firstName ?? undefined,
        lastName: lastName ?? undefined,
        dateOfBirth: dateOfBirth ? format(new Date(dateOfBirth), 'yyyy-MM-dd') : undefined,
        bloodType: bloodType ?? undefined,
        prescriptions: (prescriptions as Prescription[]) ?? [],
      };

      this.userProfileService.update(userId!, updateRequest).subscribe();
    }
  }

  onExportStl(): void {
    const userId = this.authStore.userId();
    const url = `${window.location.origin}/${userId}`;
    const grid = this.qrCodeService.generateQrCode(url);
    const { black, white } = this.stlService.generateStlFile(grid);
    downloadBlob(black, 'emergency-info-black.stl');
    downloadBlob(white, 'emergency-info-white.stl');
  }
}
