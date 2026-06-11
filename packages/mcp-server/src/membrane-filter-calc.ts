export type MembraneFilterType =
  | "microfiltration_mf_porous"
  | "ultrafiltration_uf_hollow"
  | "nanofiltration_nf_softening"
  | "reverse_osmosis_ro_desal"
  | "electrodialysis_ed_ion";

interface MembraneFilterData {
  rejection: number;
  flux: number;
  pressure: number;
  fouling: number;
  mfCost: number;
  pressureDriven: boolean;
  forDrinking: boolean;
  poreSize: string;
  bestUse: string;
}

const DATA: Record<MembraneFilterType, MembraneFilterData> = {
  microfiltration_mf_porous: {
    rejection: 3, flux: 10, pressure: 2, fouling: 5, mfCost: 3,
    pressureDriven: true, forDrinking: false,
    poreSize: "0_1_to_10_micron_particle_bacteria",
    bestUse: "pretreatment_turbidity_bacteria_remove",
  },
  ultrafiltration_uf_hollow: {
    rejection: 5, flux: 8, pressure: 3, fouling: 5, mfCost: 5,
    pressureDriven: true, forDrinking: true,
    poreSize: "0_01_to_0_1_micron_virus_colloid",
    bestUse: "drinking_water_virus_remove_clarify",
  },
  nanofiltration_nf_softening: {
    rejection: 7, flux: 5, pressure: 6, fouling: 6, mfCost: 7,
    pressureDriven: true, forDrinking: true,
    poreSize: "0_001_to_0_01_micron_divalent_ion",
    bestUse: "softening_color_remove_pesticide_nom",
  },
  reverse_osmosis_ro_desal: {
    rejection: 10, flux: 3, pressure: 9, fouling: 8, mfCost: 9,
    pressureDriven: true, forDrinking: true,
    poreSize: "sub_0_001_micron_monovalent_ion",
    bestUse: "desalination_ultrapure_boiler_feed",
  },
  electrodialysis_ed_ion: {
    rejection: 8, flux: 6, pressure: 3, fouling: 4, mfCost: 8,
    pressureDriven: false, forDrinking: true,
    poreSize: "ion_exchange_membrane_selective",
    bestUse: "brackish_desal_food_demineralize",
  },
};

function get(t: MembraneFilterType): MembraneFilterData {
  return DATA[t];
}

export const rejection = (t: MembraneFilterType) => get(t).rejection;
export const flux = (t: MembraneFilterType) => get(t).flux;
export const pressure = (t: MembraneFilterType) => get(t).pressure;
export const fouling = (t: MembraneFilterType) => get(t).fouling;
export const mfCost = (t: MembraneFilterType) => get(t).mfCost;
export const pressureDriven = (t: MembraneFilterType) => get(t).pressureDriven;
export const forDrinking = (t: MembraneFilterType) => get(t).forDrinking;
export const poreSize = (t: MembraneFilterType) => get(t).poreSize;
export const bestUse = (t: MembraneFilterType) => get(t).bestUse;
export const membraneFilterTypes = (): MembraneFilterType[] =>
  Object.keys(DATA) as MembraneFilterType[];
