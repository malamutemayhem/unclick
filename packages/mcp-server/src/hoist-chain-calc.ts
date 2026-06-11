export type HoistChainType =
  | "manual_hand_chain"
  | "electric_chain_hook"
  | "pneumatic_chain_spark"
  | "lever_ratchet_pull"
  | "trolley_mount_beam";

interface HoistChainData {
  liftCapacity: number;
  liftSpeed: number;
  portability: number;
  durability: number;
  hcCost: number;
  powered: boolean;
  forHazardous: boolean;
  drive: string;
  bestUse: string;
}

const DATA: Record<HoistChainType, HoistChainData> = {
  manual_hand_chain: {
    liftCapacity: 5, liftSpeed: 2, portability: 8, durability: 9, hcCost: 2,
    powered: false, forHazardous: true,
    drive: "hand_wheel_chain_loop_worm_gear_brake",
    bestUse: "maintenance_rigging_no_power_available_lifting",
  },
  electric_chain_hook: {
    liftCapacity: 8, liftSpeed: 8, portability: 5, durability: 8, hcCost: 7,
    powered: true, forHazardous: false,
    drive: "electric_motor_chain_sprocket_load_brake",
    bestUse: "production_line_repetitive_lifting_overhead_crane",
  },
  pneumatic_chain_spark: {
    liftCapacity: 7, liftSpeed: 7, portability: 6, durability: 7, hcCost: 8,
    powered: true, forHazardous: true,
    drive: "air_motor_vane_type_chain_sprocket_exhaust",
    bestUse: "paint_booth_explosive_atmosphere_spark_free_lift",
  },
  lever_ratchet_pull: {
    liftCapacity: 4, liftSpeed: 3, portability: 10, durability: 8, hcCost: 2,
    powered: false, forHazardous: true,
    drive: "lever_arm_ratchet_pawl_chain_mechanical_adv",
    bestUse: "tensioning_pulling_confined_space_alignment_work",
  },
  trolley_mount_beam: {
    liftCapacity: 9, liftSpeed: 7, portability: 3, durability: 9, hcCost: 8,
    powered: true, forHazardous: false,
    drive: "motorized_trolley_i_beam_track_integrated_hoist",
    bestUse: "assembly_line_beam_mounted_horizontal_travel_lift",
  },
};

function get(t: HoistChainType): HoistChainData {
  return DATA[t];
}

export const liftCapacity = (t: HoistChainType) => get(t).liftCapacity;
export const liftSpeed = (t: HoistChainType) => get(t).liftSpeed;
export const portability = (t: HoistChainType) => get(t).portability;
export const durability = (t: HoistChainType) => get(t).durability;
export const hcCost = (t: HoistChainType) => get(t).hcCost;
export const powered = (t: HoistChainType) => get(t).powered;
export const forHazardous = (t: HoistChainType) => get(t).forHazardous;
export const drive = (t: HoistChainType) => get(t).drive;
export const bestUse = (t: HoistChainType) => get(t).bestUse;
export const hoistChainTypes = (): HoistChainType[] =>
  Object.keys(DATA) as HoistChainType[];
