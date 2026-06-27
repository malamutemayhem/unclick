export type ErosionType = "water" | "wind" | "glacial" | "chemical" | "thermal";

export function ratePerYear(e: ErosionType): number {
  const m: Record<ErosionType, number> = {
    water: 8, wind: 5, glacial: 9, chemical: 4, thermal: 6,
  };
  return m[e];
}

export function areaCoverage(e: ErosionType): number {
  const m: Record<ErosionType, number> = {
    water: 10, wind: 8, glacial: 6, chemical: 7, thermal: 3,
  };
  return m[e];
}

export function materialTransport(e: ErosionType): number {
  const m: Record<ErosionType, number> = {
    water: 9, wind: 6, glacial: 10, chemical: 3, thermal: 4,
  };
  return m[e];
}

export function landscapeImpact(e: ErosionType): number {
  const m: Record<ErosionType, number> = {
    water: 9, wind: 5, glacial: 10, chemical: 7, thermal: 6,
  };
  return m[e];
}

export function humanInfluence(e: ErosionType): number {
  const m: Record<ErosionType, number> = {
    water: 8, wind: 7, glacial: 2, chemical: 9, thermal: 3,
  };
  return m[e];
}

export function requiresWater(e: ErosionType): boolean {
  const m: Record<ErosionType, boolean> = {
    water: true, wind: false, glacial: true, chemical: true, thermal: false,
  };
  return m[e];
}

export function visibleShortTerm(e: ErosionType): boolean {
  const m: Record<ErosionType, boolean> = {
    water: true, wind: false, glacial: false, chemical: false, thermal: true,
  };
  return m[e];
}

export function landformCreated(e: ErosionType): string {
  const m: Record<ErosionType, string> = {
    water: "canyon", wind: "sand_dune", glacial: "u_valley",
    chemical: "cave", thermal: "talus_slope",
  };
  return m[e];
}

export function primaryAgent(e: ErosionType): string {
  const m: Record<ErosionType, string> = {
    water: "rivers", wind: "air_currents", glacial: "ice_sheets",
    chemical: "acid_rain", thermal: "freeze_thaw",
  };
  return m[e];
}

export function erosionTypes(): ErosionType[] {
  return ["water", "wind", "glacial", "chemical", "thermal"];
}
