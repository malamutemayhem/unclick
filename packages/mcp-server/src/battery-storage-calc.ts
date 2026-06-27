export type BatteryStorageType =
  | "lithium_ion_wall_mount"
  | "lithium_iron_phosphate"
  | "flow_vanadium_redox"
  | "lead_acid_flooded"
  | "sodium_ion_grid_scale";

interface BatteryStorageData {
  capacity: number;
  cycles: number;
  efficiency: number;
  safety: number;
  bsCost: number;
  scalable: boolean;
  forResidential: boolean;
  chemistry: string;
  bestUse: string;
}

const DATA: Record<BatteryStorageType, BatteryStorageData> = {
  lithium_ion_wall_mount: {
    capacity: 6, cycles: 8, efficiency: 9, safety: 7, bsCost: 7,
    scalable: false, forResidential: true,
    chemistry: "nmc_lithium_nickel_manganese",
    bestUse: "home_backup_solar_storage",
  },
  lithium_iron_phosphate: {
    capacity: 7, cycles: 10, efficiency: 9, safety: 9, bsCost: 6,
    scalable: true, forResidential: true,
    chemistry: "lfp_lithium_iron_phosphate",
    bestUse: "commercial_peak_shaving",
  },
  flow_vanadium_redox: {
    capacity: 10, cycles: 10, efficiency: 7, safety: 9, bsCost: 9,
    scalable: true, forResidential: false,
    chemistry: "vrfb_vanadium_redox_flow",
    bestUse: "grid_scale_long_duration",
  },
  lead_acid_flooded: {
    capacity: 4, cycles: 4, efficiency: 6, safety: 5, bsCost: 2,
    scalable: false, forResidential: false,
    chemistry: "flooded_lead_acid_deep_cycle",
    bestUse: "off_grid_budget_backup",
  },
  sodium_ion_grid_scale: {
    capacity: 8, cycles: 7, efficiency: 8, safety: 8, bsCost: 5,
    scalable: true, forResidential: false,
    chemistry: "sodium_ion_prussian_blue",
    bestUse: "utility_grid_frequency_reg",
  },
};

function get(t: BatteryStorageType): BatteryStorageData {
  return DATA[t];
}

export const capacity = (t: BatteryStorageType) => get(t).capacity;
export const cycles = (t: BatteryStorageType) => get(t).cycles;
export const efficiency = (t: BatteryStorageType) => get(t).efficiency;
export const safety = (t: BatteryStorageType) => get(t).safety;
export const bsCost = (t: BatteryStorageType) => get(t).bsCost;
export const scalable = (t: BatteryStorageType) => get(t).scalable;
export const forResidential = (t: BatteryStorageType) => get(t).forResidential;
export const chemistry = (t: BatteryStorageType) => get(t).chemistry;
export const bestUse = (t: BatteryStorageType) => get(t).bestUse;
export const batteryStorageTypes = (): BatteryStorageType[] =>
  Object.keys(DATA) as BatteryStorageType[];
