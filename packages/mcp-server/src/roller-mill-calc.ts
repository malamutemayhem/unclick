export type RollerMillType =
  | "smooth_roll"
  | "corrugated_roll"
  | "fluted_break"
  | "reduction_roll"
  | "sizing_roll";

interface RollerMillData {
  grindFineness: number;
  throughput: number;
  energyEfficiency: number;
  particleUniformity: number;
  rmCost: number;
  adjustable: boolean;
  forWheat: boolean;
  millConfig: string;
  bestUse: string;
}

const DATA: Record<RollerMillType, RollerMillData> = {
  smooth_roll: {
    grindFineness: 9, throughput: 7, energyEfficiency: 8, particleUniformity: 9, rmCost: 6,
    adjustable: true, forWheat: true,
    millConfig: "smooth_roll_mill_polished_surface_compression_reduction_fine_flour",
    bestUse: "flour_mill_smooth_roll_reduction_pass_fine_white_flour_production",
  },
  corrugated_roll: {
    grindFineness: 7, throughput: 9, energyEfficiency: 7, particleUniformity: 7, rmCost: 7,
    adjustable: true, forWheat: true,
    millConfig: "corrugated_roll_mill_grooved_surface_shear_break_open_grain",
    bestUse: "grain_mill_corrugated_roll_break_pass_initial_grain_opening",
  },
  fluted_break: {
    grindFineness: 6, throughput: 10, energyEfficiency: 6, particleUniformity: 6, rmCost: 5,
    adjustable: true, forWheat: true,
    millConfig: "fluted_break_roll_mill_deep_flute_aggressive_break_coarse_grind",
    bestUse: "large_flour_mill_fluted_break_roll_first_break_high_extraction",
  },
  reduction_roll: {
    grindFineness: 10, throughput: 6, energyEfficiency: 7, particleUniformity: 10, rmCost: 8,
    adjustable: true, forWheat: true,
    millConfig: "reduction_roll_mill_fine_gap_smooth_surface_endosperm_flour",
    bestUse: "premium_flour_mill_reduction_roll_ultra_fine_patent_flour",
  },
  sizing_roll: {
    grindFineness: 8, throughput: 8, energyEfficiency: 8, particleUniformity: 8, rmCost: 7,
    adjustable: true, forWheat: false,
    millConfig: "sizing_roll_mill_intermediate_gap_classify_semolina_middlings",
    bestUse: "semolina_mill_sizing_roll_intermediate_particle_classification",
  },
};

function get(t: RollerMillType): RollerMillData {
  return DATA[t];
}

export const grindFineness = (t: RollerMillType) => get(t).grindFineness;
export const throughput = (t: RollerMillType) => get(t).throughput;
export const energyEfficiency = (t: RollerMillType) => get(t).energyEfficiency;
export const particleUniformity = (t: RollerMillType) => get(t).particleUniformity;
export const rmCost = (t: RollerMillType) => get(t).rmCost;
export const adjustable = (t: RollerMillType) => get(t).adjustable;
export const forWheat = (t: RollerMillType) => get(t).forWheat;
export const millConfig = (t: RollerMillType) => get(t).millConfig;
export const bestUse = (t: RollerMillType) => get(t).bestUse;
export const rollerMillTypes = (): RollerMillType[] =>
  Object.keys(DATA) as RollerMillType[];
