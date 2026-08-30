import { Component, input } from '@angular/core';
import { UserProfile } from '../../models/user-profile.model';
import { AgePipe } from '../../pipes/age.pipe';
import { BloodTypeDisplayComponent } from '../blood-type-display/blood-type-display.component';

@Component({
  imports: [AgePipe, BloodTypeDisplayComponent],
  selector: 'app-emergency-card',
  styleUrl: './emergency-card.component.scss',
  templateUrl: './emergency-card.component.html',
})
export class EmergencyCardComponent {
  profile = input.required<UserProfile>();
}
