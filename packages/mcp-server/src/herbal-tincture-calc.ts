export type TinctureSolvent = "ethanol" | "glycerin" | "vinegar" | "oil" | "honey";

export function extractionStrength(solvent: TinctureSolvent): number {
  const e: Record<TinctureSolvent, number> = {
    ethanol: 10, glycerin: 6, vinegar: 5, oil: 4, honey: 3,
  };
  return e[solvent];
}

export function steepingWeeks(solvent: TinctureSolvent): number {
  const s: Record<TinctureSolvent, number> = {
    ethanol: 6, glycerin: 8, vinegar: 4, oil: 6, honey: 4,
  };
  return s[solvent];
}

export function shelfLifeMonths(solvent: TinctureSolvent): number {
  const l: Record<TinctureSolvent, number> = {
    ethanol: 60, glycerin: 24, vinegar: 12, oil: 6, honey: 36,
  };
  return l[solvent];
}

export function alcoholFree(solvent: TinctureSolvent): boolean {
  const a: Record<TinctureSolvent, boolean> = {
    ethanol: false, glycerin: true, vinegar: true, oil: true, honey: true,
  };
  return a[solvent];
}

export function tasteRating(solvent: TinctureSolvent): number {
  const t: Record<TinctureSolvent, number> = {
    ethanol: 3, glycerin: 8, vinegar: 4, oil: 5, honey: 9,
  };
  return t[solvent];
}

export function childSafe(solvent: TinctureSolvent): boolean {
  const c: Record<TinctureSolvent, boolean> = {
    ethanol: false, glycerin: true, vinegar: false, oil: true, honey: false,
  };
  return c[solvent];
}

export function herbToSolventRatio(solvent: TinctureSolvent): string {
  const r: Record<TinctureSolvent, string> = {
    ethanol: "1:5", glycerin: "1:3", vinegar: "1:4", oil: "1:3", honey: "1:2",
  };
  return r[solvent];
}

export function bestHerb(solvent: TinctureSolvent): string {
  const b: Record<TinctureSolvent, string> = {
    ethanol: "echinacea", glycerin: "elderberry", vinegar: "garlic",
    oil: "calendula", honey: "ginger",
  };
  return b[solvent];
}

export function costPerLiter(solvent: TinctureSolvent): number {
  const c: Record<TinctureSolvent, number> = {
    ethanol: 25, glycerin: 15, vinegar: 5, oil: 20, honey: 30,
  };
  return c[solvent];
}

export function tinctureSolvents(): TinctureSolvent[] {
  return ["ethanol", "glycerin", "vinegar", "oil", "honey"];
}
