export type BioreactorType =
  | "stirred_tank"
  | "wave_bag"
  | "air_lift"
  | "packed_bed"
  | "single_use_stirred";

interface BioreactorData {
  scaleRange: number;
  mixingEfficiency: number;
  oxygenTransfer: number;
  shearStress: number;
  brCost: number;
  singleUse: boolean;
  forMammalian: boolean;
  vessel: string;
  bestUse: string;
}

const DATA: Record<BioreactorType, BioreactorData> = {
  stirred_tank: {
    scaleRange: 10, mixingEfficiency: 9, oxygenTransfer: 9, shearStress: 4, brCost: 7,
    singleUse: false, forMammalian: true,
    vessel: "stainless_steel_impeller_sparger_baffle_jacket_probe_port",
    bestUse: "large_scale_mab_production_vaccine_recombinant_protein",
  },
  wave_bag: {
    scaleRange: 5, mixingEfficiency: 6, oxygenTransfer: 6, shearStress: 9, brCost: 6,
    singleUse: true, forMammalian: true,
    vessel: "disposable_bag_rocking_platform_wave_motion_gentle_mix",
    bestUse: "seed_train_inoculum_expansion_cell_therapy_small_batch",
  },
  air_lift: {
    scaleRange: 8, mixingEfficiency: 7, oxygenTransfer: 10, shearStress: 8, brCost: 5,
    singleUse: false, forMammalian: false,
    vessel: "draft_tube_sparger_air_lift_circulation_no_impeller_shear",
    bestUse: "microbial_fermentation_yeast_fungal_culture_high_oxygen",
  },
  packed_bed: {
    scaleRange: 6, mixingEfficiency: 5, oxygenTransfer: 5, shearStress: 10, brCost: 8,
    singleUse: false, forMammalian: true,
    vessel: "fixed_bed_carrier_matrix_perfusion_media_recirculation",
    bestUse: "adherent_cell_culture_virus_production_gene_therapy_vector",
  },
  single_use_stirred: {
    scaleRange: 7, mixingEfficiency: 8, oxygenTransfer: 8, shearStress: 6, brCost: 9,
    singleUse: true, forMammalian: true,
    vessel: "disposable_bag_integrated_impeller_sensor_ready_to_use",
    bestUse: "clinical_trial_multi_product_facility_fast_changeover_gmp",
  },
};

function get(t: BioreactorType): BioreactorData {
  return DATA[t];
}

export const scaleRange = (t: BioreactorType) => get(t).scaleRange;
export const mixingEfficiency = (t: BioreactorType) => get(t).mixingEfficiency;
export const oxygenTransfer = (t: BioreactorType) => get(t).oxygenTransfer;
export const shearStress = (t: BioreactorType) => get(t).shearStress;
export const brCost = (t: BioreactorType) => get(t).brCost;
export const singleUse = (t: BioreactorType) => get(t).singleUse;
export const forMammalian = (t: BioreactorType) => get(t).forMammalian;
export const vessel = (t: BioreactorType) => get(t).vessel;
export const bestUse = (t: BioreactorType) => get(t).bestUse;
export const bioreactorTypes = (): BioreactorType[] =>
  Object.keys(DATA) as BioreactorType[];
