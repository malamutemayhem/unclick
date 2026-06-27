export type SpiralConcentratorType =
  | "coal_wash"
  | "mineral_sand"
  | "iron_ore"
  | "fine_recovery"
  | "chrome_concentrating";

interface SpiralConcentratorData {
  recovery: number;
  throughput: number;
  selectivity: number;
  waterUsage: number;
  scCost: number;
  gravity: boolean;
  forFinePart: boolean;
  trough: string;
  bestUse: string;
}

const DATA: Record<SpiralConcentratorType, SpiralConcentratorData> = {
  coal_wash: {
    recovery: 8, throughput: 10, selectivity: 7, waterUsage: 7, scCost: 4,
    gravity: true, forFinePart: false,
    trough: "wide_pitch_coal_spiral_high_capacity_7_turn_wash_circuit",
    bestUse: "coal_preparation_plant_fine_coal_recovery_clean_coal_wash",
  },
  mineral_sand: {
    recovery: 9, throughput: 8, selectivity: 9, waterUsage: 8, scCost: 5,
    gravity: true, forFinePart: false,
    trough: "mineral_sand_spiral_tight_pitch_heavy_mineral_concentrate",
    bestUse: "beach_sand_ilmenite_rutile_zircon_heavy_mineral_separation",
  },
  iron_ore: {
    recovery: 8, throughput: 9, selectivity: 8, waterUsage: 7, scCost: 5,
    gravity: true, forFinePart: false,
    trough: "iron_ore_spiral_medium_pitch_high_density_separation",
    bestUse: "iron_ore_beneficiation_hematite_concentrate_silica_reject",
  },
  fine_recovery: {
    recovery: 7, throughput: 5, selectivity: 8, waterUsage: 9, scCost: 6,
    gravity: true, forFinePart: true,
    trough: "fine_particle_spiral_shallow_profile_low_flow_rate_recovery",
    bestUse: "fine_gold_tin_tungsten_recovery_tailings_retreatment_scavenge",
  },
  chrome_concentrating: {
    recovery: 9, throughput: 7, selectivity: 9, waterUsage: 8, scCost: 5,
    gravity: true, forFinePart: false,
    trough: "chrome_spiral_steep_pitch_high_sg_differential_concentrate",
    bestUse: "chromite_ore_concentration_ug2_reef_pgm_tailings_chrome",
  },
};

function get(t: SpiralConcentratorType): SpiralConcentratorData {
  return DATA[t];
}

export const recovery = (t: SpiralConcentratorType) => get(t).recovery;
export const throughput = (t: SpiralConcentratorType) => get(t).throughput;
export const selectivity = (t: SpiralConcentratorType) => get(t).selectivity;
export const waterUsage = (t: SpiralConcentratorType) => get(t).waterUsage;
export const scCost = (t: SpiralConcentratorType) => get(t).scCost;
export const gravity = (t: SpiralConcentratorType) => get(t).gravity;
export const forFinePart = (t: SpiralConcentratorType) => get(t).forFinePart;
export const trough = (t: SpiralConcentratorType) => get(t).trough;
export const bestUse = (t: SpiralConcentratorType) => get(t).bestUse;
export const spiralConcentratorTypes = (): SpiralConcentratorType[] =>
  Object.keys(DATA) as SpiralConcentratorType[];
