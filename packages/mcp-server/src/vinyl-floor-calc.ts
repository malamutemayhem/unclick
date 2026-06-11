export type VinylFloorType =
  | "lvp_rigid_core_click"
  | "lvt_glue_down_tile"
  | "sheet_vinyl_full_spread"
  | "wpc_wood_polymer_core"
  | "spc_stone_polymer_core";

interface VinylFloorData {
  durability: number;
  waterproof: number;
  comfort: number;
  installEase: number;
  vfCost: number;
  floating: boolean;
  forWetArea: boolean;
  core: string;
  bestUse: string;
}

const DATA: Record<VinylFloorType, VinylFloorData> = {
  lvp_rigid_core_click: {
    durability: 8, waterproof: 9, comfort: 7, installEase: 9, vfCost: 5,
    floating: true, forWetArea: true,
    core: "rigid_spc_click_lock_plank",
    bestUse: "residential_whole_house_diy",
  },
  lvt_glue_down_tile: {
    durability: 9, waterproof: 8, comfort: 6, installEase: 5, vfCost: 6,
    floating: false, forWetArea: true,
    core: "flexible_pvc_glue_down_tile",
    bestUse: "commercial_office_high_traffic",
  },
  sheet_vinyl_full_spread: {
    durability: 7, waterproof: 10, comfort: 7, installEase: 4, vfCost: 4,
    floating: false, forWetArea: true,
    core: "fiberglass_backed_sheet_roll",
    bestUse: "bathroom_laundry_seamless",
  },
  wpc_wood_polymer_core: {
    durability: 7, waterproof: 9, comfort: 9, installEase: 8, vfCost: 6,
    floating: true, forWetArea: true,
    core: "wood_polymer_composite_foam",
    bestUse: "residential_warm_soft_underfoot",
  },
  spc_stone_polymer_core: {
    durability: 9, waterproof: 9, comfort: 5, installEase: 8, vfCost: 5,
    floating: true, forWetArea: true,
    core: "limestone_polymer_rigid_core",
    bestUse: "commercial_light_stable_flat",
  },
};

function get(t: VinylFloorType): VinylFloorData {
  return DATA[t];
}

export const durability = (t: VinylFloorType) => get(t).durability;
export const waterproof = (t: VinylFloorType) => get(t).waterproof;
export const comfort = (t: VinylFloorType) => get(t).comfort;
export const installEase = (t: VinylFloorType) => get(t).installEase;
export const vfCost = (t: VinylFloorType) => get(t).vfCost;
export const floating = (t: VinylFloorType) => get(t).floating;
export const forWetArea = (t: VinylFloorType) => get(t).forWetArea;
export const core = (t: VinylFloorType) => get(t).core;
export const bestUse = (t: VinylFloorType) => get(t).bestUse;
export const vinylFloorTypes = (): VinylFloorType[] =>
  Object.keys(DATA) as VinylFloorType[];
