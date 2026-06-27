export type BrineInjectorType =
  | "needle_injector"
  | "spray_injector"
  | "tumble_marinator"
  | "vacuum_tumbler"
  | "multi_needle_auto";

interface BrineInjectorData {
  brineDistribution: number;
  throughput: number;
  yieldGain: number;
  meatDamage: number;
  biCost: number;
  automated: boolean;
  forWhole: boolean;
  injectorConfig: string;
  bestUse: string;
}

const DATA: Record<BrineInjectorType, BrineInjectorData> = {
  needle_injector: {
    brineDistribution: 8, throughput: 7, yieldGain: 8, meatDamage: 7, biCost: 6,
    automated: false, forWhole: true,
    injectorConfig: "needle_injector_brine_single_row_pierce_inject_distribute_cure",
    bestUse: "ham_production_needle_injector_brine_cure_distribute_salt_flavor",
  },
  spray_injector: {
    brineDistribution: 6, throughput: 9, yieldGain: 6, meatDamage: 9, biCost: 5,
    automated: true, forWhole: false,
    injectorConfig: "spray_injector_brine_surface_mist_coat_marinate_no_pierce",
    bestUse: "poultry_processing_spray_injector_surface_brine_coat_fast_line",
  },
  tumble_marinator: {
    brineDistribution: 7, throughput: 8, yieldGain: 7, meatDamage: 8, biCost: 6,
    automated: true, forWhole: false,
    injectorConfig: "tumble_marinator_brine_rotate_drum_massage_absorb_tenderize",
    bestUse: "meat_processing_tumble_marinator_massage_brine_absorb_tenderize",
  },
  vacuum_tumbler: {
    brineDistribution: 9, throughput: 7, yieldGain: 9, meatDamage: 8, biCost: 8,
    automated: true, forWhole: true,
    injectorConfig: "vacuum_tumbler_brine_sealed_drum_vacuum_massage_deep_penetrate",
    bestUse: "premium_meat_vacuum_tumbler_deep_brine_penetration_high_yield",
  },
  multi_needle_auto: {
    brineDistribution: 10, throughput: 10, yieldGain: 10, meatDamage: 6, biCost: 10,
    automated: true, forWhole: true,
    injectorConfig: "multi_needle_auto_brine_injector_array_conveyor_precise_dose",
    bestUse: "industrial_meat_multi_needle_injector_high_speed_precise_brine",
  },
};

function get(t: BrineInjectorType): BrineInjectorData {
  return DATA[t];
}

export const brineDistribution = (t: BrineInjectorType) => get(t).brineDistribution;
export const throughput = (t: BrineInjectorType) => get(t).throughput;
export const yieldGain = (t: BrineInjectorType) => get(t).yieldGain;
export const meatDamage = (t: BrineInjectorType) => get(t).meatDamage;
export const biCost = (t: BrineInjectorType) => get(t).biCost;
export const automated = (t: BrineInjectorType) => get(t).automated;
export const forWhole = (t: BrineInjectorType) => get(t).forWhole;
export const injectorConfig = (t: BrineInjectorType) => get(t).injectorConfig;
export const bestUse = (t: BrineInjectorType) => get(t).bestUse;
export const brineInjectorTypes = (): BrineInjectorType[] =>
  Object.keys(DATA) as BrineInjectorType[];
