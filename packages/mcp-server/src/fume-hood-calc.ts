export type FumeHoodType =
  | "conventional_bypass"
  | "variable_air_volume"
  | "ductless_filtered"
  | "perchloric_acid_wash"
  | "radioisotope_shielded";

interface FumeHoodData {
  containment: number;
  energy: number;
  safety: number;
  flexibility: number;
  fhCost: number;
  ducted: boolean;
  forChemistry: boolean;
  airflow: string;
  bestUse: string;
}

const DATA: Record<FumeHoodType, FumeHoodData> = {
  conventional_bypass: {
    containment: 7, energy: 4, safety: 7, flexibility: 7, fhCost: 4,
    ducted: true, forChemistry: true,
    airflow: "constant_volume_bypass_baffle",
    bestUse: "teaching_lab_general_chemistry",
  },
  variable_air_volume: {
    containment: 9, energy: 9, safety: 8, flexibility: 8, fhCost: 7,
    ducted: true, forChemistry: true,
    airflow: "vav_sash_sensor_face_velocity",
    bestUse: "research_lab_energy_efficient",
  },
  ductless_filtered: {
    containment: 5, energy: 10, safety: 5, flexibility: 9, fhCost: 3,
    ducted: false, forChemistry: false,
    airflow: "recirculating_carbon_hepa_filt",
    bestUse: "solvent_weighing_low_hazard",
  },
  perchloric_acid_wash: {
    containment: 10, energy: 3, safety: 10, flexibility: 3, fhCost: 9,
    ducted: true, forChemistry: true,
    airflow: "dedicated_wash_down_stainless",
    bestUse: "perchloric_acid_digestion",
  },
  radioisotope_shielded: {
    containment: 10, energy: 3, safety: 10, flexibility: 4, fhCost: 10,
    ducted: true, forChemistry: false,
    airflow: "lead_shielded_hepa_exhaust",
    bestUse: "nuclear_medicine_isotope_lab",
  },
};

function get(t: FumeHoodType): FumeHoodData {
  return DATA[t];
}

export const containment = (t: FumeHoodType) => get(t).containment;
export const energy = (t: FumeHoodType) => get(t).energy;
export const safety = (t: FumeHoodType) => get(t).safety;
export const flexibility = (t: FumeHoodType) => get(t).flexibility;
export const fhCost = (t: FumeHoodType) => get(t).fhCost;
export const ducted = (t: FumeHoodType) => get(t).ducted;
export const forChemistry = (t: FumeHoodType) => get(t).forChemistry;
export const airflow = (t: FumeHoodType) => get(t).airflow;
export const bestUse = (t: FumeHoodType) => get(t).bestUse;
export const fumeHoodTypes = (): FumeHoodType[] =>
  Object.keys(DATA) as FumeHoodType[];
