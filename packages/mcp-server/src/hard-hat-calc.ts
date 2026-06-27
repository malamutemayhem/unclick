export type HardHatType = "type_1_top_impact" | "type_2_lateral_protect" | "full_brim_sun_rain" | "vented_cool_indoor" | "cap_style_low_profile";

export function impactProtect(t: HardHatType): number {
  const m: Record<HardHatType, number> = {
    type_1_top_impact: 7, type_2_lateral_protect: 10, full_brim_sun_rain: 8, vented_cool_indoor: 6, cap_style_low_profile: 7,
  };
  return m[t];
}

export function ventilation(t: HardHatType): number {
  const m: Record<HardHatType, number> = {
    type_1_top_impact: 4, type_2_lateral_protect: 3, full_brim_sun_rain: 5, vented_cool_indoor: 10, cap_style_low_profile: 6,
  };
  return m[t];
}

export function weatherProtect(t: HardHatType): number {
  const m: Record<HardHatType, number> = {
    type_1_top_impact: 6, type_2_lateral_protect: 7, full_brim_sun_rain: 10, vented_cool_indoor: 2, cap_style_low_profile: 5,
  };
  return m[t];
}

export function comfort(t: HardHatType): number {
  const m: Record<HardHatType, number> = {
    type_1_top_impact: 6, type_2_lateral_protect: 5, full_brim_sun_rain: 7, vented_cool_indoor: 9, cap_style_low_profile: 10,
  };
  return m[t];
}

export function hatCost(t: HardHatType): number {
  const m: Record<HardHatType, number> = {
    type_1_top_impact: 3, type_2_lateral_protect: 6, full_brim_sun_rain: 5, vented_cool_indoor: 4, cap_style_low_profile: 3,
  };
  return m[t];
}

export function electricalRated(t: HardHatType): boolean {
  const m: Record<HardHatType, boolean> = {
    type_1_top_impact: true, type_2_lateral_protect: true, full_brim_sun_rain: true, vented_cool_indoor: false, cap_style_low_profile: true,
  };
  return m[t];
}

export function faceShieldCompat(t: HardHatType): boolean {
  const m: Record<HardHatType, boolean> = {
    type_1_top_impact: true, type_2_lateral_protect: true, full_brim_sun_rain: true, vented_cool_indoor: false, cap_style_low_profile: false,
  };
  return m[t];
}

export function shellMaterial(t: HardHatType): string {
  const m: Record<HardHatType, string> = {
    type_1_top_impact: "hdpe_high_density_poly",
    type_2_lateral_protect: "abs_eps_foam_liner",
    full_brim_sun_rain: "hdpe_full_brim_ratchet",
    vented_cool_indoor: "hdpe_vented_mesh_liner",
    cap_style_low_profile: "hdpe_low_profile_shell",
  };
  return m[t];
}

export function bestSite(t: HardHatType): string {
  const m: Record<HardHatType, string> = {
    type_1_top_impact: "general_construction_basic",
    type_2_lateral_protect: "industrial_mining_confined",
    full_brim_sun_rain: "outdoor_road_crew_sun",
    vented_cool_indoor: "warehouse_factory_indoor",
    cap_style_low_profile: "maintenance_low_clearance",
  };
  return m[t];
}

export function hardHats(): HardHatType[] {
  return ["type_1_top_impact", "type_2_lateral_protect", "full_brim_sun_rain", "vented_cool_indoor", "cap_style_low_profile"];
}
