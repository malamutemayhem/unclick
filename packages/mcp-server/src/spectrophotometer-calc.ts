export type SpectrophotometerType =
  | "uv_vis_single_beam"
  | "uv_vis_double_beam"
  | "nir_reflectance"
  | "fluorescence"
  | "atomic_absorption";

interface SpectrophotometerData {
  wavelengthRange: number;
  resolution: number;
  accuracy: number;
  speed: number;
  spCost: number;
  scanning: boolean;
  forQuantitative: boolean;
  detector: string;
  bestUse: string;
}

const DATA: Record<SpectrophotometerType, SpectrophotometerData> = {
  uv_vis_single_beam: {
    wavelengthRange: 7, resolution: 7, accuracy: 7, speed: 6, spCost: 4,
    scanning: true, forQuantitative: true,
    detector: "silicon_photodiode_single_beam_190_1100nm_deuterium_tungsten",
    bestUse: "teaching_lab_routine_concentration_beer_lambert_absorbance",
  },
  uv_vis_double_beam: {
    wavelengthRange: 8, resolution: 9, accuracy: 9, speed: 8, spCost: 7,
    scanning: true, forQuantitative: true,
    detector: "dual_beam_reference_sample_pmt_detector_baseline_correct",
    bestUse: "pharmaceutical_qc_kinetics_scan_high_accuracy_absorbance",
  },
  nir_reflectance: {
    wavelengthRange: 6, resolution: 7, accuracy: 8, speed: 10, spCost: 8,
    scanning: false, forQuantitative: true,
    detector: "ingaas_detector_nir_900_2500nm_diffuse_reflectance_probe",
    bestUse: "grain_moisture_protein_fat_content_food_at_line_analysis",
  },
  fluorescence: {
    wavelengthRange: 7, resolution: 8, accuracy: 8, speed: 7, spCost: 8,
    scanning: true, forQuantitative: true,
    detector: "pmt_emission_detector_excitation_monochromator_xenon_lamp",
    bestUse: "trace_analysis_dna_protein_fluorophore_environmental_water",
  },
  atomic_absorption: {
    wavelengthRange: 5, resolution: 8, accuracy: 10, speed: 7, spCost: 9,
    scanning: false, forQuantitative: true,
    detector: "hollow_cathode_lamp_flame_graphite_furnace_element_specific",
    bestUse: "metal_trace_analysis_lead_cadmium_mercury_water_food_soil",
  },
};

function get(t: SpectrophotometerType): SpectrophotometerData {
  return DATA[t];
}

export const wavelengthRange = (t: SpectrophotometerType) => get(t).wavelengthRange;
export const resolution = (t: SpectrophotometerType) => get(t).resolution;
export const accuracy = (t: SpectrophotometerType) => get(t).accuracy;
export const speed = (t: SpectrophotometerType) => get(t).speed;
export const spCost = (t: SpectrophotometerType) => get(t).spCost;
export const scanning = (t: SpectrophotometerType) => get(t).scanning;
export const forQuantitative = (t: SpectrophotometerType) => get(t).forQuantitative;
export const detector = (t: SpectrophotometerType) => get(t).detector;
export const bestUse = (t: SpectrophotometerType) => get(t).bestUse;
export const spectrophotometerTypes = (): SpectrophotometerType[] =>
  Object.keys(DATA) as SpectrophotometerType[];
