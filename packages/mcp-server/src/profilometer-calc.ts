export type ProfilometerType =
  | "contact_stylus"
  | "optical_confocal"
  | "white_light_int"
  | "afm_profiler"
  | "laser_triangulation";

interface ProfilometerData {
  resolution: number;
  throughput: number;
  scanArea: number;
  verticalRange: number;
  pfCost: number;
  nonContact: boolean;
  forNano: boolean;
  profConfig: string;
  bestUse: string;
}

const DATA: Record<ProfilometerType, ProfilometerData> = {
  contact_stylus: {
    resolution: 7, throughput: 6, scanArea: 8, verticalRange: 9, pfCost: 5,
    nonContact: false, forNano: false,
    profConfig: "contact_stylus_profilometer_diamond_tip_trace_surface_roughness",
    bestUse: "surface_roughness_contact_stylus_profilometer_standard_ra_rz",
  },
  optical_confocal: {
    resolution: 9, throughput: 8, scanArea: 7, verticalRange: 7, pfCost: 8,
    nonContact: true, forNano: true,
    profConfig: "optical_confocal_profilometer_laser_pinhole_3d_surface_topography",
    bestUse: "3d_topography_optical_confocal_profilometer_non_contact_fast",
  },
  white_light_int: {
    resolution: 10, throughput: 7, scanArea: 6, verticalRange: 6, pfCost: 9,
    nonContact: true, forNano: true,
    profConfig: "white_light_interferometric_profilometer_sub_nm_step_height",
    bestUse: "step_height_white_light_interferometric_profilometer_sub_nm",
  },
  afm_profiler: {
    resolution: 10, throughput: 3, scanArea: 3, verticalRange: 4, pfCost: 10,
    nonContact: true, forNano: true,
    profConfig: "afm_profilometer_atomic_force_cantilever_tip_nano_topography",
    bestUse: "nano_surface_afm_profilometer_atomic_force_sub_angstrom_resolve",
  },
  laser_triangulation: {
    resolution: 5, throughput: 10, scanArea: 10, verticalRange: 10, pfCost: 4,
    nonContact: true, forNano: false,
    profConfig: "laser_triangulation_profilometer_fast_inline_macro_geometry",
    bestUse: "inline_inspect_laser_triangulation_profilometer_fast_macro_shape",
  },
};

function get(t: ProfilometerType): ProfilometerData {
  return DATA[t];
}

export const resolution = (t: ProfilometerType) => get(t).resolution;
export const throughput = (t: ProfilometerType) => get(t).throughput;
export const scanArea = (t: ProfilometerType) => get(t).scanArea;
export const verticalRange = (t: ProfilometerType) => get(t).verticalRange;
export const pfCost = (t: ProfilometerType) => get(t).pfCost;
export const nonContact = (t: ProfilometerType) => get(t).nonContact;
export const forNano = (t: ProfilometerType) => get(t).forNano;
export const profConfig = (t: ProfilometerType) => get(t).profConfig;
export const bestUse = (t: ProfilometerType) => get(t).bestUse;
export const profilometerTypes = (): ProfilometerType[] =>
  Object.keys(DATA) as ProfilometerType[];
