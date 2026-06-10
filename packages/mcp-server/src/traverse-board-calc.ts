export type WatchPeriod = "first" | "middle" | "morning" | "afternoon" | "first_dog" | "second_dog";

export function watchDurationHours(period: WatchPeriod): number {
  const hours: Record<WatchPeriod, number> = {
    first: 4, middle: 4, morning: 4, afternoon: 4, first_dog: 2, second_dog: 2,
  };
  return hours[period];
}

export function pegsPerWatch(period: WatchPeriod): number {
  const pegs: Record<WatchPeriod, number> = {
    first: 8, middle: 8, morning: 8, afternoon: 8, first_dog: 4, second_dog: 4,
  };
  return pegs[period];
}

export function compassPointsOnBoard(): number {
  return 32;
}

export function speedHolesCount(): number {
  return 8;
}

export function courseRecordInterval(): number {
  return 30;
}

export function boardDiameterCm(): number {
  return 30;
}

export function pegMaterial(): string {
  return "boxwood";
}

export function watchesPerDay(): number {
  return 7;
}

export function historicalAccuracyDeg(): number {
  return 11.25;
}

export function watchPeriods(): WatchPeriod[] {
  return ["first", "middle", "morning", "afternoon", "first_dog", "second_dog"];
}
