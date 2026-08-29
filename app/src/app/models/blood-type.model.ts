export enum BloodType {
  A_Positive = 'A_Positive',
  A_Negative = 'A_Negative',
  B_Positive = 'B_Positive',
  B_Negative = 'B_Negative',
  AB_Positive = 'AB_Positive',
  AB_Negative = 'AB_Negative',
  O_Positive = 'O_Positive',
  O_Negative = 'O_Negative',
}

export const BloodTypeLabels: Record<BloodType, string> = {
  [BloodType.A_Positive]: 'A+',
  [BloodType.A_Negative]: 'A-',
  [BloodType.B_Positive]: 'B+',
  [BloodType.B_Negative]: 'B-',
  [BloodType.AB_Positive]: 'AB+',
  [BloodType.AB_Negative]: 'AB-',
  [BloodType.O_Positive]: 'O+',
  [BloodType.O_Negative]: 'O-',
};
