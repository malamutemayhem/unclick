export type InductorCore =
  | "ferrite_mnzn"
  | "iron_powder"
  | "amorphous_metal"
  | "nanocrystalline"
  | "air_core_pcb";

const DATA: Record<InductorCore, {
  permeability: number; saturation: number; coreLoss: number;
  frequency: number; indCost: number; lowProfile: boolean;
  forEmc: boolean; material: string; bestUse: string;
}> = {
  ferrite_mnzn: {
    permeability: 9, saturation: 5, coreLoss: 7,
    frequency: 7, indCost: 3, lowProfile: false,
    forEmc: true, material: "manganese_zinc_spinel",
    bestUse: "smps_transformer_core",
  },
  iron_powder: {
    permeability: 5, saturation: 8, coreLoss: 4,
    frequency: 5, indCost: 2, lowProfile: false,
    forEmc: false, material: "carbonyl_iron_distributed",
    bestUse: "pfc_boost_inductor",
  },
  amorphous_metal: {
    permeability: 8, saturation: 9, coreLoss: 8,
    frequency: 6, indCost: 6, lowProfile: false,
    forEmc: true, material: "fe_based_ribbon_wound",
    bestUse: "grid_frequency_reactor",
  },
  nanocrystalline: {
    permeability: 10, saturation: 7, coreLoss: 10,
    frequency: 8, indCost: 8, lowProfile: false,
    forEmc: true, material: "finemet_fe_si_nb_cu",
    bestUse: "common_mode_choke",
  },
  air_core_pcb: {
    permeability: 1, saturation: 10, coreLoss: 10,
    frequency: 10, indCost: 1, lowProfile: true,
    forEmc: false, material: "copper_trace_spiral",
    bestUse: "rf_gan_matching_network",
  },
};

const get = (t: InductorCore) => DATA[t];

export const permeability = (t: InductorCore) => get(t).permeability;
export const saturation = (t: InductorCore) => get(t).saturation;
export const coreLoss = (t: InductorCore) => get(t).coreLoss;
export const frequency = (t: InductorCore) => get(t).frequency;
export const indCost = (t: InductorCore) => get(t).indCost;
export const lowProfile = (t: InductorCore) => get(t).lowProfile;
export const forEmc = (t: InductorCore) => get(t).forEmc;
export const material = (t: InductorCore) => get(t).material;
export const bestUse = (t: InductorCore) => get(t).bestUse;
export const inductorCores = (): InductorCore[] => Object.keys(DATA) as InductorCore[];
