export type HydropowerType = "conventional_dam" | "run_of_river" | "pumped_storage" | "tidal" | "wave";

export function capacityMw(hydro: HydropowerType): number {
  const m: Record<HydropowerType, number> = {
    conventional_dam: 2000, run_of_river: 100, pumped_storage: 1000, tidal: 250, wave: 50,
  };
  return m[hydro];
}

export function capacityFactor(hydro: HydropowerType): number {
  const m: Record<HydropowerType, number> = {
    conventional_dam: 50, run_of_river: 40, pumped_storage: 30, tidal: 25, wave: 15,
  };
  return m[hydro];
}

export function environmentalImpact(hydro: HydropowerType): number {
  const m: Record<HydropowerType, number> = {
    conventional_dam: 9, run_of_river: 3, pumped_storage: 6, tidal: 5, wave: 2,
  };
  return m[hydro];
}

export function constructionYears(hydro: HydropowerType): number {
  const m: Record<HydropowerType, number> = {
    conventional_dam: 10, run_of_river: 3, pumped_storage: 8, tidal: 5, wave: 2,
  };
  return m[hydro];
}

export function lifespanYears(hydro: HydropowerType): number {
  const m: Record<HydropowerType, number> = {
    conventional_dam: 100, run_of_river: 50, pumped_storage: 80, tidal: 40, wave: 25,
  };
  return m[hydro];
}

export function requiresReservoir(hydro: HydropowerType): boolean {
  const m: Record<HydropowerType, boolean> = {
    conventional_dam: true, run_of_river: false, pumped_storage: true, tidal: false, wave: false,
  };
  return m[hydro];
}

export function oceanBased(hydro: HydropowerType): boolean {
  const m: Record<HydropowerType, boolean> = {
    conventional_dam: false, run_of_river: false, pumped_storage: false, tidal: true, wave: true,
  };
  return m[hydro];
}

export function bestLocation(hydro: HydropowerType): string {
  const m: Record<HydropowerType, string> = {
    conventional_dam: "large_river", run_of_river: "mountain_stream", pumped_storage: "elevated_reservoir",
    tidal: "coastal_estuary", wave: "open_ocean",
  };
  return m[hydro];
}

export function storageCapable(hydro: HydropowerType): boolean {
  const m: Record<HydropowerType, boolean> = {
    conventional_dam: true, run_of_river: false, pumped_storage: true, tidal: false, wave: false,
  };
  return m[hydro];
}

export function hydropowerTypes(): HydropowerType[] {
  return ["conventional_dam", "run_of_river", "pumped_storage", "tidal", "wave"];
}
