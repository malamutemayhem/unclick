export type CobMix = "traditional" | "light_straw_clay" | "fiber_heavy" | "stabilized" | "sculptural";

export function wallThicknessCm(heightM: number): number {
  return Math.round(30 + heightM * 10);
}

export function clayPercent(mix: CobMix): number {
  const pcts: Record<CobMix, number> = {
    traditional: 25, light_straw_clay: 10, fiber_heavy: 20, stabilized: 30, sculptural: 35,
  };
  return pcts[mix];
}

export function strawLengthCm(mix: CobMix): number {
  const lengths: Record<CobMix, number> = {
    traditional: 20, light_straw_clay: 30, fiber_heavy: 25, stabilized: 15, sculptural: 10,
  };
  return lengths[mix];
}

export function mixingTimeMinutes(volumeLiters: number): number {
  return Math.ceil(volumeLiters * 0.4);
}

export function dryingWeeks(thicknessCm: number): number {
  return Math.ceil(thicknessCm / 5);
}

export function compressiveStrengthMpa(mix: CobMix): number {
  const strengths: Record<CobMix, number> = {
    traditional: 1.5, light_straw_clay: 0.5, fiber_heavy: 1.2, stabilized: 3.0, sculptural: 1.0,
  };
  return strengths[mix];
}

export function thermalResistanceRPerCm(mix: CobMix): number {
  const r: Record<CobMix, number> = {
    traditional: 0.06, light_straw_clay: 0.15, fiber_heavy: 0.10, stabilized: 0.05, sculptural: 0.04,
  };
  return r[mix];
}

export function shrinkagePercent(mix: CobMix): number {
  const shrink: Record<CobMix, number> = {
    traditional: 3, light_straw_clay: 1, fiber_heavy: 2, stabilized: 1.5, sculptural: 4,
  };
  return shrink[mix];
}

export function costPerM3(mix: CobMix): number {
  const costs: Record<CobMix, number> = {
    traditional: 20, light_straw_clay: 35, fiber_heavy: 25, stabilized: 50, sculptural: 30,
  };
  return costs[mix];
}

export function cobMixes(): CobMix[] {
  return ["traditional", "light_straw_clay", "fiber_heavy", "stabilized", "sculptural"];
}
