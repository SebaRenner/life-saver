import { Component, inject, OnInit, signal } from '@angular/core';
import { BloodTypeComponent } from '../../components/blood-type/blood-type.component';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MedicationComponent } from '../../components/medication/medication.component';
import { Medication } from '../../models/medication.model';
import { QrCodeService } from '../../services/qr-code.service';
import { StlService } from '../../services/stl.service';
import { downloadBlob } from '../../utils/download.utils';
import { AuthStore } from '../../store/auth.store';
import { UserProfileService } from '../../services/user-profile.service';
import { UserProfile } from '../../models/user-profile.model';

@Component({
  selector: 'app-emergency-info',
  imports: [ReactiveFormsModule, BloodTypeComponent, MatButton, MedicationComponent],
  templateUrl: './emergency-info.html',
  styleUrl: './emergency-info.scss',
})
export class EmergencyInfo implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly qrCodeService = inject(QrCodeService);
  private readonly stlService = inject(StlService);
  private readonly authStore = inject(AuthStore);
  private readonly userProfileService = inject(UserProfileService);

  userProfile = signal<UserProfile | null>(null);

  form = this.fb.group({
    bloodType: [null],
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
        this.userProfile.set(userProfile);
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
    console.log(this.form.value);
  }

  onExportStl(): void {
    const grid = this.qrCodeService.generateQrCode('Hello World!');
    const { black, white } = this.stlService.generateStlFile(grid);
    downloadBlob(black, 'emergency-info-black.stl');
    downloadBlob(white, 'emergency-info-white.stl');
  }
}
