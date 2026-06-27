export type PoolFilterType =
  | "sand_media_standard"
  | "cartridge_pleated"
  | "de_diatomaceous_earth"
  | "glass_media_recycled"
  | "regenerative_media";

interface PoolFilterData {
  filtration: number;
  maintenance: number;
  flow: number;
  longevity: number;
  pfCost: number;
  backwash: boolean;
  forCommercial: boolean;
  media: string;
  bestUse: string;
}

const DATA: Record<PoolFilterType, PoolFilterData> = {
  sand_media_standard: {
    filtration: 5, maintenance: 7, flow: 8, longevity: 8, pfCost: 3,
    backwash: true, forCommercial: false,
    media: "silica_sand_20_grade_bed",
    bestUse: "residential_pool_basic_filter",
  },
  cartridge_pleated: {
    filtration: 7, maintenance: 6, flow: 6, longevity: 5, pfCost: 4,
    backwash: false, forCommercial: false,
    media: "polyester_pleated_100_sqft",
    bestUse: "small_pool_spa_no_backwash",
  },
  de_diatomaceous_earth: {
    filtration: 10, maintenance: 4, flow: 7, longevity: 7, pfCost: 6,
    backwash: true, forCommercial: false,
    media: "diatomaceous_earth_powder_coat",
    bestUse: "crystal_clear_water_quality",
  },
  glass_media_recycled: {
    filtration: 7, maintenance: 8, flow: 8, longevity: 10, pfCost: 5,
    backwash: true, forCommercial: true,
    media: "recycled_glass_afm_activated",
    bestUse: "eco_friendly_commercial_pool",
  },
  regenerative_media: {
    filtration: 9, maintenance: 5, flow: 9, longevity: 8, pfCost: 9,
    backwash: false, forCommercial: true,
    media: "perlite_regen_bump_filter",
    bestUse: "large_public_pool_aquatic_ctr",
  },
};

function get(t: PoolFilterType): PoolFilterData {
  return DATA[t];
}

export const filtration = (t: PoolFilterType) => get(t).filtration;
export const maintenance = (t: PoolFilterType) => get(t).maintenance;
export const flow = (t: PoolFilterType) => get(t).flow;
export const longevity = (t: PoolFilterType) => get(t).longevity;
export const pfCost = (t: PoolFilterType) => get(t).pfCost;
export const backwash = (t: PoolFilterType) => get(t).backwash;
export const forCommercial = (t: PoolFilterType) => get(t).forCommercial;
export const media = (t: PoolFilterType) => get(t).media;
export const bestUse = (t: PoolFilterType) => get(t).bestUse;
export const poolFilterTypes = (): PoolFilterType[] =>
  Object.keys(DATA) as PoolFilterType[];
