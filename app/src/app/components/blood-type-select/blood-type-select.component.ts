import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { BloodType, BloodTypeLabels } from '../../models/blood-type.model';

@Component({
  selector: 'app-blood-type-select',
  imports: [MatFormFieldModule, MatSelectModule],
  templateUrl: './blood-type-select.component.html',
  styleUrl: './blood-type-select.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BloodTypeSelectComponent),
      multi: true,
    },
  ],
})
export class BloodTypeSelectComponent implements ControlValueAccessor {
  readonly options = Object.values(BloodType);
  readonly labels = BloodTypeLabels;

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
