export type HorsehairUse = "bow_hair" | "fiddle_string" | "morin_khuur" | "erhu_bow" | "weaving_thread";

export function hairsPerBundle(use: HorsehairUse): number {
  const h: Record<HorsehairUse, number> = {
    bow_hair: 180, fiddle_string: 40, morin_khuur: 120, erhu_bow: 100, weaving_thread: 20,
  };
  return h[use];
}

export function tensileStrengthGrams(use: HorsehairUse): number {
  const t: Record<HorsehairUse, number> = {
    bow_hair: 80, fiddle_string: 120, morin_khuur: 100, erhu_bow: 90, weaving_thread: 60,
  };
  return t[use];
}

export function gripRating(use: HorsehairUse): number {
  const g: Record<HorsehairUse, number> = {
    bow_hair: 9, fiddle_string: 5, morin_khuur: 7, erhu_bow: 8, weaving_thread: 3,
  };
  return g[use];
}

export function rosinRequired(use: HorsehairUse): boolean {
  return use === "bow_hair" || use === "erhu_bow" || use === "morin_khuur";
}

export function replacementMonths(use: HorsehairUse): number {
  const r: Record<HorsehairUse, number> = {
    bow_hair: 6, fiddle_string: 3, morin_khuur: 4, erhu_bow: 5, weaving_thread: 12,
  };
  return r[use];
}

export function sourcePreference(use: HorsehairUse): string {
  const s: Record<HorsehairUse, string> = {
    bow_hair: "mongolian_stallion", fiddle_string: "mare_tail",
    morin_khuur: "mongolian_stallion", erhu_bow: "stallion_tail",
    weaving_thread: "mixed",
  };
  return s[use];
}

export function colorPreference(use: HorsehairUse): string {
  const c: Record<HorsehairUse, string> = {
    bow_hair: "white", fiddle_string: "black", morin_khuur: "mixed",
    erhu_bow: "white", weaving_thread: "natural",
  };
  return c[use];
}

export function toneContribution(use: HorsehairUse): number {
  const t: Record<HorsehairUse, number> = {
    bow_hair: 8, fiddle_string: 9, morin_khuur: 7, erhu_bow: 8, weaving_thread: 0,
  };
  return t[use];
}

export function costPerHank(use: HorsehairUse): number {
  const c: Record<HorsehairUse, number> = {
    bow_hair: 40, fiddle_string: 20, morin_khuur: 30, erhu_bow: 35, weaving_thread: 15,
  };
  return c[use];
}

export function horsehairUses(): HorsehairUse[] {
  return ["bow_hair", "fiddle_string", "morin_khuur", "erhu_bow", "weaving_thread"];
}
