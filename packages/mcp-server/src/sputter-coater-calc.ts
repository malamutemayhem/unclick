export type SputterCoaterType =
  | "dc_magnetron"
  | "rf_magnetron"
  | "reactive_sputter"
  | "ion_beam"
  | "hipims";

interface SputterCoaterData {
  depositionRate: number;
  filmUniformity: number;
  filmDensity: number;
  targetUtilization: number;
  scCost: number;
  reactive: boolean;
  forOptical: boolean;
  coaterConfig: string;
  bestUse: string;
}

const DATA: Record<SputterCoaterType, SputterCoaterData> = {
  dc_magnetron: {
    depositionRate: 9, filmUniformity: 8, filmDensity: 8, targetUtilization: 7, scCost: 6,
    reactive: false, forOptical: false,
    coaterConfig: "dc_magnetron_sputter_metal_target_argon_plasma_thin_film_coat",
    bestUse: "metal_thin_film_aluminum_copper_titanium_dc_magnetron_sputter",
  },
  rf_magnetron: {
    depositionRate: 6, filmUniformity: 9, filmDensity: 9, targetUtilization: 7, scCost: 8,
    reactive: false, forOptical: true,
    coaterConfig: "rf_magnetron_sputter_dielectric_insulator_target_13_56mhz_coat",
    bestUse: "dielectric_oxide_nitride_film_rf_magnetron_sputter_insulator",
  },
  reactive_sputter: {
    depositionRate: 7, filmUniformity: 8, filmDensity: 9, targetUtilization: 6, scCost: 7,
    reactive: true, forOptical: true,
    coaterConfig: "reactive_sputter_metal_target_oxygen_nitrogen_gas_compound_film",
    bestUse: "oxide_nitride_compound_film_reactive_sputter_metal_target_gas",
  },
  ion_beam: {
    depositionRate: 4, filmUniformity: 10, filmDensity: 10, targetUtilization: 8, scCost: 9,
    reactive: false, forOptical: true,
    coaterConfig: "ion_beam_sputter_deposition_precise_energy_control_optical_coat",
    bestUse: "precision_optical_coating_mirror_filter_ion_beam_sputter_dense",
  },
  hipims: {
    depositionRate: 8, filmUniformity: 9, filmDensity: 10, targetUtilization: 9, scCost: 10,
    reactive: true, forOptical: false,
    coaterConfig: "hipims_high_power_impulse_magnetron_sputter_dense_hard_coating",
    bestUse: "hard_wear_coating_tool_die_hipims_dense_adherent_metal_film",
  },
};

function get(t: SputterCoaterType): SputterCoaterData {
  return DATA[t];
}

export const depositionRate = (t: SputterCoaterType) => get(t).depositionRate;
export const filmUniformity = (t: SputterCoaterType) => get(t).filmUniformity;
export const filmDensity = (t: SputterCoaterType) => get(t).filmDensity;
export const targetUtilization = (t: SputterCoaterType) => get(t).targetUtilization;
export const scCost = (t: SputterCoaterType) => get(t).scCost;
export const reactive = (t: SputterCoaterType) => get(t).reactive;
export const forOptical = (t: SputterCoaterType) => get(t).forOptical;
export const coaterConfig = (t: SputterCoaterType) => get(t).coaterConfig;
export const bestUse = (t: SputterCoaterType) => get(t).bestUse;
export const sputterCoaterTypes = (): SputterCoaterType[] =>
  Object.keys(DATA) as SputterCoaterType[];
