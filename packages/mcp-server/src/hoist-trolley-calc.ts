export type HoistTrolleyType =
  | "electric_wire_rope"
  | "electric_chain"
  | "manual_chain_block"
  | "lever_ratchet"
  | "pneumatic_air";

interface HoistTrolleyData {
  liftCapacity: number;
  liftHeight: number;
  liftSpeed: number;
  dutyCycle: number;
  htCost: number;
  powered: boolean;
  forHazardous: boolean;
  mechanism: string;
  bestUse: string;
}

const DATA: Record<HoistTrolleyType, HoistTrolleyData> = {
  electric_wire_rope: {
    liftCapacity: 10, liftHeight: 10, liftSpeed: 9, dutyCycle: 9, htCost: 8,
    powered: true, forHazardous: false,
    mechanism: "drum_wound_wire_rope_electric_motor_gear_reducer_brake",
    bestUse: "factory_overhead_crane_heavy_steel_handling_continuous_duty",
  },
  electric_chain: {
    liftCapacity: 7, liftHeight: 7, liftSpeed: 7, dutyCycle: 7, htCost: 5,
    powered: true, forHazardous: false,
    mechanism: "load_chain_sprocket_electric_motor_slip_clutch_limit_switch",
    bestUse: "workshop_assembly_line_material_handling_medium_duty_lift",
  },
  manual_chain_block: {
    liftCapacity: 6, liftHeight: 6, liftSpeed: 3, dutyCycle: 4, htCost: 2,
    powered: false, forHazardous: true,
    mechanism: "hand_chain_gear_reduction_load_chain_ratchet_pawl_hold",
    bestUse: "construction_site_maintenance_no_power_available_portable",
  },
  lever_ratchet: {
    liftCapacity: 5, liftHeight: 4, liftSpeed: 3, dutyCycle: 3, htCost: 2,
    powered: false, forHazardous: true,
    mechanism: "lever_handle_ratchet_pawl_chain_pull_lift_tension_compact",
    bestUse: "pipe_fitting_tree_pulling_confined_space_horizontal_pull",
  },
  pneumatic_air: {
    liftCapacity: 8, liftHeight: 8, liftSpeed: 8, dutyCycle: 10, htCost: 7,
    powered: true, forHazardous: true,
    mechanism: "vane_motor_air_powered_chain_hoist_spark_free_variable_speed",
    bestUse: "paint_booth_explosive_atmosphere_offshore_rig_spark_free",
  },
};

function get(t: HoistTrolleyType): HoistTrolleyData {
  return DATA[t];
}

export const liftCapacity = (t: HoistTrolleyType) => get(t).liftCapacity;
export const liftHeight = (t: HoistTrolleyType) => get(t).liftHeight;
export const liftSpeed = (t: HoistTrolleyType) => get(t).liftSpeed;
export const dutyCycle = (t: HoistTrolleyType) => get(t).dutyCycle;
export const htCost = (t: HoistTrolleyType) => get(t).htCost;
export const powered = (t: HoistTrolleyType) => get(t).powered;
export const forHazardous = (t: HoistTrolleyType) => get(t).forHazardous;
export const mechanism = (t: HoistTrolleyType) => get(t).mechanism;
export const bestUse = (t: HoistTrolleyType) => get(t).bestUse;
export const hoistTrolleyTypes = (): HoistTrolleyType[] =>
  Object.keys(DATA) as HoistTrolleyType[];
