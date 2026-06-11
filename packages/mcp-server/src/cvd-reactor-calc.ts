export type CvdReactorType =
  | "lpcvd_tube"
  | "pecvd_chamber"
  | "apcvd_belt"
  | "mocvd_reactor"
  | "ald_reactor";

interface CvdReactorData {
  filmUniformity: number;
  throughput: number;
  stepCoverage: number;
  temperatureRange: number;
  cvCost: number;
  lowTemp: boolean;
  forHighK: boolean;
  reactorConfig: string;
  bestUse: string;
}

const DATA: Record<CvdReactorType, CvdReactorData> = {
  lpcvd_tube: {
    filmUniformity: 9, throughput: 8, stepCoverage: 9, temperatureRange: 6, cvCost: 6,
    lowTemp: false, forHighK: false,
    reactorConfig: "lpcvd_tube_reactor_batch_low_pressure_nitride_oxide_poly_film",
    bestUse: "batch_nitride_oxide_lpcvd_tube_reactor_uniform_conformal_film",
  },
  pecvd_chamber: {
    filmUniformity: 8, throughput: 7, stepCoverage: 7, temperatureRange: 9, cvCost: 7,
    lowTemp: true, forHighK: false,
    reactorConfig: "pecvd_chamber_reactor_plasma_enhanced_low_temp_sin_sio2_film",
    bestUse: "low_temp_pecvd_chamber_plasma_sin_oxide_passivation_backend",
  },
  apcvd_belt: {
    filmUniformity: 7, throughput: 10, stepCoverage: 5, temperatureRange: 5, cvCost: 5,
    lowTemp: false, forHighK: false,
    reactorConfig: "apcvd_belt_reactor_atmospheric_continuous_oxide_glass_coat",
    bestUse: "solar_cell_apcvd_belt_reactor_atmospheric_oxide_antireflect",
  },
  mocvd_reactor: {
    filmUniformity: 10, throughput: 5, stepCoverage: 8, temperatureRange: 8, cvCost: 10,
    lowTemp: false, forHighK: false,
    reactorConfig: "mocvd_reactor_metalorganic_epitaxial_iii_v_compound_grow_film",
    bestUse: "led_laser_mocvd_reactor_epitaxial_gan_gaas_iii_v_compound",
  },
  ald_reactor: {
    filmUniformity: 10, throughput: 3, stepCoverage: 10, temperatureRange: 9, cvCost: 9,
    lowTemp: true, forHighK: true,
    reactorConfig: "ald_reactor_atomic_layer_deposition_self_limiting_angstrom",
    bestUse: "high_k_gate_ald_reactor_atomic_layer_angstrom_control_conformal",
  },
};

function get(t: CvdReactorType): CvdReactorData {
  return DATA[t];
}

export const filmUniformity = (t: CvdReactorType) => get(t).filmUniformity;
export const throughput = (t: CvdReactorType) => get(t).throughput;
export const stepCoverage = (t: CvdReactorType) => get(t).stepCoverage;
export const temperatureRange = (t: CvdReactorType) => get(t).temperatureRange;
export const cvCost = (t: CvdReactorType) => get(t).cvCost;
export const lowTemp = (t: CvdReactorType) => get(t).lowTemp;
export const forHighK = (t: CvdReactorType) => get(t).forHighK;
export const reactorConfig = (t: CvdReactorType) => get(t).reactorConfig;
export const bestUse = (t: CvdReactorType) => get(t).bestUse;
export const cvdReactorTypes = (): CvdReactorType[] =>
  Object.keys(DATA) as CvdReactorType[];
