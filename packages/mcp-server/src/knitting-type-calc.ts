export type KnittingType =
  | "single_jersey_circular"
  | "double_jersey_rib"
  | "warp_tricot_raschel"
  | "flatbed_fully_fashioned"
  | "seamless_3d_knit";

const DATA: Record<KnittingType, {
  speed: number; stretch: number; complexity: number;
  waste: number; ktCost: number; tubular: boolean;
  forActivewear: boolean; gauge: string; bestUse: string;
}> = {
  single_jersey_circular: {
    speed: 10, stretch: 7, complexity: 3,
    waste: 5, ktCost: 1, tubular: true,
    forActivewear: true, gauge: "28_gauge_fine_jersey",
    bestUse: "tshirt_underwear_basic_jersey",
  },
  double_jersey_rib: {
    speed: 7, stretch: 8, complexity: 5,
    waste: 5, ktCost: 2, tubular: true,
    forActivewear: false, gauge: "18_gauge_interlock_rib",
    bestUse: "polo_shirt_cuff_collar_rib",
  },
  warp_tricot_raschel: {
    speed: 9, stretch: 4, complexity: 7,
    waste: 3, ktCost: 3, tubular: false,
    forActivewear: true, gauge: "28_32_gauge_tricot_warp",
    bestUse: "lingerie_lace_mesh_sportswear",
  },
  flatbed_fully_fashioned: {
    speed: 3, stretch: 6, complexity: 9,
    waste: 8, ktCost: 4, tubular: false,
    forActivewear: false, gauge: "7_12_gauge_shaped_panel",
    bestUse: "knitwear_sweater_shaped_panel",
  },
  seamless_3d_knit: {
    speed: 4, stretch: 9, complexity: 10,
    waste: 10, ktCost: 5, tubular: true,
    forActivewear: true, gauge: "15_gauge_whole_garment",
    bestUse: "performance_sock_bra_bodymap",
  },
};

const get = (t: KnittingType) => DATA[t];

export const speed = (t: KnittingType) => get(t).speed;
export const stretch = (t: KnittingType) => get(t).stretch;
export const complexity = (t: KnittingType) => get(t).complexity;
export const waste = (t: KnittingType) => get(t).waste;
export const ktCost = (t: KnittingType) => get(t).ktCost;
export const tubular = (t: KnittingType) => get(t).tubular;
export const forActivewear = (t: KnittingType) => get(t).forActivewear;
export const gauge = (t: KnittingType) => get(t).gauge;
export const bestUse = (t: KnittingType) => get(t).bestUse;
export const knittingTypes = (): KnittingType[] => Object.keys(DATA) as KnittingType[];
