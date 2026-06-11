export type AsrsStorageType =
  | "unit_load_crane"
  | "mini_load_tote"
  | "carousel_vertical"
  | "carousel_horizontal"
  | "vertical_lift_module";

interface AsrsStorageData {
  storageDensity: number;
  throughput: number;
  pickAccuracy: number;
  scalability: number;
  asCost_: number;
  goodsToPersonGTP: boolean;
  forSmallParts: boolean;
  mechanism: string;
  bestUse: string;
}

const DATA: Record<AsrsStorageType, AsrsStorageData> = {
  unit_load_crane: {
    storageDensity: 9, throughput: 7, pickAccuracy: 9, scalability: 8, asCost_: 10,
    goodsToPersonGTP: true, forSmallParts: false,
    mechanism: "stacker_crane_rail_guided_pallet_deep_lane_rack",
    bestUse: "pallet_warehouse_cold_store_high_bay_automated",
  },
  mini_load_tote: {
    storageDensity: 8, throughput: 9, pickAccuracy: 10, scalability: 7, asCost_: 8,
    goodsToPersonGTP: true, forSmallParts: true,
    mechanism: "mini_crane_tote_bin_retrieval_conveyor_delivery",
    bestUse: "pharmaceutical_electronics_small_parts_high_volume",
  },
  carousel_vertical: {
    storageDensity: 10, throughput: 6, pickAccuracy: 9, scalability: 5, asCost_: 6,
    goodsToPersonGTP: true, forSmallParts: true,
    mechanism: "rotating_shelf_chain_driven_vertical_loop_access",
    bestUse: "tool_crib_office_file_small_footprint_dense_store",
  },
  carousel_horizontal: {
    storageDensity: 7, throughput: 8, pickAccuracy: 9, scalability: 6, asCost_: 5,
    goodsToPersonGTP: true, forSmallParts: true,
    mechanism: "oval_track_rotating_bins_horizontal_loop_pick_window",
    bestUse: "order_consolidation_batch_picking_pharmacy_auto",
  },
  vertical_lift_module: {
    storageDensity: 10, throughput: 6, pickAccuracy: 10, scalability: 7, asCost_: 7,
    goodsToPersonGTP: true, forSmallParts: true,
    mechanism: "dual_column_tray_extractor_height_sensor_dynamic",
    bestUse: "spare_parts_inventory_secure_storage_ergonomic_pick",
  },
};

function get(t: AsrsStorageType): AsrsStorageData {
  return DATA[t];
}

export const storageDensity = (t: AsrsStorageType) => get(t).storageDensity;
export const throughput = (t: AsrsStorageType) => get(t).throughput;
export const pickAccuracy = (t: AsrsStorageType) => get(t).pickAccuracy;
export const scalability = (t: AsrsStorageType) => get(t).scalability;
export const asCost_ = (t: AsrsStorageType) => get(t).asCost_;
export const goodsToPersonGTP = (t: AsrsStorageType) => get(t).goodsToPersonGTP;
export const forSmallParts = (t: AsrsStorageType) => get(t).forSmallParts;
export const mechanism = (t: AsrsStorageType) => get(t).mechanism;
export const bestUse = (t: AsrsStorageType) => get(t).bestUse;
export const asrsStorageTypes = (): AsrsStorageType[] =>
  Object.keys(DATA) as AsrsStorageType[];
