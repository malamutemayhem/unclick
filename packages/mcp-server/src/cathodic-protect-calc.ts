export type CathodicProtectType =
  | "sacrificial_zinc_anode"
  | "sacrificial_magnesium_anode"
  | "sacrificial_aluminum_anode"
  | "impressed_current_rectifier"
  | "hybrid_combination_system";

interface CathodicProtectData {
  driveVoltage: number;
  life: number;
  maintenance: number;
  range: number;
  cpCost: number;
  passive: boolean;
  forPipeline: boolean;
  anode: string;
  bestUse: string;
}

const DATA: Record<CathodicProtectType, CathodicProtectData> = {
  sacrificial_zinc_anode: {
    driveVoltage: 4, life: 7, maintenance: 9, range: 4, cpCost: 4,
    passive: true, forPipeline: false,
    anode: "zinc_alloy_cast_hull_mount",
    bestUse: "marine_hull_seawater_structure",
  },
  sacrificial_magnesium_anode: {
    driveVoltage: 7, life: 5, maintenance: 9, range: 5, cpCost: 5,
    passive: true, forPipeline: true,
    anode: "magnesium_alloy_high_potential",
    bestUse: "buried_pipeline_tank_fresh_water",
  },
  sacrificial_aluminum_anode: {
    driveVoltage: 5, life: 8, maintenance: 9, range: 5, cpCost: 5,
    passive: true, forPipeline: false,
    anode: "aluminum_zinc_indium_alloy_cast",
    bestUse: "offshore_platform_brackish_salt",
  },
  impressed_current_rectifier: {
    driveVoltage: 10, life: 10, maintenance: 5, range: 10, cpCost: 8,
    passive: false, forPipeline: true,
    anode: "mixed_metal_oxide_titanium_mmo",
    bestUse: "long_pipeline_large_tank_complex",
  },
  hybrid_combination_system: {
    driveVoltage: 8, life: 9, maintenance: 6, range: 8, cpCost: 9,
    passive: false, forPipeline: true,
    anode: "mmo_plus_sacrificial_backup",
    bestUse: "critical_infrastructure_redundant",
  },
};

function get(t: CathodicProtectType): CathodicProtectData {
  return DATA[t];
}

export const driveVoltage = (t: CathodicProtectType) => get(t).driveVoltage;
export const life = (t: CathodicProtectType) => get(t).life;
export const maintenance = (t: CathodicProtectType) => get(t).maintenance;
export const range = (t: CathodicProtectType) => get(t).range;
export const cpCost = (t: CathodicProtectType) => get(t).cpCost;
export const passive = (t: CathodicProtectType) => get(t).passive;
export const forPipeline = (t: CathodicProtectType) => get(t).forPipeline;
export const anode = (t: CathodicProtectType) => get(t).anode;
export const bestUse = (t: CathodicProtectType) => get(t).bestUse;
export const cathodicProtectTypes = (): CathodicProtectType[] =>
  Object.keys(DATA) as CathodicProtectType[];
