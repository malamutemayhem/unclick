export type PhAnalyzerType =
  | "glass_electrode_standard"
  | "isfet_solid_state"
  | "antimony_electrode_hf"
  | "enamel_electrode_abrasive"
  | "differential_double_junc";

interface PhAnalyzerData {
  accuracy: number;
  response: number;
  durability: number;
  maintenance: number;
  paCost: number;
  solidState: boolean;
  forHarsh: boolean;
  electrode: string;
  bestUse: string;
}

const DATA: Record<PhAnalyzerType, PhAnalyzerData> = {
  glass_electrode_standard: {
    accuracy: 9, response: 8, durability: 5, maintenance: 5, paCost: 3,
    solidState: false, forHarsh: false,
    electrode: "glass_bulb_ag_agcl_reference_kcl_fill",
    bestUse: "general_water_treatment_lab_process",
  },
  isfet_solid_state: {
    accuracy: 7, response: 9, durability: 8, maintenance: 8, paCost: 5,
    solidState: true, forHarsh: false,
    electrode: "ion_sensitive_field_effect_transistor",
    bestUse: "food_dairy_flat_surface_no_glass_break",
  },
  antimony_electrode_hf: {
    accuracy: 5, response: 6, durability: 7, maintenance: 7, paCost: 4,
    solidState: true, forHarsh: true,
    electrode: "antimony_metal_oxide_hf_resistant",
    bestUse: "hydrofluoric_acid_hf_etch_semiconductor",
  },
  enamel_electrode_abrasive: {
    accuracy: 6, response: 5, durability: 10, maintenance: 9, paCost: 7,
    solidState: true, forHarsh: true,
    electrode: "enamel_coated_body_extreme_abrasion",
    bestUse: "slurry_abrasive_mining_pulp_lime_dose",
  },
  differential_double_junc: {
    accuracy: 8, response: 7, durability: 7, maintenance: 6, paCost: 5,
    solidState: false, forHarsh: false,
    electrode: "double_junction_reference_poison_resist",
    bestUse: "chemical_process_sulfide_protein_poison",
  },
};

function get(t: PhAnalyzerType): PhAnalyzerData {
  return DATA[t];
}

export const accuracy = (t: PhAnalyzerType) => get(t).accuracy;
export const response = (t: PhAnalyzerType) => get(t).response;
export const durability = (t: PhAnalyzerType) => get(t).durability;
export const maintenance = (t: PhAnalyzerType) => get(t).maintenance;
export const paCost = (t: PhAnalyzerType) => get(t).paCost;
export const solidState = (t: PhAnalyzerType) => get(t).solidState;
export const forHarsh = (t: PhAnalyzerType) => get(t).forHarsh;
export const electrode = (t: PhAnalyzerType) => get(t).electrode;
export const bestUse = (t: PhAnalyzerType) => get(t).bestUse;
export const phAnalyzerTypes = (): PhAnalyzerType[] =>
  Object.keys(DATA) as PhAnalyzerType[];
