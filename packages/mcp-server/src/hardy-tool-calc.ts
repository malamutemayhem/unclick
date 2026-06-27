export type HardyType = "hot_cut" | "cold_cut" | "fuller" | "swage" | "bending_fork";

export function shankSizeMm(hardyHoleMm: number): number {
  return hardyHoleMm - 1;
}

export function workingEdgeAngleDeg(hardy: HardyType): number {
  const angles: Record<HardyType, number> = {
    hot_cut: 30, cold_cut: 60, fuller: 0, swage: 0, bending_fork: 0,
  };
  return angles[hardy];
}

export function materialHardnessHrc(hardy: HardyType): number {
  const hrc: Record<HardyType, number> = {
    hot_cut: 50, cold_cut: 58, fuller: 45, swage: 45, bending_fork: 42,
  };
  return hrc[hardy];
}

export function weightKg(hardy: HardyType): number {
  const weights: Record<HardyType, number> = {
    hot_cut: 1.5, cold_cut: 2.0, fuller: 1.2, swage: 1.8, bending_fork: 1.0,
  };
  return weights[hardy];
}

export function forgeTimeMinutes(hardy: HardyType): number {
  const times: Record<HardyType, number> = {
    hot_cut: 60, cold_cut: 90, fuller: 45, swage: 75, bending_fork: 40,
  };
  return times[hardy];
}

export function heatsRequired(hardy: HardyType): number {
  const heats: Record<HardyType, number> = {
    hot_cut: 8, cold_cut: 12, fuller: 6, swage: 10, bending_fork: 5,
  };
  return heats[hardy];
}

export function tempered(hardy: HardyType): boolean {
  return hardy === "hot_cut" || hardy === "cold_cut";
}

export function versatilityRating(hardy: HardyType): number {
  const ratings: Record<HardyType, number> = {
    hot_cut: 5, cold_cut: 4, fuller: 3, swage: 3, bending_fork: 4,
  };
  return ratings[hardy];
}

export function costEstimate(hardy: HardyType): number {
  const costs: Record<HardyType, number> = {
    hot_cut: 40, cold_cut: 50, fuller: 30, swage: 45, bending_fork: 25,
  };
  return costs[hardy];
}

export function hardyTypes(): HardyType[] {
  return ["hot_cut", "cold_cut", "fuller", "swage", "bending_fork"];
}
