export type FinishingType =
  | "mercerizing_caustic_soda"
  | "sanforizing_shrink_control"
  | "calendering_roller_press"
  | "raising_napping_wire"
  | "plasma_surface_treatment";

const DATA: Record<FinishingType, {
  luster: number; strength: number; handfeel: number;
  durability: number; fnCost: number; chemical: boolean;
  forCotton: boolean; process: string; bestUse: string;
}> = {
  mercerizing_caustic_soda: {
    luster: 10, strength: 9, handfeel: 7,
    durability: 9, fnCost: 3, chemical: true,
    forCotton: true, process: "sodium_hydroxide_tension_swell",
    bestUse: "premium_cotton_shirting_sateen",
  },
  sanforizing_shrink_control: {
    luster: 3, strength: 7, handfeel: 6,
    durability: 10, fnCost: 2, chemical: false,
    forCotton: true, process: "rubber_belt_compressive_shrink",
    bestUse: "denim_woven_cotton_pre_shrunk",
  },
  calendering_roller_press: {
    luster: 8, strength: 6, handfeel: 8,
    durability: 5, fnCost: 2, chemical: false,
    forCotton: false, process: "heated_roller_nip_pressure",
    bestUse: "polyester_lining_smooth_glaze",
  },
  raising_napping_wire: {
    luster: 2, strength: 4, handfeel: 10,
    durability: 6, fnCost: 2, chemical: false,
    forCotton: true, process: "wire_roller_fiber_lift",
    bestUse: "flannel_fleece_blanket_soft_pile",
  },
  plasma_surface_treatment: {
    luster: 5, strength: 7, handfeel: 5,
    durability: 8, fnCost: 5, chemical: false,
    forCotton: false, process: "ionized_gas_surface_modify",
    bestUse: "technical_textile_wettability",
  },
};

const get = (t: FinishingType) => DATA[t];

export const luster = (t: FinishingType) => get(t).luster;
export const strength = (t: FinishingType) => get(t).strength;
export const handfeel = (t: FinishingType) => get(t).handfeel;
export const durability = (t: FinishingType) => get(t).durability;
export const fnCost = (t: FinishingType) => get(t).fnCost;
export const chemical = (t: FinishingType) => get(t).chemical;
export const forCotton = (t: FinishingType) => get(t).forCotton;
export const process = (t: FinishingType) => get(t).process;
export const bestUse = (t: FinishingType) => get(t).bestUse;
export const finishingTypes = (): FinishingType[] => Object.keys(DATA) as FinishingType[];
