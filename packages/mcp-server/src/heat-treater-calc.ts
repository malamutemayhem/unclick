export type HeatTreaterType =
  | "vacuum_anneal"
  | "solution_age"
  | "stress_relieve"
  | "case_harden"
  | "cryogenic_treat";

interface HeatTreaterData {
  tempAccuracy: number;
  throughput: number;
  atmosphereControl: number;
  uniformity: number;
  htCost: number;
  inert: boolean;
  forAmPart: boolean;
  treaterConfig: string;
  bestUse: string;
}

const DATA: Record<HeatTreaterType, HeatTreaterData> = {
  vacuum_anneal: {
    tempAccuracy: 9, throughput: 6, atmosphereControl: 9, uniformity: 9, htCost: 8,
    inert: true, forAmPart: true,
    treaterConfig: "vacuum_anneal_heat_treater_high_vacuum_slow_cool_recrystallize",
    bestUse: "titanium_am_part_vacuum_anneal_heat_treater_stress_free_ductile",
  },
  solution_age: {
    tempAccuracy: 8, throughput: 7, atmosphereControl: 7, uniformity: 8, htCost: 7,
    inert: false, forAmPart: true,
    treaterConfig: "solution_age_heat_treater_quench_then_age_precipitate_harden",
    bestUse: "aluminum_am_part_solution_age_heat_treater_t6_temper_strength",
  },
  stress_relieve: {
    tempAccuracy: 7, throughput: 8, atmosphereControl: 6, uniformity: 8, htCost: 5,
    inert: false, forAmPart: true,
    treaterConfig: "stress_relieve_heat_treater_sub_critical_hold_slow_cool_relax",
    bestUse: "dmls_build_stress_relieve_heat_treater_before_plate_removal",
  },
  case_harden: {
    tempAccuracy: 8, throughput: 6, atmosphereControl: 9, uniformity: 7, htCost: 7,
    inert: false, forAmPart: false,
    treaterConfig: "case_harden_heat_treater_carburize_atmosphere_surface_hard_core",
    bestUse: "gear_surface_case_harden_heat_treater_carburize_wear_resist",
  },
  cryogenic_treat: {
    tempAccuracy: 8, throughput: 5, atmosphereControl: 5, uniformity: 7, htCost: 6,
    inert: false, forAmPart: false,
    treaterConfig: "cryogenic_heat_treater_liquid_nitrogen_deep_cold_retained_aust",
    bestUse: "tool_steel_cryogenic_heat_treater_convert_retained_austenite",
  },
};

function get(t: HeatTreaterType): HeatTreaterData {
  return DATA[t];
}

export const tempAccuracy = (t: HeatTreaterType) => get(t).tempAccuracy;
export const throughput = (t: HeatTreaterType) => get(t).throughput;
export const atmosphereControl = (t: HeatTreaterType) => get(t).atmosphereControl;
export const uniformity = (t: HeatTreaterType) => get(t).uniformity;
export const htCost = (t: HeatTreaterType) => get(t).htCost;
export const inert = (t: HeatTreaterType) => get(t).inert;
export const forAmPart = (t: HeatTreaterType) => get(t).forAmPart;
export const treaterConfig = (t: HeatTreaterType) => get(t).treaterConfig;
export const bestUse = (t: HeatTreaterType) => get(t).bestUse;
export const heatTreaterTypes = (): HeatTreaterType[] =>
  Object.keys(DATA) as HeatTreaterType[];
