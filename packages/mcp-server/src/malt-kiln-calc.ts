export type MaltKilnType =
  | "single_deck_direct"
  | "double_deck_indirect"
  | "circular_turret"
  | "continuous_belt"
  | "energy_recovery";

interface MaltKilnData {
  dryingEfficiency: number;
  airflowRate: number;
  temperatureControl: number;
  maltQuality: number;
  mkCost: number;
  recirculating: boolean;
  forSpecialty: boolean;
  kilnConfig: string;
  bestUse: string;
}

const DATA: Record<MaltKilnType, MaltKilnData> = {
  single_deck_direct: {
    dryingEfficiency: 6, airflowRate: 7, temperatureControl: 6, maltQuality: 7, mkCost: 3,
    recirculating: false, forSpecialty: false,
    kilnConfig: "single_perforated_deck_direct_fired_hot_air_upward_flow_dry",
    bestUse: "small_craft_maltster_basic_pale_malt_simple_kiln_operation",
  },
  double_deck_indirect: {
    dryingEfficiency: 8, airflowRate: 8, temperatureControl: 8, maltQuality: 8, mkCost: 6,
    recirculating: true, forSpecialty: false,
    kilnConfig: "upper_lower_deck_indirect_heat_exchanger_recirculate_exhaust",
    bestUse: "standard_brewery_malt_pale_pilsner_base_malt_energy_efficient",
  },
  circular_turret: {
    dryingEfficiency: 9, airflowRate: 9, temperatureControl: 9, maltQuality: 9, mkCost: 8,
    recirculating: true, forSpecialty: true,
    kilnConfig: "circular_rotating_deck_turret_kiln_multi_zone_temperature_set",
    bestUse: "specialty_malt_crystal_caramel_roast_multi_zone_temperature",
  },
  continuous_belt: {
    dryingEfficiency: 10, airflowRate: 10, temperatureControl: 7, maltQuality: 7, mkCost: 9,
    recirculating: true, forSpecialty: false,
    kilnConfig: "continuous_mesh_belt_conveyor_kiln_high_throughput_auto_load",
    bestUse: "large_industrial_maltster_high_volume_base_malt_continuous_run",
  },
  energy_recovery: {
    dryingEfficiency: 10, airflowRate: 8, temperatureControl: 9, maltQuality: 9, mkCost: 10,
    recirculating: true, forSpecialty: true,
    kilnConfig: "heat_pump_recovery_condenser_reuse_exhaust_energy_green_kiln",
    bestUse: "eco_malt_house_low_carbon_energy_recovery_premium_craft_malt",
  },
};

function get(t: MaltKilnType): MaltKilnData {
  return DATA[t];
}

export const dryingEfficiency = (t: MaltKilnType) => get(t).dryingEfficiency;
export const airflowRate = (t: MaltKilnType) => get(t).airflowRate;
export const temperatureControl = (t: MaltKilnType) => get(t).temperatureControl;
export const maltQuality = (t: MaltKilnType) => get(t).maltQuality;
export const mkCost = (t: MaltKilnType) => get(t).mkCost;
export const recirculating = (t: MaltKilnType) => get(t).recirculating;
export const forSpecialty = (t: MaltKilnType) => get(t).forSpecialty;
export const kilnConfig = (t: MaltKilnType) => get(t).kilnConfig;
export const bestUse = (t: MaltKilnType) => get(t).bestUse;
export const maltKilnTypes = (): MaltKilnType[] =>
  Object.keys(DATA) as MaltKilnType[];
