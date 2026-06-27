export type RollerConveyorType =
  | "gravity_roller_slope"
  | "powered_roller_chain"
  | "accumulation_zero_press"
  | "lineshaft_belt_drive"
  | "motorized_roller_mdr";

interface RollerConveyorData {
  capacity: number;
  speed: number;
  accumulation: number;
  noise: number;
  rcCost: number;
  powered: boolean;
  forHeavy: boolean;
  drive: string;
  bestUse: string;
}

const DATA: Record<RollerConveyorType, RollerConveyorData> = {
  gravity_roller_slope: {
    capacity: 6, speed: 4, accumulation: 2, noise: 8, rcCost: 2,
    powered: false, forHeavy: true,
    drive: "gravity_incline_no_motor_slope_feed",
    bestUse: "shipping_dock_pallet_carton_gravity",
  },
  powered_roller_chain: {
    capacity: 9, speed: 8, accumulation: 5, noise: 4, rcCost: 6,
    powered: true, forHeavy: true,
    drive: "chain_driven_sprocket_each_roller",
    bestUse: "heavy_pallet_drum_barrel_transport",
  },
  accumulation_zero_press: {
    capacity: 7, speed: 6, accumulation: 10, noise: 7, rcCost: 8,
    powered: true, forHeavy: false,
    drive: "zone_control_clutch_disengage_stop",
    bestUse: "order_pick_merge_sort_buffer_zone",
  },
  lineshaft_belt_drive: {
    capacity: 5, speed: 7, accumulation: 6, noise: 6, rcCost: 4,
    powered: true, forHeavy: false,
    drive: "continuous_belt_spool_friction_drive",
    bestUse: "light_medium_carton_tote_distribution",
  },
  motorized_roller_mdr: {
    capacity: 6, speed: 7, accumulation: 9, noise: 9, rcCost: 7,
    powered: true, forHeavy: false,
    drive: "brushless_dc_motor_inside_each_roller",
    bestUse: "ecommerce_fulfillment_quiet_efficient",
  },
};

function get(t: RollerConveyorType): RollerConveyorData {
  return DATA[t];
}

export const capacity = (t: RollerConveyorType) => get(t).capacity;
export const speed = (t: RollerConveyorType) => get(t).speed;
export const accumulation = (t: RollerConveyorType) => get(t).accumulation;
export const noise = (t: RollerConveyorType) => get(t).noise;
export const rcCost = (t: RollerConveyorType) => get(t).rcCost;
export const powered = (t: RollerConveyorType) => get(t).powered;
export const forHeavy = (t: RollerConveyorType) => get(t).forHeavy;
export const drive = (t: RollerConveyorType) => get(t).drive;
export const bestUse = (t: RollerConveyorType) => get(t).bestUse;
export const rollerConveyorTypes = (): RollerConveyorType[] =>
  Object.keys(DATA) as RollerConveyorType[];
