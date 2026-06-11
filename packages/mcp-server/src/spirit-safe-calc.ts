export type SpiritSafeType =
  | "traditional_brass"
  | "glass_observation"
  | "automated_sensor"
  | "digital_inline"
  | "multi_stream";

interface SpiritSafeData {
  cutPrecision: number;
  visibility: number;
  automation: number;
  compliance: number;
  ssCost: number;
  locked: boolean;
  forScotch: boolean;
  safeConfig: string;
  bestUse: string;
}

const DATA: Record<SpiritSafeType, SpiritSafeData> = {
  traditional_brass: {
    cutPrecision: 7, visibility: 9, automation: 3, compliance: 10, ssCost: 6,
    locked: true, forScotch: true,
    safeConfig: "traditional_brass_glass_locked_spirit_safe_excise_scotch_whisky",
    bestUse: "scotch_whisky_distillery_traditional_brass_locked_spirit_safe",
  },
  glass_observation: {
    cutPrecision: 7, visibility: 10, automation: 3, compliance: 9, ssCost: 5,
    locked: true, forScotch: true,
    safeConfig: "glass_observation_spirit_safe_visual_cut_heads_hearts_tails",
    bestUse: "craft_distillery_visual_observation_glass_safe_cut_heads_tails",
  },
  automated_sensor: {
    cutPrecision: 9, visibility: 7, automation: 9, compliance: 8, ssCost: 8,
    locked: false, forScotch: false,
    safeConfig: "automated_sensor_spirit_safe_density_meter_temp_auto_cut_divert",
    bestUse: "modern_distillery_automated_sensor_density_meter_auto_cut_point",
  },
  digital_inline: {
    cutPrecision: 10, visibility: 5, automation: 10, compliance: 7, ssCost: 9,
    locked: false, forScotch: false,
    safeConfig: "digital_inline_spirit_analyzer_nir_spectroscopy_real_time_cut",
    bestUse: "precision_spirit_production_digital_inline_nir_spectroscopy_cut",
  },
  multi_stream: {
    cutPrecision: 8, visibility: 8, automation: 7, compliance: 9, ssCost: 7,
    locked: true, forScotch: true,
    safeConfig: "multi_stream_spirit_safe_multiple_still_manifold_divert_valve",
    bestUse: "multi_still_distillery_manifold_spirit_safe_divert_valve_blend",
  },
};

function get(t: SpiritSafeType): SpiritSafeData {
  return DATA[t];
}

export const cutPrecision = (t: SpiritSafeType) => get(t).cutPrecision;
export const visibility = (t: SpiritSafeType) => get(t).visibility;
export const automation = (t: SpiritSafeType) => get(t).automation;
export const compliance = (t: SpiritSafeType) => get(t).compliance;
export const ssCost = (t: SpiritSafeType) => get(t).ssCost;
export const locked = (t: SpiritSafeType) => get(t).locked;
export const forScotch = (t: SpiritSafeType) => get(t).forScotch;
export const safeConfig = (t: SpiritSafeType) => get(t).safeConfig;
export const bestUse = (t: SpiritSafeType) => get(t).bestUse;
export const spiritSafeTypes = (): SpiritSafeType[] =>
  Object.keys(DATA) as SpiritSafeType[];
