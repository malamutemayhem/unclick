export type EnroberType =
  | "curtain_enrober"
  | "dipping_fork"
  | "spin_enrober"
  | "spray_coater"
  | "pan_coater";

interface EnroberData {
  coatingUniformity: number;
  throughput: number;
  coatingThickness: number;
  wasteControl: number;
  enCost: number;
  continuous: boolean;
  forChocolate: boolean;
  enroberConfig: string;
  bestUse: string;
}

const DATA: Record<EnroberType, EnroberData> = {
  curtain_enrober: {
    coatingUniformity: 9, throughput: 10, coatingThickness: 8, wasteControl: 8, enCost: 8,
    continuous: true, forChocolate: true,
    enroberConfig: "curtain_enrober_chocolate_waterfall_conveyor_bottom_coat_top_coat",
    bestUse: "chocolate_factory_curtain_enrober_bar_biscuit_truffle_coating_line",
  },
  dipping_fork: {
    coatingUniformity: 7, throughput: 2, coatingThickness: 9, wasteControl: 6, enCost: 1,
    continuous: false, forChocolate: true,
    enroberConfig: "dipping_fork_hand_enrobe_manual_submerge_chocolate_artisan_bonbon",
    bestUse: "artisan_chocolatier_dipping_fork_hand_enrobe_truffle_bonbon_craft",
  },
  spin_enrober: {
    coatingUniformity: 8, throughput: 7, coatingThickness: 7, wasteControl: 9, enCost: 6,
    continuous: false, forChocolate: true,
    enroberConfig: "spin_enrober_rotating_disc_centrifugal_thin_coat_dragee_nut_raisin",
    bestUse: "confectionery_spin_enrober_dragee_nut_raisin_thin_chocolate_coat",
  },
  spray_coater: {
    coatingUniformity: 8, throughput: 9, coatingThickness: 5, wasteControl: 7, enCost: 7,
    continuous: true, forChocolate: false,
    enroberConfig: "spray_coater_atomize_nozzle_fine_mist_glaze_sugar_shellac_coating",
    bestUse: "candy_confection_spray_coater_glaze_sugar_shell_pharmaceutical_tab",
  },
  pan_coater: {
    coatingUniformity: 9, throughput: 6, coatingThickness: 10, wasteControl: 8, enCost: 5,
    continuous: false, forChocolate: true,
    enroberConfig: "pan_coater_revolving_drum_layer_sugar_shell_chocolate_dragee_panning",
    bestUse: "dragee_panning_pan_coater_sugar_shell_chocolate_almond_jordan_candy",
  },
};

function get(t: EnroberType): EnroberData {
  return DATA[t];
}

export const coatingUniformity = (t: EnroberType) => get(t).coatingUniformity;
export const throughput = (t: EnroberType) => get(t).throughput;
export const coatingThickness = (t: EnroberType) => get(t).coatingThickness;
export const wasteControl = (t: EnroberType) => get(t).wasteControl;
export const enCost = (t: EnroberType) => get(t).enCost;
export const continuous = (t: EnroberType) => get(t).continuous;
export const forChocolate = (t: EnroberType) => get(t).forChocolate;
export const enroberConfig = (t: EnroberType) => get(t).enroberConfig;
export const bestUse = (t: EnroberType) => get(t).bestUse;
export const enroberTypes = (): EnroberType[] =>
  Object.keys(DATA) as EnroberType[];
