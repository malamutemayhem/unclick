export type BandingWheelType = "steel_heavy_smooth" | "aluminum_light_fast" | "plastic_basic_spin" | "cast_iron_pro" | "wood_craft_turn";

export function spinSmooth(t: BandingWheelType): number {
  const m: Record<BandingWheelType, number> = {
    steel_heavy_smooth: 10, aluminum_light_fast: 8, plastic_basic_spin: 5, cast_iron_pro: 9, wood_craft_turn: 6,
  };
  return m[t];
}

export function momentum(t: BandingWheelType): number {
  const m: Record<BandingWheelType, number> = {
    steel_heavy_smooth: 10, aluminum_light_fast: 6, plastic_basic_spin: 3, cast_iron_pro: 9, wood_craft_turn: 5,
  };
  return m[t];
}

export function portability(t: BandingWheelType): number {
  const m: Record<BandingWheelType, number> = {
    steel_heavy_smooth: 4, aluminum_light_fast: 9, plastic_basic_spin: 10, cast_iron_pro: 3, wood_craft_turn: 7,
  };
  return m[t];
}

export function surfaceGrip(t: BandingWheelType): number {
  const m: Record<BandingWheelType, number> = {
    steel_heavy_smooth: 7, aluminum_light_fast: 6, plastic_basic_spin: 8, cast_iron_pro: 7, wood_craft_turn: 9,
  };
  return m[t];
}

export function wheelCost(t: BandingWheelType): number {
  const m: Record<BandingWheelType, number> = {
    steel_heavy_smooth: 2, aluminum_light_fast: 2, plastic_basic_spin: 1, cast_iron_pro: 3, wood_craft_turn: 1,
  };
  return m[t];
}

export function ballBearing(t: BandingWheelType): boolean {
  const m: Record<BandingWheelType, boolean> = {
    steel_heavy_smooth: true, aluminum_light_fast: true, plastic_basic_spin: false, cast_iron_pro: true, wood_craft_turn: false,
  };
  return m[t];
}

export function nonSlipBase(t: BandingWheelType): boolean {
  const m: Record<BandingWheelType, boolean> = {
    steel_heavy_smooth: true, aluminum_light_fast: false, plastic_basic_spin: true, cast_iron_pro: true, wood_craft_turn: false,
  };
  return m[t];
}

export function wheelMaterial(t: BandingWheelType): string {
  const m: Record<BandingWheelType, string> = {
    steel_heavy_smooth: "powder_coated_steel",
    aluminum_light_fast: "anodized_aluminum",
    plastic_basic_spin: "abs_molded_plastic",
    cast_iron_pro: "machined_cast_iron",
    wood_craft_turn: "birch_plywood_turned",
  };
  return m[t];
}

export function bestUse(t: BandingWheelType): string {
  const m: Record<BandingWheelType, string> = {
    steel_heavy_smooth: "glaze_band_line",
    aluminum_light_fast: "decorating_light_work",
    plastic_basic_spin: "student_basic_use",
    cast_iron_pro: "production_glaze_work",
    wood_craft_turn: "sculpture_view_rotate",
  };
  return m[t];
}

export function bandingWheels(): BandingWheelType[] {
  return ["steel_heavy_smooth", "aluminum_light_fast", "plastic_basic_spin", "cast_iron_pro", "wood_craft_turn"];
}
