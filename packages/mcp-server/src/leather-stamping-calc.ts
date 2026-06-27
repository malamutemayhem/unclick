export type StampCategory = "geometric" | "floral" | "border" | "background" | "figure_carving";

export function impressionDepthMm(category: StampCategory): number {
  const d: Record<StampCategory, number> = {
    geometric: 1, floral: 1.5, border: 0.8, background: 0.5, figure_carving: 2,
  };
  return d[category];
}

export function casingRequired(category: StampCategory): boolean {
  return true;
}

export function malletWeight(category: StampCategory): string {
  const w: Record<StampCategory, string> = {
    geometric: "medium", floral: "medium", border: "light",
    background: "light", figure_carving: "heavy",
  };
  return w[category];
}

export function skillLevel(category: StampCategory): number {
  const s: Record<StampCategory, number> = {
    geometric: 3, floral: 6, border: 4, background: 2, figure_carving: 9,
  };
  return s[category];
}

export function stampsNeeded(category: StampCategory): number {
  const s: Record<StampCategory, number> = {
    geometric: 3, floral: 8, border: 2, background: 1, figure_carving: 12,
  };
  return s[category];
}

export function leatherThicknessMinMm(category: StampCategory): number {
  const t: Record<StampCategory, number> = {
    geometric: 2, floral: 2.5, border: 1.5, background: 2, figure_carving: 3,
  };
  return t[category];
}

export function timePerCm2Seconds(category: StampCategory): number {
  const t: Record<StampCategory, number> = {
    geometric: 5, floral: 15, border: 8, background: 3, figure_carving: 30,
  };
  return t[category];
}

export function repeatabilityRating(category: StampCategory): number {
  const r: Record<StampCategory, number> = {
    geometric: 9, floral: 6, border: 8, background: 10, figure_carving: 3,
  };
  return r[category];
}

export function costPerStamp(category: StampCategory): number {
  const c: Record<StampCategory, number> = {
    geometric: 8, floral: 12, border: 10, background: 6, figure_carving: 15,
  };
  return c[category];
}

export function stampCategories(): StampCategory[] {
  return ["geometric", "floral", "border", "background", "figure_carving"];
}
