export type SprayDryType =
  | "co_current_nozzle"
  | "counter_current_tower"
  | "mixed_flow_fountain"
  | "fluidized_spray_agglom"
  | "spray_freeze_dry";

interface SprayDryData {
  particleSize: number;
  throughput: number;
  heatEfficiency: number;
  productQuality: number;
  sdCost: number;
  agglomerate: boolean;
  forPharma: boolean;
  atomizer: string;
  bestUse: string;
}

const DATA: Record<SprayDryType, SprayDryData> = {
  co_current_nozzle: {
    particleSize: 7, throughput: 9, heatEfficiency: 7, productQuality: 7, sdCost: 5,
    agglomerate: false, forPharma: false,
    atomizer: "pressure_nozzle_swirl_chamber",
    bestUse: "milk_powder_coffee_detergent_bulk",
  },
  counter_current_tower: {
    particleSize: 8, throughput: 8, heatEfficiency: 8, productQuality: 6, sdCost: 6,
    agglomerate: false, forPharma: false,
    atomizer: "rotary_atomizer_wheel_disc",
    bestUse: "ceramic_slurry_clay_chemical_powder",
  },
  mixed_flow_fountain: {
    particleSize: 6, throughput: 7, heatEfficiency: 9, productQuality: 8, sdCost: 7,
    agglomerate: false, forPharma: false,
    atomizer: "two_fluid_nozzle_air_assist",
    bestUse: "flavoring_enzyme_heat_sensitive",
  },
  fluidized_spray_agglom: {
    particleSize: 10, throughput: 7, heatEfficiency: 8, productQuality: 9, sdCost: 9,
    agglomerate: true, forPharma: true,
    atomizer: "top_spray_fluid_bed_nozzle",
    bestUse: "instant_beverage_agglomerate_granule",
  },
  spray_freeze_dry: {
    particleSize: 9, throughput: 4, heatEfficiency: 4, productQuality: 10, sdCost: 10,
    agglomerate: false, forPharma: true,
    atomizer: "cryogenic_nozzle_freeze_sublimate",
    bestUse: "pharma_probiotic_bioactive_preserve",
  },
};

function get(t: SprayDryType): SprayDryData {
  return DATA[t];
}

export const particleSize = (t: SprayDryType) => get(t).particleSize;
export const throughput = (t: SprayDryType) => get(t).throughput;
export const heatEfficiency = (t: SprayDryType) => get(t).heatEfficiency;
export const productQuality = (t: SprayDryType) => get(t).productQuality;
export const sdCost = (t: SprayDryType) => get(t).sdCost;
export const agglomerate = (t: SprayDryType) => get(t).agglomerate;
export const forPharma = (t: SprayDryType) => get(t).forPharma;
export const atomizer = (t: SprayDryType) => get(t).atomizer;
export const bestUse = (t: SprayDryType) => get(t).bestUse;
export const sprayDryTypes = (): SprayDryType[] =>
  Object.keys(DATA) as SprayDryType[];
