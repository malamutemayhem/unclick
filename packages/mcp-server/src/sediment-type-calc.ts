export type SedimentType = "clay" | "silt" | "sand" | "gravel" | "cobble";

export function grainSizeMm(sediment: SedimentType): number {
  const m: Record<SedimentType, number> = {
    clay: 0.002, silt: 0.05, sand: 1, gravel: 20, cobble: 100,
  };
  return m[sediment];
}

export function sortingEase(sediment: SedimentType): number {
  const m: Record<SedimentType, number> = {
    clay: 2, silt: 4, sand: 8, gravel: 7, cobble: 9,
  };
  return m[sediment];
}

export function permeability(sediment: SedimentType): number {
  const m: Record<SedimentType, number> = {
    clay: 1, silt: 3, sand: 8, gravel: 10, cobble: 9,
  };
  return m[sediment];
}

export function compactionPotential(sediment: SedimentType): number {
  const m: Record<SedimentType, number> = {
    clay: 10, silt: 7, sand: 4, gravel: 2, cobble: 1,
  };
  return m[sediment];
}

export function transportDistance(sediment: SedimentType): number {
  const m: Record<SedimentType, number> = {
    clay: 10, silt: 8, sand: 6, gravel: 3, cobble: 1,
  };
  return m[sediment];
}

export function cohesive(sediment: SedimentType): boolean {
  const m: Record<SedimentType, boolean> = {
    clay: true, silt: true, sand: false, gravel: false, cobble: false,
  };
  return m[sediment];
}

export function windTransportable(sediment: SedimentType): boolean {
  const m: Record<SedimentType, boolean> = {
    clay: true, silt: true, sand: true, gravel: false, cobble: false,
  };
  return m[sediment];
}

export function bestDeposit(sediment: SedimentType): string {
  const m: Record<SedimentType, string> = {
    clay: "lake_bed", silt: "floodplain", sand: "beach",
    gravel: "river_bar", cobble: "mountain_stream",
  };
  return m[sediment];
}

export function settlingVelocity(sediment: SedimentType): number {
  const m: Record<SedimentType, number> = {
    clay: 1, silt: 3, sand: 7, gravel: 9, cobble: 10,
  };
  return m[sediment];
}

export function sedimentTypes(): SedimentType[] {
  return ["clay", "silt", "sand", "gravel", "cobble"];
}
