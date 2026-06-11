export type MiniSplitType =
  | "wall_mount_single_zone"
  | "multi_zone_outdoor_unit"
  | "ceiling_cassette_commercial"
  | "floor_mount_low_wall"
  | "concealed_duct_slim";

interface MiniSplitData {
  efficiency: number;
  capacity: number;
  noise: number;
  aesthetic: number;
  msCost: number;
  multiZone: boolean;
  forRetrofit: boolean;
  compressor: string;
  bestUse: string;
}

const DATA: Record<MiniSplitType, MiniSplitData> = {
  wall_mount_single_zone: {
    efficiency: 9, capacity: 5, noise: 8, aesthetic: 6, msCost: 3,
    multiZone: false, forRetrofit: true,
    compressor: "inverter_rotary_single_zone",
    bestUse: "single_room_addition_retrofit",
  },
  multi_zone_outdoor_unit: {
    efficiency: 8, capacity: 8, noise: 7, aesthetic: 6, msCost: 7,
    multiZone: true, forRetrofit: true,
    compressor: "inverter_multi_port_outdoor",
    bestUse: "whole_house_no_ductwork",
  },
  ceiling_cassette_commercial: {
    efficiency: 8, capacity: 7, noise: 7, aesthetic: 9, msCost: 6,
    multiZone: false, forRetrofit: false,
    compressor: "inverter_four_way_cassette",
    bestUse: "office_retail_dropped_ceiling",
  },
  floor_mount_low_wall: {
    efficiency: 8, capacity: 5, noise: 8, aesthetic: 7, msCost: 4,
    multiZone: false, forRetrofit: true,
    compressor: "inverter_low_wall_mount",
    bestUse: "sunroom_attic_bonus_room",
  },
  concealed_duct_slim: {
    efficiency: 8, capacity: 6, noise: 9, aesthetic: 10, msCost: 5,
    multiZone: false, forRetrofit: false,
    compressor: "inverter_slim_duct_concealed",
    bestUse: "custom_home_hidden_system",
  },
};

function get(t: MiniSplitType): MiniSplitData {
  return DATA[t];
}

export const efficiency = (t: MiniSplitType) => get(t).efficiency;
export const capacity = (t: MiniSplitType) => get(t).capacity;
export const noise = (t: MiniSplitType) => get(t).noise;
export const aesthetic = (t: MiniSplitType) => get(t).aesthetic;
export const msCost = (t: MiniSplitType) => get(t).msCost;
export const multiZone = (t: MiniSplitType) => get(t).multiZone;
export const forRetrofit = (t: MiniSplitType) => get(t).forRetrofit;
export const compressor = (t: MiniSplitType) => get(t).compressor;
export const bestUse = (t: MiniSplitType) => get(t).bestUse;
export const miniSplitTypes = (): MiniSplitType[] =>
  Object.keys(DATA) as MiniSplitType[];
