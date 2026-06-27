export type PullBoxType =
  | "sheet_metal_screw_cover"
  | "cast_aluminum_weatherproof"
  | "fiberglass_nema_4x"
  | "stainless_steel_food"
  | "concrete_underground";

interface PullBoxData {
  capacity: number;
  durability: number;
  corrosionResist: number;
  installEase: number;
  pbCost: number;
  weatherproof: boolean;
  forOutdoor: boolean;
  material: string;
  bestUse: string;
}

const DATA: Record<PullBoxType, PullBoxData> = {
  sheet_metal_screw_cover: {
    capacity: 7, durability: 6, corrosionResist: 4, installEase: 9, pbCost: 2,
    weatherproof: false, forOutdoor: false,
    material: "galvanized_steel_14_gauge",
    bestUse: "indoor_commercial_conduit_pull",
  },
  cast_aluminum_weatherproof: {
    capacity: 6, durability: 8, corrosionResist: 7, installEase: 7, pbCost: 5,
    weatherproof: true, forOutdoor: true,
    material: "die_cast_aluminum_gasketed",
    bestUse: "outdoor_building_exterior_run",
  },
  fiberglass_nema_4x: {
    capacity: 7, durability: 9, corrosionResist: 10, installEase: 7, pbCost: 6,
    weatherproof: true, forOutdoor: true,
    material: "fiberglass_reinforced_polyester",
    bestUse: "chemical_plant_washdown_area",
  },
  stainless_steel_food: {
    capacity: 6, durability: 9, corrosionResist: 9, installEase: 6, pbCost: 8,
    weatherproof: true, forOutdoor: false,
    material: "304_stainless_steel_polished",
    bestUse: "food_processing_pharma_clean",
  },
  concrete_underground: {
    capacity: 10, durability: 10, corrosionResist: 7, installEase: 3, pbCost: 5,
    weatherproof: true, forOutdoor: true,
    material: "precast_concrete_polymer",
    bestUse: "underground_utility_duct_bank",
  },
};

function get(t: PullBoxType): PullBoxData {
  return DATA[t];
}

export const capacity = (t: PullBoxType) => get(t).capacity;
export const durability = (t: PullBoxType) => get(t).durability;
export const corrosionResist = (t: PullBoxType) => get(t).corrosionResist;
export const installEase = (t: PullBoxType) => get(t).installEase;
export const pbCost = (t: PullBoxType) => get(t).pbCost;
export const weatherproof = (t: PullBoxType) => get(t).weatherproof;
export const forOutdoor = (t: PullBoxType) => get(t).forOutdoor;
export const material = (t: PullBoxType) => get(t).material;
export const bestUse = (t: PullBoxType) => get(t).bestUse;
export const pullBoxTypes = (): PullBoxType[] =>
  Object.keys(DATA) as PullBoxType[];
