export type EsdProtect =
  | "tvs_diode_unipolar"
  | "tvs_diode_bipolar"
  | "polymer_pptc"
  | "spark_gap_gas"
  | "rail_clamp_ic";

const DATA: Record<EsdProtect, {
  clampVoltage: number; responseTime: number; capacitance: number;
  peakCurrent: number; esdCost: number; bidirectional: boolean;
  forHighSpeed: boolean; mechanism: string; bestUse: string;
}> = {
  tvs_diode_unipolar: {
    clampVoltage: 8, responseTime: 10, capacitance: 5,
    peakCurrent: 7, esdCost: 3, bidirectional: false,
    forHighSpeed: false, mechanism: "silicon_avalanche",
    bestUse: "dc_power_line_protect",
  },
  tvs_diode_bipolar: {
    clampVoltage: 7, responseTime: 10, capacitance: 5,
    peakCurrent: 7, esdCost: 4, bidirectional: true,
    forHighSpeed: false, mechanism: "back_to_back_avalanche",
    bestUse: "rs485_bus_protect",
  },
  polymer_pptc: {
    clampVoltage: 4, responseTime: 3, capacitance: 9,
    peakCurrent: 5, esdCost: 2, bidirectional: true,
    forHighSpeed: false, mechanism: "conductive_polymer_reset",
    bestUse: "usb_port_overcurrent",
  },
  spark_gap_gas: {
    clampVoltage: 3, responseTime: 4, capacitance: 10,
    peakCurrent: 10, esdCost: 5, bidirectional: true,
    forHighSpeed: false, mechanism: "gas_arc_discharge",
    bestUse: "telecom_line_surge",
  },
  rail_clamp_ic: {
    clampVoltage: 9, responseTime: 9, capacitance: 8,
    peakCurrent: 6, esdCost: 6, bidirectional: false,
    forHighSpeed: true, mechanism: "scr_snapback_clamp",
    bestUse: "hdmi_usb3_data_line",
  },
};

const get = (t: EsdProtect) => DATA[t];

export const clampVoltage = (t: EsdProtect) => get(t).clampVoltage;
export const responseTime = (t: EsdProtect) => get(t).responseTime;
export const capacitance = (t: EsdProtect) => get(t).capacitance;
export const peakCurrent = (t: EsdProtect) => get(t).peakCurrent;
export const esdCost = (t: EsdProtect) => get(t).esdCost;
export const bidirectional = (t: EsdProtect) => get(t).bidirectional;
export const forHighSpeed = (t: EsdProtect) => get(t).forHighSpeed;
export const mechanism = (t: EsdProtect) => get(t).mechanism;
export const bestUse = (t: EsdProtect) => get(t).bestUse;
export const esdProtects = (): EsdProtect[] => Object.keys(DATA) as EsdProtect[];
