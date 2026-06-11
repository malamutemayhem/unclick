export type DuctlessMiniSplitType =
  | "single_zone_wall"
  | "multi_zone"
  | "ceiling_cassette"
  | "floor_mounted"
  | "concealed_duct";

interface DuctlessMiniSplitData {
  efficiency: number;
  quietness: number;
  zoneControl: number;
  installEase: number;
  dmCost: number;
  inverter: boolean;
  forRetrofit: boolean;
  indoor: string;
  bestUse: string;
}

const DATA: Record<DuctlessMiniSplitType, DuctlessMiniSplitData> = {
  single_zone_wall: {
    efficiency: 9, quietness: 8, zoneControl: 7, installEase: 10, dmCost: 4,
    inverter: true, forRetrofit: true,
    indoor: "wall_mounted_high_wall_unit_swing_louver_remote_control",
    bestUse: "single_room_addition_garage_sunroom_server_room_spot_cool",
  },
  multi_zone: {
    efficiency: 8, quietness: 8, zoneControl: 10, installEase: 7, dmCost: 7,
    inverter: true, forRetrofit: true,
    indoor: "multi_head_branch_box_up_to_8_indoor_units_one_outdoor",
    bestUse: "whole_home_retrofit_condo_multiple_room_individual_control",
  },
  ceiling_cassette: {
    efficiency: 8, quietness: 9, zoneControl: 8, installEase: 5, dmCost: 7,
    inverter: true, forRetrofit: false,
    indoor: "four_way_ceiling_cassette_flush_mount_360_airflow_panel",
    bestUse: "open_office_restaurant_retail_ceiling_space_discreet_look",
  },
  floor_mounted: {
    efficiency: 8, quietness: 7, zoneControl: 7, installEase: 9, dmCost: 5,
    inverter: true, forRetrofit: true,
    indoor: "floor_standing_console_low_wall_mount_rising_warm_air",
    bestUse: "room_with_no_high_wall_space_attic_dormer_under_window",
  },
  concealed_duct: {
    efficiency: 8, quietness: 10, zoneControl: 8, installEase: 4, dmCost: 8,
    inverter: true, forRetrofit: false,
    indoor: "slim_duct_concealed_above_ceiling_short_duct_run_grille",
    bestUse: "luxury_home_hotel_room_hidden_system_clean_ceiling_look",
  },
};

function get(t: DuctlessMiniSplitType): DuctlessMiniSplitData {
  return DATA[t];
}

export const efficiency = (t: DuctlessMiniSplitType) => get(t).efficiency;
export const quietness = (t: DuctlessMiniSplitType) => get(t).quietness;
export const zoneControl = (t: DuctlessMiniSplitType) => get(t).zoneControl;
export const installEase = (t: DuctlessMiniSplitType) => get(t).installEase;
export const dmCost = (t: DuctlessMiniSplitType) => get(t).dmCost;
export const inverter = (t: DuctlessMiniSplitType) => get(t).inverter;
export const forRetrofit = (t: DuctlessMiniSplitType) => get(t).forRetrofit;
export const indoor = (t: DuctlessMiniSplitType) => get(t).indoor;
export const bestUse = (t: DuctlessMiniSplitType) => get(t).bestUse;
export const ductlessMiniSplitTypes = (): DuctlessMiniSplitType[] =>
  Object.keys(DATA) as DuctlessMiniSplitType[];
