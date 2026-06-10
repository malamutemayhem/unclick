export type TravelBottleType = "silicone_squeeze_soft" | "hard_shell_flip_cap" | "spray_mist_atomizer" | "tube_refillable_labeled" | "jar_wide_mouth_cream";

export function leakProof(t: TravelBottleType): number {
  const m: Record<TravelBottleType, number> = {
    silicone_squeeze_soft: 7, hard_shell_flip_cap: 9, spray_mist_atomizer: 6, tube_refillable_labeled: 8, jar_wide_mouth_cream: 8,
  };
  return m[t];
}

export function fillEase(t: TravelBottleType): number {
  const m: Record<TravelBottleType, number> = {
    silicone_squeeze_soft: 8, hard_shell_flip_cap: 7, spray_mist_atomizer: 5, tube_refillable_labeled: 6, jar_wide_mouth_cream: 10,
  };
  return m[t];
}

export function dispensePrecision(t: TravelBottleType): number {
  const m: Record<TravelBottleType, number> = {
    silicone_squeeze_soft: 7, hard_shell_flip_cap: 8, spray_mist_atomizer: 10, tube_refillable_labeled: 8, jar_wide_mouth_cream: 4,
  };
  return m[t];
}

export function packability(t: TravelBottleType): number {
  const m: Record<TravelBottleType, number> = {
    silicone_squeeze_soft: 10, hard_shell_flip_cap: 6, spray_mist_atomizer: 7, tube_refillable_labeled: 9, jar_wide_mouth_cream: 5,
  };
  return m[t];
}

export function bottleCost(t: TravelBottleType): number {
  const m: Record<TravelBottleType, number> = {
    silicone_squeeze_soft: 2, hard_shell_flip_cap: 2, spray_mist_atomizer: 2, tube_refillable_labeled: 1, jar_wide_mouth_cream: 1,
  };
  return m[t];
}

export function tsaCompliant(t: TravelBottleType): boolean {
  const m: Record<TravelBottleType, boolean> = {
    silicone_squeeze_soft: true, hard_shell_flip_cap: true, spray_mist_atomizer: true, tube_refillable_labeled: true, jar_wide_mouth_cream: true,
  };
  return m[t];
}

export function squeezable(t: TravelBottleType): boolean {
  const m: Record<TravelBottleType, boolean> = {
    silicone_squeeze_soft: true, hard_shell_flip_cap: false, spray_mist_atomizer: false, tube_refillable_labeled: true, jar_wide_mouth_cream: false,
  };
  return m[t];
}

export function dispenseType(t: TravelBottleType): string {
  const m: Record<TravelBottleType, string> = {
    silicone_squeeze_soft: "press_squeeze_opening",
    hard_shell_flip_cap: "flip_top_snap_lid",
    spray_mist_atomizer: "pump_fine_mist",
    tube_refillable_labeled: "twist_cap_nozzle",
    jar_wide_mouth_cream: "screw_lid_open_top",
  };
  return m[t];
}

export function bestContent(t: TravelBottleType): string {
  const m: Record<TravelBottleType, string> = {
    silicone_squeeze_soft: "shampoo_body_wash",
    hard_shell_flip_cap: "lotion_conditioner",
    spray_mist_atomizer: "perfume_toner_mist",
    tube_refillable_labeled: "toothpaste_gel_serum",
    jar_wide_mouth_cream: "moisturizer_balm_thick",
  };
  return m[t];
}

export function travelBottles(): TravelBottleType[] {
  return ["silicone_squeeze_soft", "hard_shell_flip_cap", "spray_mist_atomizer", "tube_refillable_labeled", "jar_wide_mouth_cream"];
}
