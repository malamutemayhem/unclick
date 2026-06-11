export type CoriolisFlowType =
  | "u_tube_bent"
  | "straight_tube_single"
  | "dual_tube_parallel"
  | "micro_motion_compact"
  | "high_capacity_large";

interface CoriolisFlowData {
  accuracy: number;
  rangeability: number;
  pressureDrop: number;
  density: number;
  cfCost: number;
  massFlow: boolean;
  forGas: boolean;
  tube: string;
  bestUse: string;
}

const DATA: Record<CoriolisFlowType, CoriolisFlowData> = {
  u_tube_bent: {
    accuracy: 10, rangeability: 9, pressureDrop: 5, density: 10, cfCost: 8,
    massFlow: true, forGas: false,
    tube: "u_shaped_bent_tube_twist_phase_shift",
    bestUse: "custody_transfer_oil_gas_billing",
  },
  straight_tube_single: {
    accuracy: 8, rangeability: 7, pressureDrop: 8, density: 8, cfCost: 6,
    massFlow: true, forGas: false,
    tube: "straight_single_tube_axial_vibrate",
    bestUse: "hygienic_food_pharma_drain_clean",
  },
  dual_tube_parallel: {
    accuracy: 10, rangeability: 9, pressureDrop: 6, density: 10, cfCost: 9,
    massFlow: true, forGas: true,
    tube: "dual_parallel_tube_balanced_vibrate",
    bestUse: "chemical_dose_batch_high_accuracy",
  },
  micro_motion_compact: {
    accuracy: 9, rangeability: 8, pressureDrop: 7, density: 9, cfCost: 7,
    massFlow: true, forGas: false,
    tube: "compact_sensor_integral_transmitter",
    bestUse: "skid_mount_oem_space_constrain_meter",
  },
  high_capacity_large: {
    accuracy: 9, rangeability: 10, pressureDrop: 4, density: 9, cfCost: 10,
    massFlow: true, forGas: true,
    tube: "large_bore_dual_tube_high_flow_rate",
    bestUse: "pipeline_bulk_transfer_large_diameter",
  },
};

function get(t: CoriolisFlowType): CoriolisFlowData {
  return DATA[t];
}

export const accuracy = (t: CoriolisFlowType) => get(t).accuracy;
export const rangeability = (t: CoriolisFlowType) => get(t).rangeability;
export const pressureDrop = (t: CoriolisFlowType) => get(t).pressureDrop;
export const density = (t: CoriolisFlowType) => get(t).density;
export const cfCost = (t: CoriolisFlowType) => get(t).cfCost;
export const massFlow = (t: CoriolisFlowType) => get(t).massFlow;
export const forGas = (t: CoriolisFlowType) => get(t).forGas;
export const tube = (t: CoriolisFlowType) => get(t).tube;
export const bestUse = (t: CoriolisFlowType) => get(t).bestUse;
export const coriolisFlowTypes = (): CoriolisFlowType[] =>
  Object.keys(DATA) as CoriolisFlowType[];
