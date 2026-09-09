import { BloodType } from './blood-type.model';
import { Prescription } from './prescription.model';

export interface UserProfile {
  id: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  bloodType?: BloodType;
  prescriptions: Prescription[];
}

export interface UserProfileUpdateRequest extends Omit<UserProfile, 'id'> {}
