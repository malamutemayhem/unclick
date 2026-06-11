export type WindTurbineGenType =
  | "horizontal_axis_geared"
  | "horizontal_axis_direct"
  | "vertical_axis_darrieus"
  | "vertical_axis_savonius"
  | "offshore_floating";

interface WindTurbineGenData {
  efficiency: number;
  capacity: number;
  windRange: number;
  reliability: number;
  wtCost: number;
  gearbox: boolean;
  forOffshore: boolean;
  generator: string;
  bestUse: string;
}

const DATA: Record<WindTurbineGenType, WindTurbineGenData> = {
  horizontal_axis_geared: {
    efficiency: 9, capacity: 9, windRange: 8, reliability: 7, wtCost: 7,
    gearbox: true, forOffshore: false,
    generator: "doubly_fed_induction_generator_gearbox_3_stage_planetary",
    bestUse: "onshore_wind_farm_large_scale_utility_grid_connected_2_5mw",
  },
  horizontal_axis_direct: {
    efficiency: 9, capacity: 10, windRange: 9, reliability: 9, wtCost: 9,
    gearbox: false, forOffshore: true,
    generator: "permanent_magnet_synchronous_direct_drive_no_gearbox",
    bestUse: "offshore_wind_farm_high_reliability_low_maintenance_8_15mw",
  },
  vertical_axis_darrieus: {
    efficiency: 6, capacity: 4, windRange: 7, reliability: 7, wtCost: 5,
    gearbox: true, forOffshore: false,
    generator: "induction_generator_darrieus_h_rotor_lift_driven_vawt",
    bestUse: "urban_rooftop_distributed_gen_omnidirectional_wind_small",
  },
  vertical_axis_savonius: {
    efficiency: 4, capacity: 3, windRange: 10, reliability: 9, wtCost: 3,
    gearbox: false, forOffshore: false,
    generator: "small_permanent_magnet_savonius_drag_driven_self_start",
    bestUse: "street_light_sensor_power_low_wind_self_starting_micro_gen",
  },
  offshore_floating: {
    efficiency: 9, capacity: 10, windRange: 8, reliability: 7, wtCost: 10,
    gearbox: false, forOffshore: true,
    generator: "direct_drive_pmsg_spar_buoy_semi_sub_tension_leg_platform",
    bestUse: "deep_water_offshore_60m_plus_depth_floating_platform_farm",
  },
};

function get(t: WindTurbineGenType): WindTurbineGenData {
  return DATA[t];
}

export const efficiency = (t: WindTurbineGenType) => get(t).efficiency;
export const capacity = (t: WindTurbineGenType) => get(t).capacity;
export const windRange = (t: WindTurbineGenType) => get(t).windRange;
export const reliability = (t: WindTurbineGenType) => get(t).reliability;
export const wtCost = (t: WindTurbineGenType) => get(t).wtCost;
export const gearbox = (t: WindTurbineGenType) => get(t).gearbox;
export const forOffshore = (t: WindTurbineGenType) => get(t).forOffshore;
export const generator = (t: WindTurbineGenType) => get(t).generator;
export const bestUse = (t: WindTurbineGenType) => get(t).bestUse;
export const windTurbineGenTypes = (): WindTurbineGenType[] =>
  Object.keys(DATA) as WindTurbineGenType[];
