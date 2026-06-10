export type CraterType = "simple" | "complex" | "multi_ring" | "peak_ring" | "rampart";

export function diameterKm(crater: CraterType): number {
  const m: Record<CraterType, number> = {
    simple: 5, complex: 30, multi_ring: 300, peak_ring: 100, rampart: 20,
  };
  return m[crater];
}

export function depthToWidthRatio(crater: CraterType): number {
  const m: Record<CraterType, number> = {
    simple: 0.2, complex: 0.1, multi_ring: 0.05, peak_ring: 0.08, rampart: 0.12,
  };
  return m[crater];
}

export function centralPeakHeight(crater: CraterType): number {
  const m: Record<CraterType, number> = {
    simple: 0, complex: 8, multi_ring: 5, peak_ring: 3, rampart: 1,
  };
  return m[crater];
}

export function ejectaBlanketRadius(crater: CraterType): number {
  const m: Record<CraterType, number> = {
    simple: 3, complex: 6, multi_ring: 10, peak_ring: 8, rampart: 7,
  };
  return m[crater];
}

export function impactEnergy(crater: CraterType): number {
  const m: Record<CraterType, number> = {
    simple: 2, complex: 6, multi_ring: 10, peak_ring: 8, rampart: 4,
  };
  return m[crater];
}

export function hasCentralPeak(crater: CraterType): boolean {
  const m: Record<CraterType, boolean> = {
    simple: false, complex: true, multi_ring: false, peak_ring: false, rampart: false,
  };
  return m[crater];
}

export function subsurfaceIceIndicator(crater: CraterType): boolean {
  const m: Record<CraterType, boolean> = {
    simple: false, complex: false, multi_ring: false, peak_ring: false, rampart: true,
  };
  return m[crater];
}

export function exampleCrater(crater: CraterType): string {
  const m: Record<CraterType, string> = {
    simple: "meteor_crater", complex: "tycho", multi_ring: "valhalla",
    peak_ring: "chicxulub", rampart: "yuty",
  };
  return m[crater];
}

export function preservationDifficulty(crater: CraterType): number {
  const m: Record<CraterType, number> = {
    simple: 3, complex: 5, multi_ring: 8, peak_ring: 7, rampart: 6,
  };
  return m[crater];
}

export function craterTypes(): CraterType[] {
  return ["simple", "complex", "multi_ring", "peak_ring", "rampart"];
}
