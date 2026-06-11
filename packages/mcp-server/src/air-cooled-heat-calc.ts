export type AirCooledHeatType =
  | "forced_draft_horizontal"
  | "induced_draft_horizontal"
  | "natural_draft_vertical"
  | "recirculation_louver"
  | "variable_speed_ec_fan";

interface AirCooledHeatData {
  capacity: number;
  efficiency: number;
  noise: number;
  maintenance: number;
  ahCost: number;
  noWater: boolean;
  forDesert: boolean;
  fan: string;
  bestUse: string;
}

const DATA: Record<AirCooledHeatType, AirCooledHeatData> = {
  forced_draft_horizontal: {
    capacity: 8, efficiency: 7, noise: 5, maintenance: 8, ahCost: 6,
    noWater: true, forDesert: true,
    fan: "axial_below_bundle_forced_up",
    bestUse: "refinery_overhead_condenser",
  },
  induced_draft_horizontal: {
    capacity: 9, efficiency: 8, noise: 7, maintenance: 6, ahCost: 7,
    noWater: true, forDesert: true,
    fan: "axial_above_bundle_induced_pull",
    bestUse: "gas_plant_compressor_aftercooler",
  },
  natural_draft_vertical: {
    capacity: 6, efficiency: 6, noise: 10, maintenance: 10, ahCost: 8,
    noWater: true, forDesert: false,
    fan: "no_fan_chimney_effect_natural",
    bestUse: "remote_site_no_power_available",
  },
  recirculation_louver: {
    capacity: 8, efficiency: 7, noise: 6, maintenance: 7, ahCost: 8,
    noWater: true, forDesert: false,
    fan: "louver_damper_recirculation_control",
    bestUse: "winter_freeze_protection_viscous",
  },
  variable_speed_ec_fan: {
    capacity: 9, efficiency: 10, noise: 8, maintenance: 8, ahCost: 9,
    noWater: true, forDesert: true,
    fan: "ec_motor_vfd_energy_saving",
    bestUse: "data_center_dry_cooler_free",
  },
};

function get(t: AirCooledHeatType): AirCooledHeatData {
  return DATA[t];
}

export const capacity = (t: AirCooledHeatType) => get(t).capacity;
export const efficiency = (t: AirCooledHeatType) => get(t).efficiency;
export const noise = (t: AirCooledHeatType) => get(t).noise;
export const maintenance = (t: AirCooledHeatType) => get(t).maintenance;
export const ahCost = (t: AirCooledHeatType) => get(t).ahCost;
export const noWater = (t: AirCooledHeatType) => get(t).noWater;
export const forDesert = (t: AirCooledHeatType) => get(t).forDesert;
export const fan = (t: AirCooledHeatType) => get(t).fan;
export const bestUse = (t: AirCooledHeatType) => get(t).bestUse;
export const airCooledHeatTypes = (): AirCooledHeatType[] =>
  Object.keys(DATA) as AirCooledHeatType[];
