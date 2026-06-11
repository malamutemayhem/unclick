export type DuctlessMiniType =
  | "wall_mount_inverter"
  | "ceiling_cassette_4way"
  | "floor_standing_console"
  | "concealed_duct_slim"
  | "multi_zone_outdoor";

interface DuctlessMiniData {
  efficiency: number;
  quietness: number;
  aesthetics: number;
  zoneControl: number;
  dmCost_: number;
  multiZone: boolean;
  forRetrofit: boolean;
  indoor: string;
  bestUse: string;
}

const DATA: Record<DuctlessMiniType, DuctlessMiniData> = {
  wall_mount_inverter: {
    efficiency: 9, quietness: 9, aesthetics: 7, zoneControl: 8, dmCost_: 4,
    multiZone: false, forRetrofit: true,
    indoor: "wall_mounted_inverter_compressor_swing_louver_filter",
    bestUse: "single_room_addition_server_closet_no_duct_space",
  },
  ceiling_cassette_4way: {
    efficiency: 8, quietness: 8, aesthetics: 10, zoneControl: 8, dmCost_: 6,
    multiZone: false, forRetrofit: false,
    indoor: "recessed_ceiling_four_way_discharge_drain_pump",
    bestUse: "commercial_office_restaurant_ceiling_grid_flush",
  },
  floor_standing_console: {
    efficiency: 8, quietness: 7, aesthetics: 6, zoneControl: 7, dmCost_: 5,
    multiZone: false, forRetrofit: true,
    indoor: "floor_mount_low_wall_discharge_up_and_front_flow",
    bestUse: "sunroom_attic_room_low_wall_space_heating_dominant",
  },
  concealed_duct_slim: {
    efficiency: 8, quietness: 8, aesthetics: 10, zoneControl: 7, dmCost_: 7,
    multiZone: false, forRetrofit: false,
    indoor: "slim_duct_unit_above_ceiling_short_duct_run_grille",
    bestUse: "luxury_residence_hotel_room_hidden_unit_ducted_look",
  },
  multi_zone_outdoor: {
    efficiency: 9, quietness: 8, aesthetics: 8, zoneControl: 10, dmCost_: 8,
    multiZone: true, forRetrofit: true,
    indoor: "single_outdoor_unit_multiple_indoor_heads_branch_box",
    bestUse: "whole_house_multi_room_individual_zone_control",
  },
};

function get(t: DuctlessMiniType): DuctlessMiniData {
  return DATA[t];
}

export const efficiency = (t: DuctlessMiniType) => get(t).efficiency;
export const quietness = (t: DuctlessMiniType) => get(t).quietness;
export const aesthetics = (t: DuctlessMiniType) => get(t).aesthetics;
export const zoneControl = (t: DuctlessMiniType) => get(t).zoneControl;
export const dmCost_ = (t: DuctlessMiniType) => get(t).dmCost_;
export const multiZone = (t: DuctlessMiniType) => get(t).multiZone;
export const forRetrofit = (t: DuctlessMiniType) => get(t).forRetrofit;
export const indoor = (t: DuctlessMiniType) => get(t).indoor;
export const bestUse = (t: DuctlessMiniType) => get(t).bestUse;
export const ductlessMiniTypes = (): DuctlessMiniType[] =>
  Object.keys(DATA) as DuctlessMiniType[];
