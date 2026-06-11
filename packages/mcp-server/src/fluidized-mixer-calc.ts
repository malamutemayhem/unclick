export type FluidizedMixerType =
  | "bottom_spray_fluid"
  | "top_spray_fluid"
  | "tangential_spray"
  | "dry_fluid_mix"
  | "continuous_fluid";

interface FluidizedMixerData {
  coatingUniformity: number;
  throughput: number;
  particleControl: number;
  dryingRate: number;
  fmCost: number;
  spraying: boolean;
  forGranulation: boolean;
  mixerConfig: string;
  bestUse: string;
}

const DATA: Record<FluidizedMixerType, FluidizedMixerData> = {
  bottom_spray_fluid: {
    coatingUniformity: 9, throughput: 6, particleControl: 9, dryingRate: 7, fmCost: 8,
    spraying: true, forGranulation: false,
    mixerConfig: "bottom_spray_fluidized_mixer_wurster_coat_column_partition_layer",
    bestUse: "pharma_pellet_bottom_spray_fluidized_mixer_wurster_coat_layer",
  },
  top_spray_fluid: {
    coatingUniformity: 7, throughput: 8, particleControl: 7, dryingRate: 8, fmCost: 6,
    spraying: true, forGranulation: true,
    mixerConfig: "top_spray_fluidized_mixer_spray_nozzle_above_bed_agglomerate",
    bestUse: "instant_powder_top_spray_fluidized_mixer_agglomerate_dissolve",
  },
  tangential_spray: {
    coatingUniformity: 8, throughput: 7, particleControl: 8, dryingRate: 7, fmCost: 7,
    spraying: true, forGranulation: true,
    mixerConfig: "tangential_spray_fluidized_mixer_rotor_disc_spin_coat_layer_up",
    bestUse: "candy_coat_tangential_spray_fluidized_mixer_rotor_disc_layer",
  },
  dry_fluid_mix: {
    coatingUniformity: 5, throughput: 9, particleControl: 6, dryingRate: 9, fmCost: 5,
    spraying: false, forGranulation: false,
    mixerConfig: "dry_fluid_mix_fluidized_mixer_air_lift_suspend_blend_no_spray",
    bestUse: "tea_blend_dry_fluid_mix_fluidized_mixer_air_suspend_gentle_mix",
  },
  continuous_fluid: {
    coatingUniformity: 7, throughput: 10, particleControl: 7, dryingRate: 8, fmCost: 8,
    spraying: true, forGranulation: true,
    mixerConfig: "continuous_fluid_fluidized_mixer_multi_zone_feed_through_process",
    bestUse: "detergent_granule_continuous_fluid_fluidized_mixer_inline_coat",
  },
};

function get(t: FluidizedMixerType): FluidizedMixerData {
  return DATA[t];
}

export const coatingUniformity = (t: FluidizedMixerType) => get(t).coatingUniformity;
export const throughput = (t: FluidizedMixerType) => get(t).throughput;
export const particleControl = (t: FluidizedMixerType) => get(t).particleControl;
export const dryingRate = (t: FluidizedMixerType) => get(t).dryingRate;
export const fmCost = (t: FluidizedMixerType) => get(t).fmCost;
export const spraying = (t: FluidizedMixerType) => get(t).spraying;
export const forGranulation = (t: FluidizedMixerType) => get(t).forGranulation;
export const mixerConfig = (t: FluidizedMixerType) => get(t).mixerConfig;
export const bestUse = (t: FluidizedMixerType) => get(t).bestUse;
export const fluidizedMixerTypes = (): FluidizedMixerType[] =>
  Object.keys(DATA) as FluidizedMixerType[];
