export type ManureSpreaderType =
  | "box_spreader"
  | "side_discharge"
  | "slurry_tanker"
  | "drag_hose"
  | "spinner_broadcast";

interface ManureSpreaderData {
  spreadUniformity: number;
  fieldCapacity: number;
  nutrientRetention: number;
  loadCapacity: number;
  msCost: number;
  liquid: boolean;
  forPrecision: boolean;
  spreaderConfig: string;
  bestUse: string;
}

const DATA: Record<ManureSpreaderType, ManureSpreaderData> = {
  box_spreader: {
    spreadUniformity: 7, fieldCapacity: 7, nutrientRetention: 6, loadCapacity: 8, msCost: 5,
    liquid: false, forPrecision: false,
    spreaderConfig: "rear_beater_chain_floor_conveyor_box_body_solid_manure_fling",
    bestUse: "solid_manure_compost_spreading_pasture_field_standard_beater",
  },
  side_discharge: {
    spreadUniformity: 8, fieldCapacity: 8, nutrientRetention: 7, loadCapacity: 9, msCost: 7,
    liquid: false, forPrecision: false,
    spreaderConfig: "vertical_beater_side_discharge_wide_spread_pattern_even_cover",
    bestUse: "large_field_solid_manure_wide_spread_even_pattern_high_volume",
  },
  slurry_tanker: {
    spreadUniformity: 8, fieldCapacity: 9, nutrientRetention: 8, loadCapacity: 10, msCost: 8,
    liquid: true, forPrecision: false,
    spreaderConfig: "vacuum_tanker_rear_splash_plate_slurry_liquid_manure_spread",
    bestUse: "dairy_farm_liquid_slurry_lagoon_pumped_tanker_field_spreading",
  },
  drag_hose: {
    spreadUniformity: 10, fieldCapacity: 10, nutrientRetention: 10, loadCapacity: 7, msCost: 10,
    liquid: true, forPrecision: true,
    spreaderConfig: "drag_hose_injector_toolbar_umbilical_pump_field_low_emission",
    bestUse: "precision_slurry_injection_low_emission_nutrient_placement_gps",
  },
  spinner_broadcast: {
    spreadUniformity: 6, fieldCapacity: 6, nutrientRetention: 5, loadCapacity: 6, msCost: 3,
    liquid: false, forPrecision: false,
    spreaderConfig: "spinner_disc_broadcast_rear_mounted_simple_compost_lime_spread",
    bestUse: "compost_lime_gypsum_broadcast_spreading_small_farm_simple_unit",
  },
};

function get(t: ManureSpreaderType): ManureSpreaderData {
  return DATA[t];
}

export const spreadUniformity = (t: ManureSpreaderType) => get(t).spreadUniformity;
export const fieldCapacity = (t: ManureSpreaderType) => get(t).fieldCapacity;
export const nutrientRetention = (t: ManureSpreaderType) => get(t).nutrientRetention;
export const loadCapacity = (t: ManureSpreaderType) => get(t).loadCapacity;
export const msCost = (t: ManureSpreaderType) => get(t).msCost;
export const liquid = (t: ManureSpreaderType) => get(t).liquid;
export const forPrecision = (t: ManureSpreaderType) => get(t).forPrecision;
export const spreaderConfig = (t: ManureSpreaderType) => get(t).spreaderConfig;
export const bestUse = (t: ManureSpreaderType) => get(t).bestUse;
export const manureSpreaderTypes = (): ManureSpreaderType[] =>
  Object.keys(DATA) as ManureSpreaderType[];
