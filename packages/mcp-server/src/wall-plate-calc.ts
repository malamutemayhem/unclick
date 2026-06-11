export type WallPlateType =
  | "single_gang_keystone"
  | "double_gang_multi"
  | "decorator_style_snap"
  | "stainless_industrial"
  | "weatherproof_outdoor";

const DATA: Record<WallPlateType, {
  portCapacity: number; installEase: number; durability: number;
  appearance: number; plateCost: number; modular: boolean;
  forOutdoor: boolean; material: string; bestUse: string;
}> = {
  single_gang_keystone: { portCapacity: 5, installEase: 9, durability: 6, appearance: 7, plateCost: 2, modular: true, forOutdoor: false, material: "abs_plastic", bestUse: "residential_data_outlet" },
  double_gang_multi: { portCapacity: 9, installEase: 7, durability: 6, appearance: 6, plateCost: 4, modular: true, forOutdoor: false, material: "abs_plastic", bestUse: "office_high_density" },
  decorator_style_snap: { portCapacity: 4, installEase: 10, durability: 5, appearance: 10, plateCost: 3, modular: false, forOutdoor: false, material: "polycarbonate_gloss", bestUse: "living_room_media_drop" },
  stainless_industrial: { portCapacity: 6, installEase: 6, durability: 10, appearance: 5, plateCost: 6, modular: true, forOutdoor: false, material: "stainless_steel_304", bestUse: "factory_floor_network" },
  weatherproof_outdoor: { portCapacity: 3, installEase: 5, durability: 9, appearance: 4, plateCost: 7, modular: false, forOutdoor: true, material: "uv_rated_nylon", bestUse: "outdoor_camera_drop" },
};

const get = (t: WallPlateType) => DATA[t];

export const portCapacity = (t: WallPlateType) => get(t).portCapacity;
export const installEase = (t: WallPlateType) => get(t).installEase;
export const durability = (t: WallPlateType) => get(t).durability;
export const appearance = (t: WallPlateType) => get(t).appearance;
export const plateCost = (t: WallPlateType) => get(t).plateCost;
export const modular = (t: WallPlateType) => get(t).modular;
export const forOutdoor = (t: WallPlateType) => get(t).forOutdoor;
export const material = (t: WallPlateType) => get(t).material;
export const bestUse = (t: WallPlateType) => get(t).bestUse;
export const wallPlates = (): WallPlateType[] => Object.keys(DATA) as WallPlateType[];
