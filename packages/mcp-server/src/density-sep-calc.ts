export type DensitySepType =
  | "dense_media_drum"
  | "dense_media_cyclone"
  | "jig_pulsating_bed"
  | "shaking_table_wilfley"
  | "spiral_concentrator";

interface DensitySepData {
  efficiency: number;
  throughput: number;
  selectivity: number;
  waterUse: number;
  dsCost: number;
  heavyMedia: boolean;
  forCoal: boolean;
  principle: string;
  bestUse: string;
}

const DATA: Record<DensitySepType, DensitySepData> = {
  dense_media_drum: {
    efficiency: 9, throughput: 9, selectivity: 8, waterUse: 6, dsCost: 7,
    heavyMedia: true, forCoal: true,
    principle: "magnetite_suspension_sink_float",
    bestUse: "coal_wash_coarse_diamond_ore",
  },
  dense_media_cyclone: {
    efficiency: 10, throughput: 8, selectivity: 10, waterUse: 7, dsCost: 8,
    heavyMedia: true, forCoal: true,
    principle: "ferrosilicon_cyclone_vortex_cut",
    bestUse: "coal_fine_wash_iron_ore_preconcentrate",
  },
  jig_pulsating_bed: {
    efficiency: 7, throughput: 9, selectivity: 6, waterUse: 8, dsCost: 5,
    heavyMedia: false, forCoal: true,
    principle: "pulsating_water_stratify_hindered",
    bestUse: "coal_iron_tin_alluvial_coarse",
  },
  shaking_table_wilfley: {
    efficiency: 9, throughput: 4, selectivity: 10, waterUse: 7, dsCost: 4,
    heavyMedia: false, forCoal: false,
    principle: "asymmetric_shake_thin_film_water",
    bestUse: "tin_tungsten_gold_fine_concentrate",
  },
  spiral_concentrator: {
    efficiency: 7, throughput: 8, selectivity: 7, waterUse: 9, dsCost: 3,
    heavyMedia: false, forCoal: false,
    principle: "spiral_trough_centrifugal_gravity",
    bestUse: "beach_sand_mineral_chromite_zircon",
  },
};

function get(t: DensitySepType): DensitySepData {
  return DATA[t];
}

export const efficiency = (t: DensitySepType) => get(t).efficiency;
export const throughput = (t: DensitySepType) => get(t).throughput;
export const selectivity = (t: DensitySepType) => get(t).selectivity;
export const waterUse = (t: DensitySepType) => get(t).waterUse;
export const dsCost = (t: DensitySepType) => get(t).dsCost;
export const heavyMedia = (t: DensitySepType) => get(t).heavyMedia;
export const forCoal = (t: DensitySepType) => get(t).forCoal;
export const principle = (t: DensitySepType) => get(t).principle;
export const bestUse = (t: DensitySepType) => get(t).bestUse;
export const densitySepTypes = (): DensitySepType[] =>
  Object.keys(DATA) as DensitySepType[];
