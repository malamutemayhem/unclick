export type MagnetronSputterType =
  | "balanced_magnetron"
  | "unbalanced_magnetron"
  | "dual_magnetron"
  | "hipims"
  | "closed_field";

interface MagnetronSputterData {
  depositionRate: number;
  throughput: number;
  filmDensity: number;
  targetUtil: number;
  msCost: number;
  reactive: boolean;
  forHardCoat: boolean;
  sputterConfig: string;
  bestUse: string;
}

const DATA: Record<MagnetronSputterType, MagnetronSputterData> = {
  balanced_magnetron: {
    depositionRate: 8, throughput: 8, filmDensity: 6, targetUtil: 5, msCost: 5,
    reactive: false, forHardCoat: false,
    sputterConfig: "balanced_magnetron_sputter_confined_plasma_high_rate_metal_film",
    bestUse: "metal_film_balanced_magnetron_sputter_confined_plasma_high_rate",
  },
  unbalanced_magnetron: {
    depositionRate: 7, throughput: 7, filmDensity: 9, targetUtil: 5, msCost: 6,
    reactive: true, forHardCoat: true,
    sputterConfig: "unbalanced_magnetron_sputter_ion_assist_dense_film_substrate",
    bestUse: "hard_coat_unbalanced_magnetron_sputter_ion_bombard_dense_film",
  },
  dual_magnetron: {
    depositionRate: 9, throughput: 9, filmDensity: 8, targetUtil: 7, msCost: 7,
    reactive: true, forHardCoat: false,
    sputterConfig: "dual_magnetron_sputter_ac_pulsed_reactive_no_arc_insulator_film",
    bestUse: "reactive_coat_dual_magnetron_sputter_ac_pulse_arc_free_oxide",
  },
  hipims: {
    depositionRate: 5, throughput: 5, filmDensity: 10, targetUtil: 6, msCost: 10,
    reactive: true, forHardCoat: true,
    sputterConfig: "hipims_high_power_impulse_magnetron_sputter_ultra_dense_metal_ion",
    bestUse: "ultra_dense_hipims_high_power_impulse_sputter_metal_ion_film",
  },
  closed_field: {
    depositionRate: 7, throughput: 8, filmDensity: 9, targetUtil: 6, msCost: 8,
    reactive: true, forHardCoat: true,
    sputterConfig: "closed_field_magnetron_sputter_linked_magnets_uniform_ion_assist",
    bestUse: "tool_coat_closed_field_magnetron_sputter_linked_magnets_uniform",
  },
};

function get(t: MagnetronSputterType): MagnetronSputterData {
  return DATA[t];
}

export const depositionRate = (t: MagnetronSputterType) => get(t).depositionRate;
export const throughput = (t: MagnetronSputterType) => get(t).throughput;
export const filmDensity = (t: MagnetronSputterType) => get(t).filmDensity;
export const targetUtil = (t: MagnetronSputterType) => get(t).targetUtil;
export const msCost = (t: MagnetronSputterType) => get(t).msCost;
export const reactive = (t: MagnetronSputterType) => get(t).reactive;
export const forHardCoat = (t: MagnetronSputterType) => get(t).forHardCoat;
export const sputterConfig = (t: MagnetronSputterType) => get(t).sputterConfig;
export const bestUse = (t: MagnetronSputterType) => get(t).bestUse;
export const magnetronSputterTypes = (): MagnetronSputterType[] =>
  Object.keys(DATA) as MagnetronSputterType[];
