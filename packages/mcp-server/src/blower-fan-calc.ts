export type BlowerFanType =
  | "centrifugal_radial"
  | "centrifugal_backward"
  | "axial_tube"
  | "positive_displacement_roots"
  | "regenerative_side_channel";

interface BlowerFanData {
  airVolume: number;
  staticPressure: number;
  efficiency: number;
  noiseLevel: number;
  bfCost: number;
  variableSpeed: boolean;
  forHighPressure: boolean;
  impellerType: string;
  bestUse: string;
}

const DATA: Record<BlowerFanType, BlowerFanData> = {
  centrifugal_radial: {
    airVolume: 8, staticPressure: 8, efficiency: 7, noiseLevel: 5, bfCost: 6,
    variableSpeed: true, forHighPressure: false,
    impellerType: "radial_blade_paddle_wheel_self_cleaning_material_handling",
    bestUse: "dust_collection_material_conveying_dirty_air_self_cleaning",
  },
  centrifugal_backward: {
    airVolume: 9, staticPressure: 8, efficiency: 10, noiseLevel: 8, bfCost: 7,
    variableSpeed: true, forHighPressure: false,
    impellerType: "backward_curved_airfoil_blade_high_efficiency_non_overload",
    bestUse: "hvac_air_handling_unit_clean_air_large_building_ventilation",
  },
  axial_tube: {
    airVolume: 10, staticPressure: 4, efficiency: 7, noiseLevel: 4, bfCost: 4,
    variableSpeed: true, forHighPressure: false,
    impellerType: "propeller_blade_hub_vane_axial_high_volume_low_pressure",
    bestUse: "tunnel_ventilation_cooling_tower_condenser_exhaust_stack",
  },
  positive_displacement_roots: {
    airVolume: 6, staticPressure: 9, efficiency: 6, noiseLevel: 3, bfCost: 8,
    variableSpeed: false, forHighPressure: true,
    impellerType: "twin_lobe_tri_lobe_rotor_positive_displacement_oil_free",
    bestUse: "wastewater_aeration_pneumatic_conveying_fluidization_air",
  },
  regenerative_side_channel: {
    airVolume: 4, staticPressure: 7, efficiency: 5, noiseLevel: 7, bfCost: 5,
    variableSpeed: true, forHighPressure: true,
    impellerType: "peripheral_vane_impeller_regenerative_multi_pass_compress",
    bestUse: "vacuum_table_aquaculture_aeration_dental_suction_spa_jet",
  },
};

function get(t: BlowerFanType): BlowerFanData {
  return DATA[t];
}

export const airVolume = (t: BlowerFanType) => get(t).airVolume;
export const staticPressure = (t: BlowerFanType) => get(t).staticPressure;
export const efficiency = (t: BlowerFanType) => get(t).efficiency;
export const noiseLevel = (t: BlowerFanType) => get(t).noiseLevel;
export const bfCost = (t: BlowerFanType) => get(t).bfCost;
export const variableSpeed = (t: BlowerFanType) => get(t).variableSpeed;
export const forHighPressure = (t: BlowerFanType) => get(t).forHighPressure;
export const impellerType = (t: BlowerFanType) => get(t).impellerType;
export const bestUse = (t: BlowerFanType) => get(t).bestUse;
export const blowerFanTypes = (): BlowerFanType[] =>
  Object.keys(DATA) as BlowerFanType[];
