export type DrainTypeType =
  | "floor_drain_cast_iron_trap"
  | "trench_drain_linear_channel"
  | "roof_drain_dome_strainer"
  | "area_drain_catch_basin"
  | "cleanout_access_plug";

interface DrainTypeData {
  capacity: number;
  trapSeal: number;
  aesthetic: number;
  maintenance: number;
  dtCost: number;
  trapped: boolean;
  forInterior: boolean;
  grate: string;
  bestUse: string;
}

const DATA: Record<DrainTypeType, DrainTypeData> = {
  floor_drain_cast_iron_trap: {
    capacity: 6, trapSeal: 9, aesthetic: 5, maintenance: 6, dtCost: 4,
    trapped: true, forInterior: true,
    grate: "nickel_bronze_round_flat_top",
    bestUse: "restroom_mechanical_room_floor",
  },
  trench_drain_linear_channel: {
    capacity: 9, trapSeal: 5, aesthetic: 7, maintenance: 7, dtCost: 7,
    trapped: false, forInterior: true,
    grate: "stainless_steel_slot_linear",
    bestUse: "commercial_kitchen_loading_dock",
  },
  roof_drain_dome_strainer: {
    capacity: 8, trapSeal: 3, aesthetic: 4, maintenance: 5, dtCost: 5,
    trapped: false, forInterior: false,
    grate: "cast_iron_dome_strainer_clamp",
    bestUse: "flat_roof_primary_storm_drain",
  },
  area_drain_catch_basin: {
    capacity: 10, trapSeal: 4, aesthetic: 3, maintenance: 4, dtCost: 6,
    trapped: false, forInterior: false,
    grate: "heavy_duty_cast_iron_traffic_grate",
    bestUse: "parking_lot_yard_storm_collection",
  },
  cleanout_access_plug: {
    capacity: 2, trapSeal: 1, aesthetic: 6, maintenance: 10, dtCost: 2,
    trapped: false, forInterior: true,
    grate: "brass_screw_plug_flush_cover",
    bestUse: "pipe_access_rodding_maintenance_point",
  },
};

function get(t: DrainTypeType): DrainTypeData {
  return DATA[t];
}

export const capacity = (t: DrainTypeType) => get(t).capacity;
export const trapSeal = (t: DrainTypeType) => get(t).trapSeal;
export const aesthetic = (t: DrainTypeType) => get(t).aesthetic;
export const maintenance = (t: DrainTypeType) => get(t).maintenance;
export const dtCost = (t: DrainTypeType) => get(t).dtCost;
export const trapped = (t: DrainTypeType) => get(t).trapped;
export const forInterior = (t: DrainTypeType) => get(t).forInterior;
export const grate = (t: DrainTypeType) => get(t).grate;
export const bestUse = (t: DrainTypeType) => get(t).bestUse;
export const drainTypeTypes = (): DrainTypeType[] =>
  Object.keys(DATA) as DrainTypeType[];
