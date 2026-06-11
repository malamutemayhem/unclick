export type GlazeSprayerType =
  | "airbrush_manual"
  | "hvlp_spray"
  | "airless_spray"
  | "robotic_spray"
  | "dip_glaze";

interface GlazeSprayerData {
  coatUniformity: number;
  throughput: number;
  materialEfficiency: number;
  thicknessControl: number;
  gzCost: number;
  automated: boolean;
  forLargeWare: boolean;
  sprayerConfig: string;
  bestUse: string;
}

const DATA: Record<GlazeSprayerType, GlazeSprayerData> = {
  airbrush_manual: {
    coatUniformity: 6, throughput: 2, materialEfficiency: 5, thicknessControl: 7, gzCost: 2,
    automated: false, forLargeWare: false,
    sprayerConfig: "airbrush_manual_glaze_sprayer_compressed_air_fine_mist_artistic",
    bestUse: "art_pottery_airbrush_manual_glaze_spray_detail_gradient_effect",
  },
  hvlp_spray: {
    coatUniformity: 8, throughput: 6, materialEfficiency: 8, thicknessControl: 8, gzCost: 5,
    automated: false, forLargeWare: true,
    sprayerConfig: "hvlp_glaze_sprayer_high_volume_low_pressure_transfer_efficient",
    bestUse: "small_ceramic_shop_hvlp_glaze_sprayer_efficient_even_coating",
  },
  airless_spray: {
    coatUniformity: 7, throughput: 8, materialEfficiency: 7, thicknessControl: 6, gzCost: 6,
    automated: false, forLargeWare: true,
    sprayerConfig: "airless_glaze_sprayer_hydraulic_pump_high_pressure_thick_coat",
    bestUse: "sanitaryware_airless_glaze_sprayer_thick_coat_large_piece",
  },
  robotic_spray: {
    coatUniformity: 10, throughput: 9, materialEfficiency: 9, thicknessControl: 10, gzCost: 10,
    automated: true, forLargeWare: true,
    sprayerConfig: "robotic_glaze_sprayer_multi_axis_arm_programmed_path_uniform",
    bestUse: "industrial_ceramic_robotic_glaze_sprayer_consistent_high_volume",
  },
  dip_glaze: {
    coatUniformity: 7, throughput: 10, materialEfficiency: 9, thicknessControl: 5, gzCost: 3,
    automated: false, forLargeWare: false,
    sprayerConfig: "dip_glaze_tank_immerse_ware_coat_drain_dry_simple_batch_even",
    bestUse: "tableware_dip_glaze_tank_simple_immersion_batch_coating_fast",
  },
};

function get(t: GlazeSprayerType): GlazeSprayerData {
  return DATA[t];
}

export const coatUniformity = (t: GlazeSprayerType) => get(t).coatUniformity;
export const throughput = (t: GlazeSprayerType) => get(t).throughput;
export const materialEfficiency = (t: GlazeSprayerType) => get(t).materialEfficiency;
export const thicknessControl = (t: GlazeSprayerType) => get(t).thicknessControl;
export const gzCost = (t: GlazeSprayerType) => get(t).gzCost;
export const automated = (t: GlazeSprayerType) => get(t).automated;
export const forLargeWare = (t: GlazeSprayerType) => get(t).forLargeWare;
export const sprayerConfig = (t: GlazeSprayerType) => get(t).sprayerConfig;
export const bestUse = (t: GlazeSprayerType) => get(t).bestUse;
export const glazeSprayerTypes = (): GlazeSprayerType[] =>
  Object.keys(DATA) as GlazeSprayerType[];
