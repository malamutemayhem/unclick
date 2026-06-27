export type FlourType = "all_purpose" | "bread" | "cake" | "whole_wheat" | "semolina";

export function proteinPercent(f: FlourType): number {
  const m: Record<FlourType, number> = {
    all_purpose: 11, bread: 14, cake: 8, whole_wheat: 13, semolina: 12,
  };
  return m[f];
}

export function glutenStrength(f: FlourType): number {
  const m: Record<FlourType, number> = {
    all_purpose: 6, bread: 9, cake: 3, whole_wheat: 7, semolina: 8,
  };
  return m[f];
}

export function absorptionRate(f: FlourType): number {
  const m: Record<FlourType, number> = {
    all_purpose: 6, bread: 8, cake: 5, whole_wheat: 9, semolina: 7,
  };
  return m[f];
}

export function fiberContent(f: FlourType): number {
  const m: Record<FlourType, number> = {
    all_purpose: 3, bread: 4, cake: 2, whole_wheat: 10, semolina: 5,
  };
  return m[f];
}

export function fineness(f: FlourType): number {
  const m: Record<FlourType, number> = {
    all_purpose: 7, bread: 6, cake: 10, whole_wheat: 4, semolina: 3,
  };
  return m[f];
}

export function isRefined(f: FlourType): boolean {
  const m: Record<FlourType, boolean> = {
    all_purpose: true, bread: true, cake: true, whole_wheat: false, semolina: true,
  };
  return m[f];
}

export function selfRisingAvailable(f: FlourType): boolean {
  const m: Record<FlourType, boolean> = {
    all_purpose: true, bread: false, cake: true, whole_wheat: false, semolina: false,
  };
  return m[f];
}

export function bestUse(f: FlourType): string {
  const m: Record<FlourType, string> = {
    all_purpose: "cookies_general", bread: "yeast_breads",
    cake: "cakes_pastries", whole_wheat: "dense_breads_muffins",
    semolina: "pasta_couscous",
  };
  return m[f];
}

export function grainSource(f: FlourType): string {
  const m: Record<FlourType, string> = {
    all_purpose: "hard_soft_wheat_blend", bread: "hard_red_wheat",
    cake: "soft_winter_wheat", whole_wheat: "whole_wheat_berry",
    semolina: "durum_wheat",
  };
  return m[f];
}

export function flourTypes(): FlourType[] {
  return ["all_purpose", "bread", "cake", "whole_wheat", "semolina"];
}
