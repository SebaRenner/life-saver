import { Component, input } from '@angular/core';
import { UserProfile } from '../../models/user-profile.model';
import { AgePipe } from '../../pipes/age.pipe';

@Component({
  imports: [AgePipe],
  selector: 'app-emergency-card',
  styleUrl: './emergency-card.component.scss',
  templateUrl: './emergency-card.component.html',
})
export class EmergencyCardComponent {
  profile = input.required<UserProfile>();
}
