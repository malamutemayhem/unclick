export type TatNeedleType = "size_5_standard" | "size_7_fine" | "size_3_heavy" | "size_1_bulky" | "flexible_soft_bend";

export function threadRange(t: TatNeedleType): number {
  const m: Record<TatNeedleType, number> = {
    size_5_standard: 8, size_7_fine: 6, size_3_heavy: 7, size_1_bulky: 5, flexible_soft_bend: 9,
  };
  return m[t];
}

export function detailFineness(t: TatNeedleType): number {
  const m: Record<TatNeedleType, number> = {
    size_5_standard: 7, size_7_fine: 10, size_3_heavy: 5, size_1_bulky: 3, flexible_soft_bend: 6,
  };
  return m[t];
}

export function easeOfUse(t: TatNeedleType): number {
  const m: Record<TatNeedleType, number> = {
    size_5_standard: 9, size_7_fine: 5, size_3_heavy: 8, size_1_bulky: 10, flexible_soft_bend: 7,
  };
  return m[t];
}

export function stitchSpeed(t: TatNeedleType): number {
  const m: Record<TatNeedleType, number> = {
    size_5_standard: 8, size_7_fine: 5, size_3_heavy: 9, size_1_bulky: 10, flexible_soft_bend: 7,
  };
  return m[t];
}

export function needleCost(t: TatNeedleType): number {
  const m: Record<TatNeedleType, number> = {
    size_5_standard: 2, size_7_fine: 3, size_3_heavy: 2, size_1_bulky: 2, flexible_soft_bend: 4,
  };
  return m[t];
}

export function forFine(t: TatNeedleType): boolean {
  const m: Record<TatNeedleType, boolean> = {
    size_5_standard: false, size_7_fine: true, size_3_heavy: false, size_1_bulky: false, flexible_soft_bend: false,
  };
  return m[t];
}

export function flexible(t: TatNeedleType): boolean {
  const m: Record<TatNeedleType, boolean> = {
    size_5_standard: false, size_7_fine: false, size_3_heavy: false, size_1_bulky: false, flexible_soft_bend: true,
  };
  return m[t];
}

export function needleMaterial(t: TatNeedleType): string {
  const m: Record<TatNeedleType, string> = {
    size_5_standard: "steel_blunt_tip",
    size_7_fine: "fine_steel_polished",
    size_3_heavy: "steel_thick_shaft",
    size_1_bulky: "aluminum_large_eye",
    flexible_soft_bend: "spring_steel_flex",
  };
  return m[t];
}

export function bestUse(t: TatNeedleType): string {
  const m: Record<TatNeedleType, string> = {
    size_5_standard: "general_tatting_learn",
    size_7_fine: "fine_lace_thread",
    size_3_heavy: "crochet_thread_med",
    size_1_bulky: "yarn_tatting_bulky",
    flexible_soft_bend: "tight_space_work",
  };
  return m[t];
}

export function tatNeedles(): TatNeedleType[] {
  return ["size_5_standard", "size_7_fine", "size_3_heavy", "size_1_bulky", "flexible_soft_bend"];
}
