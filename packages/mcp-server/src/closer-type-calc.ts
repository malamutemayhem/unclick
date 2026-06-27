export type CloserTypeType =
  | "surface_mount_parallel_arm"
  | "surface_mount_regular_arm"
  | "concealed_overhead_transom"
  | "floor_spring_pivot_closer"
  | "electromagnetic_hold_open";

interface CloserTypeData {
  closingForce: number;
  durability: number;
  aesthetic: number;
  adjustability: number;
  ctCost: number;
  concealed: boolean;
  forFire: boolean;
  mounting: string;
  bestUse: string;
}

const DATA: Record<CloserTypeType, CloserTypeData> = {
  surface_mount_parallel_arm: {
    closingForce: 7, durability: 8, aesthetic: 6, adjustability: 8, ctCost: 5,
    concealed: false, forFire: true,
    mounting: "parallel_arm_bracket_push_side",
    bestUse: "commercial_interior_corridor_door",
  },
  surface_mount_regular_arm: {
    closingForce: 8, durability: 8, aesthetic: 5, adjustability: 8, ctCost: 4,
    concealed: false, forFire: true,
    mounting: "regular_arm_shoe_pull_side",
    bestUse: "exterior_entry_wind_resistance",
  },
  concealed_overhead_transom: {
    closingForce: 7, durability: 7, aesthetic: 10, adjustability: 6, ctCost: 9,
    concealed: true, forFire: true,
    mounting: "concealed_in_header_frame_channel",
    bestUse: "architect_specified_clean_aesthetic",
  },
  floor_spring_pivot_closer: {
    closingForce: 9, durability: 9, aesthetic: 9, adjustability: 5, ctCost: 10,
    concealed: true, forFire: false,
    mounting: "floor_box_cement_case_pivot",
    bestUse: "glass_entry_door_lobby_storefront",
  },
  electromagnetic_hold_open: {
    closingForce: 7, durability: 7, aesthetic: 6, adjustability: 9, ctCost: 7,
    concealed: false, forFire: true,
    mounting: "surface_arm_with_mag_hold_open",
    bestUse: "fire_door_hold_open_release_alarm",
  },
};

function get(t: CloserTypeType): CloserTypeData {
  return DATA[t];
}

export const closingForce = (t: CloserTypeType) => get(t).closingForce;
export const durability = (t: CloserTypeType) => get(t).durability;
export const aesthetic = (t: CloserTypeType) => get(t).aesthetic;
export const adjustability = (t: CloserTypeType) => get(t).adjustability;
export const ctCost = (t: CloserTypeType) => get(t).ctCost;
export const concealed = (t: CloserTypeType) => get(t).concealed;
export const forFire = (t: CloserTypeType) => get(t).forFire;
export const mounting = (t: CloserTypeType) => get(t).mounting;
export const bestUse = (t: CloserTypeType) => get(t).bestUse;
export const closerTypeTypes = (): CloserTypeType[] =>
  Object.keys(DATA) as CloserTypeType[];
