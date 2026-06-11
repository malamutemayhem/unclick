export type HeatDetectorType =
  | "fixed_temp_fusible"
  | "rate_of_rise_pneumatic"
  | "combination_fixed_ror"
  | "linear_heat_cable"
  | "electronic_thermistor";

interface HeatDetectorData {
  response: number;
  reliability: number;
  falseAlarm: number;
  coverage: number;
  hdCost: number;
  restorable: boolean;
  forHarsh: boolean;
  element: string;
  bestUse: string;
}

const DATA: Record<HeatDetectorType, HeatDetectorData> = {
  fixed_temp_fusible: {
    response: 5, reliability: 8, falseAlarm: 9, coverage: 6, hdCost: 2,
    restorable: false, forHarsh: true,
    element: "fusible_alloy_bimetallic_disc",
    bestUse: "kitchen_garage_dusty_area",
  },
  rate_of_rise_pneumatic: {
    response: 8, reliability: 7, falseAlarm: 7, coverage: 7, hdCost: 4,
    restorable: true, forHarsh: false,
    element: "air_chamber_diaphragm_contact",
    bestUse: "office_warehouse_fast_fire",
  },
  combination_fixed_ror: {
    response: 9, reliability: 8, falseAlarm: 8, coverage: 7, hdCost: 5,
    restorable: true, forHarsh: true,
    element: "dual_thermistor_fixed_ror_circuit",
    bestUse: "general_purpose_best_coverage",
  },
  linear_heat_cable: {
    response: 7, reliability: 9, falseAlarm: 9, coverage: 10, hdCost: 7,
    restorable: false, forHarsh: true,
    element: "polymer_cable_conductor_short",
    bestUse: "tunnel_conveyor_cable_tray",
  },
  electronic_thermistor: {
    response: 10, reliability: 7, falseAlarm: 6, coverage: 6, hdCost: 6,
    restorable: true, forHarsh: false,
    element: "ntc_thermistor_analog_digital",
    bestUse: "clean_room_server_precision",
  },
};

function get(t: HeatDetectorType): HeatDetectorData {
  return DATA[t];
}

export const response = (t: HeatDetectorType) => get(t).response;
export const reliability = (t: HeatDetectorType) => get(t).reliability;
export const falseAlarm = (t: HeatDetectorType) => get(t).falseAlarm;
export const coverage = (t: HeatDetectorType) => get(t).coverage;
export const hdCost = (t: HeatDetectorType) => get(t).hdCost;
export const restorable = (t: HeatDetectorType) => get(t).restorable;
export const forHarsh = (t: HeatDetectorType) => get(t).forHarsh;
export const element = (t: HeatDetectorType) => get(t).element;
export const bestUse = (t: HeatDetectorType) => get(t).bestUse;
export const heatDetectorTypes = (): HeatDetectorType[] =>
  Object.keys(DATA) as HeatDetectorType[];
