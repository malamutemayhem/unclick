export type SolderFluxType =
  | "rosin_ra_activated"
  | "no_clean_low_residue"
  | "water_soluble_oa"
  | "synthetic_rma_mild"
  | "tacky_gel_flux";

const DATA: Record<SolderFluxType, {
  activity: number; wettability: number; residueClean: number;
  shelfLife: number; fluxCost: number; cleanRequired: boolean;
  forLeadFree: boolean; chemistry: string; bestUse: string;
}> = {
  rosin_ra_activated: { activity: 8, wettability: 9, residueClean: 4, shelfLife: 7, fluxCost: 3, cleanRequired: true, forLeadFree: false, chemistry: "activated_rosin_base", bestUse: "leaded_hand_solder" },
  no_clean_low_residue: { activity: 5, wettability: 7, residueClean: 10, shelfLife: 8, fluxCost: 5, cleanRequired: false, forLeadFree: true, chemistry: "modified_resin_low_solid", bestUse: "smt_reflow_no_wash" },
  water_soluble_oa: { activity: 10, wettability: 10, residueClean: 8, shelfLife: 5, fluxCost: 4, cleanRequired: true, forLeadFree: true, chemistry: "organic_acid_water_base", bestUse: "wave_solder_heavy_oxide" },
  synthetic_rma_mild: { activity: 6, wettability: 7, residueClean: 7, shelfLife: 9, fluxCost: 4, cleanRequired: false, forLeadFree: true, chemistry: "synthetic_resin_mild", bestUse: "general_purpose_rework" },
  tacky_gel_flux: { activity: 7, wettability: 8, residueClean: 6, shelfLife: 6, fluxCost: 6, cleanRequired: true, forLeadFree: true, chemistry: "thixotropic_paste_gel", bestUse: "bga_reball_rework" },
};

const get = (t: SolderFluxType) => DATA[t];

export const activity = (t: SolderFluxType) => get(t).activity;
export const wettability = (t: SolderFluxType) => get(t).wettability;
export const residueClean = (t: SolderFluxType) => get(t).residueClean;
export const shelfLife = (t: SolderFluxType) => get(t).shelfLife;
export const fluxCost = (t: SolderFluxType) => get(t).fluxCost;
export const cleanRequired = (t: SolderFluxType) => get(t).cleanRequired;
export const forLeadFree = (t: SolderFluxType) => get(t).forLeadFree;
export const chemistry = (t: SolderFluxType) => get(t).chemistry;
export const bestUse = (t: SolderFluxType) => get(t).bestUse;
export const solderFluxes = (): SolderFluxType[] => Object.keys(DATA) as SolderFluxType[];
