export type VenturiMeterType =
  | "classical_herschel_cast"
  | "short_form_machined"
  | "insert_wafer_inline"
  | "cone_v_element"
  | "wet_gas_correction";

interface VenturiMeterData {
  accuracy: number;
  pressureLoss: number;
  rangeability: number;
  durability: number;
  vmCost: number;
  bidirectional: boolean;
  forLargeLines: boolean;
  throat: string;
  bestUse: string;
}

const DATA: Record<VenturiMeterType, VenturiMeterData> = {
  classical_herschel_cast: {
    accuracy: 9, pressureLoss: 9, rangeability: 7, durability: 10, vmCost: 8,
    bidirectional: false, forLargeLines: true,
    throat: "machined_convergent_divergent_cast",
    bestUse: "large_water_main_custody_transfer",
  },
  short_form_machined: {
    accuracy: 8, pressureLoss: 8, rangeability: 7, durability: 8, vmCost: 6,
    bidirectional: false, forLargeLines: false,
    throat: "welded_truncated_cone_compact",
    bestUse: "process_steam_compressed_air",
  },
  insert_wafer_inline: {
    accuracy: 7, pressureLoss: 7, rangeability: 6, durability: 7, vmCost: 4,
    bidirectional: false, forLargeLines: false,
    throat: "flanged_wafer_reduced_bore",
    bestUse: "retrofit_existing_pipe_limited_space",
  },
  cone_v_element: {
    accuracy: 8, pressureLoss: 7, rangeability: 9, durability: 9, vmCost: 7,
    bidirectional: true, forLargeLines: true,
    throat: "suspended_cone_beta_edge",
    bestUse: "wet_gas_multiphase_upstream",
  },
  wet_gas_correction: {
    accuracy: 7, pressureLoss: 8, rangeability: 8, durability: 8, vmCost: 9,
    bidirectional: false, forLargeLines: true,
    throat: "extended_throat_gas_liquid_separator",
    bestUse: "natural_gas_wellhead_measurement",
  },
};

function get(t: VenturiMeterType): VenturiMeterData {
  return DATA[t];
}

export const accuracy = (t: VenturiMeterType) => get(t).accuracy;
export const pressureLoss = (t: VenturiMeterType) => get(t).pressureLoss;
export const rangeability = (t: VenturiMeterType) => get(t).rangeability;
export const durability = (t: VenturiMeterType) => get(t).durability;
export const vmCost = (t: VenturiMeterType) => get(t).vmCost;
export const bidirectional = (t: VenturiMeterType) => get(t).bidirectional;
export const forLargeLines = (t: VenturiMeterType) => get(t).forLargeLines;
export const throat = (t: VenturiMeterType) => get(t).throat;
export const bestUse = (t: VenturiMeterType) => get(t).bestUse;
export const venturiMeterTypes = (): VenturiMeterType[] =>
  Object.keys(DATA) as VenturiMeterType[];
