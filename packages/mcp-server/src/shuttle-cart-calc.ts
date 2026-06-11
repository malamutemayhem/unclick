export type ShuttleCartType =
  | "pallet_shuttle_deep"
  | "goods_to_person_bot"
  | "multi_level_shuttle"
  | "mother_child_combo"
  | "autonomous_cube_bot";

interface ShuttleCartData {
  storageDensity: number;
  throughput: number;
  flexibility: number;
  scalability: number;
  scCost: number;
  multiLevel: boolean;
  forDeepLane: boolean;
  transport: string;
  bestUse: string;
}

const DATA: Record<ShuttleCartType, ShuttleCartData> = {
  pallet_shuttle_deep: {
    storageDensity: 10, throughput: 6, flexibility: 3, scalability: 6, scCost: 6,
    multiLevel: false, forDeepLane: true,
    transport: "radio_controlled_cart_rail_in_racking_deep_lane",
    bestUse: "cold_storage_bulk_sku_fifo_lifo_deep_lane_pallet",
  },
  goods_to_person_bot: {
    storageDensity: 7, throughput: 9, flexibility: 9, scalability: 10, scCost: 7,
    multiLevel: false, forDeepLane: false,
    transport: "mobile_robot_shelf_pod_lift_carry_to_station",
    bestUse: "ecommerce_fulfillment_dynamic_slotting_each_pick",
  },
  multi_level_shuttle: {
    storageDensity: 9, throughput: 10, flexibility: 6, scalability: 8, scCost: 9,
    multiLevel: true, forDeepLane: false,
    transport: "captive_shuttle_per_level_lift_transfer_conveyor",
    bestUse: "high_throughput_tote_retrieval_buffering_sequencing",
  },
  mother_child_combo: {
    storageDensity: 9, throughput: 8, flexibility: 7, scalability: 7, scCost: 8,
    multiLevel: true, forDeepLane: true,
    transport: "mother_cart_aisle_child_shuttle_deep_lane_entry",
    bestUse: "mixed_sku_deep_lane_pallet_multi_level_flexible",
  },
  autonomous_cube_bot: {
    storageDensity: 10, throughput: 8, flexibility: 5, scalability: 9, scCost: 8,
    multiLevel: true, forDeepLane: false,
    transport: "grid_running_robot_bin_dig_stack_port_delivery",
    bestUse: "compact_micro_fulfillment_grocery_cube_storage",
  },
};

function get(t: ShuttleCartType): ShuttleCartData {
  return DATA[t];
}

export const storageDensity = (t: ShuttleCartType) => get(t).storageDensity;
export const throughput = (t: ShuttleCartType) => get(t).throughput;
export const flexibility = (t: ShuttleCartType) => get(t).flexibility;
export const scalability = (t: ShuttleCartType) => get(t).scalability;
export const scCost = (t: ShuttleCartType) => get(t).scCost;
export const multiLevel = (t: ShuttleCartType) => get(t).multiLevel;
export const forDeepLane = (t: ShuttleCartType) => get(t).forDeepLane;
export const transport = (t: ShuttleCartType) => get(t).transport;
export const bestUse = (t: ShuttleCartType) => get(t).bestUse;
export const shuttleCartTypes = (): ShuttleCartType[] =>
  Object.keys(DATA) as ShuttleCartType[];
