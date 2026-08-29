import { BloodType } from './blood-type.model';

export interface UserProfile {
  id: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  bloodType?: BloodType;
}

export interface UserProfileUpdateRequest extends Omit<UserProfile, 'id'> {}
