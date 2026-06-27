export type FlowMeterDpType =
  | "orifice_plate_concentric"
  | "venturi_tube_classic"
  | "flow_nozzle_high_vel"
  | "v_cone_conditioning"
  | "wedge_meter_slurry";

interface FlowMeterDpData {
  accuracy: number;
  pressureLoss: number;
  rangeability: number;
  reliability: number;
  dpCost: number;
  noMovingParts: boolean;
  forDirtyFluid: boolean;
  element: string;
  bestUse: string;
}

const DATA: Record<FlowMeterDpType, FlowMeterDpData> = {
  orifice_plate_concentric: {
    accuracy: 7, pressureLoss: 4, rangeability: 5, reliability: 9, dpCost: 2,
    noMovingParts: true, forDirtyFluid: false,
    element: "thin_plate_concentric_bore_flange_taps",
    bestUse: "general_process_gas_liquid_steam_measurement",
  },
  venturi_tube_classic: {
    accuracy: 8, pressureLoss: 9, rangeability: 5, reliability: 10, dpCost: 6,
    noMovingParts: true, forDirtyFluid: true,
    element: "converging_cone_throat_diverging_recovery",
    bestUse: "large_pipe_water_wastewater_low_loss_metering",
  },
  flow_nozzle_high_vel: {
    accuracy: 8, pressureLoss: 7, rangeability: 5, reliability: 9, dpCost: 4,
    noMovingParts: true, forDirtyFluid: false,
    element: "elliptical_nozzle_contour_high_velocity_steam",
    bestUse: "high_velocity_steam_boiler_feedwater_power",
  },
  v_cone_conditioning: {
    accuracy: 9, pressureLoss: 8, rangeability: 8, reliability: 9, dpCost: 7,
    noMovingParts: true, forDirtyFluid: true,
    element: "centrally_mounted_cone_flow_conditioning",
    bestUse: "short_straight_run_wet_gas_mixed_phase_flow",
  },
  wedge_meter_slurry: {
    accuracy: 7, pressureLoss: 6, rangeability: 6, reliability: 10, dpCost: 5,
    noMovingParts: true, forDirtyFluid: true,
    element: "v_wedge_restriction_non_clogging_slurry",
    bestUse: "slurry_viscous_fluid_coke_oven_gas_dirty",
  },
};

function get(t: FlowMeterDpType): FlowMeterDpData {
  return DATA[t];
}

export const accuracy = (t: FlowMeterDpType) => get(t).accuracy;
export const pressureLoss = (t: FlowMeterDpType) => get(t).pressureLoss;
export const rangeability = (t: FlowMeterDpType) => get(t).rangeability;
export const reliability = (t: FlowMeterDpType) => get(t).reliability;
export const dpCost = (t: FlowMeterDpType) => get(t).dpCost;
export const noMovingParts = (t: FlowMeterDpType) => get(t).noMovingParts;
export const forDirtyFluid = (t: FlowMeterDpType) => get(t).forDirtyFluid;
export const element = (t: FlowMeterDpType) => get(t).element;
export const bestUse = (t: FlowMeterDpType) => get(t).bestUse;
export const flowMeterDpTypes = (): FlowMeterDpType[] =>
  Object.keys(DATA) as FlowMeterDpType[];
