export type FluidBedDryType =
  | "batch_static_bed"
  | "continuous_vibrating"
  | "pulsed_intermittent"
  | "spouted_bed_coarse"
  | "inert_carrier_paste";

interface FluidBedDryData {
  uniformity: number;
  throughput: number;
  heatTransfer: number;
  gentleness: number;
  fbCost: number;
  continuous: boolean;
  forPharma: boolean;
  gasFlow: string;
  bestUse: string;
}

const DATA: Record<FluidBedDryType, FluidBedDryData> = {
  batch_static_bed: {
    uniformity: 7, throughput: 5, heatTransfer: 8, gentleness: 7, fbCost: 4,
    continuous: false, forPharma: true,
    gasFlow: "upward_air_through_perforated_plate",
    bestUse: "pharma_granule_batch_gmp_validate",
  },
  continuous_vibrating: {
    uniformity: 9, throughput: 9, heatTransfer: 9, gentleness: 8, fbCost: 7,
    continuous: true, forPharma: false,
    gasFlow: "vibrating_deck_forward_transport",
    bestUse: "chemical_salt_mineral_continuous",
  },
  pulsed_intermittent: {
    uniformity: 8, throughput: 7, heatTransfer: 7, gentleness: 9, fbCost: 6,
    continuous: false, forPharma: true,
    gasFlow: "pulsed_air_intermittent_agitation",
    bestUse: "food_herb_enzyme_heat_sensitive",
  },
  spouted_bed_coarse: {
    uniformity: 6, throughput: 8, heatTransfer: 8, gentleness: 5, fbCost: 5,
    continuous: true, forPharma: false,
    gasFlow: "central_spout_jet_annular_return",
    bestUse: "grain_seed_catalyst_large_particle",
  },
  inert_carrier_paste: {
    uniformity: 7, throughput: 6, heatTransfer: 9, gentleness: 6, fbCost: 8,
    continuous: true, forPharma: false,
    gasFlow: "inert_media_paste_coat_dry_strip",
    bestUse: "slurry_paste_sludge_sticky_feed",
  },
};

function get(t: FluidBedDryType): FluidBedDryData {
  return DATA[t];
}

export const uniformity = (t: FluidBedDryType) => get(t).uniformity;
export const throughput = (t: FluidBedDryType) => get(t).throughput;
export const heatTransfer = (t: FluidBedDryType) => get(t).heatTransfer;
export const gentleness = (t: FluidBedDryType) => get(t).gentleness;
export const fbCost = (t: FluidBedDryType) => get(t).fbCost;
export const continuous = (t: FluidBedDryType) => get(t).continuous;
export const forPharma = (t: FluidBedDryType) => get(t).forPharma;
export const gasFlow = (t: FluidBedDryType) => get(t).gasFlow;
export const bestUse = (t: FluidBedDryType) => get(t).bestUse;
export const fluidBedDryTypes = (): FluidBedDryType[] =>
  Object.keys(DATA) as FluidBedDryType[];
