export type TamperSwitchType =
  | "os_y_gate_valve"
  | "butterfly_valve_gear"
  | "post_indicator_piv"
  | "wall_indicator_wiv"
  | "underground_indicator";

interface TamperSwitchData {
  reliability: number;
  visibility: number;
  accessibility: number;
  durability: number;
  tsCost: number;
  supervised: boolean;
  forOutdoor: boolean;
  indicator: string;
  bestUse: string;
}

const DATA: Record<TamperSwitchType, TamperSwitchData> = {
  os_y_gate_valve: {
    reliability: 8, visibility: 9, accessibility: 8, durability: 7, tsCost: 5,
    supervised: true, forOutdoor: false,
    indicator: "rising_stem_visual_position",
    bestUse: "sprinkler_riser_room_interior",
  },
  butterfly_valve_gear: {
    reliability: 8, visibility: 6, accessibility: 9, durability: 8, tsCost: 4,
    supervised: true, forOutdoor: false,
    indicator: "handle_position_quarter_turn",
    bestUse: "sprinkler_system_compact_space",
  },
  post_indicator_piv: {
    reliability: 9, visibility: 10, accessibility: 10, durability: 8, tsCost: 7,
    supervised: true, forOutdoor: true,
    indicator: "open_shut_target_window",
    bestUse: "yard_main_fire_department_access",
  },
  wall_indicator_wiv: {
    reliability: 8, visibility: 8, accessibility: 7, durability: 7, tsCost: 6,
    supervised: true, forOutdoor: true,
    indicator: "wall_plate_open_shut_flag",
    bestUse: "building_exterior_wall_mount",
  },
  underground_indicator: {
    reliability: 7, visibility: 5, accessibility: 4, durability: 9, tsCost: 8,
    supervised: true, forOutdoor: true,
    indicator: "valve_box_operating_nut_key",
    bestUse: "underground_main_road_crossing",
  },
};

function get(t: TamperSwitchType): TamperSwitchData {
  return DATA[t];
}

export const reliability = (t: TamperSwitchType) => get(t).reliability;
export const visibility = (t: TamperSwitchType) => get(t).visibility;
export const accessibility = (t: TamperSwitchType) => get(t).accessibility;
export const durability = (t: TamperSwitchType) => get(t).durability;
export const tsCost = (t: TamperSwitchType) => get(t).tsCost;
export const supervised = (t: TamperSwitchType) => get(t).supervised;
export const forOutdoor = (t: TamperSwitchType) => get(t).forOutdoor;
export const indicator = (t: TamperSwitchType) => get(t).indicator;
export const bestUse = (t: TamperSwitchType) => get(t).bestUse;
export const tamperSwitchTypes = (): TamperSwitchType[] =>
  Object.keys(DATA) as TamperSwitchType[];
