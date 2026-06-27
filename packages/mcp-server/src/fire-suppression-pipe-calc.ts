export type FireSuppressionPipeType =
  | "wet_pipe_standard"
  | "dry_pipe_freeze_proof"
  | "pre_action_double"
  | "deluge_open_head"
  | "foam_water_system";

interface FireSuppressionPipeData {
  responseTime: number;
  reliability: number;
  waterDamageRisk: number;
  complexity: number;
  fsCost_: number;
  chargedPipe: boolean;
  forHighHazard: boolean;
  activation: string;
  bestUse: string;
}

const DATA: Record<FireSuppressionPipeType, FireSuppressionPipeData> = {
  wet_pipe_standard: {
    responseTime: 10, reliability: 10, waterDamageRisk: 7, complexity: 2, fsCost_: 3,
    chargedPipe: true, forHighHazard: false,
    activation: "individual_sprinkler_heat_element_fuse_link_bulb",
    bestUse: "office_hotel_residential_heated_space_general_fire",
  },
  dry_pipe_freeze_proof: {
    responseTime: 7, reliability: 8, waterDamageRisk: 5, complexity: 5, fsCost_: 6,
    chargedPipe: false, forHighHazard: false,
    activation: "air_pressure_dry_valve_clapper_water_column_delay",
    bestUse: "unheated_warehouse_parking_garage_freezing_climate",
  },
  pre_action_double: {
    responseTime: 8, reliability: 9, waterDamageRisk: 3, complexity: 7, fsCost_: 8,
    chargedPipe: false, forHighHazard: false,
    activation: "detection_system_opens_valve_then_individual_head",
    bestUse: "data_center_museum_archive_water_damage_sensitive",
  },
  deluge_open_head: {
    responseTime: 9, reliability: 9, waterDamageRisk: 10, complexity: 6, fsCost_: 7,
    chargedPipe: false, forHighHazard: true,
    activation: "detection_opens_deluge_valve_all_heads_discharge",
    bestUse: "aircraft_hangar_power_transformer_flammable_liquid",
  },
  foam_water_system: {
    responseTime: 8, reliability: 8, waterDamageRisk: 8, complexity: 8, fsCost_: 9,
    chargedPipe: false, forHighHazard: true,
    activation: "proportioner_foam_concentrate_air_aspirating_nozzle",
    bestUse: "fuel_storage_loading_rack_helipad_class_b_fire",
  },
};

function get(t: FireSuppressionPipeType): FireSuppressionPipeData {
  return DATA[t];
}

export const responseTime = (t: FireSuppressionPipeType) => get(t).responseTime;
export const reliability = (t: FireSuppressionPipeType) => get(t).reliability;
export const waterDamageRisk = (t: FireSuppressionPipeType) => get(t).waterDamageRisk;
export const complexity = (t: FireSuppressionPipeType) => get(t).complexity;
export const fsCost_ = (t: FireSuppressionPipeType) => get(t).fsCost_;
export const chargedPipe = (t: FireSuppressionPipeType) => get(t).chargedPipe;
export const forHighHazard = (t: FireSuppressionPipeType) => get(t).forHighHazard;
export const activation = (t: FireSuppressionPipeType) => get(t).activation;
export const bestUse = (t: FireSuppressionPipeType) => get(t).bestUse;
export const fireSuppressionPipeTypes = (): FireSuppressionPipeType[] =>
  Object.keys(DATA) as FireSuppressionPipeType[];
