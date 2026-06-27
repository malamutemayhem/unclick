export type CarpetType =
  | "broadloom_roll_nylon"
  | "carpet_tile_modular"
  | "berber_loop_pile"
  | "plush_cut_pile"
  | "commercial_low_pile";

interface CarpetData {
  durability: number;
  comfort: number;
  acoustic: number;
  maintenance: number;
  cpCost: number;
  modular: boolean;
  forCommercial: boolean;
  fiber: string;
  bestUse: string;
}

const DATA: Record<CarpetType, CarpetData> = {
  broadloom_roll_nylon: {
    durability: 7, comfort: 8, acoustic: 8, maintenance: 6, cpCost: 5,
    modular: false, forCommercial: false,
    fiber: "solution_dyed_nylon_6_6",
    bestUse: "residential_bedroom_living",
  },
  carpet_tile_modular: {
    durability: 9, comfort: 6, acoustic: 7, maintenance: 9, cpCost: 6,
    modular: true, forCommercial: true,
    fiber: "recycled_pet_nylon_solution",
    bestUse: "office_data_center_replace_tile",
  },
  berber_loop_pile: {
    durability: 8, comfort: 5, acoustic: 6, maintenance: 8, cpCost: 4,
    modular: false, forCommercial: false,
    fiber: "olefin_polypropylene_loop",
    bestUse: "basement_family_room_durable",
  },
  plush_cut_pile: {
    durability: 5, comfort: 10, acoustic: 9, maintenance: 5, cpCost: 6,
    modular: false, forCommercial: false,
    fiber: "staple_nylon_soft_twist_cut",
    bestUse: "master_bedroom_luxury_comfort",
  },
  commercial_low_pile: {
    durability: 10, comfort: 5, acoustic: 7, maintenance: 9, cpCost: 5,
    modular: false, forCommercial: true,
    fiber: "solution_dyed_nylon_level_loop",
    bestUse: "corridor_lobby_high_traffic",
  },
};

function get(t: CarpetType): CarpetData {
  return DATA[t];
}

export const durability = (t: CarpetType) => get(t).durability;
export const comfort = (t: CarpetType) => get(t).comfort;
export const acoustic = (t: CarpetType) => get(t).acoustic;
export const maintenance = (t: CarpetType) => get(t).maintenance;
export const cpCost = (t: CarpetType) => get(t).cpCost;
export const modular = (t: CarpetType) => get(t).modular;
export const forCommercial = (t: CarpetType) => get(t).forCommercial;
export const fiber = (t: CarpetType) => get(t).fiber;
export const bestUse = (t: CarpetType) => get(t).bestUse;
export const carpetTypes = (): CarpetType[] =>
  Object.keys(DATA) as CarpetType[];
