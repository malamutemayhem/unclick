export type GreenRoofType =
  | "extensive_sedum_thin"
  | "intensive_garden_deep"
  | "semi_intensive_mixed"
  | "blue_roof_detention"
  | "biosolar_pv_combo";

interface GreenRoofData {
  stormwater: number;
  insulation: number;
  biodiversity: number;
  maintenance: number;
  grCost: number;
  walkable: boolean;
  forRetrofit: boolean;
  substrate: string;
  bestUse: string;
}

const DATA: Record<GreenRoofType, GreenRoofData> = {
  extensive_sedum_thin: {
    stormwater: 6, insulation: 6, biodiversity: 5, maintenance: 9, grCost: 4,
    walkable: false, forRetrofit: true,
    substrate: "lightweight_mineral_4in_sedum",
    bestUse: "commercial_flat_roof_retrofit",
  },
  intensive_garden_deep: {
    stormwater: 8, insulation: 9, biodiversity: 10, maintenance: 3, grCost: 9,
    walkable: true, forRetrofit: false,
    substrate: "engineered_soil_24in_deep",
    bestUse: "rooftop_park_garden_amenity",
  },
  semi_intensive_mixed: {
    stormwater: 7, insulation: 7, biodiversity: 7, maintenance: 6, grCost: 6,
    walkable: true, forRetrofit: false,
    substrate: "mixed_depth_8_12in_perennial",
    bestUse: "office_terrace_mixed_planting",
  },
  blue_roof_detention: {
    stormwater: 10, insulation: 5, biodiversity: 3, maintenance: 7, grCost: 7,
    walkable: false, forRetrofit: true,
    substrate: "flow_restrictor_detention_tray",
    bestUse: "stormwater_detention_urban",
  },
  biosolar_pv_combo: {
    stormwater: 6, insulation: 7, biodiversity: 6, maintenance: 7, grCost: 8,
    walkable: false, forRetrofit: true,
    substrate: "sedum_mat_beneath_pv_array",
    bestUse: "solar_plus_green_roof_combo",
  },
};

function get(t: GreenRoofType): GreenRoofData {
  return DATA[t];
}

export const stormwater = (t: GreenRoofType) => get(t).stormwater;
export const insulation = (t: GreenRoofType) => get(t).insulation;
export const biodiversity = (t: GreenRoofType) => get(t).biodiversity;
export const maintenance = (t: GreenRoofType) => get(t).maintenance;
export const grCost = (t: GreenRoofType) => get(t).grCost;
export const walkable = (t: GreenRoofType) => get(t).walkable;
export const forRetrofit = (t: GreenRoofType) => get(t).forRetrofit;
export const substrate = (t: GreenRoofType) => get(t).substrate;
export const bestUse = (t: GreenRoofType) => get(t).bestUse;
export const greenRoofTypes = (): GreenRoofType[] =>
  Object.keys(DATA) as GreenRoofType[];
