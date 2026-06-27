export type HoistType =
  | "electric_chain_single_speed"
  | "electric_wire_rope_trolley"
  | "pneumatic_air_chain"
  | "manual_hand_chain_block"
  | "lever_ratchet_come_along";

interface HoistData {
  capacity: number;
  speed: number;
  precision: number;
  portability: number;
  htCost: number;
  powered: boolean;
  forOverhead: boolean;
  lift: string;
  bestUse: string;
}

const DATA: Record<HoistType, HoistData> = {
  electric_chain_single_speed: {
    capacity: 7, speed: 7, precision: 7, portability: 5, htCost: 6,
    powered: true, forOverhead: true,
    lift: "motor_driven_chain_loop_sprocket",
    bestUse: "workshop_production_line_repetitive",
  },
  electric_wire_rope_trolley: {
    capacity: 10, speed: 9, precision: 8, portability: 3, htCost: 9,
    powered: true, forOverhead: true,
    lift: "drum_wound_wire_rope_motor",
    bestUse: "heavy_industrial_crane_bridge_gantry",
  },
  pneumatic_air_chain: {
    capacity: 7, speed: 6, precision: 6, portability: 6, htCost: 7,
    powered: true, forOverhead: true,
    lift: "air_motor_vane_chain_drive",
    bestUse: "hazardous_area_paint_booth_spark_free",
  },
  manual_hand_chain_block: {
    capacity: 5, speed: 2, precision: 5, portability: 8, htCost: 2,
    powered: false, forOverhead: true,
    lift: "hand_chain_gear_reduction_block",
    bestUse: "maintenance_field_no_power_rigging",
  },
  lever_ratchet_come_along: {
    capacity: 3, speed: 2, precision: 4, portability: 10, htCost: 1,
    powered: false, forOverhead: false,
    lift: "lever_ratchet_chain_pull_horizontal",
    bestUse: "horizontal_pull_tension_align_drag",
  },
};

function get(t: HoistType): HoistData {
  return DATA[t];
}

export const capacity = (t: HoistType) => get(t).capacity;
export const speed = (t: HoistType) => get(t).speed;
export const precision = (t: HoistType) => get(t).precision;
export const portability = (t: HoistType) => get(t).portability;
export const htCost = (t: HoistType) => get(t).htCost;
export const powered = (t: HoistType) => get(t).powered;
export const forOverhead = (t: HoistType) => get(t).forOverhead;
export const lift = (t: HoistType) => get(t).lift;
export const bestUse = (t: HoistType) => get(t).bestUse;
export const hoistTypes = (): HoistType[] =>
  Object.keys(DATA) as HoistType[];
