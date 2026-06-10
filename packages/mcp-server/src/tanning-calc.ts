export type TanningMethod = "bark" | "alum" | "brain" | "smoke" | "chrome";

export function soakingDays(hideWeightKg: number): number {
  return Math.max(1, Math.ceil(hideWeightKg * 0.5));
}

export function limeVatDays(hideThicknessMm: number): number {
  return Math.max(3, Math.ceil(hideThicknessMm * 2));
}

export function tanLiquorLiters(hideAreaSqM: number, method: TanningMethod): number {
  const ratios: Record<TanningMethod, number> = {
    bark: 30, alum: 20, brain: 5, smoke: 0, chrome: 15,
  };
  return parseFloat((hideAreaSqM * ratios[method]).toFixed(1));
}

export function tanningDuration(method: TanningMethod): number {
  const days: Record<TanningMethod, number> = {
    bark: 180, alum: 14, brain: 3, smoke: 5, chrome: 1,
  };
  return days[method];
}

export function leatherThicknessMm(hideThicknessMm: number, method: TanningMethod): number {
  const shrink: Record<TanningMethod, number> = {
    bark: 0.7, alum: 0.8, brain: 0.9, smoke: 0.85, chrome: 0.75,
  };
  return parseFloat((hideThicknessMm * shrink[method]).toFixed(1));
}

export function wasteWaterLiters(hideAreaSqM: number): number {
  return parseFloat((hideAreaSqM * 50).toFixed(1));
}

export function dryingDays(method: TanningMethod): number {
  const days: Record<TanningMethod, number> = {
    bark: 14, alum: 7, brain: 2, smoke: 1, chrome: 3,
  };
  return days[method];
}

export function durabilityRating(method: TanningMethod): number {
  const ratings: Record<TanningMethod, number> = {
    bark: 9, alum: 5, brain: 6, smoke: 7, chrome: 8,
  };
  return ratings[method];
}

export function waterResistance(method: TanningMethod): number {
  const ratings: Record<TanningMethod, number> = {
    bark: 7, alum: 3, brain: 4, smoke: 8, chrome: 6,
  };
  return ratings[method];
}

export function costPerSqM(method: TanningMethod, baseCost: number): number {
  const multipliers: Record<TanningMethod, number> = {
    bark: 1.0, alum: 0.8, brain: 0.5, smoke: 0.6, chrome: 1.5,
  };
  return parseFloat((baseCost * multipliers[method]).toFixed(2));
}

export function tanningMethods(): TanningMethod[] {
  return ["bark", "alum", "brain", "smoke", "chrome"];
}
