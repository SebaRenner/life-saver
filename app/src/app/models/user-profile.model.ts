export interface UserProfile {
  id: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
}

export interface UserProfileUpdateRequest extends Omit<UserProfile, 'id'> {}
