export type CurtainRodType = "tension_spring" | "single_decorative" | "double_layer" | "traverse_cord_draw" | "magnetic_steel";

export function installEase(t: CurtainRodType): number {
  const m: Record<CurtainRodType, number> = {
    tension_spring: 10, single_decorative: 6, double_layer: 5, traverse_cord_draw: 3, magnetic_steel: 9,
  };
  return m[t];
}

export function weightCapacity(t: CurtainRodType): number {
  const m: Record<CurtainRodType, number> = {
    tension_spring: 4, single_decorative: 7, double_layer: 8, traverse_cord_draw: 10, magnetic_steel: 3,
  };
  return m[t];
}

export function aestheticAppeal(t: CurtainRodType): number {
  const m: Record<CurtainRodType, number> = {
    tension_spring: 3, single_decorative: 9, double_layer: 8, traverse_cord_draw: 5, magnetic_steel: 4,
  };
  return m[t];
}

export function spanLength(t: CurtainRodType): number {
  const m: Record<CurtainRodType, number> = {
    tension_spring: 5, single_decorative: 8, double_layer: 8, traverse_cord_draw: 10, magnetic_steel: 4,
  };
  return m[t];
}

export function rodCost(t: CurtainRodType): number {
  const m: Record<CurtainRodType, number> = {
    tension_spring: 1, single_decorative: 4, double_layer: 6, traverse_cord_draw: 8, magnetic_steel: 3,
  };
  return m[t];
}

export function noDrilling(t: CurtainRodType): boolean {
  const m: Record<CurtainRodType, boolean> = {
    tension_spring: true, single_decorative: false, double_layer: false, traverse_cord_draw: false, magnetic_steel: true,
  };
  return m[t];
}

export function layerCapable(t: CurtainRodType): boolean {
  const m: Record<CurtainRodType, boolean> = {
    tension_spring: false, single_decorative: false, double_layer: true, traverse_cord_draw: true, magnetic_steel: false,
  };
  return m[t];
}

export function rodMaterial(t: CurtainRodType): string {
  const m: Record<CurtainRodType, string> = {
    tension_spring: "steel_spring_rubber_tip",
    single_decorative: "wrought_iron_finial",
    double_layer: "aluminum_double_track",
    traverse_cord_draw: "channel_glide_cord_pulley",
    magnetic_steel: "magnetic_rod_steel_frame",
  };
  return m[t];
}

export function bestWindow(t: CurtainRodType): string {
  const m: Record<CurtainRodType, string> = {
    tension_spring: "rental_small_window",
    single_decorative: "living_room_statement",
    double_layer: "sheer_plus_blackout",
    traverse_cord_draw: "wide_bay_window_stage",
    magnetic_steel: "steel_door_frame_quick",
  };
  return m[t];
}

export function curtainRods(): CurtainRodType[] {
  return ["tension_spring", "single_decorative", "double_layer", "traverse_cord_draw", "magnetic_steel"];
}
