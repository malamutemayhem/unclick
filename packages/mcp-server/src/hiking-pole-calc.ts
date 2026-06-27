export type HikingPoleType = "aluminum_telescopic_basic" | "carbon_fiber_ultra" | "folding_z_pole_compact" | "cork_grip_shock_absorb" | "ski_pole_dual_purpose";

export function weightSaving(t: HikingPoleType): number {
  const m: Record<HikingPoleType, number> = {
    aluminum_telescopic_basic: 5, carbon_fiber_ultra: 10, folding_z_pole_compact: 8, cork_grip_shock_absorb: 6, ski_pole_dual_purpose: 4,
  };
  return m[t];
}

export function durability(t: HikingPoleType): number {
  const m: Record<HikingPoleType, number> = {
    aluminum_telescopic_basic: 9, carbon_fiber_ultra: 6, folding_z_pole_compact: 5, cork_grip_shock_absorb: 8, ski_pole_dual_purpose: 10,
  };
  return m[t];
}

export function packability(t: HikingPoleType): number {
  const m: Record<HikingPoleType, number> = {
    aluminum_telescopic_basic: 6, carbon_fiber_ultra: 7, folding_z_pole_compact: 10, cork_grip_shock_absorb: 5, ski_pole_dual_purpose: 3,
  };
  return m[t];
}

export function gripComfort(t: HikingPoleType): number {
  const m: Record<HikingPoleType, number> = {
    aluminum_telescopic_basic: 5, carbon_fiber_ultra: 7, folding_z_pole_compact: 6, cork_grip_shock_absorb: 10, ski_pole_dual_purpose: 6,
  };
  return m[t];
}

export function poleCost(t: HikingPoleType): number {
  const m: Record<HikingPoleType, number> = {
    aluminum_telescopic_basic: 2, carbon_fiber_ultra: 8, folding_z_pole_compact: 6, cork_grip_shock_absorb: 5, ski_pole_dual_purpose: 4,
  };
  return m[t];
}

export function shockAbsorb(t: HikingPoleType): boolean {
  const m: Record<HikingPoleType, boolean> = {
    aluminum_telescopic_basic: false, carbon_fiber_ultra: false, folding_z_pole_compact: false, cork_grip_shock_absorb: true, ski_pole_dual_purpose: false,
  };
  return m[t];
}

export function fitsInPack(t: HikingPoleType): boolean {
  const m: Record<HikingPoleType, boolean> = {
    aluminum_telescopic_basic: false, carbon_fiber_ultra: false, folding_z_pole_compact: true, cork_grip_shock_absorb: false, ski_pole_dual_purpose: false,
  };
  return m[t];
}

export function shaftMaterial(t: HikingPoleType): string {
  const m: Record<HikingPoleType, string> = {
    aluminum_telescopic_basic: "7075_aluminum_telescopic",
    carbon_fiber_ultra: "carbon_fiber_three_section",
    folding_z_pole_compact: "aluminum_z_fold_cord",
    cork_grip_shock_absorb: "aluminum_internal_spring",
    ski_pole_dual_purpose: "steel_fixed_length_basket",
  };
  return m[t];
}

export function bestTerrain(t: HikingPoleType): string {
  const m: Record<HikingPoleType, string> = {
    aluminum_telescopic_basic: "general_trail_day_hike",
    carbon_fiber_ultra: "ultralight_thru_hike",
    folding_z_pole_compact: "travel_flight_fast_pack",
    cork_grip_shock_absorb: "downhill_knee_relief",
    ski_pole_dual_purpose: "winter_snowshoe_ski_tour",
  };
  return m[t];
}

export function hikingPoles(): HikingPoleType[] {
  return ["aluminum_telescopic_basic", "carbon_fiber_ultra", "folding_z_pole_compact", "cork_grip_shock_absorb", "ski_pole_dual_purpose"];
}
