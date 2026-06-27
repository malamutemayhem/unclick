export type LoaderType =
  | "wheel_loader_articulated"
  | "skid_steer_compact"
  | "track_loader_ctl"
  | "backhoe_loader_combo"
  | "telescopic_handler_telehandler";

interface LoaderData {
  capacity: number;
  speed: number;
  versatility: number;
  reach: number;
  ldCost: number;
  articulated: boolean;
  forLoading: boolean;
  steering: string;
  bestUse: string;
}

const DATA: Record<LoaderType, LoaderData> = {
  wheel_loader_articulated: {
    capacity: 10, speed: 9, versatility: 7, reach: 6, ldCost: 8,
    articulated: true, forLoading: true,
    steering: "articulated_center_pin_pivot",
    bestUse: "quarry_stockpile_truck_loading",
  },
  skid_steer_compact: {
    capacity: 5, speed: 7, versatility: 10, reach: 5, ldCost: 4,
    articulated: false, forLoading: false,
    steering: "skid_differential_zero_turn",
    bestUse: "landscaping_demolition_attachment",
  },
  track_loader_ctl: {
    capacity: 6, speed: 5, versatility: 9, reach: 5, ldCost: 5,
    articulated: false, forLoading: false,
    steering: "track_differential_low_ground",
    bestUse: "soft_ground_grading_finish_work",
  },
  backhoe_loader_combo: {
    capacity: 6, speed: 8, versatility: 8, reach: 7, ldCost: 5,
    articulated: false, forLoading: true,
    steering: "front_axle_steer_rear_stabilizer",
    bestUse: "utility_dig_load_municipal_farm",
  },
  telescopic_handler_telehandler: {
    capacity: 7, speed: 7, versatility: 7, reach: 10, ldCost: 7,
    articulated: false, forLoading: true,
    steering: "all_wheel_crab_steer_option",
    bestUse: "construction_material_place_height",
  },
};

function get(t: LoaderType): LoaderData {
  return DATA[t];
}

export const capacity = (t: LoaderType) => get(t).capacity;
export const speed = (t: LoaderType) => get(t).speed;
export const versatility = (t: LoaderType) => get(t).versatility;
export const reach = (t: LoaderType) => get(t).reach;
export const ldCost = (t: LoaderType) => get(t).ldCost;
export const articulated = (t: LoaderType) => get(t).articulated;
export const forLoading = (t: LoaderType) => get(t).forLoading;
export const steering = (t: LoaderType) => get(t).steering;
export const bestUse = (t: LoaderType) => get(t).bestUse;
export const loaderTypes = (): LoaderType[] =>
  Object.keys(DATA) as LoaderType[];
