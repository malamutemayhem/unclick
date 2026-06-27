export type DarningNeedleType = "bent_tip_knit" | "straight_blunt_large" | "chibi_locking_short" | "jumbo_eye_thick" | "curved_upholstery_long";

export function easeOfThread(t: DarningNeedleType): number {
  const m: Record<DarningNeedleType, number> = {
    bent_tip_knit: 7, straight_blunt_large: 8, chibi_locking_short: 9, jumbo_eye_thick: 10, curved_upholstery_long: 6,
  };
  return m[t];
}

export function stitchReach(t: DarningNeedleType): number {
  const m: Record<DarningNeedleType, number> = {
    bent_tip_knit: 7, straight_blunt_large: 8, chibi_locking_short: 5, jumbo_eye_thick: 6, curved_upholstery_long: 10,
  };
  return m[t];
}

export function yarnSafe(t: DarningNeedleType): number {
  const m: Record<DarningNeedleType, number> = {
    bent_tip_knit: 9, straight_blunt_large: 10, chibi_locking_short: 9, jumbo_eye_thick: 8, curved_upholstery_long: 7,
  };
  return m[t];
}

export function portability(t: DarningNeedleType): number {
  const m: Record<DarningNeedleType, number> = {
    bent_tip_knit: 7, straight_blunt_large: 6, chibi_locking_short: 10, jumbo_eye_thick: 5, curved_upholstery_long: 4,
  };
  return m[t];
}

export function needleCost(t: DarningNeedleType): number {
  const m: Record<DarningNeedleType, number> = {
    bent_tip_knit: 2, straight_blunt_large: 1, chibi_locking_short: 3, jumbo_eye_thick: 2, curved_upholstery_long: 3,
  };
  return m[t];
}

export function locking(t: DarningNeedleType): boolean {
  const m: Record<DarningNeedleType, boolean> = {
    bent_tip_knit: false, straight_blunt_large: false, chibi_locking_short: true, jumbo_eye_thick: false, curved_upholstery_long: false,
  };
  return m[t];
}

export function bentTip(t: DarningNeedleType): boolean {
  const m: Record<DarningNeedleType, boolean> = {
    bent_tip_knit: true, straight_blunt_large: false, chibi_locking_short: false, jumbo_eye_thick: false, curved_upholstery_long: true,
  };
  return m[t];
}

export function needleMaterial(t: DarningNeedleType): string {
  const m: Record<DarningNeedleType, string> = {
    bent_tip_knit: "steel_nickel_plated",
    straight_blunt_large: "aluminum_anodized",
    chibi_locking_short: "steel_spring_clasp",
    jumbo_eye_thick: "plastic_molded_large",
    curved_upholstery_long: "carbon_steel_curved",
  };
  return m[t];
}

export function bestProject(t: DarningNeedleType): string {
  const m: Record<DarningNeedleType, string> = {
    bent_tip_knit: "knit_seam_mattress",
    straight_blunt_large: "weave_end_finish",
    chibi_locking_short: "travel_project_quick",
    jumbo_eye_thick: "bulky_yarn_thread",
    curved_upholstery_long: "cushion_seam_close",
  };
  return m[t];
}

export function darningNeedles(): DarningNeedleType[] {
  return ["bent_tip_knit", "straight_blunt_large", "chibi_locking_short", "jumbo_eye_thick", "curved_upholstery_long"];
}
