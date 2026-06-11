export type ThermoformType =
  | "vacuum_form_single"
  | "pressure_form_detail"
  | "twin_sheet_hollow"
  | "plug_assist_deep_draw"
  | "inline_trim_form_cut";

interface ThermoformData {
  detail: number;
  speed: number;
  depth: number;
  wallControl: number;
  tfCost: number;
  hollow: boolean;
  forPackaging: boolean;
  method: string;
  bestUse: string;
}

const DATA: Record<ThermoformType, ThermoformData> = {
  vacuum_form_single: {
    detail: 6, speed: 9, depth: 6, wallControl: 6, tfCost: 3,
    hollow: false, forPackaging: true,
    method: "vacuum_suction_single_side",
    bestUse: "blister_pack_tray_clamshell",
  },
  pressure_form_detail: {
    detail: 9, speed: 8, depth: 7, wallControl: 8, tfCost: 6,
    hollow: false, forPackaging: false,
    method: "air_pressure_3_5_bar_detail",
    bestUse: "appliance_panel_medical_housing",
  },
  twin_sheet_hollow: {
    detail: 7, speed: 5, depth: 8, wallControl: 7, tfCost: 8,
    hollow: true, forPackaging: false,
    method: "twin_sheet_fusion_weld_hollow",
    bestUse: "pallet_duct_structural_hollow",
  },
  plug_assist_deep_draw: {
    detail: 7, speed: 7, depth: 10, wallControl: 9, tfCost: 5,
    hollow: false, forPackaging: true,
    method: "plug_pre_stretch_deep_cavity",
    bestUse: "cup_container_deep_draw_yogurt",
  },
  inline_trim_form_cut: {
    detail: 8, speed: 10, depth: 7, wallControl: 7, tfCost: 7,
    hollow: false, forPackaging: true,
    method: "continuous_roll_form_trim_stack",
    bestUse: "food_tray_lid_high_volume_line",
  },
};

function get(t: ThermoformType): ThermoformData {
  return DATA[t];
}

export const detail = (t: ThermoformType) => get(t).detail;
export const speed = (t: ThermoformType) => get(t).speed;
export const depth = (t: ThermoformType) => get(t).depth;
export const wallControl = (t: ThermoformType) => get(t).wallControl;
export const tfCost = (t: ThermoformType) => get(t).tfCost;
export const hollow = (t: ThermoformType) => get(t).hollow;
export const forPackaging = (t: ThermoformType) => get(t).forPackaging;
export const method = (t: ThermoformType) => get(t).method;
export const bestUse = (t: ThermoformType) => get(t).bestUse;
export const thermoformTypes = (): ThermoformType[] =>
  Object.keys(DATA) as ThermoformType[];
