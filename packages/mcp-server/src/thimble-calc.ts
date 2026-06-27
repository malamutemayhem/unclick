export type ThimbleType = "metal_closed_top" | "leather_coin_pad" | "rubber_grip_dot" | "ceramic_porcelain_decor" | "silicone_flexible_soft";

export function pushForce(t: ThimbleType): number {
  const m: Record<ThimbleType, number> = {
    metal_closed_top: 10, leather_coin_pad: 6, rubber_grip_dot: 7, ceramic_porcelain_decor: 8, silicone_flexible_soft: 5,
  };
  return m[t];
}

export function comfort(t: ThimbleType): number {
  const m: Record<ThimbleType, number> = {
    metal_closed_top: 5, leather_coin_pad: 9, rubber_grip_dot: 8, ceramic_porcelain_decor: 4, silicone_flexible_soft: 10,
  };
  return m[t];
}

export function durability(t: ThimbleType): number {
  const m: Record<ThimbleType, number> = {
    metal_closed_top: 10, leather_coin_pad: 5, rubber_grip_dot: 6, ceramic_porcelain_decor: 3, silicone_flexible_soft: 7,
  };
  return m[t];
}

export function gripControl(t: ThimbleType): number {
  const m: Record<ThimbleType, number> = {
    metal_closed_top: 6, leather_coin_pad: 8, rubber_grip_dot: 10, ceramic_porcelain_decor: 5, silicone_flexible_soft: 9,
  };
  return m[t];
}

export function thimbleCost(t: ThimbleType): number {
  const m: Record<ThimbleType, number> = {
    metal_closed_top: 5, leather_coin_pad: 6, rubber_grip_dot: 3, ceramic_porcelain_decor: 8, silicone_flexible_soft: 4,
  };
  return m[t];
}

export function closedTop(t: ThimbleType): boolean {
  const m: Record<ThimbleType, boolean> = {
    metal_closed_top: true, leather_coin_pad: false, rubber_grip_dot: false, ceramic_porcelain_decor: true, silicone_flexible_soft: false,
  };
  return m[t];
}

export function adjustableFit(t: ThimbleType): boolean {
  const m: Record<ThimbleType, boolean> = {
    metal_closed_top: false, leather_coin_pad: true, rubber_grip_dot: true, ceramic_porcelain_decor: false, silicone_flexible_soft: true,
  };
  return m[t];
}

export function thimbleMaterial(t: ThimbleType): string {
  const m: Record<ThimbleType, string> = {
    metal_closed_top: "nickel_plated_brass",
    leather_coin_pad: "vegetable_tanned_cowhide",
    rubber_grip_dot: "natural_rubber_dimpled",
    ceramic_porcelain_decor: "glazed_stoneware_painted",
    silicone_flexible_soft: "medical_grade_silicone",
  };
  return m[t];
}

export function bestTask(t: ThimbleType): string {
  const m: Record<ThimbleType, string> = {
    metal_closed_top: "heavy_canvas_upholstery",
    leather_coin_pad: "hand_quilting_long_session",
    rubber_grip_dot: "embroidery_fine_detail",
    ceramic_porcelain_decor: "collectible_display_gift",
    silicone_flexible_soft: "beginner_general_sewing",
  };
  return m[t];
}

export function thimbles(): ThimbleType[] {
  return ["metal_closed_top", "leather_coin_pad", "rubber_grip_dot", "ceramic_porcelain_decor", "silicone_flexible_soft"];
}
