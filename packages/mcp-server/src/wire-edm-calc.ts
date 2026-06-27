export type WireEdmType =
  | "standard_brass_wire"
  | "submerged_flush"
  | "high_speed_molybdenum"
  | "fine_wire_micro"
  | "taper_cutting";

interface WireEdmData {
  cutSpeed: number;
  precision: number;
  surfaceFinish: number;
  thicknessCapacity: number;
  weCost: number;
  submerged: boolean;
  forMicro: boolean;
  cutting: string;
  bestUse: string;
}

const DATA: Record<WireEdmType, WireEdmData> = {
  standard_brass_wire: {
    cutSpeed: 7, precision: 8, surfaceFinish: 7, thicknessCapacity: 8, weCost: 5,
    submerged: false, forMicro: false,
    cutting: "brass_wire_0_25mm_deionized_water_dielectric_spark_erode",
    bestUse: "tool_die_general_purpose_extrusion_die_punch_stamping",
  },
  submerged_flush: {
    cutSpeed: 8, precision: 9, surfaceFinish: 9, thicknessCapacity: 9, weCost: 8,
    submerged: true, forMicro: false,
    cutting: "submerged_tank_deionized_water_thermal_stability_flush",
    bestUse: "precision_mold_aerospace_part_tight_tolerance_thick_cut",
  },
  high_speed_molybdenum: {
    cutSpeed: 10, precision: 7, surfaceFinish: 6, thicknessCapacity: 7, weCost: 4,
    submerged: false, forMicro: false,
    cutting: "molybdenum_wire_reusable_reciprocating_emulsion_dielectric",
    bestUse: "production_shop_high_volume_moderate_tolerance_fast_cut",
  },
  fine_wire_micro: {
    cutSpeed: 4, precision: 10, surfaceFinish: 10, thicknessCapacity: 4, weCost: 10,
    submerged: true, forMicro: true,
    cutting: "fine_wire_0_03mm_micro_edm_nano_finish_ultra_precision",
    bestUse: "medical_device_micro_gear_watch_part_semiconductor_mold",
  },
  taper_cutting: {
    cutSpeed: 6, precision: 8, surfaceFinish: 7, thicknessCapacity: 8, weCost: 7,
    submerged: false, forMicro: false,
    cutting: "uv_axis_taper_angle_independent_top_bottom_contour_cut",
    bestUse: "extrusion_die_clearance_angle_progressive_die_taper_form",
  },
};

function get(t: WireEdmType): WireEdmData {
  return DATA[t];
}

export const cutSpeed = (t: WireEdmType) => get(t).cutSpeed;
export const precision = (t: WireEdmType) => get(t).precision;
export const surfaceFinish = (t: WireEdmType) => get(t).surfaceFinish;
export const thicknessCapacity = (t: WireEdmType) => get(t).thicknessCapacity;
export const weCost = (t: WireEdmType) => get(t).weCost;
export const submerged = (t: WireEdmType) => get(t).submerged;
export const forMicro = (t: WireEdmType) => get(t).forMicro;
export const cutting = (t: WireEdmType) => get(t).cutting;
export const bestUse = (t: WireEdmType) => get(t).bestUse;
export const wireEdmTypes = (): WireEdmType[] =>
  Object.keys(DATA) as WireEdmType[];
