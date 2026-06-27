export type BioswaleType =
  | "vegetated_channel_linear"
  | "dry_swale_underdrain"
  | "wet_swale_permanent_pool"
  | "bioretention_rain_garden"
  | "constructed_wetland_cell";

interface BioswaleData {
  filtration: number;
  capacity: number;
  biodiversity: number;
  maintenance: number;
  bwCost: number;
  permanentWater: boolean;
  forUrban: boolean;
  media: string;
  bestUse: string;
}

const DATA: Record<BioswaleType, BioswaleData> = {
  vegetated_channel_linear: {
    filtration: 6, capacity: 7, biodiversity: 5, maintenance: 7, bwCost: 3,
    permanentWater: false, forUrban: false,
    media: "native_grass_topsoil_channel",
    bestUse: "parking_lot_edge_road_median",
  },
  dry_swale_underdrain: {
    filtration: 8, capacity: 7, biodiversity: 6, maintenance: 6, bwCost: 5,
    permanentWater: false, forUrban: true,
    media: "engineered_soil_perf_underdrain",
    bestUse: "commercial_site_stormwater",
  },
  wet_swale_permanent_pool: {
    filtration: 7, capacity: 8, biodiversity: 8, maintenance: 5, bwCost: 4,
    permanentWater: true, forUrban: false,
    media: "aquatic_plants_permanent_pool",
    bestUse: "low_gradient_coastal_site",
  },
  bioretention_rain_garden: {
    filtration: 9, capacity: 6, biodiversity: 9, maintenance: 5, bwCost: 6,
    permanentWater: false, forUrban: true,
    media: "sand_compost_mulch_filter_bed",
    bestUse: "residential_campus_rain_garden",
  },
  constructed_wetland_cell: {
    filtration: 10, capacity: 10, biodiversity: 10, maintenance: 4, bwCost: 8,
    permanentWater: true, forUrban: false,
    media: "wetland_cells_cattail_sedge",
    bestUse: "large_site_regional_treatment",
  },
};

function get(t: BioswaleType): BioswaleData {
  return DATA[t];
}

export const filtration = (t: BioswaleType) => get(t).filtration;
export const capacity = (t: BioswaleType) => get(t).capacity;
export const biodiversity = (t: BioswaleType) => get(t).biodiversity;
export const maintenance = (t: BioswaleType) => get(t).maintenance;
export const bwCost = (t: BioswaleType) => get(t).bwCost;
export const permanentWater = (t: BioswaleType) => get(t).permanentWater;
export const forUrban = (t: BioswaleType) => get(t).forUrban;
export const media = (t: BioswaleType) => get(t).media;
export const bestUse = (t: BioswaleType) => get(t).bestUse;
export const bioswaleTypes = (): BioswaleType[] =>
  Object.keys(DATA) as BioswaleType[];
