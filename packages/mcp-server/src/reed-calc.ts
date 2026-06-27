export type ReedType = "oboe" | "bassoon" | "clarinet" | "saxophone" | "bagpipe";

export function caneWidthMm(type: ReedType): number {
  const widths: Record<ReedType, number> = {
    oboe: 7, bassoon: 15, clarinet: 13, saxophone: 16, bagpipe: 10,
  };
  return widths[type];
}

export function caneLengthMm(type: ReedType): number {
  const lengths: Record<ReedType, number> = {
    oboe: 47, bassoon: 55, clarinet: 68, saxophone: 75, bagpipe: 40,
  };
  return lengths[type];
}

export function thicknessMm(type: ReedType): number {
  const thicknesses: Record<ReedType, number> = {
    oboe: 0.6, bassoon: 0.8, clarinet: 0.1, saxophone: 0.12, bagpipe: 0.7,
  };
  return thicknesses[type];
}

export function hardnessGrade(type: ReedType): number {
  const grades: Record<ReedType, number> = {
    oboe: 3, bassoon: 3, clarinet: 3, saxophone: 2.5, bagpipe: 3.5,
  };
  return grades[type];
}

export function soakingTimeMinutes(type: ReedType): number {
  const times: Record<ReedType, number> = {
    oboe: 3, bassoon: 5, clarinet: 2, saxophone: 2, bagpipe: 10,
  };
  return times[type];
}

export function lifespanWeeks(practiceHoursPerDay: number): number {
  if (practiceHoursPerDay <= 0) return 8;
  return Math.max(1, Math.round(4 / practiceHoursPerDay));
}

export function scrapingTimeMinutes(type: ReedType): number {
  const times: Record<ReedType, number> = {
    oboe: 45, bassoon: 60, clarinet: 0, saxophone: 0, bagpipe: 30,
  };
  return times[type];
}

export function doubleReed(type: ReedType): boolean {
  return type === "oboe" || type === "bassoon" || type === "bagpipe";
}

export function breakInPlayingMinutes(type: ReedType): number {
  const mins: Record<ReedType, number> = {
    oboe: 15, bassoon: 20, clarinet: 10, saxophone: 10, bagpipe: 30,
  };
  return mins[type];
}

export function costPerReed(type: ReedType, baseCost: number): number {
  const mult: Record<ReedType, number> = {
    oboe: 3.0, bassoon: 3.5, clarinet: 1.0, saxophone: 1.0, bagpipe: 2.0,
  };
  return parseFloat((baseCost * mult[type]).toFixed(2));
}

export function reedTypes(): ReedType[] {
  return ["oboe", "bassoon", "clarinet", "saxophone", "bagpipe"];
}
