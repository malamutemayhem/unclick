export type WristRestType = "memory_foam_keyboard" | "gel_filled_cool" | "wooden_palm_raise" | "leather_padded_roll" | "ergonomic_split_angle";

export function comfort(t: WristRestType): number {
  const m: Record<WristRestType, number> = {
    memory_foam_keyboard: 9, gel_filled_cool: 8, wooden_palm_raise: 5, leather_padded_roll: 7, ergonomic_split_angle: 10,
  };
  return m[t];
}

export function support(t: WristRestType): number {
  const m: Record<WristRestType, number> = {
    memory_foam_keyboard: 8, gel_filled_cool: 7, wooden_palm_raise: 9, leather_padded_roll: 6, ergonomic_split_angle: 10,
  };
  return m[t];
}

export function durability(t: WristRestType): number {
  const m: Record<WristRestType, number> = {
    memory_foam_keyboard: 7, gel_filled_cool: 5, wooden_palm_raise: 10, leather_padded_roll: 8, ergonomic_split_angle: 7,
  };
  return m[t];
}

export function coolTouch(t: WristRestType): number {
  const m: Record<WristRestType, number> = {
    memory_foam_keyboard: 4, gel_filled_cool: 10, wooden_palm_raise: 8, leather_padded_roll: 5, ergonomic_split_angle: 6,
  };
  return m[t];
}

export function restCost(t: WristRestType): number {
  const m: Record<WristRestType, number> = {
    memory_foam_keyboard: 4, gel_filled_cool: 5, wooden_palm_raise: 8, leather_padded_roll: 7, ergonomic_split_angle: 9,
  };
  return m[t];
}

export function nonSlip(t: WristRestType): boolean {
  const m: Record<WristRestType, boolean> = {
    memory_foam_keyboard: true, gel_filled_cool: true, wooden_palm_raise: true, leather_padded_roll: false, ergonomic_split_angle: true,
  };
  return m[t];
}

export function machineWash(t: WristRestType): boolean {
  const m: Record<WristRestType, boolean> = {
    memory_foam_keyboard: true, gel_filled_cool: false, wooden_palm_raise: false, leather_padded_roll: false, ergonomic_split_angle: true,
  };
  return m[t];
}

export function restMaterial(t: WristRestType): string {
  const m: Record<WristRestType, string> = {
    memory_foam_keyboard: "viscoelastic_foam_lycra_cover",
    gel_filled_cool: "polyurethane_gel_smooth_skin",
    wooden_palm_raise: "walnut_hardwood_contour",
    leather_padded_roll: "full_grain_leather_foam_core",
    ergonomic_split_angle: "dual_density_foam_tilt_base",
  };
  return m[t];
}

export function bestSetup(t: WristRestType): string {
  const m: Record<WristRestType, string> = {
    memory_foam_keyboard: "general_office_all_day",
    gel_filled_cool: "warm_climate_cool_desk",
    wooden_palm_raise: "standing_desk_minimal",
    leather_padded_roll: "executive_desk_premium",
    ergonomic_split_angle: "ergonomic_split_keyboard",
  };
  return m[t];
}

export function wristRests(): WristRestType[] {
  return ["memory_foam_keyboard", "gel_filled_cool", "wooden_palm_raise", "leather_padded_roll", "ergonomic_split_angle"];
}
