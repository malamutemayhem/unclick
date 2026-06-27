export type ThrowingBatType = "plywood_round_standard" | "plaster_absorbing_wet" | "plastic_mold_light" | "mdf_smooth_flat" | "pin_system_quick_release";

export function claySticktion(t: ThrowingBatType): number {
  const m: Record<ThrowingBatType, number> = {
    plywood_round_standard: 7, plaster_absorbing_wet: 10, plastic_mold_light: 5, mdf_smooth_flat: 8, pin_system_quick_release: 7,
  };
  return m[t];
}

export function releaseEase(t: ThrowingBatType): number {
  const m: Record<ThrowingBatType, number> = {
    plywood_round_standard: 6, plaster_absorbing_wet: 10, plastic_mold_light: 8, mdf_smooth_flat: 7, pin_system_quick_release: 9,
  };
  return m[t];
}

export function durability(t: ThrowingBatType): number {
  const m: Record<ThrowingBatType, number> = {
    plywood_round_standard: 9, plaster_absorbing_wet: 4, plastic_mold_light: 7, mdf_smooth_flat: 6, pin_system_quick_release: 8,
  };
  return m[t];
}

export function flatness(t: ThrowingBatType): number {
  const m: Record<ThrowingBatType, number> = {
    plywood_round_standard: 7, plaster_absorbing_wet: 8, plastic_mold_light: 9, mdf_smooth_flat: 10, pin_system_quick_release: 8,
  };
  return m[t];
}

export function batCost(t: ThrowingBatType): number {
  const m: Record<ThrowingBatType, number> = {
    plywood_round_standard: 1, plaster_absorbing_wet: 1, plastic_mold_light: 2, mdf_smooth_flat: 1, pin_system_quick_release: 3,
  };
  return m[t];
}

export function absorbsMoisture(t: ThrowingBatType): boolean {
  const m: Record<ThrowingBatType, boolean> = {
    plywood_round_standard: false, plaster_absorbing_wet: true, plastic_mold_light: false, mdf_smooth_flat: false, pin_system_quick_release: false,
  };
  return m[t];
}

export function quickSwap(t: ThrowingBatType): boolean {
  const m: Record<ThrowingBatType, boolean> = {
    plywood_round_standard: false, plaster_absorbing_wet: false, plastic_mold_light: false, mdf_smooth_flat: false, pin_system_quick_release: true,
  };
  return m[t];
}

export function batMaterial(t: ThrowingBatType): string {
  const m: Record<ThrowingBatType, string> = {
    plywood_round_standard: "birch_plywood_sealed",
    plaster_absorbing_wet: "pottery_plaster_cast",
    plastic_mold_light: "hdpe_molded_disc",
    mdf_smooth_flat: "medium_density_fiber",
    pin_system_quick_release: "composite_pin_mount",
  };
  return m[t];
}

export function bestPot(t: ThrowingBatType): string {
  const m: Record<ThrowingBatType, string> = {
    plywood_round_standard: "general_wheel_thrown",
    plaster_absorbing_wet: "wide_platter_bowl",
    plastic_mold_light: "classroom_shared_use",
    mdf_smooth_flat: "flat_bottom_tile",
    pin_system_quick_release: "production_batch_throw",
  };
  return m[t];
}

export function throwingBats(): ThrowingBatType[] {
  return ["plywood_round_standard", "plaster_absorbing_wet", "plastic_mold_light", "mdf_smooth_flat", "pin_system_quick_release"];
}
