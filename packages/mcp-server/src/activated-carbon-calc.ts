export type ActivatedCarbonType =
  | "granular_gac_fixed_bed"
  | "powdered_pac_slurry"
  | "extruded_pellet_cylindrical"
  | "impregnated_chemical_treated"
  | "coconut_shell_micropore";

interface ActivatedCarbonData {
  adsorption: number;
  surface: number;
  hardness: number;
  regenerability: number;
  acCost: number;
  reactivatable: boolean;
  forWater: boolean;
  feedstock: string;
  bestUse: string;
}

const DATA: Record<ActivatedCarbonType, ActivatedCarbonData> = {
  granular_gac_fixed_bed: {
    adsorption: 8, surface: 8, hardness: 7, regenerability: 9, acCost: 6,
    reactivatable: true, forWater: true,
    feedstock: "bituminous_coal_steam_activated",
    bestUse: "municipal_water_taste_odor_organic",
  },
  powdered_pac_slurry: {
    adsorption: 9, surface: 9, hardness: 2, regenerability: 2, acCost: 3,
    reactivatable: false, forWater: true,
    feedstock: "lignite_wood_fine_ground_powder",
    bestUse: "spill_response_seasonal_dose_slurry",
  },
  extruded_pellet_cylindrical: {
    adsorption: 7, surface: 7, hardness: 9, regenerability: 8, acCost: 5,
    reactivatable: true, forWater: false,
    feedstock: "coal_binder_extruded_cylinder",
    bestUse: "gas_phase_voc_solvent_air_purify",
  },
  impregnated_chemical_treated: {
    adsorption: 7, surface: 6, hardness: 6, regenerability: 3, acCost: 8,
    reactivatable: false, forWater: false,
    feedstock: "base_carbon_chemical_impregnate",
    bestUse: "h2s_mercury_specific_contaminant",
  },
  coconut_shell_micropore: {
    adsorption: 9, surface: 10, hardness: 9, regenerability: 8, acCost: 7,
    reactivatable: true, forWater: true,
    feedstock: "coconut_shell_steam_high_micro",
    bestUse: "gold_recovery_drinking_water_premium",
  },
};

function get(t: ActivatedCarbonType): ActivatedCarbonData {
  return DATA[t];
}

export const adsorption = (t: ActivatedCarbonType) => get(t).adsorption;
export const surface = (t: ActivatedCarbonType) => get(t).surface;
export const hardness = (t: ActivatedCarbonType) => get(t).hardness;
export const regenerability = (t: ActivatedCarbonType) => get(t).regenerability;
export const acCost = (t: ActivatedCarbonType) => get(t).acCost;
export const reactivatable = (t: ActivatedCarbonType) => get(t).reactivatable;
export const forWater = (t: ActivatedCarbonType) => get(t).forWater;
export const feedstock = (t: ActivatedCarbonType) => get(t).feedstock;
export const bestUse = (t: ActivatedCarbonType) => get(t).bestUse;
export const activatedCarbonTypes = (): ActivatedCarbonType[] =>
  Object.keys(DATA) as ActivatedCarbonType[];
