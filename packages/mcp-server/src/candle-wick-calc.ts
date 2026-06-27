export type WickType = "cotton_flat" | "cotton_square" | "hemp" | "wood" | "zinc_core";

export function burnRate(wick: WickType): number {
  const b: Record<WickType, number> = {
    cotton_flat: 5, cotton_square: 6, hemp: 4, wood: 7, zinc_core: 8,
  };
  return b[wick];
}

export function maxDiameterCm(wick: WickType): number {
  const m: Record<WickType, number> = {
    cotton_flat: 8, cotton_square: 10, hemp: 6, wood: 12, zinc_core: 10,
  };
  return m[wick];
}

export function mushrooming(wick: WickType): number {
  const m: Record<WickType, number> = {
    cotton_flat: 5, cotton_square: 3, hemp: 2, wood: 1, zinc_core: 4,
  };
  return m[wick];
}

export function selfTrimming(wick: WickType): boolean {
  const s: Record<WickType, boolean> = {
    cotton_flat: false, cotton_square: true, hemp: false, wood: true, zinc_core: false,
  };
  return s[wick];
}

export function crackling(wick: WickType): boolean {
  const c: Record<WickType, boolean> = {
    cotton_flat: false, cotton_square: false, hemp: false, wood: true, zinc_core: false,
  };
  return c[wick];
}

export function sootProduction(wick: WickType): number {
  const s: Record<WickType, number> = {
    cotton_flat: 4, cotton_square: 3, hemp: 2, wood: 5, zinc_core: 6,
  };
  return s[wick];
}

export function bestWax(wick: WickType): string {
  const b: Record<WickType, string> = {
    cotton_flat: "beeswax", cotton_square: "soy", hemp: "beeswax",
    wood: "soy", zinc_core: "paraffin",
  };
  return b[wick];
}

export function trimmingFrequency(wick: WickType): number {
  const t: Record<WickType, number> = {
    cotton_flat: 8, cotton_square: 4, hemp: 6, wood: 2, zinc_core: 5,
  };
  return t[wick];
}

export function costPerMeter(wick: WickType): number {
  const c: Record<WickType, number> = {
    cotton_flat: 0.5, cotton_square: 0.8, hemp: 1.0, wood: 2.0, zinc_core: 0.6,
  };
  return c[wick];
}

export function wickTypes(): WickType[] {
  return ["cotton_flat", "cotton_square", "hemp", "wood", "zinc_core"];
}
