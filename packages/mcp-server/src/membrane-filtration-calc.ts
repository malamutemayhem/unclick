export type MembraneFiltrationTypeId =
  | "microfiltration_mf"
  | "ultrafiltration_uf"
  | "nanofiltration_nf"
  | "reverse_osmosis_ro"
  | "membrane_bioreactor";

interface MembraneFiltrationData {
  poreSize: number;
  rejection: number;
  flux: number;
  energyUse: number;
  mfCost: number;
  pressureDriven: boolean;
  forDrinkingWater: boolean;
  membrane: string;
  bestUse: string;
}

const DATA: Record<MembraneFiltrationTypeId, MembraneFiltrationData> = {
  microfiltration_mf: {
    poreSize: 10, rejection: 3, flux: 10, energyUse: 2, mfCost: 4,
    pressureDriven: true, forDrinkingWater: false,
    membrane: "polymeric_hollow_fiber_01_10um_pore_low_pressure",
    bestUse: "pretreatment_turbidity_removal_bacteria_particle",
  },
  ultrafiltration_uf: {
    poreSize: 8, rejection: 5, flux: 8, energyUse: 3, mfCost: 5,
    pressureDriven: true, forDrinkingWater: true,
    membrane: "hollow_fiber_or_flat_sheet_001_01um_virus_removal",
    bestUse: "drinking_water_virus_removal_industrial_pretreat",
  },
  nanofiltration_nf: {
    poreSize: 5, rejection: 7, flux: 5, energyUse: 5, mfCost: 7,
    pressureDriven: true, forDrinkingWater: true,
    membrane: "thin_film_composite_spiral_wound_1_10nm_softening",
    bestUse: "water_softening_pesticide_removal_color_reduction",
  },
  reverse_osmosis_ro: {
    poreSize: 1, rejection: 10, flux: 3, energyUse: 8, mfCost: 8,
    pressureDriven: true, forDrinkingWater: true,
    membrane: "polyamide_tfc_spiral_wound_sub_nm_salt_rejection",
    bestUse: "desalination_ultrapure_water_boiler_feed_pharma",
  },
  membrane_bioreactor: {
    poreSize: 7, rejection: 6, flux: 6, energyUse: 6, mfCost: 9,
    pressureDriven: false, forDrinkingWater: false,
    membrane: "submerged_or_sidestream_uf_mf_combined_biological",
    bestUse: "municipal_wastewater_reuse_compact_treatment_plant",
  },
};

function get(t: MembraneFiltrationTypeId): MembraneFiltrationData {
  return DATA[t];
}

export const poreSize = (t: MembraneFiltrationTypeId) => get(t).poreSize;
export const rejection = (t: MembraneFiltrationTypeId) => get(t).rejection;
export const flux = (t: MembraneFiltrationTypeId) => get(t).flux;
export const energyUse = (t: MembraneFiltrationTypeId) => get(t).energyUse;
export const mfCost = (t: MembraneFiltrationTypeId) => get(t).mfCost;
export const pressureDriven = (t: MembraneFiltrationTypeId) => get(t).pressureDriven;
export const forDrinkingWater = (t: MembraneFiltrationTypeId) => get(t).forDrinkingWater;
export const membrane = (t: MembraneFiltrationTypeId) => get(t).membrane;
export const bestUse = (t: MembraneFiltrationTypeId) => get(t).bestUse;
export const membraneFiltrationTypes = (): MembraneFiltrationTypeId[] =>
  Object.keys(DATA) as MembraneFiltrationTypeId[];
