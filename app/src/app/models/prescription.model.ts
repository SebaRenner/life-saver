export interface DailySchedule {
    morning: number;
    afternoon: number;
    evening: number;
    night: number;
}

export enum DosageUnit {
  Milligram = 'Milligram',
  Tablet = 'Tablet',
  Capsule = 'Capsule',
  Milliliter = 'Milliliter',
  Microgram = 'Microgram',
  InternationalUnit = 'InternationalUnit',
  Puff = 'Puff',
  Drops = 'Drops',
  Gram = 'Gram',
  Patch = 'Patch',
  Application = 'Application',
}

export interface Prescription {
    medicationName: string;
    dosageAmount: number;
    dosageUnit: DosageUnit;
    dailySchedule: DailySchedule;
    indication?: string;
}