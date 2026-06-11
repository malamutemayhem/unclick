export type ThinFilmCoaterType =
  | "ebeam_evaporate"
  | "sputter_coat"
  | "thermal_evaporate"
  | "iad_coat"
  | "dip_sol_gel";

interface ThinFilmCoaterData {
  filmDensity: number;
  throughput: number;
  thicknessControl: number;
  adhesion: number;
  tfCost: number;
  highEnergy: boolean;
  forAntiReflect: boolean;
  coaterConfig: string;
  bestUse: string;
}

const DATA: Record<ThinFilmCoaterType, ThinFilmCoaterData> = {
  ebeam_evaporate: {
    filmDensity: 8, throughput: 7, thicknessControl: 9, adhesion: 7, tfCost: 8,
    highEnergy: true, forAntiReflect: true,
    coaterConfig: "ebeam_thin_film_coater_electron_beam_evaporate_vacuum_deposit",
    bestUse: "optical_filter_ebeam_thin_film_coater_multilayer_dielectric",
  },
  sputter_coat: {
    filmDensity: 10, throughput: 8, thicknessControl: 9, adhesion: 10, tfCost: 9,
    highEnergy: true, forAntiReflect: true,
    coaterConfig: "sputter_thin_film_coater_magnetron_target_plasma_dense_film",
    bestUse: "durable_optics_sputter_thin_film_coater_dense_hard_multilayer",
  },
  thermal_evaporate: {
    filmDensity: 6, throughput: 6, thicknessControl: 7, adhesion: 6, tfCost: 4,
    highEnergy: false, forAntiReflect: true,
    coaterConfig: "thermal_thin_film_coater_resistive_boat_evaporate_metal_coat",
    bestUse: "simple_metal_thermal_thin_film_coater_aluminum_mirror_coat",
  },
  iad_coat: {
    filmDensity: 10, throughput: 6, thicknessControl: 10, adhesion: 10, tfCost: 10,
    highEnergy: true, forAntiReflect: true,
    coaterConfig: "iad_thin_film_coater_ion_assist_deposit_dense_shift_free_film",
    bestUse: "precision_optics_iad_thin_film_coater_dense_shift_free_stable",
  },
  dip_sol_gel: {
    filmDensity: 5, throughput: 5, thicknessControl: 5, adhesion: 5, tfCost: 3,
    highEnergy: false, forAntiReflect: false,
    coaterConfig: "dip_sol_gel_thin_film_coater_wet_chemistry_oxide_coat_simple",
    bestUse: "prototype_dip_sol_gel_thin_film_coater_wet_oxide_low_cost",
  },
};

function get(t: ThinFilmCoaterType): ThinFilmCoaterData {
  return DATA[t];
}

export const filmDensity = (t: ThinFilmCoaterType) => get(t).filmDensity;
export const throughput = (t: ThinFilmCoaterType) => get(t).throughput;
export const thicknessControl = (t: ThinFilmCoaterType) => get(t).thicknessControl;
export const adhesion = (t: ThinFilmCoaterType) => get(t).adhesion;
export const tfCost = (t: ThinFilmCoaterType) => get(t).tfCost;
export const highEnergy = (t: ThinFilmCoaterType) => get(t).highEnergy;
export const forAntiReflect = (t: ThinFilmCoaterType) => get(t).forAntiReflect;
export const coaterConfig = (t: ThinFilmCoaterType) => get(t).coaterConfig;
export const bestUse = (t: ThinFilmCoaterType) => get(t).bestUse;
export const thinFilmCoaterTypes = (): ThinFilmCoaterType[] =>
  Object.keys(DATA) as ThinFilmCoaterType[];
