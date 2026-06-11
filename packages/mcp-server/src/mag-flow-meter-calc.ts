export type MagFlowMeterType =
  | "inline_flanged_standard"
  | "insertion_hot_tap"
  | "wafer_compact_short"
  | "hygienic_sanitary_clamp"
  | "submersible_open_channel";

interface MagFlowMeterData {
  accuracy: number;
  rangeability: number;
  pressureDrop: number;
  conductivity: number;
  mfCost: number;
  obstructionFree: boolean;
  forSlurry: boolean;
  liner: string;
  bestUse: string;
}

const DATA: Record<MagFlowMeterType, MagFlowMeterData> = {
  inline_flanged_standard: {
    accuracy: 9, rangeability: 10, pressureDrop: 10, conductivity: 6, mfCost: 6,
    obstructionFree: true, forSlurry: true,
    liner: "ptfe_rubber_ceramic_flanged_pipe",
    bestUse: "water_wastewater_chemical_general_flow",
  },
  insertion_hot_tap: {
    accuracy: 6, rangeability: 7, pressureDrop: 10, conductivity: 6, mfCost: 4,
    obstructionFree: false, forSlurry: false,
    liner: "probe_insert_saddle_weld_hot_tap",
    bestUse: "large_pipe_retrofit_no_shutdown_install",
  },
  wafer_compact_short: {
    accuracy: 8, rangeability: 9, pressureDrop: 10, conductivity: 6, mfCost: 5,
    obstructionFree: true, forSlurry: false,
    liner: "compact_wafer_body_short_lay_length",
    bestUse: "tight_space_skid_mount_compact_install",
  },
  hygienic_sanitary_clamp: {
    accuracy: 9, rangeability: 9, pressureDrop: 10, conductivity: 7, mfCost: 8,
    obstructionFree: true, forSlurry: false,
    liner: "ptfe_liner_tri_clamp_polish_surface",
    bestUse: "dairy_beverage_pharma_cip_sanitary",
  },
  submersible_open_channel: {
    accuracy: 7, rangeability: 8, pressureDrop: 10, conductivity: 5, mfCost: 7,
    obstructionFree: true, forSlurry: true,
    liner: "epoxy_coated_sensor_submerge_mount",
    bestUse: "open_channel_river_irrigation_discharge",
  },
};

function get(t: MagFlowMeterType): MagFlowMeterData {
  return DATA[t];
}

export const accuracy = (t: MagFlowMeterType) => get(t).accuracy;
export const rangeability = (t: MagFlowMeterType) => get(t).rangeability;
export const pressureDrop = (t: MagFlowMeterType) => get(t).pressureDrop;
export const conductivity = (t: MagFlowMeterType) => get(t).conductivity;
export const mfCost = (t: MagFlowMeterType) => get(t).mfCost;
export const obstructionFree = (t: MagFlowMeterType) => get(t).obstructionFree;
export const forSlurry = (t: MagFlowMeterType) => get(t).forSlurry;
export const liner = (t: MagFlowMeterType) => get(t).liner;
export const bestUse = (t: MagFlowMeterType) => get(t).bestUse;
export const magFlowMeterTypes = (): MagFlowMeterType[] =>
  Object.keys(DATA) as MagFlowMeterType[];
