export type CobMixRatio = "clay_heavy" | "balanced" | "sand_heavy" | "straw_rich" | "gravel_base";

export function clayPercent(mix: CobMixRatio): number {
  const c: Record<CobMixRatio, number> = {
    clay_heavy: 40, balanced: 25, sand_heavy: 15, straw_rich: 20, gravel_base: 20,
  };
  return c[mix];
}

export function sandPercent(mix: CobMixRatio): number {
  const s: Record<CobMixRatio, number> = {
    clay_heavy: 30, balanced: 40, sand_heavy: 55, straw_rich: 35, gravel_base: 30,
  };
  return s[mix];
}

export function strawPercent(mix: CobMixRatio): number {
  const s: Record<CobMixRatio, number> = {
    clay_heavy: 10, balanced: 15, sand_heavy: 10, straw_rich: 25, gravel_base: 10,
  };
  return s[mix];
}

export function compressiveStrengthPsi(mix: CobMixRatio): number {
  const c: Record<CobMixRatio, number> = {
    clay_heavy: 200, balanced: 300, sand_heavy: 250, straw_rich: 150, gravel_base: 350,
  };
  return c[mix];
}

export function dryingDaysPerLayer(mix: CobMixRatio): number {
  const d: Record<CobMixRatio, number> = {
    clay_heavy: 14, balanced: 10, sand_heavy: 7, straw_rich: 12, gravel_base: 8,
  };
  return d[mix];
}

export function shrinkagePercent(mix: CobMixRatio): number {
  const s: Record<CobMixRatio, number> = {
    clay_heavy: 8, balanced: 4, sand_heavy: 2, straw_rich: 5, gravel_base: 3,
  };
  return s[mix];
}

export function thermalMass(mix: CobMixRatio): number {
  const t: Record<CobMixRatio, number> = {
    clay_heavy: 9, balanced: 7, sand_heavy: 6, straw_rich: 5, gravel_base: 8,
  };
  return t[mix];
}

export function erosionResistance(mix: CobMixRatio): number {
  const e: Record<CobMixRatio, number> = {
    clay_heavy: 4, balanced: 7, sand_heavy: 6, straw_rich: 5, gravel_base: 8,
  };
  return e[mix];
}

export function costPerCubicMeter(mix: CobMixRatio): number {
  const c: Record<CobMixRatio, number> = {
    clay_heavy: 15, balanced: 20, sand_heavy: 25, straw_rich: 18, gravel_base: 30,
  };
  return c[mix];
}

export function cobMixRatios(): CobMixRatio[] {
  return ["clay_heavy", "balanced", "sand_heavy", "straw_rich", "gravel_base"];
}
