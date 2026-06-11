export type TrickleBedReactorType =
  | "cocurrent_downflow_std"
  | "countercurrent_upflow"
  | "flooded_bed_upflow"
  | "periodic_operation_pulse"
  | "structured_packing_bed";

interface TrickleBedReactorData {
  liquidDistribution: number;
  gasLiquidContact: number;
  pressureDrop: number;
  catalystWetting: number;
  tbCost: number;
  cocurrent: boolean;
  forHydrotreating: boolean;
  flow: string;
  bestUse: string;
}

const DATA: Record<TrickleBedReactorType, TrickleBedReactorData> = {
  cocurrent_downflow_std: {
    liquidDistribution: 7, gasLiquidContact: 7, pressureDrop: 8, catalystWetting: 7, tbCost: 5,
    cocurrent: true, forHydrotreating: true,
    flow: "cocurrent_downflow_gas_liquid_trickle_regime",
    bestUse: "hydrotreating_hydrodesulfurization_refinery",
  },
  countercurrent_upflow: {
    liquidDistribution: 8, gasLiquidContact: 9, pressureDrop: 6, catalystWetting: 9, tbCost: 7,
    cocurrent: false, forHydrotreating: false,
    flow: "countercurrent_liquid_down_gas_up_flooding_limit",
    bestUse: "gas_absorption_scrubbing_catalytic_oxidation",
  },
  flooded_bed_upflow: {
    liquidDistribution: 9, gasLiquidContact: 8, pressureDrop: 7, catalystWetting: 10, tbCost: 6,
    cocurrent: true, forHydrotreating: false,
    flow: "upflow_flooded_bed_complete_catalyst_wetting",
    bestUse: "wastewater_bio_treatment_low_solubility_gas",
  },
  periodic_operation_pulse: {
    liquidDistribution: 8, gasLiquidContact: 9, pressureDrop: 7, catalystWetting: 9, tbCost: 7,
    cocurrent: true, forHydrotreating: false,
    flow: "periodic_liquid_pulse_enhanced_mass_transfer",
    bestUse: "selective_hydrogenation_enhanced_performance",
  },
  structured_packing_bed: {
    liquidDistribution: 10, gasLiquidContact: 8, pressureDrop: 9, catalystWetting: 8, tbCost: 8,
    cocurrent: true, forHydrotreating: true,
    flow: "monolith_or_structured_packing_low_dp_uniform",
    bestUse: "automotive_exhaust_monolith_catalytic_converter",
  },
};

function get(t: TrickleBedReactorType): TrickleBedReactorData {
  return DATA[t];
}

export const liquidDistribution = (t: TrickleBedReactorType) => get(t).liquidDistribution;
export const gasLiquidContact = (t: TrickleBedReactorType) => get(t).gasLiquidContact;
export const pressureDrop = (t: TrickleBedReactorType) => get(t).pressureDrop;
export const catalystWetting = (t: TrickleBedReactorType) => get(t).catalystWetting;
export const tbCost = (t: TrickleBedReactorType) => get(t).tbCost;
export const cocurrent = (t: TrickleBedReactorType) => get(t).cocurrent;
export const forHydrotreating = (t: TrickleBedReactorType) => get(t).forHydrotreating;
export const flow = (t: TrickleBedReactorType) => get(t).flow;
export const bestUse = (t: TrickleBedReactorType) => get(t).bestUse;
export const trickleBedReactorTypes = (): TrickleBedReactorType[] =>
  Object.keys(DATA) as TrickleBedReactorType[];
