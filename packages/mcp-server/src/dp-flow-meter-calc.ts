export type DpFlowMeterType =
  | "orifice_plate_concentric"
  | "venturi_tube_classic"
  | "flow_nozzle_high_vel"
  | "wedge_meter_slurry"
  | "averaging_pitot_annubar";

interface DpFlowMeterData {
  accuracy: number;
  permanentLoss: number;
  rangeability: number;
  durability: number;
  dpCost: number;
  noMovingParts: boolean;
  forDirty: boolean;
  element: string;
  bestUse: string;
}

const DATA: Record<DpFlowMeterType, DpFlowMeterData> = {
  orifice_plate_concentric: {
    accuracy: 7, permanentLoss: 4, rangeability: 5, durability: 8, dpCost: 2,
    noMovingParts: true, forDirty: false,
    element: "sharp_edge_plate_flange_tap_d_d2",
    bestUse: "general_gas_liquid_steam_low_cost_std",
  },
  venturi_tube_classic: {
    accuracy: 8, permanentLoss: 9, rangeability: 5, durability: 10, dpCost: 7,
    noMovingParts: true, forDirty: true,
    element: "converge_throat_diverge_recover_press",
    bestUse: "large_pipe_water_slurry_low_loss_meter",
  },
  flow_nozzle_high_vel: {
    accuracy: 8, permanentLoss: 6, rangeability: 5, durability: 9, dpCost: 5,
    noMovingParts: true, forDirty: false,
    element: "smooth_elliptical_nozzle_high_velocity",
    bestUse: "steam_high_velocity_boiler_feedwater",
  },
  wedge_meter_slurry: {
    accuracy: 7, permanentLoss: 5, rangeability: 6, durability: 10, dpCost: 6,
    noMovingParts: true, forDirty: true,
    element: "v_wedge_restriction_no_edge_buildup",
    bestUse: "slurry_viscous_dirty_fluid_no_clog",
  },
  averaging_pitot_annubar: {
    accuracy: 7, permanentLoss: 9, rangeability: 6, durability: 7, dpCost: 4,
    noMovingParts: true, forDirty: false,
    element: "multi_port_averaging_probe_insert",
    bestUse: "large_duct_stack_gas_retrofit_install",
  },
};

function get(t: DpFlowMeterType): DpFlowMeterData {
  return DATA[t];
}

export const accuracy = (t: DpFlowMeterType) => get(t).accuracy;
export const permanentLoss = (t: DpFlowMeterType) => get(t).permanentLoss;
export const rangeability = (t: DpFlowMeterType) => get(t).rangeability;
export const durability = (t: DpFlowMeterType) => get(t).durability;
export const dpCost = (t: DpFlowMeterType) => get(t).dpCost;
export const noMovingParts = (t: DpFlowMeterType) => get(t).noMovingParts;
export const forDirty = (t: DpFlowMeterType) => get(t).forDirty;
export const element = (t: DpFlowMeterType) => get(t).element;
export const bestUse = (t: DpFlowMeterType) => get(t).bestUse;
export const dpFlowMeterTypes = (): DpFlowMeterType[] =>
  Object.keys(DATA) as DpFlowMeterType[];
