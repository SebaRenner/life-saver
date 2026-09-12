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

export const DosageUnitLabels: Record<DosageUnit, string> = {
  [DosageUnit.Milligram]: 'mg',
  [DosageUnit.Tablet]: 'Tablet',
  [DosageUnit.Capsule]: 'Capsule',
  [DosageUnit.Milliliter]: 'ml',
  [DosageUnit.Microgram]: 'mcg',
  [DosageUnit.InternationalUnit]: 'IU',
  [DosageUnit.Puff]: 'Puff',
  [DosageUnit.Drops]: 'Drops',
  [DosageUnit.Gram]: 'g',
  [DosageUnit.Patch]: 'Patch',
  [DosageUnit.Application]: 'Application',
};

export interface Prescription {
    medicationName: string;
    dosageAmount: number;
    dosageUnit: DosageUnit;
    dailySchedule: DailySchedule;
    indication?: string;
}