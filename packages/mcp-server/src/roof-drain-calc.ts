export type RoofDrainType =
  | "gravity_dome_strainer"
  | "siphonic_engineered"
  | "overflow_secondary"
  | "controlled_flow_weir"
  | "green_roof_retention";

interface RoofDrainData {
  flow: number;
  capacity: number;
  debris: number;
  maintenance: number;
  rdCost: number;
  siphonic: boolean;
  forLargeRoof: boolean;
  strainer: string;
  bestUse: string;
}

const DATA: Record<RoofDrainType, RoofDrainData> = {
  gravity_dome_strainer: {
    flow: 6, capacity: 6, debris: 7, maintenance: 8, rdCost: 3,
    siphonic: false, forLargeRoof: false,
    strainer: "cast_iron_dome_poly_strainer",
    bestUse: "standard_flat_roof_commercial",
  },
  siphonic_engineered: {
    flow: 10, capacity: 10, debris: 7, maintenance: 6, rdCost: 9,
    siphonic: true, forLargeRoof: true,
    strainer: "engineered_baffle_anti_vortex",
    bestUse: "large_warehouse_airport_roof",
  },
  overflow_secondary: {
    flow: 7, capacity: 7, debris: 8, maintenance: 8, rdCost: 4,
    siphonic: false, forLargeRoof: false,
    strainer: "dome_with_overflow_dam_ring",
    bestUse: "code_required_secondary_drain",
  },
  controlled_flow_weir: {
    flow: 5, capacity: 8, debris: 6, maintenance: 7, rdCost: 6,
    siphonic: false, forLargeRoof: true,
    strainer: "weir_plate_controlled_outlet",
    bestUse: "stormwater_detention_on_roof",
  },
  green_roof_retention: {
    flow: 4, capacity: 9, debris: 5, maintenance: 6, rdCost: 7,
    siphonic: false, forLargeRoof: true,
    strainer: "gravel_guard_retention_plate",
    bestUse: "vegetated_green_roof_system",
  },
};

function get(t: RoofDrainType): RoofDrainData {
  return DATA[t];
}

export const flow = (t: RoofDrainType) => get(t).flow;
export const capacity = (t: RoofDrainType) => get(t).capacity;
export const debris = (t: RoofDrainType) => get(t).debris;
export const maintenance = (t: RoofDrainType) => get(t).maintenance;
export const rdCost = (t: RoofDrainType) => get(t).rdCost;
export const siphonic = (t: RoofDrainType) => get(t).siphonic;
export const forLargeRoof = (t: RoofDrainType) => get(t).forLargeRoof;
export const strainer = (t: RoofDrainType) => get(t).strainer;
export const bestUse = (t: RoofDrainType) => get(t).bestUse;
export const roofDrainTypes = (): RoofDrainType[] =>
  Object.keys(DATA) as RoofDrainType[];
