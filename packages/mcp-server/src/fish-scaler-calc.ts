export type FishScalerType =
  | "rotary_drum"
  | "belt_scaler"
  | "hand_electric"
  | "high_pressure_water"
  | "tumble_barrel";

interface FishScalerData {
  scalingEfficiency: number;
  throughput: number;
  skinDamage: number;
  speciesRange: number;
  fsCost: number;
  automated: boolean;
  forRound: boolean;
  scalerConfig: string;
  bestUse: string;
}

const DATA: Record<FishScalerType, FishScalerData> = {
  rotary_drum: {
    scalingEfficiency: 9, throughput: 10, skinDamage: 7, speciesRange: 8, fsCost: 8,
    automated: true, forRound: true,
    scalerConfig: "rotary_drum_fish_scaler_abrasive_drum_tumble_remove_scale_fast",
    bestUse: "fish_processing_plant_rotary_drum_scaler_high_volume_round_fish",
  },
  belt_scaler: {
    scalingEfficiency: 8, throughput: 9, skinDamage: 8, speciesRange: 7, fsCost: 7,
    automated: true, forRound: false,
    scalerConfig: "belt_scaler_fish_conveyor_abrasive_belt_pass_remove_scale_line",
    bestUse: "inline_fish_processing_belt_scaler_continuous_flat_fish_scaling",
  },
  hand_electric: {
    scalingEfficiency: 7, throughput: 4, skinDamage: 9, speciesRange: 10, fsCost: 3,
    automated: false, forRound: true,
    scalerConfig: "hand_electric_fish_scaler_rotating_head_manual_guide_gentle",
    bestUse: "small_fish_shop_hand_electric_scaler_gentle_versatile_species",
  },
  high_pressure_water: {
    scalingEfficiency: 10, throughput: 8, skinDamage: 10, speciesRange: 9, fsCost: 9,
    automated: true, forRound: true,
    scalerConfig: "high_pressure_water_fish_scaler_jet_nozzle_blast_scale_clean",
    bestUse: "premium_fish_high_pressure_water_scaler_no_skin_damage_clean",
  },
  tumble_barrel: {
    scalingEfficiency: 8, throughput: 9, skinDamage: 6, speciesRange: 6, fsCost: 5,
    automated: true, forRound: true,
    scalerConfig: "tumble_barrel_fish_scaler_rotating_drum_batch_abrade_scale_off",
    bestUse: "bulk_fish_processing_tumble_barrel_scaler_batch_small_fish_fast",
  },
};

function get(t: FishScalerType): FishScalerData {
  return DATA[t];
}

export const scalingEfficiency = (t: FishScalerType) => get(t).scalingEfficiency;
export const throughput = (t: FishScalerType) => get(t).throughput;
export const skinDamage = (t: FishScalerType) => get(t).skinDamage;
export const speciesRange = (t: FishScalerType) => get(t).speciesRange;
export const fsCost = (t: FishScalerType) => get(t).fsCost;
export const automated = (t: FishScalerType) => get(t).automated;
export const forRound = (t: FishScalerType) => get(t).forRound;
export const scalerConfig = (t: FishScalerType) => get(t).scalerConfig;
export const bestUse = (t: FishScalerType) => get(t).bestUse;
export const fishScalerTypes = (): FishScalerType[] =>
  Object.keys(DATA) as FishScalerType[];
