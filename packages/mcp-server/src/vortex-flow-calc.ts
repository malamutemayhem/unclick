export type VortexFlowType =
  | "inline_bluff_body"
  | "insertion_probe_vortex"
  | "dual_sensor_mass"
  | "reducing_vortex_low"
  | "multivariable_vortex";

interface VortexFlowData {
  accuracy: number;
  rangeability: number;
  tempRange: number;
  vibrationImmune: number;
  vfCost: number;
  noMovingParts: boolean;
  forSteam: boolean;
  shedder: string;
  bestUse: string;
}

const DATA: Record<VortexFlowType, VortexFlowData> = {
  inline_bluff_body: {
    accuracy: 8, rangeability: 8, tempRange: 8, vibrationImmune: 6, vfCost: 5,
    noMovingParts: true, forSteam: true,
    shedder: "delta_bluff_body_piezo_sensor_inline",
    bestUse: "steam_metering_boiler_plant_energy",
  },
  insertion_probe_vortex: {
    accuracy: 6, rangeability: 7, tempRange: 8, vibrationImmune: 5, vfCost: 3,
    noMovingParts: true, forSteam: false,
    shedder: "probe_mounted_bluff_hot_tap_large_pipe",
    bestUse: "large_duct_flue_gas_hvac_air_flow",
  },
  dual_sensor_mass: {
    accuracy: 9, rangeability: 9, tempRange: 9, vibrationImmune: 8, vfCost: 8,
    noMovingParts: true, forSteam: true,
    shedder: "dual_piezo_differential_noise_reject",
    bestUse: "saturated_steam_mass_flow_compensate",
  },
  reducing_vortex_low: {
    accuracy: 7, rangeability: 10, tempRange: 7, vibrationImmune: 6, vfCost: 6,
    noMovingParts: true, forSteam: false,
    shedder: "reduced_bore_accelerate_low_flow_detect",
    bestUse: "low_flow_chemical_dose_small_line",
  },
  multivariable_vortex: {
    accuracy: 9, rangeability: 9, tempRange: 9, vibrationImmune: 7, vfCost: 9,
    noMovingParts: true, forSteam: true,
    shedder: "integrated_temp_pressure_vortex_compute",
    bestUse: "superheated_steam_energy_manage_audit",
  },
};

function get(t: VortexFlowType): VortexFlowData {
  return DATA[t];
}

export const accuracy = (t: VortexFlowType) => get(t).accuracy;
export const rangeability = (t: VortexFlowType) => get(t).rangeability;
export const tempRange = (t: VortexFlowType) => get(t).tempRange;
export const vibrationImmune = (t: VortexFlowType) => get(t).vibrationImmune;
export const vfCost = (t: VortexFlowType) => get(t).vfCost;
export const noMovingParts = (t: VortexFlowType) => get(t).noMovingParts;
export const forSteam = (t: VortexFlowType) => get(t).forSteam;
export const shedder = (t: VortexFlowType) => get(t).shedder;
export const bestUse = (t: VortexFlowType) => get(t).bestUse;
export const vortexFlowTypes = (): VortexFlowType[] =>
  Object.keys(DATA) as VortexFlowType[];
