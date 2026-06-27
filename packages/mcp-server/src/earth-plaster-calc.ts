export type EarthPlaster = "clay" | "lime_earth" | "gypsum_earth" | "tadelakt" | "cob_render";

export function thicknessMm(plaster: EarthPlaster): number {
  const t: Record<EarthPlaster, number> = {
    clay: 15, lime_earth: 12, gypsum_earth: 10, tadelakt: 8, cob_render: 25,
  };
  return t[plaster];
}

export function dryingDays(plaster: EarthPlaster): number {
  const d: Record<EarthPlaster, number> = {
    clay: 14, lime_earth: 21, gypsum_earth: 3, tadelakt: 7, cob_render: 28,
  };
  return d[plaster];
}

export function humidityRegulation(plaster: EarthPlaster): number {
  const h: Record<EarthPlaster, number> = {
    clay: 10, lime_earth: 7, gypsum_earth: 5, tadelakt: 4, cob_render: 8,
  };
  return h[plaster];
}

export function waterResistance(plaster: EarthPlaster): number {
  const w: Record<EarthPlaster, number> = {
    clay: 2, lime_earth: 6, gypsum_earth: 3, tadelakt: 9, cob_render: 3,
  };
  return w[plaster];
}

export function breathability(plaster: EarthPlaster): number {
  const b: Record<EarthPlaster, number> = {
    clay: 10, lime_earth: 8, gypsum_earth: 6, tadelakt: 5, cob_render: 9,
  };
  return b[plaster];
}

export function polishable(plaster: EarthPlaster): boolean {
  const p: Record<EarthPlaster, boolean> = {
    clay: false, lime_earth: false, gypsum_earth: false, tadelakt: true, cob_render: false,
  };
  return p[plaster];
}

export function bestRoom(plaster: EarthPlaster): string {
  const b: Record<EarthPlaster, string> = {
    clay: "bedroom", lime_earth: "living_room", gypsum_earth: "office",
    tadelakt: "bathroom", cob_render: "exterior",
  };
  return b[plaster];
}

export function repairEase(plaster: EarthPlaster): number {
  const r: Record<EarthPlaster, number> = {
    clay: 10, lime_earth: 6, gypsum_earth: 7, tadelakt: 3, cob_render: 8,
  };
  return r[plaster];
}

export function costPerM2(plaster: EarthPlaster): number {
  const c: Record<EarthPlaster, number> = {
    clay: 15, lime_earth: 25, gypsum_earth: 20, tadelakt: 60, cob_render: 10,
  };
  return c[plaster];
}

export function earthPlasters(): EarthPlaster[] {
  return ["clay", "lime_earth", "gypsum_earth", "tadelakt", "cob_render"];
}
