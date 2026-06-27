export type StandpipeTypeType =
  | "class_i_hose_2_5"
  | "class_ii_hose_1_5"
  | "class_iii_combined"
  | "dry_standpipe_fdc"
  | "wet_standpipe_auto";

interface StandpipeTypeData {
  flow: number;
  pressure: number;
  coverage: number;
  reliability: number;
  stCost: number;
  wet: boolean;
  forHighRise: boolean;
  outlet: string;
  bestUse: string;
}

const DATA: Record<StandpipeTypeType, StandpipeTypeData> = {
  class_i_hose_2_5: {
    flow: 9, pressure: 8, coverage: 7, reliability: 7, stCost: 6,
    wet: true, forHighRise: true,
    outlet: "2_5_inch_hose_valve_landing",
    bestUse: "high_rise_firefighter_use",
  },
  class_ii_hose_1_5: {
    flow: 5, pressure: 6, coverage: 8, reliability: 7, stCost: 5,
    wet: true, forHighRise: false,
    outlet: "1_5_inch_hose_cabinet_rack",
    bestUse: "occupant_use_office_building",
  },
  class_iii_combined: {
    flow: 9, pressure: 8, coverage: 10, reliability: 8, stCost: 8,
    wet: true, forHighRise: true,
    outlet: "combined_2_5_and_1_5_valve",
    bestUse: "high_rise_dual_occupant_fire",
  },
  dry_standpipe_fdc: {
    flow: 9, pressure: 7, coverage: 6, reliability: 5, stCost: 4,
    wet: false, forHighRise: false,
    outlet: "2_5_inch_valve_fdc_connection",
    bestUse: "parking_garage_unheated_space",
  },
  wet_standpipe_auto: {
    flow: 8, pressure: 9, coverage: 8, reliability: 9, stCost: 7,
    wet: true, forHighRise: true,
    outlet: "automatic_wet_pressure_maintain",
    bestUse: "high_rise_automatic_pressure",
  },
};

function get(t: StandpipeTypeType): StandpipeTypeData {
  return DATA[t];
}

export const flow = (t: StandpipeTypeType) => get(t).flow;
export const pressure = (t: StandpipeTypeType) => get(t).pressure;
export const coverage = (t: StandpipeTypeType) => get(t).coverage;
export const reliability = (t: StandpipeTypeType) => get(t).reliability;
export const stCost = (t: StandpipeTypeType) => get(t).stCost;
export const wet = (t: StandpipeTypeType) => get(t).wet;
export const forHighRise = (t: StandpipeTypeType) => get(t).forHighRise;
export const outlet = (t: StandpipeTypeType) => get(t).outlet;
export const bestUse = (t: StandpipeTypeType) => get(t).bestUse;
export const standpipeTypeTypes = (): StandpipeTypeType[] =>
  Object.keys(DATA) as StandpipeTypeType[];
