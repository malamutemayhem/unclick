// solder-paste-calc - solder paste types for electronics

export type SolderPaste =
  | "leaded_sn63_standard"
  | "lead_free_sac305"
  | "low_temp_bismuth"
  | "no_clean_flux_paste"
  | "water_soluble_clean";

const DATA: Record<SolderPaste, {
  flowability: number; jointStrength: number; shelfLife: number; cleanEase: number;
  cost: number; leadFree: boolean; noClean: boolean; fluxType: string; bestUse: string;
}> = {
  leaded_sn63_standard:  { flowability: 9, jointStrength: 8, shelfLife: 7, cleanEase: 6, cost: 4, leadFree: false, noClean: false, fluxType: "rosin_activated_flux", bestUse: "general_smd_reflow" },
  lead_free_sac305:      { flowability: 7, jointStrength: 9, shelfLife: 6, cleanEase: 6, cost: 6, leadFree: true, noClean: false, fluxType: "rosin_mild_activate", bestUse: "rohs_compliant_reflow" },
  low_temp_bismuth:      { flowability: 8, jointStrength: 6, shelfLife: 5, cleanEase: 7, cost: 7, leadFree: true, noClean: false, fluxType: "low_residue_organic", bestUse: "heat_sensitive_part" },
  no_clean_flux_paste:   { flowability: 8, jointStrength: 7, shelfLife: 8, cleanEase: 10, cost: 5, leadFree: true, noClean: true, fluxType: "synthetic_no_clean", bestUse: "skip_wash_assembly" },
  water_soluble_clean:   { flowability: 7, jointStrength: 8, shelfLife: 6, cleanEase: 9, cost: 5, leadFree: true, noClean: false, fluxType: "water_soluble_organic", bestUse: "high_rel_clean_board" },
};

const get = (p: SolderPaste) => DATA[p];
export const flowability = (p: SolderPaste) => get(p).flowability;
export const jointStrength = (p: SolderPaste) => get(p).jointStrength;
export const shelfLife = (p: SolderPaste) => get(p).shelfLife;
export const cleanEase = (p: SolderPaste) => get(p).cleanEase;
export const pasteCost = (p: SolderPaste) => get(p).cost;
export const leadFree = (p: SolderPaste) => get(p).leadFree;
export const noClean = (p: SolderPaste) => get(p).noClean;
export const fluxType = (p: SolderPaste) => get(p).fluxType;
export const bestUse = (p: SolderPaste) => get(p).bestUse;
export const solderPastes = (): SolderPaste[] => Object.keys(DATA) as SolderPaste[];
