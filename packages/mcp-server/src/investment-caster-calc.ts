export type InvestmentCasterType =
  | "lost_wax"
  | "lost_foam"
  | "ceramic_shell"
  | "plaster_mold"
  | "quick_cast";

interface InvestmentCasterData {
  surfaceFinish: number;
  throughput: number;
  dimensionalAccuracy: number;
  alloyRange: number;
  icCost: number;
  reusableMold: boolean;
  forAerospace: boolean;
  casterConfig: string;
  bestUse: string;
}

const DATA: Record<InvestmentCasterType, InvestmentCasterData> = {
  lost_wax: {
    surfaceFinish: 9, throughput: 5, dimensionalAccuracy: 9, alloyRange: 10, icCost: 8,
    reusableMold: false, forAerospace: true,
    casterConfig: "lost_wax_investment_caster_tree_shell_burnout_pour_superalloy",
    bestUse: "turbine_blade_lost_wax_investment_caster_superalloy_precision",
  },
  lost_foam: {
    surfaceFinish: 7, throughput: 7, dimensionalAccuracy: 7, alloyRange: 8, icCost: 5,
    reusableMold: false, forAerospace: false,
    casterConfig: "lost_foam_investment_caster_eps_pattern_sand_coat_vaporize",
    bestUse: "engine_block_lost_foam_investment_caster_eps_vaporize_complex",
  },
  ceramic_shell: {
    surfaceFinish: 10, throughput: 4, dimensionalAccuracy: 10, alloyRange: 10, icCost: 9,
    reusableMold: false, forAerospace: true,
    casterConfig: "ceramic_shell_investment_caster_multi_dip_stucco_fire_high_temp",
    bestUse: "aerospace_vane_ceramic_shell_investment_caster_high_temp_alloy",
  },
  plaster_mold: {
    surfaceFinish: 8, throughput: 6, dimensionalAccuracy: 8, alloyRange: 6, icCost: 5,
    reusableMold: false, forAerospace: false,
    casterConfig: "plaster_mold_investment_caster_gypsum_slurry_non_ferrous_fine",
    bestUse: "art_bronze_plaster_mold_investment_caster_gypsum_non_ferrous",
  },
  quick_cast: {
    surfaceFinish: 8, throughput: 8, dimensionalAccuracy: 8, alloyRange: 8, icCost: 7,
    reusableMold: false, forAerospace: false,
    casterConfig: "quick_cast_investment_caster_3d_print_pattern_rapid_prototype",
    bestUse: "prototype_quick_cast_investment_caster_3d_print_pattern_rapid",
  },
};

function get(t: InvestmentCasterType): InvestmentCasterData {
  return DATA[t];
}

export const surfaceFinish = (t: InvestmentCasterType) => get(t).surfaceFinish;
export const throughput = (t: InvestmentCasterType) => get(t).throughput;
export const dimensionalAccuracy = (t: InvestmentCasterType) => get(t).dimensionalAccuracy;
export const alloyRange = (t: InvestmentCasterType) => get(t).alloyRange;
export const icCost = (t: InvestmentCasterType) => get(t).icCost;
export const reusableMold = (t: InvestmentCasterType) => get(t).reusableMold;
export const forAerospace = (t: InvestmentCasterType) => get(t).forAerospace;
export const casterConfig = (t: InvestmentCasterType) => get(t).casterConfig;
export const bestUse = (t: InvestmentCasterType) => get(t).bestUse;
export const investmentCasterTypes = (): InvestmentCasterType[] =>
  Object.keys(DATA) as InvestmentCasterType[];
