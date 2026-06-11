export type OverheadDoorType =
  | "sectional_insulated_steel"
  | "rolling_steel_coiling"
  | "high_speed_fabric"
  | "fire_rated_rolling"
  | "aluminum_glass_full_view";

interface OverheadDoorData {
  insulation: number;
  speed: number;
  durability: number;
  aesthetic: number;
  odCost: number;
  fireRated: boolean;
  forWarehouse: boolean;
  operation: string;
  bestUse: string;
}

const DATA: Record<OverheadDoorType, OverheadDoorData> = {
  sectional_insulated_steel: {
    insulation: 9, speed: 5, durability: 8, aesthetic: 6, odCost: 5,
    fireRated: false, forWarehouse: true,
    operation: "torsion_spring_track_section",
    bestUse: "loading_dock_climate_control",
  },
  rolling_steel_coiling: {
    insulation: 4, speed: 6, durability: 9, aesthetic: 4, odCost: 6,
    fireRated: false, forWarehouse: true,
    operation: "coiling_barrel_spring_motor",
    bestUse: "security_roll_up_storefront",
  },
  high_speed_fabric: {
    insulation: 3, speed: 10, durability: 6, aesthetic: 5, odCost: 8,
    fireRated: false, forWarehouse: true,
    operation: "high_speed_vfd_fabric_curtain",
    bestUse: "cold_storage_clean_room_rapid",
  },
  fire_rated_rolling: {
    insulation: 7, speed: 4, durability: 10, aesthetic: 3, odCost: 9,
    fireRated: true, forWarehouse: false,
    operation: "fusible_link_gravity_close",
    bestUse: "fire_wall_opening_protection",
  },
  aluminum_glass_full_view: {
    insulation: 5, speed: 5, durability: 7, aesthetic: 10, odCost: 7,
    fireRated: false, forWarehouse: false,
    operation: "torsion_spring_full_view_alum",
    bestUse: "showroom_restaurant_patio",
  },
};

function get(t: OverheadDoorType): OverheadDoorData {
  return DATA[t];
}

export const insulation = (t: OverheadDoorType) => get(t).insulation;
export const speed = (t: OverheadDoorType) => get(t).speed;
export const durability = (t: OverheadDoorType) => get(t).durability;
export const aesthetic = (t: OverheadDoorType) => get(t).aesthetic;
export const odCost = (t: OverheadDoorType) => get(t).odCost;
export const fireRated = (t: OverheadDoorType) => get(t).fireRated;
export const forWarehouse = (t: OverheadDoorType) => get(t).forWarehouse;
export const operation = (t: OverheadDoorType) => get(t).operation;
export const bestUse = (t: OverheadDoorType) => get(t).bestUse;
export const overheadDoorTypes = (): OverheadDoorType[] =>
  Object.keys(DATA) as OverheadDoorType[];
