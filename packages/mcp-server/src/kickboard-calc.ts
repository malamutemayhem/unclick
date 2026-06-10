export type KickboardType = "standard_foam_flat" | "ergonomic_contour_grip" | "pull_buoy_combo_dual" | "junior_small_light" | "torpedo_streamline_speed";

export function buoyancy(t: KickboardType): number {
  const m: Record<KickboardType, number> = {
    standard_foam_flat: 8, ergonomic_contour_grip: 7, pull_buoy_combo_dual: 6, junior_small_light: 5, torpedo_streamline_speed: 4,
  };
  return m[t];
}

export function gripComfort(t: KickboardType): number {
  const m: Record<KickboardType, number> = {
    standard_foam_flat: 6, ergonomic_contour_grip: 10, pull_buoy_combo_dual: 7, junior_small_light: 7, torpedo_streamline_speed: 8,
  };
  return m[t];
}

export function dragProfile(t: KickboardType): number {
  const m: Record<KickboardType, number> = {
    standard_foam_flat: 4, ergonomic_contour_grip: 6, pull_buoy_combo_dual: 5, junior_small_light: 7, torpedo_streamline_speed: 10,
  };
  return m[t];
}

export function durability(t: KickboardType): number {
  const m: Record<KickboardType, number> = {
    standard_foam_flat: 6, ergonomic_contour_grip: 8, pull_buoy_combo_dual: 7, junior_small_light: 5, torpedo_streamline_speed: 9,
  };
  return m[t];
}

export function boardCost(t: KickboardType): number {
  const m: Record<KickboardType, number> = {
    standard_foam_flat: 1, ergonomic_contour_grip: 3, pull_buoy_combo_dual: 2, junior_small_light: 1, torpedo_streamline_speed: 3,
  };
  return m[t];
}

export function multiUse(t: KickboardType): boolean {
  const m: Record<KickboardType, boolean> = {
    standard_foam_flat: false, ergonomic_contour_grip: false, pull_buoy_combo_dual: true, junior_small_light: false, torpedo_streamline_speed: false,
  };
  return m[t];
}

export function chlorineResist(t: KickboardType): boolean {
  const m: Record<KickboardType, boolean> = {
    standard_foam_flat: true, ergonomic_contour_grip: true, pull_buoy_combo_dual: true, junior_small_light: true, torpedo_streamline_speed: true,
  };
  return m[t];
}

export function coreMaterial(t: KickboardType): string {
  const m: Record<KickboardType, string> = {
    standard_foam_flat: "eva_closed_cell_foam",
    ergonomic_contour_grip: "molded_eva_ergonomic",
    pull_buoy_combo_dual: "dual_density_foam",
    junior_small_light: "soft_pe_foam_light",
    torpedo_streamline_speed: "hydrodynamic_eva_shell",
  };
  return m[t];
}

export function bestSwimmer(t: KickboardType): string {
  const m: Record<KickboardType, string> = {
    standard_foam_flat: "beginner_learn_kick",
    ergonomic_contour_grip: "distance_endurance",
    pull_buoy_combo_dual: "drill_variety_pack",
    junior_small_light: "child_swim_lesson",
    torpedo_streamline_speed: "competitive_sprint",
  };
  return m[t];
}

export function kickboards(): KickboardType[] {
  return ["standard_foam_flat", "ergonomic_contour_grip", "pull_buoy_combo_dual", "junior_small_light", "torpedo_streamline_speed"];
}
