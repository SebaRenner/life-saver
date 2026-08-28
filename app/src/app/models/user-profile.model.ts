export interface UserProfile {
  id: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: Date;
}

export interface UserProfileUpdateRequest extends Omit<UserProfile, 'id'> {}
