import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { BloodType } from '../../models/blood-type.model';

@Component({
  selector: 'app-blood-type',
  imports: [
    MatFormFieldModule,
    MatSelectModule
  ],
  templateUrl: './blood-type.component.html',
  styleUrl: './blood-type.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BloodTypeComponent),
      multi: true,
    }
  ],
})
export class BloodTypeComponent implements ControlValueAccessor {
  readonly options = Object.values(BloodType);

  value: BloodType | null = null;
  isDisabled = false;

  // =============================================
  // ControlValueAccessor
  // =============================================

  onChange: (value: BloodType | null) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: BloodType | null): void {
    this.value = value ?? null;
  }
 
  registerOnChange(fn: (value: BloodType | null) => void): void {
      this.onChange = fn;
  }
 
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  
  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}
