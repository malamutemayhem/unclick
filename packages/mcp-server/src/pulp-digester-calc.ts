export type PulpDigesterType =
  | "batch_kraft"
  | "continuous_kraft"
  | "sulfite_acid"
  | "soda_process"
  | "organosolv";

interface PulpDigesterData {
  pulpStrength: number;
  throughput: number;
  chemicalRecovery: number;
  yieldRate: number;
  pdCost: number;
  continuous: boolean;
  forPaper: boolean;
  digesterConfig: string;
  bestUse: string;
}

const DATA: Record<PulpDigesterType, PulpDigesterData> = {
  batch_kraft: {
    pulpStrength: 9, throughput: 6, chemicalRecovery: 8, yieldRate: 6, pdCost: 6,
    continuous: false, forPaper: true,
    digesterConfig: "batch_kraft_pulp_digester_white_liquor_cook_delignify_blow",
    bestUse: "paper_mill_batch_kraft_digester_strong_unbleached_pulp_flexible",
  },
  continuous_kraft: {
    pulpStrength: 9, throughput: 10, chemicalRecovery: 9, yieldRate: 7, pdCost: 10,
    continuous: true, forPaper: true,
    digesterConfig: "continuous_kraft_pulp_digester_kamyr_tower_counter_current_cook",
    bestUse: "large_paper_mill_continuous_kraft_digester_high_volume_consistent",
  },
  sulfite_acid: {
    pulpStrength: 6, throughput: 7, chemicalRecovery: 6, yieldRate: 7, pdCost: 7,
    continuous: false, forPaper: true,
    digesterConfig: "sulfite_acid_pulp_digester_bisulfite_cook_dissolve_lignin_soft",
    bestUse: "specialty_paper_sulfite_digester_dissolving_pulp_rayon_cellophane",
  },
  soda_process: {
    pulpStrength: 7, throughput: 7, chemicalRecovery: 7, yieldRate: 8, pdCost: 5,
    continuous: false, forPaper: false,
    digesterConfig: "soda_process_pulp_digester_caustic_soda_cook_non_wood_fiber",
    bestUse: "non_wood_fiber_soda_digester_straw_bagasse_bamboo_pulp_simple",
  },
  organosolv: {
    pulpStrength: 8, throughput: 5, chemicalRecovery: 10, yieldRate: 9, pdCost: 8,
    continuous: false, forPaper: false,
    digesterConfig: "organosolv_pulp_digester_organic_solvent_cook_recover_lignin",
    bestUse: "biorefinery_organosolv_digester_clean_lignin_recovery_green_pulp",
  },
};

function get(t: PulpDigesterType): PulpDigesterData {
  return DATA[t];
}

export const pulpStrength = (t: PulpDigesterType) => get(t).pulpStrength;
export const throughput = (t: PulpDigesterType) => get(t).throughput;
export const chemicalRecovery = (t: PulpDigesterType) => get(t).chemicalRecovery;
export const yieldRate = (t: PulpDigesterType) => get(t).yieldRate;
export const pdCost = (t: PulpDigesterType) => get(t).pdCost;
export const continuous = (t: PulpDigesterType) => get(t).continuous;
export const forPaper = (t: PulpDigesterType) => get(t).forPaper;
export const digesterConfig = (t: PulpDigesterType) => get(t).digesterConfig;
export const bestUse = (t: PulpDigesterType) => get(t).bestUse;
export const pulpDigesterTypes = (): PulpDigesterType[] =>
  Object.keys(DATA) as PulpDigesterType[];
