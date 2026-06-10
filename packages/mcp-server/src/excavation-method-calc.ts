export type ExcavationMethod = "open_cut" | "cut_and_cover" | "tbm" | "drill_and_blast" | "dredging";

export function depthCapabilityM(e: ExcavationMethod): number {
  const m: Record<ExcavationMethod, number> = {
    open_cut: 20, cut_and_cover: 30, tbm: 100, drill_and_blast: 200, dredging: 50,
  };
  return m[e];
}

export function speedMPerDay(e: ExcavationMethod): number {
  const m: Record<ExcavationMethod, number> = {
    open_cut: 8, cut_and_cover: 3, tbm: 6, drill_and_blast: 4, dredging: 7,
  };
  return m[e];
}

export function surfaceDisruption(e: ExcavationMethod): number {
  const m: Record<ExcavationMethod, number> = {
    open_cut: 10, cut_and_cover: 7, tbm: 1, drill_and_blast: 3, dredging: 2,
  };
  return m[e];
}

export function costPerMeter(e: ExcavationMethod): number {
  const m: Record<ExcavationMethod, number> = {
    open_cut: 2, cut_and_cover: 6, tbm: 9, drill_and_blast: 5, dredging: 4,
  };
  return m[e];
}

export function vibrationLevel(e: ExcavationMethod): number {
  const m: Record<ExcavationMethod, number> = {
    open_cut: 5, cut_and_cover: 6, tbm: 3, drill_and_blast: 10, dredging: 2,
  };
  return m[e];
}

export function requiresDewatering(e: ExcavationMethod): boolean {
  const m: Record<ExcavationMethod, boolean> = {
    open_cut: true, cut_and_cover: true, tbm: false, drill_and_blast: false, dredging: false,
  };
  return m[e];
}

export function undergroundOnly(e: ExcavationMethod): boolean {
  const m: Record<ExcavationMethod, boolean> = {
    open_cut: false, cut_and_cover: false, tbm: true, drill_and_blast: true, dredging: false,
  };
  return m[e];
}

export function bestSoilType(e: ExcavationMethod): string {
  const m: Record<ExcavationMethod, string> = {
    open_cut: "soft_clay_sand", cut_and_cover: "urban_mixed",
    tbm: "uniform_rock_clay", drill_and_blast: "hard_rock",
    dredging: "underwater_sediment",
  };
  return m[e];
}

export function typicalProject(e: ExcavationMethod): string {
  const m: Record<ExcavationMethod, string> = {
    open_cut: "utility_trench", cut_and_cover: "metro_station",
    tbm: "rail_tunnel", drill_and_blast: "mining_tunnel",
    dredging: "harbor_deepening",
  };
  return m[e];
}

export function excavationMethods(): ExcavationMethod[] {
  return ["open_cut", "cut_and_cover", "tbm", "drill_and_blast", "dredging"];
}
