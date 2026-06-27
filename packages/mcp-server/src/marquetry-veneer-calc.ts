export type VeneerType = "ebony" | "rosewood" | "maple_burl" | "boxwood" | "holly";

export function thicknessMm(veneer: VeneerType): number {
  const t: Record<VeneerType, number> = {
    ebony: 0.6, rosewood: 0.6, maple_burl: 0.8, boxwood: 0.5, holly: 0.5,
  };
  return t[veneer];
}

export function cuttingDifficulty(veneer: VeneerType): number {
  const c: Record<VeneerType, number> = {
    ebony: 8, rosewood: 7, maple_burl: 9, boxwood: 5, holly: 4,
  };
  return c[veneer];
}

export function colorIntensity(veneer: VeneerType): number {
  const i: Record<VeneerType, number> = {
    ebony: 10, rosewood: 8, maple_burl: 6, boxwood: 3, holly: 2,
  };
  return i[veneer];
}

export function grainPattern(veneer: VeneerType): number {
  const g: Record<VeneerType, number> = {
    ebony: 5, rosewood: 8, maple_burl: 10, boxwood: 3, holly: 2,
  };
  return g[veneer];
}

export function gluingEase(veneer: VeneerType): number {
  const g: Record<VeneerType, number> = {
    ebony: 4, rosewood: 3, maple_burl: 5, boxwood: 8, holly: 9,
  };
  return g[veneer];
}

export function lightColored(veneer: VeneerType): boolean {
  const l: Record<VeneerType, boolean> = {
    ebony: false, rosewood: false, maple_burl: true, boxwood: true, holly: true,
  };
  return l[veneer];
}

export function bestDesignRole(veneer: VeneerType): string {
  const b: Record<VeneerType, string> = {
    ebony: "borders", rosewood: "backgrounds", maple_burl: "focal_points",
    boxwood: "fine_lines", holly: "highlights",
  };
  return b[veneer];
}

export function availabilityRating(veneer: VeneerType): number {
  const a: Record<VeneerType, number> = {
    ebony: 3, rosewood: 4, maple_burl: 5, boxwood: 6, holly: 7,
  };
  return a[veneer];
}

export function costPerSheet(veneer: VeneerType): number {
  const c: Record<VeneerType, number> = {
    ebony: 25, rosewood: 20, maple_burl: 30, boxwood: 15, holly: 12,
  };
  return c[veneer];
}

export function veneerTypes(): VeneerType[] {
  return ["ebony", "rosewood", "maple_burl", "boxwood", "holly"];
}
