export type RubberBandType = "standard_office_assorted" | "wide_flat_file_band" | "silicone_heat_resist" | "rubber_ball_desk_toy" | "heavy_duty_pallet_strap";

export function elasticity(t: RubberBandType): number {
  const m: Record<RubberBandType, number> = {
    standard_office_assorted: 7, wide_flat_file_band: 5, silicone_heat_resist: 9, rubber_ball_desk_toy: 8, heavy_duty_pallet_strap: 6,
  };
  return m[t];
}

export function holdStrength(t: RubberBandType): number {
  const m: Record<RubberBandType, number> = {
    standard_office_assorted: 5, wide_flat_file_band: 8, silicone_heat_resist: 7, rubber_ball_desk_toy: 4, heavy_duty_pallet_strap: 10,
  };
  return m[t];
}

export function durability(t: RubberBandType): number {
  const m: Record<RubberBandType, number> = {
    standard_office_assorted: 4, wide_flat_file_band: 6, silicone_heat_resist: 10, rubber_ball_desk_toy: 7, heavy_duty_pallet_strap: 9,
  };
  return m[t];
}

export function versatility(t: RubberBandType): number {
  const m: Record<RubberBandType, number> = {
    standard_office_assorted: 10, wide_flat_file_band: 5, silicone_heat_resist: 8, rubber_ball_desk_toy: 3, heavy_duty_pallet_strap: 4,
  };
  return m[t];
}

export function bandCost(t: RubberBandType): number {
  const m: Record<RubberBandType, number> = {
    standard_office_assorted: 1, wide_flat_file_band: 2, silicone_heat_resist: 5, rubber_ball_desk_toy: 2, heavy_duty_pallet_strap: 4,
  };
  return m[t];
}

export function uvResist(t: RubberBandType): boolean {
  const m: Record<RubberBandType, boolean> = {
    standard_office_assorted: false, wide_flat_file_band: false, silicone_heat_resist: true, rubber_ball_desk_toy: false, heavy_duty_pallet_strap: true,
  };
  return m[t];
}

export function latexFree(t: RubberBandType): boolean {
  const m: Record<RubberBandType, boolean> = {
    standard_office_assorted: false, wide_flat_file_band: false, silicone_heat_resist: true, rubber_ball_desk_toy: false, heavy_duty_pallet_strap: false,
  };
  return m[t];
}

export function bandMaterial(t: RubberBandType): string {
  const m: Record<RubberBandType, string> = {
    standard_office_assorted: "natural_latex_crepe",
    wide_flat_file_band: "natural_rubber_wide_cut",
    silicone_heat_resist: "food_grade_silicone",
    rubber_ball_desk_toy: "natural_latex_woven_ball",
    heavy_duty_pallet_strap: "epdm_industrial_rubber",
  };
  return m[t];
}

export function bestUse(t: RubberBandType): string {
  const m: Record<RubberBandType, string> = {
    standard_office_assorted: "general_office_bundle",
    wide_flat_file_band: "folder_binder_file_wrap",
    silicone_heat_resist: "kitchen_outdoor_reuse",
    rubber_ball_desk_toy: "desk_toy_stress_relief",
    heavy_duty_pallet_strap: "warehouse_shipping_secure",
  };
  return m[t];
}

export function rubberBands(): RubberBandType[] {
  return ["standard_office_assorted", "wide_flat_file_band", "silicone_heat_resist", "rubber_ball_desk_toy", "heavy_duty_pallet_strap"];
}
