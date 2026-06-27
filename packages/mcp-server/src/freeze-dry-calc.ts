export type FreezeDryType =
  | "shelf_batch_pharma"
  | "manifold_flask_lab"
  | "rotary_freeze_bulk"
  | "spray_freeze_particle"
  | "atmospheric_freeze_belt";

interface FreezeDryData {
  sublimRate: number;
  quality: number;
  scalability: number;
  uniformity: number;
  fdCost: number;
  batch: boolean;
  forPharma: boolean;
  chamber: string;
  bestUse: string;
}

const DATA: Record<FreezeDryType, FreezeDryData> = {
  shelf_batch_pharma: {
    sublimRate: 7, quality: 10, scalability: 7, uniformity: 10, fdCost: 9,
    batch: true, forPharma: true,
    chamber: "heated_shelf_vacuum_condenser_trap",
    bestUse: "vaccine_injectable_vial_aseptic",
  },
  manifold_flask_lab: {
    sublimRate: 4, quality: 8, scalability: 2, uniformity: 5, fdCost: 3,
    batch: true, forPharma: false,
    chamber: "manifold_port_flask_shell_freeze",
    bestUse: "lab_sample_small_batch_research",
  },
  rotary_freeze_bulk: {
    sublimRate: 8, quality: 7, scalability: 8, uniformity: 7, fdCost: 7,
    batch: false, forPharma: false,
    chamber: "rotating_drum_vacuum_continuous",
    bestUse: "coffee_fruit_bulk_food_preserve",
  },
  spray_freeze_particle: {
    sublimRate: 9, quality: 9, scalability: 6, uniformity: 9, fdCost: 10,
    batch: false, forPharma: true,
    chamber: "spray_nozzle_cryogen_vacuum_collect",
    bestUse: "nanoparticle_inhale_dose_powder",
  },
  atmospheric_freeze_belt: {
    sublimRate: 6, quality: 6, scalability: 9, uniformity: 6, fdCost: 6,
    batch: false, forPharma: false,
    chamber: "belt_conveyor_cold_dry_air_ambient",
    bestUse: "vegetable_herb_low_cost_continuous",
  },
};

function get(t: FreezeDryType): FreezeDryData {
  return DATA[t];
}

export const sublimRate = (t: FreezeDryType) => get(t).sublimRate;
export const quality = (t: FreezeDryType) => get(t).quality;
export const scalability = (t: FreezeDryType) => get(t).scalability;
export const uniformity = (t: FreezeDryType) => get(t).uniformity;
export const fdCost = (t: FreezeDryType) => get(t).fdCost;
export const batch = (t: FreezeDryType) => get(t).batch;
export const forPharma = (t: FreezeDryType) => get(t).forPharma;
export const chamber = (t: FreezeDryType) => get(t).chamber;
export const bestUse = (t: FreezeDryType) => get(t).bestUse;
export const freezeDryTypes = (): FreezeDryType[] =>
  Object.keys(DATA) as FreezeDryType[];
