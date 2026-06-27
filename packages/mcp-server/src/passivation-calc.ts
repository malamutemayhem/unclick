export type PassivationType =
  | "nitric_acid"
  | "citric_acid"
  | "electrochemical"
  | "nitric_dichromate"
  | "chelant_based";

interface PassivationData {
  oxideQuality: number;
  processSpeed: number;
  environmentalSafety: number;
  saltSprayLife: number;
  paCost: number;
  chromeFree: boolean;
  forStainless: boolean;
  chemistry: string;
  bestUse: string;
}

const DATA: Record<PassivationType, PassivationData> = {
  nitric_acid: {
    oxideQuality: 8, processSpeed: 7, environmentalSafety: 5, saltSprayLife: 8, paCost: 4,
    chromeFree: true, forStainless: true,
    chemistry: "nitric_acid_20_50_pct_immersion_dissolve_iron_form_oxide",
    bestUse: "standard_stainless_steel_passivation_astm_a967_mil_spec",
  },
  citric_acid: {
    oxideQuality: 8, processSpeed: 7, environmentalSafety: 10, saltSprayLife: 8, paCost: 5,
    chromeFree: true, forStainless: true,
    chemistry: "citric_acid_4_10_pct_chelate_free_iron_gentle_safe_rinse",
    bestUse: "medical_device_food_contact_pharmaceutical_green_chemistry",
  },
  electrochemical: {
    oxideQuality: 10, processSpeed: 6, environmentalSafety: 7, saltSprayLife: 10, paCost: 8,
    chromeFree: true, forStainless: true,
    chemistry: "anodic_current_force_oxide_growth_controlled_potential_thick",
    bestUse: "critical_corrosion_service_valve_fitting_marine_hardware",
  },
  nitric_dichromate: {
    oxideQuality: 9, processSpeed: 8, environmentalSafety: 2, saltSprayLife: 9, paCost: 6,
    chromeFree: false, forStainless: true,
    chemistry: "nitric_acid_plus_sodium_dichromate_seal_oxide_enhanced",
    bestUse: "legacy_aerospace_spec_high_corrosion_environment_mil_std",
  },
  chelant_based: {
    oxideQuality: 7, processSpeed: 9, environmentalSafety: 9, saltSprayLife: 7, paCost: 5,
    chromeFree: true, forStainless: true,
    chemistry: "edta_nta_chelating_agent_spray_or_gel_on_site_application",
    bestUse: "field_repair_weld_cleanup_large_vessel_on_site_treatment",
  },
};

function get(t: PassivationType): PassivationData {
  return DATA[t];
}

export const oxideQuality = (t: PassivationType) => get(t).oxideQuality;
export const processSpeed = (t: PassivationType) => get(t).processSpeed;
export const environmentalSafety = (t: PassivationType) => get(t).environmentalSafety;
export const saltSprayLife = (t: PassivationType) => get(t).saltSprayLife;
export const paCost = (t: PassivationType) => get(t).paCost;
export const chromeFree = (t: PassivationType) => get(t).chromeFree;
export const forStainless = (t: PassivationType) => get(t).forStainless;
export const chemistry = (t: PassivationType) => get(t).chemistry;
export const bestUse = (t: PassivationType) => get(t).bestUse;
export const passivationTypes = (): PassivationType[] =>
  Object.keys(DATA) as PassivationType[];
