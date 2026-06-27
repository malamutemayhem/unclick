export type GemClarity = "flawless" | "vvs" | "vs" | "si" | "included";

export function transparencyScore(c: GemClarity): number {
  const m: Record<GemClarity, number> = {
    flawless: 10, vvs: 9, vs: 7, si: 5, included: 3,
  };
  return m[c];
}

export function priceMultiplier(c: GemClarity): number {
  const m: Record<GemClarity, number> = {
    flawless: 10, vvs: 8, vs: 6, si: 4, included: 2,
  };
  return m[c];
}

export function rarityScore(c: GemClarity): number {
  const m: Record<GemClarity, number> = {
    flawless: 10, vvs: 8, vs: 5, si: 3, included: 1,
  };
  return m[c];
}

export function magnificationNeeded(c: GemClarity): number {
  const m: Record<GemClarity, number> = {
    flawless: 10, vvs: 10, vs: 10, si: 1, included: 1,
  };
  return m[c];
}

export function durabilityImpact(c: GemClarity): number {
  const m: Record<GemClarity, number> = {
    flawless: 10, vvs: 9, vs: 8, si: 6, included: 3,
  };
  return m[c];
}

export function eyeClean(c: GemClarity): boolean {
  const m: Record<GemClarity, boolean> = {
    flawless: true, vvs: true, vs: true, si: true, included: false,
  };
  return m[c];
}

export function investmentGrade(c: GemClarity): boolean {
  const m: Record<GemClarity, boolean> = {
    flawless: true, vvs: true, vs: false, si: false, included: false,
  };
  return m[c];
}

export function giaGradeRange(c: GemClarity): string {
  const m: Record<GemClarity, string> = {
    flawless: "fl_if", vvs: "vvs1_vvs2",
    vs: "vs1_vs2", si: "si1_si2",
    included: "i1_i2_i3",
  };
  return m[c];
}

export function inclusionType(c: GemClarity): string {
  const m: Record<GemClarity, string> = {
    flawless: "none", vvs: "pinpoint_minute",
    vs: "crystal_feather", si: "cloud_twinning",
    included: "visible_fractures",
  };
  return m[c];
}

export function gemClarities(): GemClarity[] {
  return ["flawless", "vvs", "vs", "si", "included"];
}
