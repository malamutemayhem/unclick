export type OilAnalysisType =
  | "particle_count_iso"
  | "spectrometric_wear"
  | "ferrography_analytical"
  | "acid_number_tan"
  | "viscosity_kinematic";

interface OilAnalysisData {
  sensitivity: number;
  speed: number;
  trendability: number;
  specificity: number;
  oaCost: number;
  onsite: boolean;
  forWear: boolean;
  method: string;
  bestUse: string;
}

const DATA: Record<OilAnalysisType, OilAnalysisData> = {
  particle_count_iso: {
    sensitivity: 8, speed: 9, trendability: 9, specificity: 5, oaCost: 5,
    onsite: true, forWear: false,
    method: "laser_light_blockage_scatter",
    bestUse: "hydraulic_fluid_cleanliness_iso",
  },
  spectrometric_wear: {
    sensitivity: 9, speed: 8, trendability: 10, specificity: 9, oaCost: 7,
    onsite: false, forWear: true,
    method: "icp_oes_rotating_disc_electrode",
    bestUse: "engine_gearbox_bearing_element",
  },
  ferrography_analytical: {
    sensitivity: 10, speed: 5, trendability: 7, specificity: 10, oaCost: 9,
    onsite: false, forWear: true,
    method: "magnetic_separation_microscopy",
    bestUse: "root_cause_failure_mode_identify",
  },
  acid_number_tan: {
    sensitivity: 7, speed: 9, trendability: 8, specificity: 6, oaCost: 4,
    onsite: true, forWear: false,
    method: "potentiometric_titration_koh",
    bestUse: "turbine_compressor_oil_oxidation",
  },
  viscosity_kinematic: {
    sensitivity: 8, speed: 10, trendability: 9, specificity: 4, oaCost: 3,
    onsite: true, forWear: false,
    method: "capillary_tube_falling_ball_40c",
    bestUse: "lube_oil_condition_baseline_trend",
  },
};

function get(t: OilAnalysisType): OilAnalysisData {
  return DATA[t];
}

export const sensitivity = (t: OilAnalysisType) => get(t).sensitivity;
export const speed = (t: OilAnalysisType) => get(t).speed;
export const trendability = (t: OilAnalysisType) => get(t).trendability;
export const specificity = (t: OilAnalysisType) => get(t).specificity;
export const oaCost = (t: OilAnalysisType) => get(t).oaCost;
export const onsite = (t: OilAnalysisType) => get(t).onsite;
export const forWear = (t: OilAnalysisType) => get(t).forWear;
export const method = (t: OilAnalysisType) => get(t).method;
export const bestUse = (t: OilAnalysisType) => get(t).bestUse;
export const oilAnalysisTypes = (): OilAnalysisType[] =>
  Object.keys(DATA) as OilAnalysisType[];
