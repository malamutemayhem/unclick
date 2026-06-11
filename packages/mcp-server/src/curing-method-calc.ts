export type CuringMethodType =
  | "water_ponding_moist"
  | "curing_compound_membrane"
  | "plastic_sheet_cover"
  | "steam_curing_accelerated"
  | "autoclave_high_pressure";

interface CuringData {
  effectiveness: number;
  speed: number;
  labor: number;
  uniformity: number;
  cuCost: number;
  accelerated: boolean;
  forSlab: boolean;
  method: string;
  bestUse: string;
}

const DATA: Record<CuringMethodType, CuringData> = {
  water_ponding_moist: {
    effectiveness: 9, speed: 3, labor: 3, uniformity: 8, cuCost: 2,
    accelerated: false, forSlab: true,
    method: "continuous_water_pond_spray",
    bestUse: "flat_slab_pavement_long_cure",
  },
  curing_compound_membrane: {
    effectiveness: 7, speed: 8, labor: 9, uniformity: 7, cuCost: 4,
    accelerated: false, forSlab: true,
    method: "spray_membrane_seal_moisture",
    bestUse: "large_area_slab_fast_application",
  },
  plastic_sheet_cover: {
    effectiveness: 7, speed: 7, labor: 7, uniformity: 6, cuCost: 3,
    accelerated: false, forSlab: true,
    method: "polyethylene_sheet_trap_moisture",
    bestUse: "column_wall_vertical_surface",
  },
  steam_curing_accelerated: {
    effectiveness: 8, speed: 9, labor: 6, uniformity: 9, cuCost: 7,
    accelerated: true, forSlab: false,
    method: "enclosed_chamber_live_steam",
    bestUse: "precast_factory_rapid_turnover",
  },
  autoclave_high_pressure: {
    effectiveness: 10, speed: 10, labor: 5, uniformity: 10, cuCost: 10,
    accelerated: true, forSlab: false,
    method: "high_pressure_steam_180c_1mpa",
    bestUse: "aac_block_high_strength_precast",
  },
};

function get(t: CuringMethodType): CuringData {
  return DATA[t];
}

export const effectiveness = (t: CuringMethodType) => get(t).effectiveness;
export const speed = (t: CuringMethodType) => get(t).speed;
export const labor = (t: CuringMethodType) => get(t).labor;
export const uniformity = (t: CuringMethodType) => get(t).uniformity;
export const cuCost = (t: CuringMethodType) => get(t).cuCost;
export const accelerated = (t: CuringMethodType) => get(t).accelerated;
export const forSlab = (t: CuringMethodType) => get(t).forSlab;
export const method = (t: CuringMethodType) => get(t).method;
export const bestUse = (t: CuringMethodType) => get(t).bestUse;
export const curingMethodTypes = (): CuringMethodType[] =>
  Object.keys(DATA) as CuringMethodType[];
