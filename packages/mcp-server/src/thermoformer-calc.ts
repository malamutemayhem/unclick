export type ThermoformerType =
  | "vacuum_forming"
  | "pressure_forming"
  | "twin_sheet"
  | "plug_assist"
  | "inline_trim";

interface ThermoformerData {
  partDetail: number;
  throughput: number;
  materialRange: number;
  wallUniformity: number;
  tfCost: number;
  pressureAssist: boolean;
  forPackaging: boolean;
  forming: string;
  bestUse: string;
}

const DATA: Record<ThermoformerType, ThermoformerData> = {
  vacuum_forming: {
    partDetail: 5, throughput: 7, materialRange: 8, wallUniformity: 5, tfCost: 4,
    pressureAssist: false, forPackaging: true,
    forming: "single_side_mold_vacuum_draw_sheet_heat_drape_cool_trim",
    bestUse: "blister_pack_tray_insert_simple_shape_short_run_prototype",
  },
  pressure_forming: {
    partDetail: 9, throughput: 8, materialRange: 7, wallUniformity: 8, tfCost: 7,
    pressureAssist: true, forPackaging: false,
    forming: "pressure_box_compressed_air_sharp_detail_texture_undercut",
    bestUse: "appliance_panel_medical_housing_injection_mold_alternative",
  },
  twin_sheet: {
    partDetail: 7, throughput: 5, materialRange: 6, wallUniformity: 7, tfCost: 8,
    pressureAssist: true, forPackaging: false,
    forming: "two_sheet_simultaneous_heat_form_weld_hollow_double_wall",
    bestUse: "hollow_part_pallet_duct_panel_structural_double_wall_part",
  },
  plug_assist: {
    partDetail: 6, throughput: 8, materialRange: 7, wallUniformity: 9, tfCost: 5,
    pressureAssist: false, forPackaging: true,
    forming: "mechanical_plug_pre_stretch_sheet_uniform_wall_deep_draw",
    bestUse: "deep_draw_cup_container_food_tray_uniform_wall_thickness",
  },
  inline_trim: {
    partDetail: 7, throughput: 10, materialRange: 6, wallUniformity: 7, tfCost: 9,
    pressureAssist: true, forPackaging: true,
    forming: "continuous_roll_fed_form_fill_seal_inline_die_cut_stack",
    bestUse: "high_volume_food_container_cup_lid_continuous_production",
  },
};

function get(t: ThermoformerType): ThermoformerData {
  return DATA[t];
}

export const partDetail = (t: ThermoformerType) => get(t).partDetail;
export const throughput = (t: ThermoformerType) => get(t).throughput;
export const materialRange = (t: ThermoformerType) => get(t).materialRange;
export const wallUniformity = (t: ThermoformerType) => get(t).wallUniformity;
export const tfCost = (t: ThermoformerType) => get(t).tfCost;
export const pressureAssist = (t: ThermoformerType) => get(t).pressureAssist;
export const forPackaging = (t: ThermoformerType) => get(t).forPackaging;
export const forming = (t: ThermoformerType) => get(t).forming;
export const bestUse = (t: ThermoformerType) => get(t).bestUse;
export const thermoformerTypes = (): ThermoformerType[] =>
  Object.keys(DATA) as ThermoformerType[];
