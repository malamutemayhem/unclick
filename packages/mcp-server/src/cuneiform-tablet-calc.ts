export type CuneiformClay = "river_silt" | "fine_alluvial" | "mixed_chaff" | "gypsum_blend" | "fired_ceramic";

export function tabletThicknessCm(clay: CuneiformClay): number {
  const t: Record<CuneiformClay, number> = {
    river_silt: 2, fine_alluvial: 1.5, mixed_chaff: 3, gypsum_blend: 2.5, fired_ceramic: 1,
  };
  return t[clay];
}

export function impressionDepthMm(clay: CuneiformClay): number {
  const d: Record<CuneiformClay, number> = {
    river_silt: 2, fine_alluvial: 1.5, mixed_chaff: 3, gypsum_blend: 2, fired_ceramic: 1,
  };
  return d[clay];
}

export function dryingDays(clay: CuneiformClay): number {
  const d: Record<CuneiformClay, number> = {
    river_silt: 3, fine_alluvial: 2, mixed_chaff: 5, gypsum_blend: 4, fired_ceramic: 0,
  };
  return d[clay];
}

export function signsPerTablet(clay: CuneiformClay): number {
  const s: Record<CuneiformClay, number> = {
    river_silt: 200, fine_alluvial: 300, mixed_chaff: 100, gypsum_blend: 150, fired_ceramic: 400,
  };
  return s[clay];
}

export function reusable(clay: CuneiformClay): boolean {
  return clay !== "fired_ceramic";
}

export function archivalYears(clay: CuneiformClay): number {
  const a: Record<CuneiformClay, number> = {
    river_silt: 100, fine_alluvial: 200, mixed_chaff: 50, gypsum_blend: 150, fired_ceramic: 5000,
  };
  return a[clay];
}

export function stylusType(clay: CuneiformClay): string {
  const s: Record<CuneiformClay, string> = {
    river_silt: "reed_wedge", fine_alluvial: "reed_fine", mixed_chaff: "reed_blunt",
    gypsum_blend: "bone_stylus", fired_ceramic: "metal_stylus",
  };
  return s[clay];
}

export function weightGrams(clay: CuneiformClay): number {
  const w: Record<CuneiformClay, number> = {
    river_silt: 120, fine_alluvial: 80, mixed_chaff: 200, gypsum_blend: 150, fired_ceramic: 100,
  };
  return w[clay];
}

export function costEstimate(clay: CuneiformClay): number {
  const c: Record<CuneiformClay, number> = {
    river_silt: 1, fine_alluvial: 2, mixed_chaff: 1, gypsum_blend: 3, fired_ceramic: 5,
  };
  return c[clay];
}

export function cuneiformClays(): CuneiformClay[] {
  return ["river_silt", "fine_alluvial", "mixed_chaff", "gypsum_blend", "fired_ceramic"];
}
