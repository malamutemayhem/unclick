export type SqueezeBottleType = "fine_tip_precision" | "wide_mouth_pour" | "trigger_spray_mist" | "flip_cap_quick" | "needle_tip_detail";

export function flowControl(t: SqueezeBottleType): number {
  const m: Record<SqueezeBottleType, number> = {
    fine_tip_precision: 9, wide_mouth_pour: 4, trigger_spray_mist: 7, flip_cap_quick: 6, needle_tip_detail: 10,
  };
  return m[t];
}

export function capacity(t: SqueezeBottleType): number {
  const m: Record<SqueezeBottleType, number> = {
    fine_tip_precision: 6, wide_mouth_pour: 10, trigger_spray_mist: 8, flip_cap_quick: 7, needle_tip_detail: 4,
  };
  return m[t];
}

export function easeOfFill(t: SqueezeBottleType): number {
  const m: Record<SqueezeBottleType, number> = {
    fine_tip_precision: 6, wide_mouth_pour: 10, trigger_spray_mist: 7, flip_cap_quick: 8, needle_tip_detail: 4,
  };
  return m[t];
}

export function detailWork(t: SqueezeBottleType): number {
  const m: Record<SqueezeBottleType, number> = {
    fine_tip_precision: 9, wide_mouth_pour: 3, trigger_spray_mist: 5, flip_cap_quick: 4, needle_tip_detail: 10,
  };
  return m[t];
}

export function bottleCost(t: SqueezeBottleType): number {
  const m: Record<SqueezeBottleType, number> = {
    fine_tip_precision: 2, wide_mouth_pour: 1, trigger_spray_mist: 3, flip_cap_quick: 1, needle_tip_detail: 3,
  };
  return m[t];
}

export function leakProof(t: SqueezeBottleType): boolean {
  const m: Record<SqueezeBottleType, boolean> = {
    fine_tip_precision: true, wide_mouth_pour: false, trigger_spray_mist: true, flip_cap_quick: true, needle_tip_detail: true,
  };
  return m[t];
}

export function forSpray(t: SqueezeBottleType): boolean {
  const m: Record<SqueezeBottleType, boolean> = {
    fine_tip_precision: false, wide_mouth_pour: false, trigger_spray_mist: true, flip_cap_quick: false, needle_tip_detail: false,
  };
  return m[t];
}

export function bottleMaterial(t: SqueezeBottleType): string {
  const m: Record<SqueezeBottleType, string> = {
    fine_tip_precision: "ldpe_soft_squeeze",
    wide_mouth_pour: "hdpe_rigid_wide",
    trigger_spray_mist: "pet_trigger_pump",
    flip_cap_quick: "pp_flip_top",
    needle_tip_detail: "ldpe_needle_applicator",
  };
  return m[t];
}

export function bestUse(t: SqueezeBottleType): string {
  const m: Record<SqueezeBottleType, string> = {
    fine_tip_precision: "tie_dye_line_apply",
    wide_mouth_pour: "immersion_dye_mix",
    trigger_spray_mist: "surface_spray_dye",
    flip_cap_quick: "quick_dye_dispense",
    needle_tip_detail: "batik_detail_line",
  };
  return m[t];
}

export function squeezeBottles(): SqueezeBottleType[] {
  return ["fine_tip_precision", "wide_mouth_pour", "trigger_spray_mist", "flip_cap_quick", "needle_tip_detail"];
}
