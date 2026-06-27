export type HideAnimal = "cattle" | "buffalo" | "deer" | "elk" | "horse";

export function thicknessMm(animal: HideAnimal): number {
  const thickness: Record<HideAnimal, number> = {
    cattle: 3.0, buffalo: 4.5, deer: 1.5, elk: 2.5, horse: 2.0,
  };
  return thickness[animal];
}

export function soakTimeHours(animal: HideAnimal): number {
  const hours: Record<HideAnimal, number> = {
    cattle: 48, buffalo: 72, deer: 24, elk: 36, horse: 30,
  };
  return hours[animal];
}

export function deharingTimeHours(animal: HideAnimal): number {
  const hours: Record<HideAnimal, number> = {
    cattle: 8, buffalo: 12, deer: 4, elk: 6, horse: 5,
  };
  return hours[animal];
}

export function stretchPercent(animal: HideAnimal): number {
  const stretch: Record<HideAnimal, number> = {
    cattle: 15, buffalo: 10, deer: 25, elk: 20, horse: 18,
  };
  return stretch[animal];
}

export function tensileStrengthMpa(animal: HideAnimal): number {
  const strength: Record<HideAnimal, number> = {
    cattle: 20, buffalo: 25, deer: 12, elk: 18, horse: 15,
  };
  return strength[animal];
}

export function dryingTimeDays(thicknessMmVal: number): number {
  return Math.round(thicknessMmVal * 2);
}

export function lacingHolesPerCm(): number {
  return 2;
}

export function translucency(animal: HideAnimal): number {
  const ratings: Record<HideAnimal, number> = {
    cattle: 3, buffalo: 1, deer: 5, elk: 4, horse: 4,
  };
  return ratings[animal];
}

export function costPerSqFt(animal: HideAnimal): number {
  const costs: Record<HideAnimal, number> = {
    cattle: 5, buffalo: 8, deer: 12, elk: 10, horse: 7,
  };
  return costs[animal];
}

export function hideAnimals(): HideAnimal[] {
  return ["cattle", "buffalo", "deer", "elk", "horse"];
}
