export type FireDoorType =
  | "solid_core_timber_flush"
  | "steel_hollow_metal_frame"
  | "glass_fire_rated_ceramic"
  | "rolling_steel_shutter"
  | "composite_mineral_core";

interface FireDoorData {
  rating: number;
  insulation: number;
  aesthetic: number;
  durability: number;
  fdCost: number;
  glazed: boolean;
  forEgress: boolean;
  core: string;
  bestUse: string;
}

const DATA: Record<FireDoorType, FireDoorData> = {
  solid_core_timber_flush: {
    rating: 6, insulation: 7, aesthetic: 8, durability: 6, fdCost: 5,
    glazed: false, forEgress: true,
    core: "particleboard_mineral_solid_timber",
    bestUse: "office_hotel_room_stairwell_interior",
  },
  steel_hollow_metal_frame: {
    rating: 9, insulation: 8, aesthetic: 4, durability: 10, fdCost: 6,
    glazed: false, forEgress: true,
    core: "honeycomb_mineral_wool_steel_skin",
    bestUse: "industrial_corridor_plant_room_exit",
  },
  glass_fire_rated_ceramic: {
    rating: 5, insulation: 4, aesthetic: 10, durability: 5, fdCost: 9,
    glazed: true, forEgress: true,
    core: "borosilicate_ceramic_intumescent_gel",
    bestUse: "lobby_atrium_visual_transparency",
  },
  rolling_steel_shutter: {
    rating: 8, insulation: 6, aesthetic: 3, durability: 9, fdCost: 8,
    glazed: false, forEgress: false,
    core: "interlocking_steel_slat_coil_drum",
    bestUse: "warehouse_opening_conveyor_pass_thru",
  },
  composite_mineral_core: {
    rating: 10, insulation: 10, aesthetic: 5, durability: 9, fdCost: 7,
    glazed: false, forEgress: true,
    core: "calcium_silicate_vermiculite_dense",
    bestUse: "shaft_wall_service_riser_max_rating",
  },
};

function get(t: FireDoorType): FireDoorData {
  return DATA[t];
}

export const rating = (t: FireDoorType) => get(t).rating;
export const insulation = (t: FireDoorType) => get(t).insulation;
export const aesthetic = (t: FireDoorType) => get(t).aesthetic;
export const durability = (t: FireDoorType) => get(t).durability;
export const fdCost = (t: FireDoorType) => get(t).fdCost;
export const glazed = (t: FireDoorType) => get(t).glazed;
export const forEgress = (t: FireDoorType) => get(t).forEgress;
export const core = (t: FireDoorType) => get(t).core;
export const bestUse = (t: FireDoorType) => get(t).bestUse;
export const fireDoorTypes = (): FireDoorType[] =>
  Object.keys(DATA) as FireDoorType[];
