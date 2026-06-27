export type FluidizedBedDryType =
  | "static_continuous"
  | "vibrating_gentle"
  | "pulsed_flow_sticky"
  | "spouted_bed_coarse"
  | "inert_bed_paste";

interface FluidizedBedDryData {
  heatTransfer: number;
  uniformity: number;
  gentleness: number;
  throughput: number;
  fbCost: number;
  continuous: boolean;
  forFine: boolean;
  method: string;
  bestUse: string;
}

const DATA: Record<FluidizedBedDryType, FluidizedBedDryData> = {
  static_continuous: {
    heatTransfer: 8, uniformity: 8, gentleness: 6, throughput: 9, fbCost: 5,
    continuous: true, forFine: true,
    method: "static_distributor_plate_upward_air_flow",
    bestUse: "salt_sugar_crystalline_product_continuous",
  },
  vibrating_gentle: {
    heatTransfer: 8, uniformity: 9, gentleness: 9, throughput: 7, fbCost: 6,
    continuous: true, forFine: true,
    method: "vibrating_deck_conveying_gentle_fluidize",
    bestUse: "pharma_granule_tea_leaf_fragile_product",
  },
  pulsed_flow_sticky: {
    heatTransfer: 7, uniformity: 7, gentleness: 7, throughput: 6, fbCost: 7,
    continuous: true, forFine: false,
    method: "pulsed_air_intermittent_flow_anti_agglom",
    bestUse: "sticky_cohesive_food_waste_biomass_pellet",
  },
  spouted_bed_coarse: {
    heatTransfer: 7, uniformity: 7, gentleness: 5, throughput: 8, fbCost: 4,
    continuous: true, forFine: false,
    method: "central_spout_fountain_coarse_particle",
    bestUse: "grain_seed_pea_large_particle_coating",
  },
  inert_bed_paste: {
    heatTransfer: 9, uniformity: 6, gentleness: 4, throughput: 5, fbCost: 5,
    continuous: false, forFine: false,
    method: "inert_sphere_bed_paste_spread_dry_crush",
    bestUse: "sludge_paste_slurry_difficult_to_dry",
  },
};

function get(t: FluidizedBedDryType): FluidizedBedDryData {
  return DATA[t];
}

export const heatTransfer = (t: FluidizedBedDryType) => get(t).heatTransfer;
export const uniformity = (t: FluidizedBedDryType) => get(t).uniformity;
export const gentleness = (t: FluidizedBedDryType) => get(t).gentleness;
export const throughput = (t: FluidizedBedDryType) => get(t).throughput;
export const fbCost = (t: FluidizedBedDryType) => get(t).fbCost;
export const continuous = (t: FluidizedBedDryType) => get(t).continuous;
export const forFine = (t: FluidizedBedDryType) => get(t).forFine;
export const method = (t: FluidizedBedDryType) => get(t).method;
export const bestUse = (t: FluidizedBedDryType) => get(t).bestUse;
export const fluidizedBedDryTypes = (): FluidizedBedDryType[] =>
  Object.keys(DATA) as FluidizedBedDryType[];
