export type ChocolateConcheType =
  | "longitudinal_conche"
  | "rotary_conche"
  | "dual_conche"
  | "continuous_conche"
  | "ball_mill_refiner";

interface ChocolateConcheData {
  flavorDevelopment: number;
  particleFineness: number;
  throughput: number;
  volatileRemoval: number;
  ccCost_: number;
  continuous: boolean;
  forDark: boolean;
  concheConfig: string;
  bestUse: string;
}

const DATA: Record<ChocolateConcheType, ChocolateConcheData> = {
  longitudinal_conche: {
    flavorDevelopment: 10, particleFineness: 8, throughput: 4, volatileRemoval: 10, ccCost_: 7,
    continuous: false, forDark: true,
    concheConfig: "longitudinal_conche_roller_granite_bed_long_slow_flavor_develop",
    bestUse: "premium_dark_chocolate_longitudinal_conche_long_slow_flavor_rich",
  },
  rotary_conche: {
    flavorDevelopment: 8, particleFineness: 9, throughput: 7, volatileRemoval: 8, ccCost_: 6,
    continuous: false, forDark: true,
    concheConfig: "rotary_conche_rotating_drum_scraper_arm_shear_aerate_refine_mass",
    bestUse: "standard_chocolate_factory_rotary_conche_efficient_batch_refine",
  },
  dual_conche: {
    flavorDevelopment: 9, particleFineness: 9, throughput: 8, volatileRemoval: 9, ccCost_: 9,
    continuous: false, forDark: true,
    concheConfig: "dual_conche_two_stage_dry_wet_phase_intensive_shear_flavor_develop",
    bestUse: "quality_chocolate_dual_conche_dry_wet_phase_intensive_flavor_body",
  },
  continuous_conche: {
    flavorDevelopment: 7, particleFineness: 8, throughput: 10, volatileRemoval: 7, ccCost_: 8,
    continuous: true, forDark: false,
    concheConfig: "continuous_conche_inline_twin_screw_non_stop_mass_production_flow",
    bestUse: "mass_chocolate_production_continuous_conche_inline_high_throughput",
  },
  ball_mill_refiner: {
    flavorDevelopment: 6, particleFineness: 10, throughput: 9, volatileRemoval: 5, ccCost_: 5,
    continuous: true, forDark: false,
    concheConfig: "ball_mill_refiner_conche_steel_balls_grind_refine_combine_single_unit",
    bestUse: "compound_coating_chocolate_ball_mill_refiner_grind_conche_combined",
  },
};

function get(t: ChocolateConcheType): ChocolateConcheData {
  return DATA[t];
}

export const flavorDevelopment = (t: ChocolateConcheType) => get(t).flavorDevelopment;
export const particleFineness = (t: ChocolateConcheType) => get(t).particleFineness;
export const throughput = (t: ChocolateConcheType) => get(t).throughput;
export const volatileRemoval = (t: ChocolateConcheType) => get(t).volatileRemoval;
export const ccCost_ = (t: ChocolateConcheType) => get(t).ccCost_;
export const continuous = (t: ChocolateConcheType) => get(t).continuous;
export const forDark = (t: ChocolateConcheType) => get(t).forDark;
export const concheConfig = (t: ChocolateConcheType) => get(t).concheConfig;
export const bestUse = (t: ChocolateConcheType) => get(t).bestUse;
export const chocolateConcheTypes = (): ChocolateConcheType[] =>
  Object.keys(DATA) as ChocolateConcheType[];
