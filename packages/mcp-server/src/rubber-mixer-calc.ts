export type RubberMixerType =
  | "two_roll_mill"
  | "internal_mixer"
  | "continuous_mixer"
  | "intermesh_rotor"
  | "tangential_rotor";

interface RubberMixerData {
  mixQuality: number;
  throughput: number;
  temperatureControl: number;
  dispersion: number;
  rmxCost: number;
  enclosed: boolean;
  forTire: boolean;
  mixerConfig: string;
  bestUse: string;
}

const DATA: Record<RubberMixerType, RubberMixerData> = {
  two_roll_mill: {
    mixQuality: 7, throughput: 5, temperatureControl: 8, dispersion: 7, rmxCost: 4,
    enclosed: false, forTire: true,
    mixerConfig: "two_roll_mill_rubber_mixer_open_nip_shear_fold_blend_compound",
    bestUse: "rubber_lab_two_roll_mill_open_mix_small_batch_compound_develop",
  },
  internal_mixer: {
    mixQuality: 9, throughput: 9, temperatureControl: 7, dispersion: 9, rmxCost: 8,
    enclosed: true, forTire: true,
    mixerConfig: "internal_mixer_rubber_enclosed_chamber_rotor_intensive_shear_mix",
    bestUse: "tire_factory_internal_mixer_high_volume_compound_masterbatch",
  },
  continuous_mixer: {
    mixQuality: 8, throughput: 10, temperatureControl: 8, dispersion: 8, rmxCost: 9,
    enclosed: true, forTire: true,
    mixerConfig: "continuous_mixer_rubber_screw_barrel_feed_mix_discharge_nonstop",
    bestUse: "large_rubber_plant_continuous_mixer_nonstop_compound_production",
  },
  intermesh_rotor: {
    mixQuality: 10, throughput: 8, temperatureControl: 9, dispersion: 10, rmxCost: 10,
    enclosed: true, forTire: true,
    mixerConfig: "intermesh_rotor_rubber_mixer_interlocking_blade_high_shear_fine",
    bestUse: "specialty_rubber_intermesh_mixer_fine_dispersion_silica_compound",
  },
  tangential_rotor: {
    mixQuality: 8, throughput: 10, temperatureControl: 6, dispersion: 8, rmxCost: 7,
    enclosed: true, forTire: false,
    mixerConfig: "tangential_rotor_rubber_mixer_non_intermesh_fast_incorporate",
    bestUse: "general_rubber_tangential_mixer_fast_incorporate_bulk_compound",
  },
};

function get(t: RubberMixerType): RubberMixerData {
  return DATA[t];
}

export const mixQuality = (t: RubberMixerType) => get(t).mixQuality;
export const throughput = (t: RubberMixerType) => get(t).throughput;
export const temperatureControl = (t: RubberMixerType) => get(t).temperatureControl;
export const dispersion = (t: RubberMixerType) => get(t).dispersion;
export const rmxCost = (t: RubberMixerType) => get(t).rmxCost;
export const enclosed = (t: RubberMixerType) => get(t).enclosed;
export const forTire = (t: RubberMixerType) => get(t).forTire;
export const mixerConfig = (t: RubberMixerType) => get(t).mixerConfig;
export const bestUse = (t: RubberMixerType) => get(t).bestUse;
export const rubberMixerTypes = (): RubberMixerType[] =>
  Object.keys(DATA) as RubberMixerType[];
