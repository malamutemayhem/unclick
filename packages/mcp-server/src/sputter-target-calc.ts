export type SputterTargetType =
  | "planar_dc"
  | "planar_rf"
  | "rotary_target"
  | "conical_target"
  | "compound_target";

interface SputterTargetData {
  utilization: number;
  throughput: number;
  filmPurity: number;
  targetLife: number;
  stCost: number;
  reactive: boolean;
  forInsulator: boolean;
  targetConfig: string;
  bestUse: string;
}

const DATA: Record<SputterTargetType, SputterTargetData> = {
  planar_dc: {
    utilization: 5, throughput: 8, filmPurity: 8, targetLife: 5, stCost: 4,
    reactive: false, forInsulator: false,
    targetConfig: "planar_dc_sputter_target_magnetron_metal_conductive_race_track",
    bestUse: "metal_film_planar_dc_sputter_target_conductive_high_rate_simple",
  },
  planar_rf: {
    utilization: 5, throughput: 6, filmPurity: 9, targetLife: 5, stCost: 7,
    reactive: true, forInsulator: true,
    targetConfig: "planar_rf_sputter_target_dielectric_insulator_impedance_match",
    bestUse: "oxide_film_planar_rf_sputter_target_dielectric_insulator_deposit",
  },
  rotary_target: {
    utilization: 9, throughput: 9, filmPurity: 8, targetLife: 9, stCost: 8,
    reactive: true, forInsulator: false,
    targetConfig: "rotary_sputter_target_cylindrical_full_erosion_inline_coater",
    bestUse: "large_area_rotary_sputter_target_inline_glass_coat_high_utilize",
  },
  conical_target: {
    utilization: 7, throughput: 7, filmPurity: 9, targetLife: 7, stCost: 6,
    reactive: false, forInsulator: false,
    targetConfig: "conical_sputter_target_focused_deposition_step_coverage_via_fill",
    bestUse: "via_fill_conical_sputter_target_focused_deposition_step_coverage",
  },
  compound_target: {
    utilization: 5, throughput: 5, filmPurity: 10, targetLife: 4, stCost: 9,
    reactive: false, forInsulator: true,
    targetConfig: "compound_sputter_target_ceramic_alloy_stoichiometric_transfer",
    bestUse: "stoichiometric_compound_sputter_target_ceramic_exact_composition",
  },
};

function get(t: SputterTargetType): SputterTargetData {
  return DATA[t];
}

export const utilization = (t: SputterTargetType) => get(t).utilization;
export const throughput = (t: SputterTargetType) => get(t).throughput;
export const filmPurity = (t: SputterTargetType) => get(t).filmPurity;
export const targetLife = (t: SputterTargetType) => get(t).targetLife;
export const stCost = (t: SputterTargetType) => get(t).stCost;
export const reactive = (t: SputterTargetType) => get(t).reactive;
export const forInsulator = (t: SputterTargetType) => get(t).forInsulator;
export const targetConfig = (t: SputterTargetType) => get(t).targetConfig;
export const bestUse = (t: SputterTargetType) => get(t).bestUse;
export const sputterTargetTypes = (): SputterTargetType[] =>
  Object.keys(DATA) as SputterTargetType[];
