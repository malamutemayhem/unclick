export type PaddleMixerType =
  | "single_shaft_plow"
  | "twin_shaft_counter"
  | "gravity_fall_gentle"
  | "heated_jacket_dry"
  | "fluidized_zone_rapid";

interface PaddleMixerData {
  mixIntensity: number;
  batchTime: number;
  gentleness: number;
  cleanability: number;
  pmCost: number;
  twinShaft: boolean;
  forWetMix: boolean;
  paddle: string;
  bestUse: string;
}

const DATA: Record<PaddleMixerType, PaddleMixerData> = {
  single_shaft_plow: {
    mixIntensity: 8, batchTime: 7, gentleness: 5, cleanability: 6, pmCost: 5,
    twinShaft: false, forWetMix: true,
    paddle: "plow_shaped_blade_throw_fluidize",
    bestUse: "mortar_concrete_premix_wet_dry_blend",
  },
  twin_shaft_counter: {
    mixIntensity: 10, batchTime: 9, gentleness: 4, cleanability: 5, pmCost: 7,
    twinShaft: true, forWetMix: true,
    paddle: "twin_counter_rotate_overlap_zone",
    bestUse: "concrete_batch_plant_rapid_homogeneous",
  },
  gravity_fall_gentle: {
    mixIntensity: 4, batchTime: 4, gentleness: 10, cleanability: 8, pmCost: 3,
    twinShaft: false, forWetMix: false,
    paddle: "flat_paddle_slow_tumble_gravity_fall",
    bestUse: "fragile_cereal_snack_gentle_coat_blend",
  },
  heated_jacket_dry: {
    mixIntensity: 7, batchTime: 6, gentleness: 6, cleanability: 5, pmCost: 8,
    twinShaft: false, forWetMix: false,
    paddle: "jacketed_trough_heated_wall_paddle",
    bestUse: "drying_while_mixing_solvent_moisture",
  },
  fluidized_zone_rapid: {
    mixIntensity: 9, batchTime: 10, gentleness: 3, cleanability: 6, pmCost: 6,
    twinShaft: false, forWetMix: true,
    paddle: "high_speed_chopper_plus_paddle_fluidize",
    bestUse: "rapid_granulation_binder_spray_coat",
  },
};

function get(t: PaddleMixerType): PaddleMixerData {
  return DATA[t];
}

export const mixIntensity = (t: PaddleMixerType) => get(t).mixIntensity;
export const batchTime = (t: PaddleMixerType) => get(t).batchTime;
export const gentleness = (t: PaddleMixerType) => get(t).gentleness;
export const cleanability = (t: PaddleMixerType) => get(t).cleanability;
export const pmCost = (t: PaddleMixerType) => get(t).pmCost;
export const twinShaft = (t: PaddleMixerType) => get(t).twinShaft;
export const forWetMix = (t: PaddleMixerType) => get(t).forWetMix;
export const paddle = (t: PaddleMixerType) => get(t).paddle;
export const bestUse = (t: PaddleMixerType) => get(t).bestUse;
export const paddleMixerTypes = (): PaddleMixerType[] =>
  Object.keys(DATA) as PaddleMixerType[];
