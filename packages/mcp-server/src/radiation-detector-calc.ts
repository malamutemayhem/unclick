export type RadiationDetectorType =
  | "geiger_muller_tube"
  | "scintillation_nai_crystal"
  | "hpge_semiconductor"
  | "proportional_gas_counter"
  | "silicon_pin_diode";

const DATA: Record<RadiationDetectorType, {
  sensitivity: number; resolution: number; speed: number;
  portability: number; rdCost: number; spectroscopic: boolean;
  forSurvey: boolean; medium: string; bestUse: string;
}> = {
  geiger_muller_tube: {
    sensitivity: 7, resolution: 2, speed: 8,
    portability: 10, rdCost: 1, spectroscopic: false,
    forSurvey: true, medium: "inert_gas_halogen_quench",
    bestUse: "health_physics_contamination_survey",
  },
  scintillation_nai_crystal: {
    sensitivity: 9, resolution: 6, speed: 9,
    portability: 7, rdCost: 3, spectroscopic: true,
    forSurvey: true, medium: "sodium_iodide_thallium_crystal",
    bestUse: "gamma_spectroscopy_nuclide_id",
  },
  hpge_semiconductor: {
    sensitivity: 8, resolution: 10, speed: 7,
    portability: 3, rdCost: 5, spectroscopic: true,
    forSurvey: false, medium: "high_purity_germanium_cooled",
    bestUse: "lab_gamma_spec_env_sample",
  },
  proportional_gas_counter: {
    sensitivity: 8, resolution: 5, speed: 7,
    portability: 5, rdCost: 3, spectroscopic: true,
    forSurvey: false, medium: "p10_gas_argon_methane",
    bestUse: "alpha_beta_counting_smear_sample",
  },
  silicon_pin_diode: {
    sensitivity: 6, resolution: 7, speed: 10,
    portability: 9, rdCost: 2, spectroscopic: true,
    forSurvey: false, medium: "silicon_depletion_layer",
    bestUse: "xray_fluorescence_handheld_analyzer",
  },
};

const get = (t: RadiationDetectorType) => DATA[t];

export const sensitivity = (t: RadiationDetectorType) => get(t).sensitivity;
export const resolution = (t: RadiationDetectorType) => get(t).resolution;
export const speed = (t: RadiationDetectorType) => get(t).speed;
export const portability = (t: RadiationDetectorType) => get(t).portability;
export const rdCost = (t: RadiationDetectorType) => get(t).rdCost;
export const spectroscopic = (t: RadiationDetectorType) => get(t).spectroscopic;
export const forSurvey = (t: RadiationDetectorType) => get(t).forSurvey;
export const medium = (t: RadiationDetectorType) => get(t).medium;
export const bestUse = (t: RadiationDetectorType) => get(t).bestUse;
export const radiationDetectorTypes = (): RadiationDetectorType[] => Object.keys(DATA) as RadiationDetectorType[];
