export type ClarifierType =
  | "circular_center_feed"
  | "rectangular_chain_flight"
  | "lamella_inclined_plate"
  | "dissolved_air_flotation"
  | "ballasted_floc_micro_sand";

interface ClarifierData {
  removal: number;
  footprint: number;
  flowRate: number;
  sludge: number;
  clCost: number;
  gravity: boolean;
  forPrimary: boolean;
  mechanism: string;
  bestUse: string;
}

const DATA: Record<ClarifierType, ClarifierData> = {
  circular_center_feed: {
    removal: 7, footprint: 5, flowRate: 8, sludge: 8, clCost: 6,
    gravity: true, forPrimary: true,
    mechanism: "center_well_radial_scraper",
    bestUse: "municipal_primary_secondary_settle",
  },
  rectangular_chain_flight: {
    removal: 7, footprint: 7, flowRate: 9, sludge: 7, clCost: 5,
    gravity: true, forPrimary: true,
    mechanism: "chain_flight_bottom_scraper",
    bestUse: "large_flow_parallel_basin_grit",
  },
  lamella_inclined_plate: {
    removal: 8, footprint: 10, flowRate: 7, sludge: 6, clCost: 7,
    gravity: true, forPrimary: false,
    mechanism: "inclined_plates_short_settle_path",
    bestUse: "compact_retrofit_high_rate_settle",
  },
  dissolved_air_flotation: {
    removal: 9, footprint: 8, flowRate: 7, sludge: 9, clCost: 8,
    gravity: false, forPrimary: false,
    mechanism: "micro_bubble_float_skim_surface",
    bestUse: "oil_grease_algae_low_density_solid",
  },
  ballasted_floc_micro_sand: {
    removal: 9, footprint: 9, flowRate: 10, sludge: 8, clCost: 9,
    gravity: true, forPrimary: true,
    mechanism: "micro_sand_ballast_rapid_settle",
    bestUse: "wet_weather_cso_rapid_treatment",
  },
};

function get(t: ClarifierType): ClarifierData {
  return DATA[t];
}

export const removal = (t: ClarifierType) => get(t).removal;
export const footprint = (t: ClarifierType) => get(t).footprint;
export const flowRate = (t: ClarifierType) => get(t).flowRate;
export const sludge = (t: ClarifierType) => get(t).sludge;
export const clCost = (t: ClarifierType) => get(t).clCost;
export const gravity = (t: ClarifierType) => get(t).gravity;
export const forPrimary = (t: ClarifierType) => get(t).forPrimary;
export const mechanism = (t: ClarifierType) => get(t).mechanism;
export const bestUse = (t: ClarifierType) => get(t).bestUse;
export const clarifierTypes = (): ClarifierType[] =>
  Object.keys(DATA) as ClarifierType[];
