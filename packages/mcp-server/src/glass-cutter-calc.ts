export type GlassCutterType = "steel_wheel_standard" | "carbide_wheel_sharp" | "oil_fed_pistol" | "circle_cutter_compass" | "strip_cutter_guide";

export function cutPrecision(t: GlassCutterType): number {
  const m: Record<GlassCutterType, number> = {
    steel_wheel_standard: 6, carbide_wheel_sharp: 9, oil_fed_pistol: 8, circle_cutter_compass: 7, strip_cutter_guide: 10,
  };
  return m[t];
}

export function wheelLife(t: GlassCutterType): number {
  const m: Record<GlassCutterType, number> = {
    steel_wheel_standard: 4, carbide_wheel_sharp: 9, oil_fed_pistol: 8, circle_cutter_compass: 7, strip_cutter_guide: 8,
  };
  return m[t];
}

export function pressureControl(t: GlassCutterType): number {
  const m: Record<GlassCutterType, number> = {
    steel_wheel_standard: 5, carbide_wheel_sharp: 7, oil_fed_pistol: 9, circle_cutter_compass: 6, strip_cutter_guide: 8,
  };
  return m[t];
}

export function versatility(t: GlassCutterType): number {
  const m: Record<GlassCutterType, number> = {
    steel_wheel_standard: 8, carbide_wheel_sharp: 9, oil_fed_pistol: 7, circle_cutter_compass: 4, strip_cutter_guide: 5,
  };
  return m[t];
}

export function cutterCost(t: GlassCutterType): number {
  const m: Record<GlassCutterType, number> = {
    steel_wheel_standard: 1, carbide_wheel_sharp: 2, oil_fed_pistol: 3, circle_cutter_compass: 2, strip_cutter_guide: 3,
  };
  return m[t];
}

export function oilFed(t: GlassCutterType): boolean {
  const m: Record<GlassCutterType, boolean> = {
    steel_wheel_standard: false, carbide_wheel_sharp: false, oil_fed_pistol: true, circle_cutter_compass: false, strip_cutter_guide: false,
  };
  return m[t];
}

export function guidedCut(t: GlassCutterType): boolean {
  const m: Record<GlassCutterType, boolean> = {
    steel_wheel_standard: false, carbide_wheel_sharp: false, oil_fed_pistol: false, circle_cutter_compass: true, strip_cutter_guide: true,
  };
  return m[t];
}

export function wheelMaterial(t: GlassCutterType): string {
  const m: Record<GlassCutterType, string> = {
    steel_wheel_standard: "hardened_steel_wheel",
    carbide_wheel_sharp: "tungsten_carbide_wheel",
    oil_fed_pistol: "carbide_oil_reservoir",
    circle_cutter_compass: "carbide_pivot_arm",
    strip_cutter_guide: "carbide_rail_guided",
  };
  return m[t];
}

export function bestCut(t: GlassCutterType): string {
  const m: Record<GlassCutterType, string> = {
    steel_wheel_standard: "basic_straight_score",
    carbide_wheel_sharp: "curved_shape_freehand",
    oil_fed_pistol: "thick_glass_clean",
    circle_cutter_compass: "perfect_circle_disc",
    strip_cutter_guide: "parallel_strip_border",
  };
  return m[t];
}

export function glassCutters(): GlassCutterType[] {
  return ["steel_wheel_standard", "carbide_wheel_sharp", "oil_fed_pistol", "circle_cutter_compass", "strip_cutter_guide"];
}
