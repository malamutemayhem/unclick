export type ConveyorSorterType =
  | "divert_arm"
  | "tilt_tray"
  | "cross_belt"
  | "bomb_bay_drop"
  | "sliding_shoe";

interface ConveyorSorterData {
  sortRate: number;
  throughput: number;
  gentleness: number;
  accuracy: number;
  csCost: number;
  bidirectional: boolean;
  forSmallParcel: boolean;
  sorterConfig: string;
  bestUse: string;
}

const DATA: Record<ConveyorSorterType, ConveyorSorterData> = {
  divert_arm: {
    sortRate: 7, throughput: 7, gentleness: 6, accuracy: 8, csCost: 4,
    bidirectional: false, forSmallParcel: false,
    sorterConfig: "divert_arm_conveyor_sorter_push_paddle_deflect_lane_simple",
    bestUse: "carton_divert_arm_conveyor_sorter_push_lane_simple_low_cost",
  },
  tilt_tray: {
    sortRate: 9, throughput: 9, gentleness: 7, accuracy: 9, csCost: 9,
    bidirectional: true, forSmallParcel: true,
    sorterConfig: "tilt_tray_conveyor_sorter_individual_tray_tilt_chute_recirculate",
    bestUse: "postal_sort_tilt_tray_conveyor_sorter_parcel_letter_high_dest",
  },
  cross_belt: {
    sortRate: 10, throughput: 10, gentleness: 8, accuracy: 9, csCost: 10,
    bidirectional: true, forSmallParcel: true,
    sorterConfig: "cross_belt_conveyor_sorter_mini_belt_carrier_discharge_both_side",
    bestUse: "ecommerce_cross_belt_conveyor_sorter_high_speed_gentle_multi_dest",
  },
  bomb_bay_drop: {
    sortRate: 8, throughput: 8, gentleness: 4, accuracy: 8, csCost: 6,
    bidirectional: false, forSmallParcel: false,
    sorterConfig: "bomb_bay_drop_conveyor_sorter_trap_door_open_gravity_chute_bin",
    bestUse: "flat_item_bomb_bay_drop_conveyor_sorter_gravity_chute_envelope",
  },
  sliding_shoe: {
    sortRate: 9, throughput: 9, gentleness: 8, accuracy: 9, csCost: 8,
    bidirectional: true, forSmallParcel: false,
    sorterConfig: "sliding_shoe_conveyor_sorter_angled_shoe_glide_divert_gentle",
    bestUse: "apparel_sliding_shoe_conveyor_sorter_gentle_divert_carton_tote",
  },
};

function get(t: ConveyorSorterType): ConveyorSorterData {
  return DATA[t];
}

export const sortRate = (t: ConveyorSorterType) => get(t).sortRate;
export const throughput = (t: ConveyorSorterType) => get(t).throughput;
export const gentleness = (t: ConveyorSorterType) => get(t).gentleness;
export const accuracy = (t: ConveyorSorterType) => get(t).accuracy;
export const csCost = (t: ConveyorSorterType) => get(t).csCost;
export const bidirectional = (t: ConveyorSorterType) => get(t).bidirectional;
export const forSmallParcel = (t: ConveyorSorterType) => get(t).forSmallParcel;
export const sorterConfig = (t: ConveyorSorterType) => get(t).sorterConfig;
export const bestUse = (t: ConveyorSorterType) => get(t).bestUse;
export const conveyorSorterTypes = (): ConveyorSorterType[] =>
  Object.keys(DATA) as ConveyorSorterType[];
