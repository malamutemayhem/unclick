export type FloorDrainType =
  | "standard_round_cast_iron"
  | "linear_trench_channel"
  | "primed_trap_seal"
  | "cleanout_access_combo"
  | "industrial_heavy_duty";

interface FloorDrainData {
  flow: number;
  durability: number;
  aesthetic: number;
  maintenance: number;
  fdCost: number;
  trapSeal: boolean;
  forCommercial: boolean;
  grate: string;
  bestUse: string;
}

const DATA: Record<FloorDrainType, FloorDrainData> = {
  standard_round_cast_iron: {
    flow: 6, durability: 9, aesthetic: 5, maintenance: 7, fdCost: 3,
    trapSeal: true, forCommercial: false,
    grate: "cast_iron_round_nickel_bronze",
    bestUse: "restroom_janitor_closet_basic",
  },
  linear_trench_channel: {
    flow: 9, durability: 8, aesthetic: 9, maintenance: 8, fdCost: 7,
    trapSeal: true, forCommercial: true,
    grate: "stainless_linear_slot_channel",
    bestUse: "shower_pool_deck_commercial",
  },
  primed_trap_seal: {
    flow: 6, durability: 8, aesthetic: 5, maintenance: 10, fdCost: 5,
    trapSeal: true, forCommercial: true,
    grate: "round_with_trap_primer_port",
    bestUse: "mechanical_room_infrequent_use",
  },
  cleanout_access_combo: {
    flow: 6, durability: 8, aesthetic: 4, maintenance: 9, fdCost: 4,
    trapSeal: true, forCommercial: true,
    grate: "round_adjustable_cleanout_plug",
    bestUse: "commercial_kitchen_utility",
  },
  industrial_heavy_duty: {
    flow: 10, durability: 10, aesthetic: 3, maintenance: 7, fdCost: 6,
    trapSeal: true, forCommercial: true,
    grate: "ductile_iron_heavy_traffic_rated",
    bestUse: "factory_loading_dock_washdown",
  },
};

function get(t: FloorDrainType): FloorDrainData {
  return DATA[t];
}

export const flow = (t: FloorDrainType) => get(t).flow;
export const durability = (t: FloorDrainType) => get(t).durability;
export const aesthetic = (t: FloorDrainType) => get(t).aesthetic;
export const maintenance = (t: FloorDrainType) => get(t).maintenance;
export const fdCost = (t: FloorDrainType) => get(t).fdCost;
export const trapSeal = (t: FloorDrainType) => get(t).trapSeal;
export const forCommercial = (t: FloorDrainType) => get(t).forCommercial;
export const grate = (t: FloorDrainType) => get(t).grate;
export const bestUse = (t: FloorDrainType) => get(t).bestUse;
export const floorDrainTypes = (): FloorDrainType[] =>
  Object.keys(DATA) as FloorDrainType[];
