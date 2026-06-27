export type GlassAnnealerType =
  | "lehr_continuous"
  | "batch_annealer"
  | "tunnel_lehr"
  | "roller_lehr"
  | "infrared_rapid";

interface GlassAnnealerData {
  coolingControl: number;
  throughput: number;
  stressRelief: number;
  energyUse: number;
  gaCost: number;
  continuous: boolean;
  forContainer: boolean;
  annealerConfig: string;
  bestUse: string;
}

const DATA: Record<GlassAnnealerType, GlassAnnealerData> = {
  lehr_continuous: {
    coolingControl: 8, throughput: 9, stressRelief: 8, energyUse: 7, gaCost: 8,
    continuous: true, forContainer: true,
    annealerConfig: "continuous_lehr_conveyor_belt_zone_cool_container_bottle_jar",
    bestUse: "container_bottle_jar_continuous_lehr_conveyor_controlled_cool",
  },
  batch_annealer: {
    coolingControl: 10, throughput: 4, stressRelief: 10, energyUse: 5, gaCost: 5,
    continuous: false, forContainer: false,
    annealerConfig: "batch_annealer_oven_programmable_soak_slow_cool_art_glass",
    bestUse: "art_glass_studio_piece_optical_lens_batch_annealer_slow_cool",
  },
  tunnel_lehr: {
    coolingControl: 9, throughput: 10, stressRelief: 9, energyUse: 8, gaCost: 9,
    continuous: true, forContainer: true,
    annealerConfig: "tunnel_lehr_long_zone_gradual_cool_flat_glass_float_line_anneal",
    bestUse: "float_flat_glass_sheet_tunnel_lehr_long_zone_gradual_cool_line",
  },
  roller_lehr: {
    coolingControl: 8, throughput: 9, stressRelief: 8, energyUse: 7, gaCost: 7,
    continuous: true, forContainer: false,
    annealerConfig: "roller_lehr_ceramic_roller_flat_glass_sheet_tableware_cool_zone",
    bestUse: "flat_glass_tableware_roller_lehr_ceramic_roller_controlled_cool",
  },
  infrared_rapid: {
    coolingControl: 7, throughput: 8, stressRelief: 7, energyUse: 9, gaCost: 8,
    continuous: true, forContainer: true,
    annealerConfig: "infrared_rapid_anneal_short_lehr_fast_cycle_energy_efficient",
    bestUse: "lightweight_container_rapid_anneal_short_lehr_energy_saving",
  },
};

function get(t: GlassAnnealerType): GlassAnnealerData {
  return DATA[t];
}

export const coolingControl = (t: GlassAnnealerType) => get(t).coolingControl;
export const throughput = (t: GlassAnnealerType) => get(t).throughput;
export const stressRelief = (t: GlassAnnealerType) => get(t).stressRelief;
export const energyUse = (t: GlassAnnealerType) => get(t).energyUse;
export const gaCost = (t: GlassAnnealerType) => get(t).gaCost;
export const continuous = (t: GlassAnnealerType) => get(t).continuous;
export const forContainer = (t: GlassAnnealerType) => get(t).forContainer;
export const annealerConfig = (t: GlassAnnealerType) => get(t).annealerConfig;
export const bestUse = (t: GlassAnnealerType) => get(t).bestUse;
export const glassAnnealerTypes = (): GlassAnnealerType[] =>
  Object.keys(DATA) as GlassAnnealerType[];
