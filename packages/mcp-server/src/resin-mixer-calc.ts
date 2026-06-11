export type ResinMixerType =
  | "static_inline"
  | "dynamic_impeller"
  | "planetary_dual"
  | "vacuum_degas"
  | "meter_mix_dispense";

interface ResinMixerData {
  mixHomogeneity: number;
  throughput: number;
  ratioAccuracy: number;
  potLifeControl: number;
  rxCost: number;
  degassing: boolean;
  forTwoComponent: boolean;
  mixerConfig: string;
  bestUse: string;
}

const DATA: Record<ResinMixerType, ResinMixerData> = {
  static_inline: {
    mixHomogeneity: 7, throughput: 9, ratioAccuracy: 7, potLifeControl: 6, rxCost: 4,
    degassing: false, forTwoComponent: true,
    mixerConfig: "static_inline_resin_mixer_helical_element_no_moving_parts_flow",
    bestUse: "rtm_infusion_static_inline_resin_mixer_continuous_flow_inject",
  },
  dynamic_impeller: {
    mixHomogeneity: 8, throughput: 7, ratioAccuracy: 6, potLifeControl: 5, rxCost: 5,
    degassing: false, forTwoComponent: true,
    mixerConfig: "dynamic_impeller_resin_mixer_rotating_blade_tank_batch_shear",
    bestUse: "large_batch_dynamic_impeller_resin_mixer_tank_shear_blend_pot",
  },
  planetary_dual: {
    mixHomogeneity: 9, throughput: 5, ratioAccuracy: 8, potLifeControl: 7, rxCost: 8,
    degassing: true, forTwoComponent: true,
    mixerConfig: "planetary_dual_resin_mixer_revolve_rotate_blade_degas_vacuum",
    bestUse: "adhesive_paste_planetary_dual_resin_mixer_degas_void_free_bond",
  },
  vacuum_degas: {
    mixHomogeneity: 9, throughput: 4, ratioAccuracy: 8, potLifeControl: 8, rxCost: 7,
    degassing: true, forTwoComponent: false,
    mixerConfig: "vacuum_degas_resin_mixer_chamber_low_pressure_bubble_extract",
    bestUse: "casting_resin_vacuum_degas_resin_mixer_void_free_clear_optical",
  },
  meter_mix_dispense: {
    mixHomogeneity: 8, throughput: 8, ratioAccuracy: 9, potLifeControl: 9, rxCost: 9,
    degassing: false, forTwoComponent: true,
    mixerConfig: "meter_mix_dispense_resin_mixer_gear_pump_ratio_shot_dispense",
    bestUse: "potting_seal_meter_mix_dispense_resin_mixer_precise_ratio_shot",
  },
};

function get(t: ResinMixerType): ResinMixerData {
  return DATA[t];
}

export const mixHomogeneity = (t: ResinMixerType) => get(t).mixHomogeneity;
export const throughput = (t: ResinMixerType) => get(t).throughput;
export const ratioAccuracy = (t: ResinMixerType) => get(t).ratioAccuracy;
export const potLifeControl = (t: ResinMixerType) => get(t).potLifeControl;
export const rxCost = (t: ResinMixerType) => get(t).rxCost;
export const degassing = (t: ResinMixerType) => get(t).degassing;
export const forTwoComponent = (t: ResinMixerType) => get(t).forTwoComponent;
export const mixerConfig = (t: ResinMixerType) => get(t).mixerConfig;
export const bestUse = (t: ResinMixerType) => get(t).bestUse;
export const resinMixerTypes = (): ResinMixerType[] =>
  Object.keys(DATA) as ResinMixerType[];
