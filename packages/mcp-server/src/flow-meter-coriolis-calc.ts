export type FlowMeterCoriolisType =
  | "bent_tube_standard"
  | "straight_tube_hygienic"
  | "dual_tube_high_flow"
  | "micro_motion_low_flow"
  | "high_pressure_dense";

interface FlowMeterCoriolisData {
  accuracy: number;
  densityMeas: number;
  pressureDrop: number;
  zeroStability: number;
  cmCost: number;
  massFlow: boolean;
  forCustody: boolean;
  tube: string;
  bestUse: string;
}

const DATA: Record<FlowMeterCoriolisType, FlowMeterCoriolisData> = {
  bent_tube_standard: {
    accuracy: 9, densityMeas: 9, pressureDrop: 6, zeroStability: 8, cmCost: 7,
    massFlow: true, forCustody: true,
    tube: "bent_u_tube_or_omega_tube_vibrating_pair",
    bestUse: "chemical_dosing_blending_custody_transfer",
  },
  straight_tube_hygienic: {
    accuracy: 9, densityMeas: 8, pressureDrop: 8, zeroStability: 8, cmCost: 8,
    massFlow: true, forCustody: false,
    tube: "straight_tube_drainable_sanitary_tri_clamp",
    bestUse: "food_dairy_pharma_cip_drainable_hygienic",
  },
  dual_tube_high_flow: {
    accuracy: 8, densityMeas: 9, pressureDrop: 7, zeroStability: 7, cmCost: 9,
    massFlow: true, forCustody: true,
    tube: "dual_parallel_bent_tube_large_diameter_flow",
    bestUse: "oil_gas_custody_transfer_large_pipeline",
  },
  micro_motion_low_flow: {
    accuracy: 10, densityMeas: 10, pressureDrop: 5, zeroStability: 10, cmCost: 8,
    massFlow: true, forCustody: true,
    tube: "micro_bent_tube_low_flow_high_sensitivity",
    bestUse: "catalyst_additive_micro_dosing_lab_precision",
  },
  high_pressure_dense: {
    accuracy: 8, densityMeas: 9, pressureDrop: 6, zeroStability: 8, cmCost: 9,
    massFlow: true, forCustody: true,
    tube: "thick_wall_tube_high_pressure_supercritical",
    bestUse: "supercritical_co2_high_pressure_gas_dense_phase",
  },
};

function get(t: FlowMeterCoriolisType): FlowMeterCoriolisData {
  return DATA[t];
}

export const accuracy = (t: FlowMeterCoriolisType) => get(t).accuracy;
export const densityMeas = (t: FlowMeterCoriolisType) => get(t).densityMeas;
export const pressureDrop = (t: FlowMeterCoriolisType) => get(t).pressureDrop;
export const zeroStability = (t: FlowMeterCoriolisType) => get(t).zeroStability;
export const cmCost = (t: FlowMeterCoriolisType) => get(t).cmCost;
export const massFlow = (t: FlowMeterCoriolisType) => get(t).massFlow;
export const forCustody = (t: FlowMeterCoriolisType) => get(t).forCustody;
export const tube = (t: FlowMeterCoriolisType) => get(t).tube;
export const bestUse = (t: FlowMeterCoriolisType) => get(t).bestUse;
export const flowMeterCoriolisTypes = (): FlowMeterCoriolisType[] =>
  Object.keys(DATA) as FlowMeterCoriolisType[];
