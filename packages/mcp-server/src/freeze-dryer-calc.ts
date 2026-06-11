export type FreezeDryerType =
  | "shelf_batch_pharma"
  | "manifold_lab_small"
  | "rotary_freeze_bulk"
  | "continuous_tunnel"
  | "atmospheric_spray_freeze";

interface FreezeDryerData {
  quality: number;
  uniformity: number;
  throughput: number;
  energyUse: number;
  fzCost: number;
  continuous: boolean;
  forPharma: boolean;
  condenser: string;
  bestUse: string;
}

const DATA: Record<FreezeDryerType, FreezeDryerData> = {
  shelf_batch_pharma: {
    quality: 10, uniformity: 10, throughput: 5, energyUse: 4, fzCost: 8,
    continuous: false, forPharma: true,
    condenser: "internal_condenser_shelf_heated_vacuum",
    bestUse: "pharma_vaccine_injectable_gmp_validated",
  },
  manifold_lab_small: {
    quality: 9, uniformity: 7, throughput: 2, energyUse: 5, fzCost: 4,
    continuous: false, forPharma: false,
    condenser: "external_manifold_flask_lab_bench_top",
    bestUse: "lab_research_sample_prep_small_batch",
  },
  rotary_freeze_bulk: {
    quality: 7, uniformity: 6, throughput: 7, energyUse: 5, fzCost: 6,
    continuous: false, forPharma: false,
    condenser: "rotary_drum_shell_freeze_bulk_product",
    bestUse: "food_coffee_fruit_bulk_product_retain",
  },
  continuous_tunnel: {
    quality: 8, uniformity: 8, throughput: 10, energyUse: 6, fzCost: 10,
    continuous: true, forPharma: false,
    condenser: "tunnel_conveyor_continuous_multi_zone",
    bestUse: "large_scale_food_military_ration_instant",
  },
  atmospheric_spray_freeze: {
    quality: 8, uniformity: 7, throughput: 6, energyUse: 3, fzCost: 7,
    continuous: true, forPharma: true,
    condenser: "spray_freeze_atmospheric_cold_gas_flow",
    bestUse: "nano_particle_inhalation_powder_biologic",
  },
};

function get(t: FreezeDryerType): FreezeDryerData {
  return DATA[t];
}

export const quality = (t: FreezeDryerType) => get(t).quality;
export const uniformity = (t: FreezeDryerType) => get(t).uniformity;
export const throughput = (t: FreezeDryerType) => get(t).throughput;
export const energyUse = (t: FreezeDryerType) => get(t).energyUse;
export const fzCost = (t: FreezeDryerType) => get(t).fzCost;
export const continuous = (t: FreezeDryerType) => get(t).continuous;
export const forPharma = (t: FreezeDryerType) => get(t).forPharma;
export const condenser = (t: FreezeDryerType) => get(t).condenser;
export const bestUse = (t: FreezeDryerType) => get(t).bestUse;
export const freezeDryerTypes = (): FreezeDryerType[] =>
  Object.keys(DATA) as FreezeDryerType[];
