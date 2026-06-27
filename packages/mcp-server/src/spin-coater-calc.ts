export type SpinCoaterType =
  | "manual_spin"
  | "semi_auto_spin"
  | "cluster_spin"
  | "hot_plate_spin"
  | "dual_dispense";

interface SpinCoaterData {
  filmUniformity: number;
  throughput: number;
  thicknessControl: number;
  edgeBead: number;
  scCost: number;
  automated: boolean;
  forPhotoresist: boolean;
  coaterConfig: string;
  bestUse: string;
}

const DATA: Record<SpinCoaterType, SpinCoaterData> = {
  manual_spin: {
    filmUniformity: 6, throughput: 3, thicknessControl: 6, edgeBead: 5, scCost: 3,
    automated: false, forPhotoresist: true,
    coaterConfig: "manual_spin_coater_hand_load_single_wafer_lab_bench_resist",
    bestUse: "lab_research_manual_spin_coater_single_wafer_photoresist_dev",
  },
  semi_auto_spin: {
    filmUniformity: 8, throughput: 6, thicknessControl: 8, edgeBead: 7, scCost: 6,
    automated: false, forPhotoresist: true,
    coaterConfig: "semi_auto_spin_coater_recipe_program_load_assist_wafer_coat",
    bestUse: "pilot_line_semi_auto_spin_coater_recipe_controlled_resist",
  },
  cluster_spin: {
    filmUniformity: 10, throughput: 10, thicknessControl: 10, edgeBead: 9, scCost: 10,
    automated: true, forPhotoresist: true,
    coaterConfig: "cluster_spin_coater_integrated_track_litho_develop_bake_coat",
    bestUse: "fab_production_cluster_spin_coater_track_integrated_litho",
  },
  hot_plate_spin: {
    filmUniformity: 8, throughput: 5, thicknessControl: 8, edgeBead: 7, scCost: 5,
    automated: false, forPhotoresist: false,
    coaterConfig: "hot_plate_spin_coater_bake_integrated_sol_gel_polymer_coat",
    bestUse: "sol_gel_film_hot_plate_spin_coater_bake_cure_integrated",
  },
  dual_dispense: {
    filmUniformity: 9, throughput: 7, thicknessControl: 9, edgeBead: 8, scCost: 8,
    automated: true, forPhotoresist: true,
    coaterConfig: "dual_dispense_spin_coater_two_nozzle_primer_resist_sequence",
    bestUse: "advanced_dual_dispense_spin_coater_primer_resist_two_layer",
  },
};

function get(t: SpinCoaterType): SpinCoaterData {
  return DATA[t];
}

export const filmUniformity = (t: SpinCoaterType) => get(t).filmUniformity;
export const throughput = (t: SpinCoaterType) => get(t).throughput;
export const thicknessControl = (t: SpinCoaterType) => get(t).thicknessControl;
export const edgeBead = (t: SpinCoaterType) => get(t).edgeBead;
export const scCost = (t: SpinCoaterType) => get(t).scCost;
export const automated = (t: SpinCoaterType) => get(t).automated;
export const forPhotoresist = (t: SpinCoaterType) => get(t).forPhotoresist;
export const coaterConfig = (t: SpinCoaterType) => get(t).coaterConfig;
export const bestUse = (t: SpinCoaterType) => get(t).bestUse;
export const spinCoaterTypes = (): SpinCoaterType[] =>
  Object.keys(DATA) as SpinCoaterType[];
