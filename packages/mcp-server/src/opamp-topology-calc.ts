export type OpampTopology =
  | "folded_cascode"
  | "two_stage_miller"
  | "rail_to_rail_io"
  | "chopper_stabilized"
  | "fully_differential";

const DATA: Record<OpampTopology, {
  gainBandwidth: number; inputOffset: number; slew: number;
  noise: number; opampCost: number; autoZero: boolean;
  forPrecision: boolean; inputStage: string; bestUse: string;
}> = {
  folded_cascode: {
    gainBandwidth: 7, inputOffset: 6, slew: 6,
    noise: 7, opampCost: 4, autoZero: false,
    forPrecision: false, inputStage: "pmos_folded_diff",
    bestUse: "pipeline_adc_residue",
  },
  two_stage_miller: {
    gainBandwidth: 8, inputOffset: 5, slew: 7,
    noise: 6, opampCost: 3, autoZero: false,
    forPrecision: false, inputStage: "nmos_diff_pair",
    bestUse: "general_purpose_signal",
  },
  rail_to_rail_io: {
    gainBandwidth: 6, inputOffset: 4, slew: 5,
    noise: 5, opampCost: 5, autoZero: false,
    forPrecision: false, inputStage: "complementary_pair",
    bestUse: "single_supply_sensor",
  },
  chopper_stabilized: {
    gainBandwidth: 5, inputOffset: 10, slew: 4,
    noise: 9, opampCost: 7, autoZero: true,
    forPrecision: true, inputStage: "chopped_gm_stage",
    bestUse: "strain_gauge_bridge",
  },
  fully_differential: {
    gainBandwidth: 9, inputOffset: 7, slew: 9,
    noise: 8, opampCost: 6, autoZero: false,
    forPrecision: true, inputStage: "diff_in_diff_out",
    bestUse: "adc_driver_front_end",
  },
};

const get = (t: OpampTopology) => DATA[t];

export const gainBandwidth = (t: OpampTopology) => get(t).gainBandwidth;
export const inputOffset = (t: OpampTopology) => get(t).inputOffset;
export const slew = (t: OpampTopology) => get(t).slew;
export const noise = (t: OpampTopology) => get(t).noise;
export const opampCost = (t: OpampTopology) => get(t).opampCost;
export const autoZero = (t: OpampTopology) => get(t).autoZero;
export const forPrecision = (t: OpampTopology) => get(t).forPrecision;
export const inputStage = (t: OpampTopology) => get(t).inputStage;
export const bestUse = (t: OpampTopology) => get(t).bestUse;
export const opampTopologies = (): OpampTopology[] => Object.keys(DATA) as OpampTopology[];
