export type InverterType =
  | "string_central_utility"
  | "microinverter_panel_level"
  | "hybrid_battery_ready"
  | "off_grid_standalone"
  | "three_phase_commercial";

interface InverterData {
  efficiency: number;
  reliability: number;
  monitoring: number;
  scalability: number;
  ivCost: number;
  batteryReady: boolean;
  forResidential: boolean;
  topology: string;
  bestUse: string;
}

const DATA: Record<InverterType, InverterData> = {
  string_central_utility: {
    efficiency: 8, reliability: 9, monitoring: 6, scalability: 10, ivCost: 3,
    batteryReady: false, forResidential: false,
    topology: "central_string_mppt_combiner",
    bestUse: "utility_scale_solar_farm",
  },
  microinverter_panel_level: {
    efficiency: 9, reliability: 8, monitoring: 10, scalability: 7, ivCost: 7,
    batteryReady: false, forResidential: true,
    topology: "panel_level_ac_module_mlpe",
    bestUse: "residential_rooftop_shading",
  },
  hybrid_battery_ready: {
    efficiency: 8, reliability: 8, monitoring: 9, scalability: 6, ivCost: 8,
    batteryReady: true, forResidential: true,
    topology: "hybrid_dc_coupled_batt_mppt",
    bestUse: "home_battery_backup_solar",
  },
  off_grid_standalone: {
    efficiency: 7, reliability: 7, monitoring: 5, scalability: 4, ivCost: 6,
    batteryReady: true, forResidential: false,
    topology: "standalone_charger_inverter",
    bestUse: "remote_cabin_off_grid_power",
  },
  three_phase_commercial: {
    efficiency: 9, reliability: 9, monitoring: 8, scalability: 9, ivCost: 5,
    batteryReady: false, forResidential: false,
    topology: "three_phase_string_dual_mppt",
    bestUse: "commercial_rooftop_carport",
  },
};

function get(t: InverterType): InverterData {
  return DATA[t];
}

export const efficiency = (t: InverterType) => get(t).efficiency;
export const reliability = (t: InverterType) => get(t).reliability;
export const monitoring = (t: InverterType) => get(t).monitoring;
export const scalability = (t: InverterType) => get(t).scalability;
export const ivCost = (t: InverterType) => get(t).ivCost;
export const batteryReady = (t: InverterType) => get(t).batteryReady;
export const forResidential = (t: InverterType) => get(t).forResidential;
export const topology = (t: InverterType) => get(t).topology;
export const bestUse = (t: InverterType) => get(t).bestUse;
export const inverterTypes = (): InverterType[] =>
  Object.keys(DATA) as InverterType[];
