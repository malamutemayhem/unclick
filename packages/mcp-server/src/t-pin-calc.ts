export type TPinType = "steel_standard_sharp" | "brass_rust_free" | "long_heavy_duty" | "fine_lace_thin" | "ball_head_grip";

export function holdStrength(t: TPinType): number {
  const m: Record<TPinType, number> = {
    steel_standard_sharp: 8, brass_rust_free: 7, long_heavy_duty: 10, fine_lace_thin: 5, ball_head_grip: 7,
  };
  return m[t];
}

export function sharpness(t: TPinType): number {
  const m: Record<TPinType, number> = {
    steel_standard_sharp: 9, brass_rust_free: 7, long_heavy_duty: 8, fine_lace_thin: 10, ball_head_grip: 7,
  };
  return m[t];
}

export function easeOfGrip(t: TPinType): number {
  const m: Record<TPinType, number> = {
    steel_standard_sharp: 7, brass_rust_free: 7, long_heavy_duty: 8, fine_lace_thin: 5, ball_head_grip: 10,
  };
  return m[t];
}

export function yarnSafe(t: TPinType): number {
  const m: Record<TPinType, number> = {
    steel_standard_sharp: 6, brass_rust_free: 9, long_heavy_duty: 6, fine_lace_thin: 10, ball_head_grip: 7,
  };
  return m[t];
}

export function pinCost(t: TPinType): number {
  const m: Record<TPinType, number> = {
    steel_standard_sharp: 1, brass_rust_free: 3, long_heavy_duty: 2, fine_lace_thin: 2, ball_head_grip: 2,
  };
  return m[t];
}

export function rustResist(t: TPinType): boolean {
  const m: Record<TPinType, boolean> = {
    steel_standard_sharp: false, brass_rust_free: true, long_heavy_duty: false, fine_lace_thin: false, ball_head_grip: false,
  };
  return m[t];
}

export function forLace(t: TPinType): boolean {
  const m: Record<TPinType, boolean> = {
    steel_standard_sharp: false, brass_rust_free: false, long_heavy_duty: false, fine_lace_thin: true, ball_head_grip: false,
  };
  return m[t];
}

export function pinMaterial(t: TPinType): string {
  const m: Record<TPinType, string> = {
    steel_standard_sharp: "carbon_steel_nickel",
    brass_rust_free: "solid_brass_polished",
    long_heavy_duty: "hardened_steel_thick",
    fine_lace_thin: "thin_gauge_steel",
    ball_head_grip: "steel_plastic_ball",
  };
  return m[t];
}

export function bestUse(t: TPinType): string {
  const m: Record<TPinType, string> = {
    steel_standard_sharp: "general_block_pin",
    brass_rust_free: "wet_block_soak_safe",
    long_heavy_duty: "thick_fabric_hold",
    fine_lace_thin: "delicate_lace_point",
    ball_head_grip: "easy_place_remove",
  };
  return m[t];
}

export function tPins(): TPinType[] {
  return ["steel_standard_sharp", "brass_rust_free", "long_heavy_duty", "fine_lace_thin", "ball_head_grip"];
}
