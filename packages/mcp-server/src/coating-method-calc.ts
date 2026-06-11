export type CoatingMethodType =
  | "dip_coating_immersion"
  | "knife_over_roll"
  | "gravure_roller_cell"
  | "spray_coating_airless"
  | "lamination_adhesive_film";

const DATA: Record<CoatingMethodType, {
  uniformity: number; speed: number; thickness: number;
  adhesion: number; cmCost: number; solventFree: boolean;
  forWaterproof: boolean; method: string; bestUse: string;
}> = {
  dip_coating_immersion: {
    uniformity: 6, speed: 7, thickness: 8,
    adhesion: 8, cmCost: 1, solventFree: false,
    forWaterproof: true, method: "full_immersion_drain_dry",
    bestUse: "canvas_tarp_heavy_wax_coat",
  },
  knife_over_roll: {
    uniformity: 9, speed: 8, thickness: 9,
    adhesion: 7, cmCost: 2, solventFree: false,
    forWaterproof: true, method: "doctor_blade_metered_gap",
    bestUse: "pu_coated_nylon_rainwear_tent",
  },
  gravure_roller_cell: {
    uniformity: 10, speed: 10, thickness: 5,
    adhesion: 7, cmCost: 4, solventFree: false,
    forWaterproof: false, method: "engraved_roller_cell_transfer",
    bestUse: "thin_film_functional_smart_textile",
  },
  spray_coating_airless: {
    uniformity: 5, speed: 6, thickness: 7,
    adhesion: 6, cmCost: 2, solventFree: false,
    forWaterproof: true, method: "high_pressure_atomized_spray",
    bestUse: "nonwoven_medical_gown_barrier",
  },
  lamination_adhesive_film: {
    uniformity: 8, speed: 9, thickness: 6,
    adhesion: 9, cmCost: 3, solventFree: true,
    forWaterproof: true, method: "adhesive_or_heat_bond_film",
    bestUse: "outdoor_jacket_membrane_bonding",
  },
};

const get = (t: CoatingMethodType) => DATA[t];

export const uniformity = (t: CoatingMethodType) => get(t).uniformity;
export const speed = (t: CoatingMethodType) => get(t).speed;
export const thickness = (t: CoatingMethodType) => get(t).thickness;
export const adhesion = (t: CoatingMethodType) => get(t).adhesion;
export const cmCost = (t: CoatingMethodType) => get(t).cmCost;
export const solventFree = (t: CoatingMethodType) => get(t).solventFree;
export const forWaterproof = (t: CoatingMethodType) => get(t).forWaterproof;
export const method = (t: CoatingMethodType) => get(t).method;
export const bestUse = (t: CoatingMethodType) => get(t).bestUse;
export const coatingMethodTypes = (): CoatingMethodType[] => Object.keys(DATA) as CoatingMethodType[];
