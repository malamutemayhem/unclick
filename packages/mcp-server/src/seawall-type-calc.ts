export type SeawallType =
  | "gravity_concrete_mass"
  | "cantilever_sheet_pile"
  | "anchored_tieback_wall"
  | "revetment_riprap_slope"
  | "gabion_basket_wire_rock";

interface SeawallData {
  waveResist: number;
  stability: number;
  lifespan: number;
  scourProtect: number;
  swCost: number;
  flexible: boolean;
  forUrban: boolean;
  material: string;
  bestUse: string;
}

const DATA: Record<SeawallType, SeawallData> = {
  gravity_concrete_mass: {
    waveResist: 10, stability: 9, lifespan: 9, scourProtect: 6, swCost: 9,
    flexible: false, forUrban: true,
    material: "reinforced_concrete_mass_block",
    bestUse: "urban_waterfront_promenade",
  },
  cantilever_sheet_pile: {
    waveResist: 7, stability: 6, lifespan: 7, scourProtect: 5, swCost: 6,
    flexible: true, forUrban: true,
    material: "steel_sheet_pile_interlocking",
    bestUse: "port_quay_wall_moderate_height",
  },
  anchored_tieback_wall: {
    waveResist: 8, stability: 8, lifespan: 8, scourProtect: 6, swCost: 7,
    flexible: true, forUrban: true,
    material: "sheet_pile_ground_anchor_rod",
    bestUse: "deep_berth_heavy_surcharge_load",
  },
  revetment_riprap_slope: {
    waveResist: 7, stability: 8, lifespan: 8, scourProtect: 9, swCost: 5,
    flexible: true, forUrban: false,
    material: "graded_rock_armor_geotextile",
    bestUse: "rural_shoreline_erosion_control",
  },
  gabion_basket_wire_rock: {
    waveResist: 6, stability: 7, lifespan: 6, scourProtect: 8, swCost: 3,
    flexible: true, forUrban: false,
    material: "wire_mesh_basket_filled_stone",
    bestUse: "low_cost_river_bank_protection",
  },
};

function get(t: SeawallType): SeawallData {
  return DATA[t];
}

export const waveResist = (t: SeawallType) => get(t).waveResist;
export const stability = (t: SeawallType) => get(t).stability;
export const lifespan = (t: SeawallType) => get(t).lifespan;
export const scourProtect = (t: SeawallType) => get(t).scourProtect;
export const swCost = (t: SeawallType) => get(t).swCost;
export const flexible = (t: SeawallType) => get(t).flexible;
export const forUrban = (t: SeawallType) => get(t).forUrban;
export const material = (t: SeawallType) => get(t).material;
export const bestUse = (t: SeawallType) => get(t).bestUse;
export const seawallTypes = (): SeawallType[] =>
  Object.keys(DATA) as SeawallType[];
