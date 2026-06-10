export type TapestryNeedleType = "blunt_tip_large" | "bent_tip_angle" | "chibi_short_lock" | "jumbo_plastic_big" | "steel_fine_sharp";

export function eyeSize(t: TapestryNeedleType): number {
  const m: Record<TapestryNeedleType, number> = {
    blunt_tip_large: 9, bent_tip_angle: 7, chibi_short_lock: 6, jumbo_plastic_big: 10, steel_fine_sharp: 5,
  };
  return m[t];
}

export function weaveEase(t: TapestryNeedleType): number {
  const m: Record<TapestryNeedleType, number> = {
    blunt_tip_large: 8, bent_tip_angle: 10, chibi_short_lock: 7, jumbo_plastic_big: 6, steel_fine_sharp: 5,
  };
  return m[t];
}

export function threadRange(t: TapestryNeedleType): number {
  const m: Record<TapestryNeedleType, number> = {
    blunt_tip_large: 8, bent_tip_angle: 7, chibi_short_lock: 6, jumbo_plastic_big: 5, steel_fine_sharp: 10,
  };
  return m[t];
}

export function durability(t: TapestryNeedleType): number {
  const m: Record<TapestryNeedleType, number> = {
    blunt_tip_large: 8, bent_tip_angle: 7, chibi_short_lock: 9, jumbo_plastic_big: 5, steel_fine_sharp: 10,
  };
  return m[t];
}

export function needleCost(t: TapestryNeedleType): number {
  const m: Record<TapestryNeedleType, number> = {
    blunt_tip_large: 1, bent_tip_angle: 2, chibi_short_lock: 3, jumbo_plastic_big: 1, steel_fine_sharp: 2,
  };
  return m[t];
}

export function bluntTip(t: TapestryNeedleType): boolean {
  const m: Record<TapestryNeedleType, boolean> = {
    blunt_tip_large: true, bent_tip_angle: true, chibi_short_lock: true, jumbo_plastic_big: true, steel_fine_sharp: false,
  };
  return m[t];
}

export function locking(t: TapestryNeedleType): boolean {
  const m: Record<TapestryNeedleType, boolean> = {
    blunt_tip_large: false, bent_tip_angle: false, chibi_short_lock: true, jumbo_plastic_big: false, steel_fine_sharp: false,
  };
  return m[t];
}

export function needleMaterial(t: TapestryNeedleType): string {
  const m: Record<TapestryNeedleType, string> = {
    blunt_tip_large: "nickel_plate_steel",
    bent_tip_angle: "steel_bent_shaft",
    chibi_short_lock: "steel_locking_eye",
    jumbo_plastic_big: "acrylic_smooth_large",
    steel_fine_sharp: "tempered_steel_fine",
  };
  return m[t];
}

export function bestUse(t: TapestryNeedleType): string {
  const m: Record<TapestryNeedleType, string> = {
    blunt_tip_large: "general_yarn_weave",
    bent_tip_angle: "tight_space_seam",
    chibi_short_lock: "travel_secure_hold",
    jumbo_plastic_big: "bulky_yarn_finish",
    steel_fine_sharp: "fine_cross_stitch",
  };
  return m[t];
}

export function tapestryNeedles(): TapestryNeedleType[] {
  return ["blunt_tip_large", "bent_tip_angle", "chibi_short_lock", "jumbo_plastic_big", "steel_fine_sharp"];
}
