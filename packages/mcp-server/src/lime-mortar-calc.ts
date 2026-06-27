export type LimeType = "fat_lime" | "hydraulic_lime" | "pozzolanic" | "hot_lime" | "lime_putty";

export function mixRatio(type: LimeType): { lime: number; sand: number } {
  const ratios: Record<LimeType, { lime: number; sand: number }> = {
    fat_lime: { lime: 1, sand: 3 },
    hydraulic_lime: { lime: 1, sand: 2.5 },
    pozzolanic: { lime: 1, sand: 2 },
    hot_lime: { lime: 1, sand: 3 },
    lime_putty: { lime: 1, sand: 2.5 },
  };
  return ratios[type];
}

export function settingTimeDays(type: LimeType): number {
  const days: Record<LimeType, number> = {
    fat_lime: 90, hydraulic_lime: 28, pozzolanic: 21, hot_lime: 60, lime_putty: 120,
  };
  return days[type];
}

export function compressiveStrengthMpa(type: LimeType): number {
  const strength: Record<LimeType, number> = {
    fat_lime: 0.5, hydraulic_lime: 2.0, pozzolanic: 3.5, hot_lime: 0.8, lime_putty: 0.4,
  };
  return strength[type];
}

export function waterRetentionPercent(type: LimeType): number {
  const retention: Record<LimeType, number> = {
    fat_lime: 95, hydraulic_lime: 80, pozzolanic: 75, hot_lime: 85, lime_putty: 98,
  };
  return retention[type];
}

export function volumePerM2AtDepthCm(depthCm: number): number {
  return parseFloat((depthCm / 100).toFixed(3));
}

export function slakingTimeHours(type: LimeType): number {
  const hours: Record<LimeType, number> = {
    fat_lime: 24, hydraulic_lime: 0, pozzolanic: 0, hot_lime: 0.5, lime_putty: 8760,
  };
  return hours[type];
}

export function breathabilityRating(type: LimeType): number {
  const ratings: Record<LimeType, number> = {
    fat_lime: 5, hydraulic_lime: 3, pozzolanic: 2, hot_lime: 4, lime_putty: 5,
  };
  return ratings[type];
}

export function frostResistance(type: LimeType): boolean {
  return type === "hydraulic_lime" || type === "pozzolanic";
}

export function costPerKg(type: LimeType): number {
  const costs: Record<LimeType, number> = {
    fat_lime: 0.80, hydraulic_lime: 1.20, pozzolanic: 1.50, hot_lime: 0.60, lime_putty: 2.00,
  };
  return costs[type];
}

export function limeTypes(): LimeType[] {
  return ["fat_lime", "hydraulic_lime", "pozzolanic", "hot_lime", "lime_putty"];
}
