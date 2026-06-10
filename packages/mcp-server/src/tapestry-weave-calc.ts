export type TapestryTechnique = "gobelin" | "aubusson" | "kilim" | "soumak" | "navajo";

export function warpDensityPerCm(tech: TapestryTechnique): number {
  const d: Record<TapestryTechnique, number> = {
    gobelin: 8, aubusson: 7, kilim: 5, soumak: 6, navajo: 4,
  };
  return d[tech];
}

export function weftPasses(tech: TapestryTechnique): number {
  const w: Record<TapestryTechnique, number> = {
    gobelin: 30, aubusson: 25, kilim: 15, soumak: 20, navajo: 12,
  };
  return w[tech];
}

export function colorChangesPerCm(tech: TapestryTechnique): number {
  const c: Record<TapestryTechnique, number> = {
    gobelin: 6, aubusson: 5, kilim: 3, soumak: 4, navajo: 2,
  };
  return c[tech];
}

export function reversible(tech: TapestryTechnique): boolean {
  return tech === "kilim" || tech === "aubusson";
}

export function textureRating(tech: TapestryTechnique): number {
  const t: Record<TapestryTechnique, number> = {
    gobelin: 5, aubusson: 4, kilim: 6, soumak: 9, navajo: 7,
  };
  return t[tech];
}

export function hoursPerM2(tech: TapestryTechnique): number {
  const h: Record<TapestryTechnique, number> = {
    gobelin: 200, aubusson: 180, kilim: 80, soumak: 150, navajo: 120,
  };
  return h[tech];
}

export function loomTypeRequired(tech: TapestryTechnique): string {
  const l: Record<TapestryTechnique, string> = {
    gobelin: "high_warp", aubusson: "low_warp", kilim: "frame",
    soumak: "frame", navajo: "upright",
  };
  return l[tech];
}

export function durabilityRating(tech: TapestryTechnique): number {
  const d: Record<TapestryTechnique, number> = {
    gobelin: 8, aubusson: 7, kilim: 9, soumak: 6, navajo: 8,
  };
  return d[tech];
}

export function costPerM2(tech: TapestryTechnique): number {
  const c: Record<TapestryTechnique, number> = {
    gobelin: 5000, aubusson: 4000, kilim: 800, soumak: 2000, navajo: 3000,
  };
  return c[tech];
}

export function tapestryTechniques(): TapestryTechnique[] {
  return ["gobelin", "aubusson", "kilim", "soumak", "navajo"];
}
