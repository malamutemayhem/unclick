export type MousePadType = "cloth_standard_soft" | "hard_plastic_speed" | "extended_desk_mat" | "glass_smooth_precision" | "leather_premium_office";

export function trackingAccuracy(t: MousePadType): number {
  const m: Record<MousePadType, number> = {
    cloth_standard_soft: 7, hard_plastic_speed: 9, extended_desk_mat: 7, glass_smooth_precision: 10, leather_premium_office: 6,
  };
  return m[t];
}

export function glideSpeed(t: MousePadType): number {
  const m: Record<MousePadType, number> = {
    cloth_standard_soft: 5, hard_plastic_speed: 9, extended_desk_mat: 6, glass_smooth_precision: 10, leather_premium_office: 7,
  };
  return m[t];
}

export function wristComfort(t: MousePadType): number {
  const m: Record<MousePadType, number> = {
    cloth_standard_soft: 8, hard_plastic_speed: 4, extended_desk_mat: 9, glass_smooth_precision: 3, leather_premium_office: 7,
  };
  return m[t];
}

export function durability(t: MousePadType): number {
  const m: Record<MousePadType, number> = {
    cloth_standard_soft: 5, hard_plastic_speed: 8, extended_desk_mat: 6, glass_smooth_precision: 10, leather_premium_office: 9,
  };
  return m[t];
}

export function padCost(t: MousePadType): number {
  const m: Record<MousePadType, number> = {
    cloth_standard_soft: 2, hard_plastic_speed: 5, extended_desk_mat: 6, glass_smooth_precision: 8, leather_premium_office: 9,
  };
  return m[t];
}

export function washable(t: MousePadType): boolean {
  const m: Record<MousePadType, boolean> = {
    cloth_standard_soft: true, hard_plastic_speed: true, extended_desk_mat: true, glass_smooth_precision: true, leather_premium_office: false,
  };
  return m[t];
}

export function stitchedEdge(t: MousePadType): boolean {
  const m: Record<MousePadType, boolean> = {
    cloth_standard_soft: true, hard_plastic_speed: false, extended_desk_mat: true, glass_smooth_precision: false, leather_premium_office: false,
  };
  return m[t];
}

export function surfaceMaterial(t: MousePadType): string {
  const m: Record<MousePadType, string> = {
    cloth_standard_soft: "micro_woven_polyester",
    hard_plastic_speed: "polycarbonate_textured",
    extended_desk_mat: "cordura_nylon_blend",
    glass_smooth_precision: "tempered_frosted_glass",
    leather_premium_office: "full_grain_cowhide",
  };
  return m[t];
}

export function bestUser(t: MousePadType): string {
  const m: Record<MousePadType, string> = {
    cloth_standard_soft: "general_office_casual",
    hard_plastic_speed: "fps_gamer_competitive",
    extended_desk_mat: "multi_device_workspace",
    glass_smooth_precision: "design_cad_precision",
    leather_premium_office: "executive_professional",
  };
  return m[t];
}

export function mousePads(): MousePadType[] {
  return ["cloth_standard_soft", "hard_plastic_speed", "extended_desk_mat", "glass_smooth_precision", "leather_premium_office"];
}
