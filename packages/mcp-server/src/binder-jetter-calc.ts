export type BinderJetterType =
  | "sand_binder"
  | "metal_binder"
  | "ceramic_binder"
  | "full_color_binder"
  | "continuous_binder";

interface BinderJetterData {
  partDensity: number;
  throughput: number;
  surfaceFinish: number;
  buildVolume: number;
  bjCost: number;
  sinterRequired: boolean;
  forCasting: boolean;
  jetterConfig: string;
  bestUse: string;
}

const DATA: Record<BinderJetterType, BinderJetterData> = {
  sand_binder: {
    partDensity: 4, throughput: 9, surfaceFinish: 4, buildVolume: 9, bjCost: 5,
    sinterRequired: false, forCasting: true,
    jetterConfig: "sand_binder_jetter_silica_sand_furan_binder_large_mold_core",
    bestUse: "sand_mold_core_sand_binder_jetter_large_casting_pattern_fast",
  },
  metal_binder: {
    partDensity: 8, throughput: 7, surfaceFinish: 6, buildVolume: 6, bjCost: 8,
    sinterRequired: true, forCasting: false,
    jetterConfig: "metal_binder_jetter_stainless_powder_glue_sinter_densify_furnace",
    bestUse: "batch_bracket_metal_binder_jetter_stainless_sinter_functional",
  },
  ceramic_binder: {
    partDensity: 7, throughput: 6, surfaceFinish: 5, buildVolume: 5, bjCost: 7,
    sinterRequired: true, forCasting: false,
    jetterConfig: "ceramic_binder_jetter_alumina_powder_glue_sinter_high_temp_part",
    bestUse: "thermal_insulator_ceramic_binder_jetter_alumina_sinter_complex",
  },
  full_color_binder: {
    partDensity: 3, throughput: 7, surfaceFinish: 7, buildVolume: 7, bjCost: 5,
    sinterRequired: false, forCasting: false,
    jetterConfig: "full_color_binder_jetter_gypsum_powder_cmyk_binder_visual_model",
    bestUse: "arch_model_full_color_binder_jetter_cmyk_visual_presentation",
  },
  continuous_binder: {
    partDensity: 7, throughput: 9, surfaceFinish: 5, buildVolume: 8, bjCost: 7,
    sinterRequired: true, forCasting: false,
    jetterConfig: "continuous_binder_jetter_conveyor_spread_jet_cure_inline_volume",
    bestUse: "mass_production_continuous_binder_jetter_inline_high_volume_run",
  },
};

function get(t: BinderJetterType): BinderJetterData {
  return DATA[t];
}

export const partDensity = (t: BinderJetterType) => get(t).partDensity;
export const throughput = (t: BinderJetterType) => get(t).throughput;
export const surfaceFinish = (t: BinderJetterType) => get(t).surfaceFinish;
export const buildVolume = (t: BinderJetterType) => get(t).buildVolume;
export const bjCost = (t: BinderJetterType) => get(t).bjCost;
export const sinterRequired = (t: BinderJetterType) => get(t).sinterRequired;
export const forCasting = (t: BinderJetterType) => get(t).forCasting;
export const jetterConfig = (t: BinderJetterType) => get(t).jetterConfig;
export const bestUse = (t: BinderJetterType) => get(t).bestUse;
export const binderJetterTypes = (): BinderJetterType[] =>
  Object.keys(DATA) as BinderJetterType[];
