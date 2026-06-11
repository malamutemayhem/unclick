export type TurbinePumpType =
  | "vertical_turbine"
  | "submersible_turbine"
  | "regenerative_turbine"
  | "axial_flow_turbine"
  | "mixed_flow_turbine";

interface TurbinePumpData {
  headRange: number;
  throughput: number;
  efficiency: number;
  cavitationResist: number;
  tpCost: number;
  deepWell: boolean;
  forIrrigation: boolean;
  pumpConfig: string;
  bestUse: string;
}

const DATA: Record<TurbinePumpType, TurbinePumpData> = {
  vertical_turbine: {
    headRange: 9, throughput: 8, efficiency: 8, cavitationResist: 8, tpCost: 8,
    deepWell: true, forIrrigation: true,
    pumpConfig: "vertical_turbine_pump_multi_stage_bowl_shaft_deep_set_high_head",
    bestUse: "deep_well_vertical_turbine_pump_multi_stage_high_head_irrigate",
  },
  submersible_turbine: {
    headRange: 8, throughput: 7, efficiency: 7, cavitationResist: 9, tpCost: 7,
    deepWell: true, forIrrigation: true,
    pumpConfig: "submersible_turbine_pump_motor_below_water_sealed_no_prime_need",
    bestUse: "bore_water_submersible_turbine_pump_sealed_motor_no_prime_deep",
  },
  regenerative_turbine: {
    headRange: 7, throughput: 4, efficiency: 5, cavitationResist: 6, tpCost: 4,
    deepWell: false, forIrrigation: false,
    pumpConfig: "regenerative_turbine_pump_peripheral_impeller_recirculate_high_head",
    bestUse: "boiler_feed_regenerative_turbine_pump_high_head_low_flow_compact",
  },
  axial_flow_turbine: {
    headRange: 3, throughput: 10, efficiency: 8, cavitationResist: 7, tpCost: 7,
    deepWell: false, forIrrigation: true,
    pumpConfig: "axial_flow_turbine_pump_propeller_impeller_high_volume_low_head",
    bestUse: "flood_control_axial_flow_turbine_pump_high_volume_low_lift_drain",
  },
  mixed_flow_turbine: {
    headRange: 6, throughput: 9, efficiency: 8, cavitationResist: 7, tpCost: 7,
    deepWell: false, forIrrigation: true,
    pumpConfig: "mixed_flow_turbine_pump_semi_axial_impeller_medium_head_volume",
    bestUse: "canal_lift_mixed_flow_turbine_pump_medium_head_high_volume_move",
  },
};

function get(t: TurbinePumpType): TurbinePumpData {
  return DATA[t];
}

export const headRange = (t: TurbinePumpType) => get(t).headRange;
export const throughput = (t: TurbinePumpType) => get(t).throughput;
export const efficiency = (t: TurbinePumpType) => get(t).efficiency;
export const cavitationResist = (t: TurbinePumpType) => get(t).cavitationResist;
export const tpCost = (t: TurbinePumpType) => get(t).tpCost;
export const deepWell = (t: TurbinePumpType) => get(t).deepWell;
export const forIrrigation = (t: TurbinePumpType) => get(t).forIrrigation;
export const pumpConfig = (t: TurbinePumpType) => get(t).pumpConfig;
export const bestUse = (t: TurbinePumpType) => get(t).bestUse;
export const turbinePumpTypes = (): TurbinePumpType[] =>
  Object.keys(DATA) as TurbinePumpType[];
