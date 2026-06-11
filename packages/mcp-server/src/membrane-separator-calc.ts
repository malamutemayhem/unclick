export type MembraneSeparatorType =
  | "reverse_osmosis"
  | "ultrafiltration"
  | "microfiltration"
  | "nanofiltration"
  | "pervaporation";

interface MembraneSeparatorData {
  rejection: number;
  throughput: number;
  poreSize: number;
  pressureNeed: number;
  msCost: number;
  crossFlow: boolean;
  forDesalination: boolean;
  separatorConfig: string;
  bestUse: string;
}

const DATA: Record<MembraneSeparatorType, MembraneSeparatorData> = {
  reverse_osmosis: {
    rejection: 10, throughput: 7, poreSize: 1, pressureNeed: 10, msCost: 8,
    crossFlow: true, forDesalination: true,
    separatorConfig: "reverse_osmosis_membrane_separator_tight_pore_high_pressure_salt",
    bestUse: "desalination_reverse_osmosis_membrane_separator_salt_removal_pure",
  },
  ultrafiltration: {
    rejection: 7, throughput: 8, poreSize: 5, pressureNeed: 5, msCost: 6,
    crossFlow: true, forDesalination: false,
    separatorConfig: "ultrafiltration_membrane_separator_hollow_fiber_protein_retain",
    bestUse: "dairy_whey_ultrafiltration_membrane_separator_protein_concentrate",
  },
  microfiltration: {
    rejection: 5, throughput: 9, poreSize: 8, pressureNeed: 3, msCost: 4,
    crossFlow: true, forDesalination: false,
    separatorConfig: "microfiltration_membrane_separator_large_pore_particle_bacteria",
    bestUse: "beer_clarify_microfiltration_membrane_separator_yeast_remove_clear",
  },
  nanofiltration: {
    rejection: 8, throughput: 7, poreSize: 3, pressureNeed: 7, msCost: 7,
    crossFlow: true, forDesalination: false,
    separatorConfig: "nanofiltration_membrane_separator_medium_pore_divalent_ion_soften",
    bestUse: "water_soften_nanofiltration_membrane_separator_hardness_remove",
  },
  pervaporation: {
    rejection: 9, throughput: 4, poreSize: 1, pressureNeed: 2, msCost: 9,
    crossFlow: false, forDesalination: false,
    separatorConfig: "pervaporation_membrane_separator_vapor_permeate_azeotrope_break",
    bestUse: "solvent_dehydrate_pervaporation_membrane_separator_azeotrope_break",
  },
};

function get(t: MembraneSeparatorType): MembraneSeparatorData {
  return DATA[t];
}

export const rejection = (t: MembraneSeparatorType) => get(t).rejection;
export const throughput = (t: MembraneSeparatorType) => get(t).throughput;
export const poreSize = (t: MembraneSeparatorType) => get(t).poreSize;
export const pressureNeed = (t: MembraneSeparatorType) => get(t).pressureNeed;
export const msCost = (t: MembraneSeparatorType) => get(t).msCost;
export const crossFlow = (t: MembraneSeparatorType) => get(t).crossFlow;
export const forDesalination = (t: MembraneSeparatorType) => get(t).forDesalination;
export const separatorConfig = (t: MembraneSeparatorType) => get(t).separatorConfig;
export const bestUse = (t: MembraneSeparatorType) => get(t).bestUse;
export const membraneSeparatorTypes = (): MembraneSeparatorType[] =>
  Object.keys(DATA) as MembraneSeparatorType[];
