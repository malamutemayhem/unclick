export type PloughMixerType =
  | "standard_plough"
  | "heated_jacket_plough"
  | "vacuum_plough"
  | "chopper_plough"
  | "continuous_plough";

interface PloughMixerData {
  mixIntensity: number;
  throughput: number;
  heatingCapability: number;
  lumpBreak: number;
  pmCost: number;
  jacketed: boolean;
  forReaction: boolean;
  mixerConfig: string;
  bestUse: string;
}

const DATA: Record<PloughMixerType, PloughMixerData> = {
  standard_plough: {
    mixIntensity: 8, throughput: 8, heatingCapability: 4, lumpBreak: 7, pmCost: 6,
    jacketed: false, forReaction: false,
    mixerConfig: "standard_plough_mixer_share_blade_fluidize_bed_rapid_homogenize",
    bestUse: "dry_powder_standard_plough_mixer_rapid_fluidize_homogeneous_blend",
  },
  heated_jacket_plough: {
    mixIntensity: 8, throughput: 7, heatingCapability: 9, lumpBreak: 7, pmCost: 8,
    jacketed: true, forReaction: true,
    mixerConfig: "heated_jacket_plough_mixer_thermal_wall_react_dry_coat_granulate",
    bestUse: "coating_react_heated_jacket_plough_mixer_thermal_process_granulate",
  },
  vacuum_plough: {
    mixIntensity: 7, throughput: 6, heatingCapability: 7, lumpBreak: 6, pmCost: 9,
    jacketed: true, forReaction: true,
    mixerConfig: "vacuum_plough_mixer_sealed_low_pressure_solvent_remove_dry_mix",
    bestUse: "solvent_wet_cake_vacuum_plough_mixer_evaporate_dry_recover_mix",
  },
  chopper_plough: {
    mixIntensity: 9, throughput: 8, heatingCapability: 4, lumpBreak: 10, pmCost: 7,
    jacketed: false, forReaction: false,
    mixerConfig: "chopper_plough_mixer_high_speed_knife_head_deagglomerate_disperse",
    bestUse: "pigment_disperse_chopper_plough_mixer_deagglomerate_break_lump",
  },
  continuous_plough: {
    mixIntensity: 7, throughput: 10, heatingCapability: 5, lumpBreak: 7, pmCost: 7,
    jacketed: false, forReaction: false,
    mixerConfig: "continuous_plough_mixer_flow_through_inline_steady_state_blend",
    bestUse: "fertilizer_blend_continuous_plough_mixer_inline_steady_throughput",
  },
};

function get(t: PloughMixerType): PloughMixerData {
  return DATA[t];
}

export const mixIntensity = (t: PloughMixerType) => get(t).mixIntensity;
export const throughput = (t: PloughMixerType) => get(t).throughput;
export const heatingCapability = (t: PloughMixerType) => get(t).heatingCapability;
export const lumpBreak = (t: PloughMixerType) => get(t).lumpBreak;
export const pmCost = (t: PloughMixerType) => get(t).pmCost;
export const jacketed = (t: PloughMixerType) => get(t).jacketed;
export const forReaction = (t: PloughMixerType) => get(t).forReaction;
export const mixerConfig = (t: PloughMixerType) => get(t).mixerConfig;
export const bestUse = (t: PloughMixerType) => get(t).bestUse;
export const ploughMixerTypes = (): PloughMixerType[] =>
  Object.keys(DATA) as PloughMixerType[];
