export type WaferAlign =
  | "global_alignment_mark"
  | "die_by_die_field"
  | "through_lens_ttl"
  | "backside_ir"
  | "moire_phase_grating";

const DATA: Record<WaferAlign, {
  overlay: number; throughput: number; robustness: number;
  multiLayer: number; alignCost: number; waferWarp: boolean;
  forBonding: boolean; technique: string; bestUse: string;
}> = {
  global_alignment_mark: {
    overlay: 5, throughput: 10, robustness: 8,
    multiLayer: 6, alignCost: 2, waferWarp: false,
    forBonding: false, technique: "cross_box_optical_detect",
    bestUse: "coarse_first_layer_align",
  },
  die_by_die_field: {
    overlay: 9, throughput: 5, robustness: 7,
    multiLayer: 8, alignCost: 6, waferWarp: true,
    forBonding: false, technique: "per_field_correction_model",
    bestUse: "euv_multi_pattern_overlay",
  },
  through_lens_ttl: {
    overlay: 8, throughput: 7, robustness: 9,
    multiLayer: 9, alignCost: 5, waferWarp: false,
    forBonding: false, technique: "diffraction_grating_in_slit",
    bestUse: "scanner_inline_production",
  },
  backside_ir: {
    overlay: 7, throughput: 6, robustness: 6,
    multiLayer: 7, alignCost: 7, waferWarp: true,
    forBonding: true, technique: "infrared_transparent_wafer",
    bestUse: "tsv_backside_litho",
  },
  moire_phase_grating: {
    overlay: 10, throughput: 4, robustness: 5,
    multiLayer: 10, alignCost: 8, waferWarp: true,
    forBonding: true, technique: "interference_fringe_sub_nm",
    bestUse: "hybrid_bond_sub_micron",
  },
};

const get = (t: WaferAlign) => DATA[t];

export const overlay = (t: WaferAlign) => get(t).overlay;
export const throughput = (t: WaferAlign) => get(t).throughput;
export const robustness = (t: WaferAlign) => get(t).robustness;
export const multiLayer = (t: WaferAlign) => get(t).multiLayer;
export const alignCost = (t: WaferAlign) => get(t).alignCost;
export const waferWarp = (t: WaferAlign) => get(t).waferWarp;
export const forBonding = (t: WaferAlign) => get(t).forBonding;
export const technique = (t: WaferAlign) => get(t).technique;
export const bestUse = (t: WaferAlign) => get(t).bestUse;
export const waferAligns = (): WaferAlign[] => Object.keys(DATA) as WaferAlign[];
