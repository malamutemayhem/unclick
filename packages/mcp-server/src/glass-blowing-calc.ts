export type GlassType = "soda_lime" | "borosilicate" | "lead_crystal" | "art_glass" | "bottle_glass";

export function workingTempCelsius(type: GlassType): number {
  const t: Record<GlassType, number> = {
    soda_lime: 1050, borosilicate: 1250, lead_crystal: 950,
    art_glass: 1000, bottle_glass: 1100,
  };
  return t[type];
}

export function gatherWeightKg(type: GlassType): number {
  const w: Record<GlassType, number> = {
    soda_lime: 2, borosilicate: 1.5, lead_crystal: 3,
    art_glass: 1, bottle_glass: 2.5,
  };
  return w[type];
}

export function workingTimeSeconds(type: GlassType): number {
  const t: Record<GlassType, number> = {
    soda_lime: 45, borosilicate: 60, lead_crystal: 30,
    art_glass: 40, bottle_glass: 50,
  };
  return t[type];
}

export function clarityRating(type: GlassType): number {
  const c: Record<GlassType, number> = {
    soda_lime: 7, borosilicate: 8, lead_crystal: 10,
    art_glass: 6, bottle_glass: 5,
  };
  return c[type];
}

export function thermalShockResistance(type: GlassType): number {
  const r: Record<GlassType, number> = {
    soda_lime: 4, borosilicate: 10, lead_crystal: 2,
    art_glass: 5, bottle_glass: 3,
  };
  return r[type];
}

export function colorRange(type: GlassType): number {
  const c: Record<GlassType, number> = {
    soda_lime: 7, borosilicate: 5, lead_crystal: 4,
    art_glass: 10, bottle_glass: 3,
  };
  return c[type];
}

export function refractiveIndex(type: GlassType): number {
  const r: Record<GlassType, number> = {
    soda_lime: 1.52, borosilicate: 1.47, lead_crystal: 1.65,
    art_glass: 1.53, bottle_glass: 1.51,
  };
  return r[type];
}

export function blowpipeRequired(type: GlassType): boolean {
  return true;
}

export function costPerKg(type: GlassType): number {
  const c: Record<GlassType, number> = {
    soda_lime: 5, borosilicate: 15, lead_crystal: 25,
    art_glass: 30, bottle_glass: 3,
  };
  return c[type];
}

export function glassTypes(): GlassType[] {
  return ["soda_lime", "borosilicate", "lead_crystal", "art_glass", "bottle_glass"];
}
