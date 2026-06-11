export type AnalyticalInstrumentType =
  | "gas_chromatograph_gc"
  | "mass_spectrometer_ms"
  | "uv_vis_spectrophoto"
  | "x_ray_fluorescence"
  | "ftir_spectrometer";

interface AnalyticalInstrumentData {
  sensitivity: number;
  selectivity: number;
  sampleThroughput: number;
  easeOfUse: number;
  aiCost: number;
  portable: boolean;
  forFieldUse: boolean;
  detector: string;
  bestUse: string;
}

const DATA: Record<AnalyticalInstrumentType, AnalyticalInstrumentData> = {
  gas_chromatograph_gc: {
    sensitivity: 9, selectivity: 9, sampleThroughput: 6, easeOfUse: 5, aiCost: 7,
    portable: false, forFieldUse: false,
    detector: "fid_tcd_ecd_column_separation_carrier_gas_oven",
    bestUse: "petrochemical_environmental_volatile_compound_analysis",
  },
  mass_spectrometer_ms: {
    sensitivity: 10, selectivity: 10, sampleThroughput: 5, easeOfUse: 3, aiCost: 10,
    portable: false, forFieldUse: false,
    detector: "ion_source_mass_analyzer_quadrupole_tof_detector",
    bestUse: "pharma_forensic_proteomics_trace_identification",
  },
  uv_vis_spectrophoto: {
    sensitivity: 7, selectivity: 5, sampleThroughput: 9, easeOfUse: 9, aiCost: 4,
    portable: true, forFieldUse: true,
    detector: "deuterium_tungsten_lamp_photodiode_cuvette_path",
    bestUse: "water_quality_food_color_dna_quantification_routine",
  },
  x_ray_fluorescence: {
    sensitivity: 8, selectivity: 8, sampleThroughput: 8, easeOfUse: 8, aiCost: 8,
    portable: true, forFieldUse: true,
    detector: "x_ray_tube_excitation_silicon_drift_detector_energy",
    bestUse: "metal_alloy_sorting_mining_assay_rohs_screening",
  },
  ftir_spectrometer: {
    sensitivity: 8, selectivity: 8, sampleThroughput: 7, easeOfUse: 7, aiCost: 6,
    portable: true, forFieldUse: true,
    detector: "interferometer_beamsplitter_mct_or_dtgs_detector",
    bestUse: "polymer_identification_coating_analysis_qc_lab",
  },
};

function get(t: AnalyticalInstrumentType): AnalyticalInstrumentData {
  return DATA[t];
}

export const sensitivity = (t: AnalyticalInstrumentType) => get(t).sensitivity;
export const selectivity = (t: AnalyticalInstrumentType) => get(t).selectivity;
export const sampleThroughput = (t: AnalyticalInstrumentType) => get(t).sampleThroughput;
export const easeOfUse = (t: AnalyticalInstrumentType) => get(t).easeOfUse;
export const aiCost = (t: AnalyticalInstrumentType) => get(t).aiCost;
export const portable = (t: AnalyticalInstrumentType) => get(t).portable;
export const forFieldUse = (t: AnalyticalInstrumentType) => get(t).forFieldUse;
export const detector = (t: AnalyticalInstrumentType) => get(t).detector;
export const bestUse = (t: AnalyticalInstrumentType) => get(t).bestUse;
export const analyticalInstrumentTypes = (): AnalyticalInstrumentType[] =>
  Object.keys(DATA) as AnalyticalInstrumentType[];
