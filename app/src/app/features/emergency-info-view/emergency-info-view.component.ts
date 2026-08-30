import { Component, inject } from '@angular/core';
import { UserProfileService } from '../../services/user-profile.service';
import { ActivatedRoute } from '@angular/router';
import { catchError, map, of, startWith, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { UserProfile } from '../../models/user-profile.model';
import { SpinnerComponent } from '../../components/spinner/spinner.component';
import { EmergencyCardComponent } from '../../components/emergency-card/emergency-card.component';

type ProfileState =
  | { status: 'loading' }
  | { status: 'loaded'; data: UserProfile }
  | { status: 'not_found' };

@Component({
  imports: [AsyncPipe, SpinnerComponent, EmergencyCardComponent],
  selector: 'app-emergency-info-view',
  styleUrl: './emergency-info-view.component.scss',
  templateUrl: './emergency-info-view.component.html',
})
export class EmergencyInfoViewComponent {
  private readonly userProfileService = inject(UserProfileService);
  private readonly route = inject(ActivatedRoute);

  profileState$ = this.route.paramMap.pipe(
    switchMap((params) => {
      const userId = params.get('id');
      if (!userId) return of({ status: 'not_found' } as ProfileState);

      return this.userProfileService.getById(userId).pipe(
        map((data) => ({ status: 'loaded', data }) as ProfileState),
        catchError(() => of({ status: 'not_found' } as ProfileState)),
      );
    }),
    startWith({ status: 'loading' } as ProfileState),
  );
}
