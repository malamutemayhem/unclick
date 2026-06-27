export type SortationSystemType =
  | "crossbelt_sorter"
  | "tilt_tray_sorter"
  | "sliding_shoe_sorter"
  | "pop_up_wheel_divert"
  | "bomb_bay_drop_sort";

interface SortationSystemData {
  throughput: number;
  gentleness: number;
  accuracy: number;
  itemRange: number;
  ssCost_: number;
  recirculating: boolean;
  forFragile: boolean;
  mechanism: string;
  bestUse: string;
}

const DATA: Record<SortationSystemType, SortationSystemData> = {
  crossbelt_sorter: {
    throughput: 10, gentleness: 9, accuracy: 10, itemRange: 9, ssCost_: 10,
    recirculating: true, forFragile: true,
    mechanism: "individual_belt_carrier_cross_direction_discharge",
    bestUse: "parcel_hub_airport_baggage_high_volume_diverse_item",
  },
  tilt_tray_sorter: {
    throughput: 9, gentleness: 7, accuracy: 9, itemRange: 7, ssCost_: 8,
    recirculating: true, forFragile: false,
    mechanism: "tilting_tray_carrier_gravity_slide_to_chute",
    bestUse: "apparel_distribution_polybag_small_parcel_sorting",
  },
  sliding_shoe_sorter: {
    throughput: 8, gentleness: 8, accuracy: 9, itemRange: 7, ssCost_: 7,
    recirculating: false, forFragile: true,
    mechanism: "angled_sliding_shoes_flat_belt_gentle_divert",
    bestUse: "retail_distribution_carton_flat_item_gentle_sort",
  },
  pop_up_wheel_divert: {
    throughput: 6, gentleness: 6, accuracy: 8, itemRange: 5, ssCost_: 4,
    recirculating: false, forFragile: false,
    mechanism: "pop_up_angled_wheels_conveyor_bed_divert_right_left",
    bestUse: "carton_case_divert_simple_two_way_three_way_split",
  },
  bomb_bay_drop_sort: {
    throughput: 9, gentleness: 4, accuracy: 9, itemRange: 6, ssCost_: 7,
    recirculating: true, forFragile: false,
    mechanism: "trap_door_carrier_opens_downward_gravity_chute",
    bestUse: "postal_flat_sorter_magazine_letter_high_speed_sort",
  },
};

function get(t: SortationSystemType): SortationSystemData {
  return DATA[t];
}

export const throughput = (t: SortationSystemType) => get(t).throughput;
export const gentleness = (t: SortationSystemType) => get(t).gentleness;
export const accuracy = (t: SortationSystemType) => get(t).accuracy;
export const itemRange = (t: SortationSystemType) => get(t).itemRange;
export const ssCost_ = (t: SortationSystemType) => get(t).ssCost_;
export const recirculating = (t: SortationSystemType) => get(t).recirculating;
export const forFragile = (t: SortationSystemType) => get(t).forFragile;
export const mechanism = (t: SortationSystemType) => get(t).mechanism;
export const bestUse = (t: SortationSystemType) => get(t).bestUse;
export const sortationSystemTypes = (): SortationSystemType[] =>
  Object.keys(DATA) as SortationSystemType[];
