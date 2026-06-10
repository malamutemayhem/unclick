export type YogaWheelType = "standard_abs_padded" | "cork_surface_eco" | "small_chirp_targeted" | "wide_barrel_stability" | "vibrating_massage_motor";

export function backRelief(t: YogaWheelType): number {
  const m: Record<YogaWheelType, number> = {
    standard_abs_padded: 8, cork_surface_eco: 7, small_chirp_targeted: 9, wide_barrel_stability: 7, vibrating_massage_motor: 10,
  };
  return m[t];
}

export function balanceChallenge(t: YogaWheelType): number {
  const m: Record<YogaWheelType, number> = {
    standard_abs_padded: 8, cork_surface_eco: 8, small_chirp_targeted: 6, wide_barrel_stability: 5, vibrating_massage_motor: 7,
  };
  return m[t];
}

export function gripSurface(t: YogaWheelType): number {
  const m: Record<YogaWheelType, number> = {
    standard_abs_padded: 7, cork_surface_eco: 10, small_chirp_targeted: 8, wide_barrel_stability: 7, vibrating_massage_motor: 6,
  };
  return m[t];
}

export function portability(t: YogaWheelType): number {
  const m: Record<YogaWheelType, number> = {
    standard_abs_padded: 7, cork_surface_eco: 7, small_chirp_targeted: 10, wide_barrel_stability: 4, vibrating_massage_motor: 6,
  };
  return m[t];
}

export function wheelCost(t: YogaWheelType): number {
  const m: Record<YogaWheelType, number> = {
    standard_abs_padded: 2, cork_surface_eco: 2, small_chirp_targeted: 2, wide_barrel_stability: 2, vibrating_massage_motor: 3,
  };
  return m[t];
}

export function hasVibration(t: YogaWheelType): boolean {
  const m: Record<YogaWheelType, boolean> = {
    standard_abs_padded: false, cork_surface_eco: false, small_chirp_targeted: false, wide_barrel_stability: false, vibrating_massage_motor: true,
  };
  return m[t];
}

export function ecoMaterial(t: YogaWheelType): boolean {
  const m: Record<YogaWheelType, boolean> = {
    standard_abs_padded: false, cork_surface_eco: true, small_chirp_targeted: false, wide_barrel_stability: false, vibrating_massage_motor: false,
  };
  return m[t];
}

export function surfaceFinish(t: YogaWheelType): string {
  const m: Record<YogaWheelType, string> = {
    standard_abs_padded: "tpe_foam_cushion",
    cork_surface_eco: "natural_cork_wrap",
    small_chirp_targeted: "textured_rubber_nubs",
    wide_barrel_stability: "smooth_foam_thick",
    vibrating_massage_motor: "silicone_ridged_pad",
  };
  return m[t];
}

export function bestUse(t: YogaWheelType): string {
  const m: Record<YogaWheelType, string> = {
    standard_abs_padded: "backbend_chest_opener",
    cork_surface_eco: "hot_yoga_sweaty_grip",
    small_chirp_targeted: "spine_targeted_release",
    wide_barrel_stability: "beginner_balance_support",
    vibrating_massage_motor: "myofascial_release_deep",
  };
  return m[t];
}

export function yogaWheels(): YogaWheelType[] {
  return ["standard_abs_padded", "cork_surface_eco", "small_chirp_targeted", "wide_barrel_stability", "vibrating_massage_motor"];
}
