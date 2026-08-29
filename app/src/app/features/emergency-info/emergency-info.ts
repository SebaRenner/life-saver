import { Component, inject, OnInit, signal } from '@angular/core';
import { BloodTypeComponent } from '../../components/blood-type/blood-type.component';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MedicationComponent } from '../../components/medication/medication.component';
import { Medication } from '../../models/medication.model';
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

@Component({
  selector: 'app-emergency-info',
  imports: [
    ReactiveFormsModule,
    BloodTypeComponent,
    MatButton,
    MedicationComponent,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    SpinnerComponent,
  ],
  templateUrl: './emergency-info.html',
  styleUrl: './emergency-info.scss',
})
export class EmergencyInfo implements OnInit {
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
    medications: this.fb.array([]),
  });

  medicationRows = [0];

  get medications(): FormArray {
    return this.form.get('medications') as FormArray;
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
        this.isLoading.set(false);
      });
    }
  }

  onMedicationAdded(medication: Medication): void {
    this.medications.push(this.createMedicationGroup(medication));
    this.medicationRows.push(this.medicationRows.length);
  }

  private createMedicationGroup(medication: Medication): FormGroup {
    return this.fb.group({
      name: [medication.name],
      dosage: [medication.dosage],
      unit: [medication.unit],
      frequency: [medication.frequency],
      reason: [medication.reason],
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const userId = this.authStore.userId();
      const { firstName, lastName, dateOfBirth, bloodType } = this.form.value;
      const updateRequest: UserProfileUpdateRequest = {
        firstName: firstName ?? undefined,
        lastName: lastName ?? undefined,
        dateOfBirth: dateOfBirth ? format(new Date(dateOfBirth), 'yyyy-MM-dd') : undefined,
        bloodType: bloodType ?? undefined,
      };

      this.userProfileService.update(userId!, updateRequest).subscribe();
    }
  }

  onExportStl(): void {
    const grid = this.qrCodeService.generateQrCode('Hello World!');
    const { black, white } = this.stlService.generateStlFile(grid);
    downloadBlob(black, 'emergency-info-black.stl');
    downloadBlob(white, 'emergency-info-white.stl');
  }
}
