export type NeedleValveType =
  | "standard_bonnet_manual"
  | "integral_bonnet_compact"
  | "angle_pattern_high_pressure"
  | "multiport_manifold_gauge"
  | "metering_micrometer_handle";

interface NeedleValveData {
  precision: number;
  pressure: number;
  flowControl: number;
  durability: number;
  nvCost: number;
  highPressure: boolean;
  forInstrumentation: boolean;
  stemType: string;
  bestUse: string;
}

const DATA: Record<NeedleValveType, NeedleValveData> = {
  standard_bonnet_manual: {
    precision: 7, pressure: 7, flowControl: 7, durability: 8, nvCost: 4,
    highPressure: false, forInstrumentation: true,
    stemType: "tapered_vee_point_stainless",
    bestUse: "general_instrument_isolation",
  },
  integral_bonnet_compact: {
    precision: 8, pressure: 8, flowControl: 8, durability: 8, nvCost: 5,
    highPressure: true, forInstrumentation: true,
    stemType: "non_rotating_tip_regulating",
    bestUse: "compact_panel_transmitter_root",
  },
  angle_pattern_high_pressure: {
    precision: 7, pressure: 10, flowControl: 7, durability: 9, nvCost: 7,
    highPressure: true, forInstrumentation: false,
    stemType: "metal_to_metal_90_degree_body",
    bestUse: "hydraulic_test_high_pressure_gas",
  },
  multiport_manifold_gauge: {
    precision: 8, pressure: 8, flowControl: 6, durability: 7, nvCost: 8,
    highPressure: false, forInstrumentation: true,
    stemType: "multi_valve_block_integral",
    bestUse: "dp_transmitter_3_valve_manifold",
  },
  metering_micrometer_handle: {
    precision: 10, pressure: 6, flowControl: 10, durability: 7, nvCost: 9,
    highPressure: false, forInstrumentation: true,
    stemType: "micrometer_graduated_vernier",
    bestUse: "laboratory_precise_flow_metering",
  },
};

function get(t: NeedleValveType): NeedleValveData {
  return DATA[t];
}

export const precision = (t: NeedleValveType) => get(t).precision;
export const pressure = (t: NeedleValveType) => get(t).pressure;
export const flowControl = (t: NeedleValveType) => get(t).flowControl;
export const durability = (t: NeedleValveType) => get(t).durability;
export const nvCost = (t: NeedleValveType) => get(t).nvCost;
export const highPressure = (t: NeedleValveType) => get(t).highPressure;
export const forInstrumentation = (t: NeedleValveType) => get(t).forInstrumentation;
export const stemType = (t: NeedleValveType) => get(t).stemType;
export const bestUse = (t: NeedleValveType) => get(t).bestUse;
export const needleValveTypes = (): NeedleValveType[] =>
  Object.keys(DATA) as NeedleValveType[];
