export type PolymerAmType =
  | "fdm_fused_filament"
  | "sla_stereolithography"
  | "sls_laser_sinter"
  | "mjf_multi_jet_fusion"
  | "dlp_digital_light";

interface PolymerAmData {
  precision: number;
  speed: number;
  strength: number;
  surfaceFinish: number;
  paCost: number;
  supportFree: boolean;
  forProduction: boolean;
  material: string;
  bestUse: string;
}

const DATA: Record<PolymerAmType, PolymerAmData> = {
  fdm_fused_filament: {
    precision: 6, speed: 7, strength: 8, surfaceFinish: 5, paCost: 3,
    supportFree: false, forProduction: false,
    material: "abs_pla_petg_nylon_filament",
    bestUse: "prototype_jig_fixture_concept",
  },
  sla_stereolithography: {
    precision: 10, speed: 6, strength: 5, surfaceFinish: 10, paCost: 6,
    supportFree: false, forProduction: false,
    material: "uv_photopolymer_liquid_resin",
    bestUse: "jewelry_dental_model_detail_part",
  },
  sls_laser_sinter: {
    precision: 8, speed: 8, strength: 9, surfaceFinish: 7, paCost: 7,
    supportFree: true, forProduction: true,
    material: "nylon_pa12_pa11_tpu_powder",
    bestUse: "functional_hinge_snap_fit_duct",
  },
  mjf_multi_jet_fusion: {
    precision: 9, speed: 10, strength: 9, surfaceFinish: 8, paCost: 7,
    supportFree: true, forProduction: true,
    material: "pa12_pa11_tpu_fusing_agent",
    bestUse: "series_production_end_use_part",
  },
  dlp_digital_light: {
    precision: 10, speed: 8, strength: 5, surfaceFinish: 10, paCost: 5,
    supportFree: false, forProduction: false,
    material: "lcd_masked_photopolymer_resin",
    bestUse: "miniature_figure_dental_aligner",
  },
};

function get(t: PolymerAmType): PolymerAmData {
  return DATA[t];
}

export const precision = (t: PolymerAmType) => get(t).precision;
export const speed = (t: PolymerAmType) => get(t).speed;
export const strength = (t: PolymerAmType) => get(t).strength;
export const surfaceFinish = (t: PolymerAmType) => get(t).surfaceFinish;
export const paCost = (t: PolymerAmType) => get(t).paCost;
export const supportFree = (t: PolymerAmType) => get(t).supportFree;
export const forProduction = (t: PolymerAmType) => get(t).forProduction;
export const material = (t: PolymerAmType) => get(t).material;
export const bestUse = (t: PolymerAmType) => get(t).bestUse;
export const polymerAmTypes = (): PolymerAmType[] =>
  Object.keys(DATA) as PolymerAmType[];
