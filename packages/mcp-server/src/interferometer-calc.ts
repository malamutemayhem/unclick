export type InterferometerType =
  | "michelson"
  | "mach_zehnder"
  | "fabry_perot"
  | "fizeau"
  | "white_light";

interface InterferometerData {
  resolution: number;
  measurementRange: number;
  speed: number;
  stability: number;
  ifCost: number;
  nonContact: boolean;
  forSurface: boolean;
  optics: string;
  bestUse: string;
}

const DATA: Record<InterferometerType, InterferometerData> = {
  michelson: {
    resolution: 8, measurementRange: 9, speed: 7, stability: 8, ifCost: 6,
    nonContact: true, forSurface: false,
    optics: "beam_splitter_fixed_moving_mirror_path_difference_fringe",
    bestUse: "displacement_measurement_ftir_spectroscopy_coherence_test",
  },
  mach_zehnder: {
    resolution: 8, measurementRange: 7, speed: 9, stability: 7, ifCost: 7,
    nonContact: true, forSurface: false,
    optics: "two_beam_splitter_separate_path_phase_object_transparent",
    bestUse: "refractive_index_flow_visualization_plasma_diagnostic_test",
  },
  fabry_perot: {
    resolution: 10, measurementRange: 5, speed: 8, stability: 9, ifCost: 8,
    nonContact: true, forSurface: false,
    optics: "parallel_plate_etalon_multiple_beam_high_finesse_cavity",
    bestUse: "laser_wavelength_measurement_spectral_analysis_telecom_wdm",
  },
  fizeau: {
    resolution: 9, measurementRange: 7, speed: 8, stability: 9, ifCost: 9,
    nonContact: true, forSurface: true,
    optics: "reference_flat_test_surface_common_path_vibration_immune",
    bestUse: "optical_flat_lens_surface_quality_lambda_fraction_figure",
  },
  white_light: {
    resolution: 10, measurementRange: 4, speed: 6, stability: 8, ifCost: 10,
    nonContact: true, forSurface: true,
    optics: "broadband_source_scanning_z_axis_coherence_envelope_peak",
    bestUse: "surface_roughness_step_height_mems_semiconductor_3d_profile",
  },
};

function get(t: InterferometerType): InterferometerData {
  return DATA[t];
}

export const resolution = (t: InterferometerType) => get(t).resolution;
export const measurementRange = (t: InterferometerType) => get(t).measurementRange;
export const speed = (t: InterferometerType) => get(t).speed;
export const stability = (t: InterferometerType) => get(t).stability;
export const ifCost = (t: InterferometerType) => get(t).ifCost;
export const nonContact = (t: InterferometerType) => get(t).nonContact;
export const forSurface = (t: InterferometerType) => get(t).forSurface;
export const optics = (t: InterferometerType) => get(t).optics;
export const bestUse = (t: InterferometerType) => get(t).bestUse;
export const interferometerTypes = (): InterferometerType[] =>
  Object.keys(DATA) as InterferometerType[];
