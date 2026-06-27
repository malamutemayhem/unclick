export type ScaffoldPlankType =
  | "timber_solid_sawn_plank"
  | "aluminum_walk_board"
  | "steel_metal_deck_plank"
  | "fiberglass_frp_non_conduct"
  | "laminated_veneer_lvl_engineered";

interface ScaffoldPlankData {
  loadCapacity: number;
  weight: number;
  durability: number;
  grip: number;
  spCost: number;
  nonConductive: boolean;
  forHeavy: boolean;
  material: string;
  bestUse: string;
}

const DATA: Record<ScaffoldPlankType, ScaffoldPlankData> = {
  timber_solid_sawn_plank: {
    loadCapacity: 5, weight: 5, durability: 4, grip: 8, spCost: 2,
    nonConductive: false, forHeavy: false,
    material: "solid_sawn_pine_douglas_fir",
    bestUse: "general_construction_residential_low",
  },
  aluminum_walk_board: {
    loadCapacity: 8, weight: 9, durability: 9, grip: 7, spCost: 7,
    nonConductive: false, forHeavy: true,
    material: "aluminum_extrusion_riveted_cleat",
    bestUse: "commercial_scaffold_tower_bridge",
  },
  steel_metal_deck_plank: {
    loadCapacity: 10, weight: 4, durability: 10, grip: 6, spCost: 6,
    nonConductive: false, forHeavy: true,
    material: "galvanized_steel_corrugated_deck",
    bestUse: "industrial_heavy_load_laydown_area",
  },
  fiberglass_frp_non_conduct: {
    loadCapacity: 7, weight: 7, durability: 8, grip: 9, spCost: 9,
    nonConductive: true, forHeavy: false,
    material: "fiberglass_reinforced_polymer_grit",
    bestUse: "electrical_utility_substation_work",
  },
  laminated_veneer_lvl_engineered: {
    loadCapacity: 7, weight: 6, durability: 6, grip: 8, spCost: 4,
    nonConductive: false, forHeavy: false,
    material: "laminated_veneer_lumber_osha_stamp",
    bestUse: "scaffold_platform_osha_compliant",
  },
};

function get(t: ScaffoldPlankType): ScaffoldPlankData {
  return DATA[t];
}

export const loadCapacity = (t: ScaffoldPlankType) => get(t).loadCapacity;
export const weight = (t: ScaffoldPlankType) => get(t).weight;
export const durability = (t: ScaffoldPlankType) => get(t).durability;
export const grip = (t: ScaffoldPlankType) => get(t).grip;
export const spCost = (t: ScaffoldPlankType) => get(t).spCost;
export const nonConductive = (t: ScaffoldPlankType) => get(t).nonConductive;
export const forHeavy = (t: ScaffoldPlankType) => get(t).forHeavy;
export const material = (t: ScaffoldPlankType) => get(t).material;
export const bestUse = (t: ScaffoldPlankType) => get(t).bestUse;
export const scaffoldPlankTypes = (): ScaffoldPlankType[] =>
  Object.keys(DATA) as ScaffoldPlankType[];
