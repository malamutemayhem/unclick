export type CropSprayerType =
  | "trailed_boom"
  | "self_propelled"
  | "drone_uav"
  | "orchard_airblast"
  | "knapsack_manual";

interface CropSprayerData {
  speed: number;
  coverage: number;
  precision: number;
  driftControl: number;
  csCost: number;
  gpsGuided: boolean;
  forRowCrop: boolean;
  nozzle: string;
  bestUse: string;
}

const DATA: Record<CropSprayerType, CropSprayerData> = {
  trailed_boom: {
    speed: 7, coverage: 8, precision: 7, driftControl: 7, csCost: 5,
    gpsGuided: true, forRowCrop: true,
    nozzle: "flat_fan_nozzle_horizontal_boom_tractor_trailed_tank",
    bestUse: "medium_farm_cereal_oilseed_herbicide_fungicide_broadacre",
  },
  self_propelled: {
    speed: 9, coverage: 10, precision: 9, driftControl: 8, csCost: 9,
    gpsGuided: true, forRowCrop: true,
    nozzle: "pulse_width_modulation_individual_nozzle_control_high_clearance",
    bestUse: "large_scale_corn_soybean_wheat_variable_rate_application",
  },
  drone_uav: {
    speed: 5, coverage: 4, precision: 10, driftControl: 6, csCost: 6,
    gpsGuided: true, forRowCrop: false,
    nozzle: "rotary_atomizer_centrifugal_nozzle_low_volume_aerial",
    bestUse: "spot_spray_steep_terrain_small_field_precision_target",
  },
  orchard_airblast: {
    speed: 6, coverage: 7, precision: 6, driftControl: 5, csCost: 7,
    gpsGuided: false, forRowCrop: false,
    nozzle: "axial_fan_airblast_hollow_cone_nozzle_canopy_penetration",
    bestUse: "orchard_vineyard_tree_canopy_fruit_spray_fungicide_insecticide",
  },
  knapsack_manual: {
    speed: 2, coverage: 2, precision: 5, driftControl: 4, csCost: 1,
    gpsGuided: false, forRowCrop: false,
    nozzle: "hand_lance_adjustable_cone_fan_manual_pump_backpack_tank",
    bestUse: "smallholder_garden_greenhouse_spot_treatment_low_volume",
  },
};

function get(t: CropSprayerType): CropSprayerData {
  return DATA[t];
}

export const speed = (t: CropSprayerType) => get(t).speed;
export const coverage = (t: CropSprayerType) => get(t).coverage;
export const precision = (t: CropSprayerType) => get(t).precision;
export const driftControl = (t: CropSprayerType) => get(t).driftControl;
export const csCost = (t: CropSprayerType) => get(t).csCost;
export const gpsGuided = (t: CropSprayerType) => get(t).gpsGuided;
export const forRowCrop = (t: CropSprayerType) => get(t).forRowCrop;
export const nozzle = (t: CropSprayerType) => get(t).nozzle;
export const bestUse = (t: CropSprayerType) => get(t).bestUse;
export const cropSprayerTypes = (): CropSprayerType[] =>
  Object.keys(DATA) as CropSprayerType[];
