export type ConcreteVibratorType =
  | "internal_immersion"
  | "external_form"
  | "surface_screed"
  | "vibrating_table"
  | "roller_compactor";

interface ConcreteVibratorData {
  consolidation: number;
  coverageArea: number;
  frequency: number;
  portability: number;
  cvCost: number;
  immersed: boolean;
  forPrecast: boolean;
  vibratorConfig: string;
  bestUse: string;
}

const DATA: Record<ConcreteVibratorType, ConcreteVibratorData> = {
  internal_immersion: {
    consolidation: 10, coverageArea: 6, frequency: 8, portability: 9, cvCost: 4,
    immersed: true, forPrecast: false,
    vibratorConfig: "internal_immersion_poker_vibrator_insert_concrete_air_release",
    bestUse: "column_wall_beam_foundation_internal_poker_vibrator_consolidate",
  },
  external_form: {
    consolidation: 8, coverageArea: 8, frequency: 9, portability: 5, cvCost: 6,
    immersed: false, forPrecast: true,
    vibratorConfig: "external_form_vibrator_mount_formwork_panel_high_freq_compact",
    bestUse: "precast_panel_thin_wall_external_form_vibrator_mount_formwork",
  },
  surface_screed: {
    consolidation: 7, coverageArea: 10, frequency: 7, portability: 8, cvCost: 5,
    immersed: false, forPrecast: false,
    vibratorConfig: "surface_screed_vibrating_beam_truss_level_slab_floor_finish",
    bestUse: "flat_slab_floor_deck_surface_screed_vibrating_beam_level_finish",
  },
  vibrating_table: {
    consolidation: 9, coverageArea: 7, frequency: 10, portability: 3, cvCost: 7,
    immersed: false, forPrecast: true,
    vibratorConfig: "vibrating_table_precast_mold_high_frequency_dense_compact_part",
    bestUse: "precast_block_paver_pipe_vibrating_table_mold_dense_compact",
  },
  roller_compactor: {
    consolidation: 8, coverageArea: 10, frequency: 6, portability: 7, cvCost: 8,
    immersed: false, forPrecast: false,
    vibratorConfig: "roller_compactor_rcc_dam_pavement_vibratory_drum_large_area",
    bestUse: "rcc_dam_pavement_large_area_roller_compactor_vibratory_drum",
  },
};

function get(t: ConcreteVibratorType): ConcreteVibratorData {
  return DATA[t];
}

export const consolidation = (t: ConcreteVibratorType) => get(t).consolidation;
export const coverageArea = (t: ConcreteVibratorType) => get(t).coverageArea;
export const frequency = (t: ConcreteVibratorType) => get(t).frequency;
export const portability = (t: ConcreteVibratorType) => get(t).portability;
export const cvCost = (t: ConcreteVibratorType) => get(t).cvCost;
export const immersed = (t: ConcreteVibratorType) => get(t).immersed;
export const forPrecast = (t: ConcreteVibratorType) => get(t).forPrecast;
export const vibratorConfig = (t: ConcreteVibratorType) => get(t).vibratorConfig;
export const bestUse = (t: ConcreteVibratorType) => get(t).bestUse;
export const concreteVibratorTypes = (): ConcreteVibratorType[] =>
  Object.keys(DATA) as ConcreteVibratorType[];
