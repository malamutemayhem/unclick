export type DeckTypeType =
  | "pressure_treated_wood"
  | "composite_wood_plastic"
  | "pvc_cellular_vinyl"
  | "tropical_hardwood_ipe"
  | "aluminum_plank_interlocking";

interface DeckTypeData {
  durability: number;
  maintenance: number;
  aesthetic: number;
  slip: number;
  dkCost: number;
  splinterFree: boolean;
  forGround: boolean;
  material: string;
  bestUse: string;
}

const DATA: Record<DeckTypeType, DeckTypeData> = {
  pressure_treated_wood: {
    durability: 5, maintenance: 4, aesthetic: 5, slip: 5, dkCost: 2,
    splinterFree: false, forGround: true,
    material: "southern_pine_cca_acq_treat",
    bestUse: "budget_residential_ground_level",
  },
  composite_wood_plastic: {
    durability: 8, maintenance: 9, aesthetic: 8, slip: 7, dkCost: 6,
    splinterFree: true, forGround: true,
    material: "wood_fiber_hdpe_polymer_blend",
    bestUse: "residential_low_maintenance",
  },
  pvc_cellular_vinyl: {
    durability: 9, maintenance: 10, aesthetic: 7, slip: 8, dkCost: 7,
    splinterFree: true, forGround: false,
    material: "cellular_pvc_foam_core",
    bestUse: "coastal_pool_deck_moisture",
  },
  tropical_hardwood_ipe: {
    durability: 10, maintenance: 5, aesthetic: 10, slip: 6, dkCost: 9,
    splinterFree: false, forGround: true,
    material: "ipe_cumaru_tropical_hardwood",
    bestUse: "premium_commercial_rooftop",
  },
  aluminum_plank_interlocking: {
    durability: 10, maintenance: 10, aesthetic: 6, slip: 9, dkCost: 8,
    splinterFree: true, forGround: false,
    material: "powder_coat_aluminum_extrusion",
    bestUse: "commercial_dock_marina_walkway",
  },
};

function get(t: DeckTypeType): DeckTypeData {
  return DATA[t];
}

export const durability = (t: DeckTypeType) => get(t).durability;
export const maintenance = (t: DeckTypeType) => get(t).maintenance;
export const aesthetic = (t: DeckTypeType) => get(t).aesthetic;
export const slip = (t: DeckTypeType) => get(t).slip;
export const dkCost = (t: DeckTypeType) => get(t).dkCost;
export const splinterFree = (t: DeckTypeType) => get(t).splinterFree;
export const forGround = (t: DeckTypeType) => get(t).forGround;
export const material = (t: DeckTypeType) => get(t).material;
export const bestUse = (t: DeckTypeType) => get(t).bestUse;
export const deckTypeTypes = (): DeckTypeType[] =>
  Object.keys(DATA) as DeckTypeType[];
