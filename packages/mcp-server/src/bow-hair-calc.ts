export type BowType = "violin" | "viola" | "cello" | "bass" | "baroque";

export function hairCount(type: BowType): number {
  const counts: Record<BowType, number> = {
    violin: 160, viola: 175, cello: 200, bass: 225, baroque: 140,
  };
  return counts[type];
}

export function ribbonWidthMm(type: BowType): number {
  const widths: Record<BowType, number> = {
    violin: 10, viola: 11, cello: 12, bass: 14, baroque: 8,
  };
  return widths[type];
}

export function playingLengthCm(type: BowType): number {
  const lengths: Record<BowType, number> = {
    violin: 65, viola: 63, cello: 60, bass: 55, baroque: 60,
  };
  return lengths[type];
}

export function tensionNewtons(type: BowType): number {
  const tensions: Record<BowType, number> = {
    violin: 6, viola: 7, cello: 8, bass: 10, baroque: 4,
  };
  return tensions[type];
}

export function rosinApplicationsPerHour(climate: "dry" | "temperate" | "humid"): number {
  const apps: Record<string, number> = { dry: 3, temperate: 2, humid: 1 };
  return apps[climate];
}

export function rehairIntervalMonths(practiceHoursPerDay: number): number {
  if (practiceHoursPerDay <= 0) return 12;
  return Math.max(1, Math.round(6 / practiceHoursPerDay));
}

export function stickWeightG(type: BowType): number {
  const weights: Record<BowType, number> = {
    violin: 60, viola: 70, cello: 80, bass: 130, baroque: 50,
  };
  return weights[type];
}

export function camberDepthMm(type: BowType): number {
  const depths: Record<BowType, number> = {
    violin: 15, viola: 14, cello: 13, bass: 12, baroque: 8,
  };
  return depths[type];
}

export function stickMaterial(grade: "student" | "professional" | "master"): string {
  const materials: Record<string, string> = {
    student: "fiberglass", professional: "pernambuco", master: "pernambuco",
  };
  return materials[grade];
}

export function bowTypes(): BowType[] {
  return ["violin", "viola", "cello", "bass", "baroque"];
}
