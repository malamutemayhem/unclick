export type HardnessTesterType =
  | "rockwell_diamond_cone"
  | "vickers_diamond_pyramid"
  | "brinell_carbide_ball"
  | "knoop_micro_indent"
  | "leeb_rebound_portable";

interface HardnessTesterData {
  accuracy: number;
  speed: number;
  forceRange: number;
  portability: number;
  htCost: number;
  portable: boolean;
  forMicro: boolean;
  indenter: string;
  bestUse: string;
}

const DATA: Record<HardnessTesterType, HardnessTesterData> = {
  rockwell_diamond_cone: {
    accuracy: 8, speed: 10, forceRange: 8, portability: 5, htCost: 5,
    portable: false, forMicro: false,
    indenter: "diamond_cone_120_deg_brale",
    bestUse: "heat_treat_qa_production_floor",
  },
  vickers_diamond_pyramid: {
    accuracy: 10, speed: 7, forceRange: 10, portability: 3, htCost: 7,
    portable: false, forMicro: true,
    indenter: "diamond_pyramid_136_deg_square",
    bestUse: "thin_coat_weld_haz_micro_section",
  },
  brinell_carbide_ball: {
    accuracy: 7, speed: 8, forceRange: 6, portability: 4, htCost: 5,
    portable: false, forMicro: false,
    indenter: "tungsten_carbide_ball_10mm",
    bestUse: "casting_forging_coarse_grain",
  },
  knoop_micro_indent: {
    accuracy: 10, speed: 6, forceRange: 5, portability: 2, htCost: 8,
    portable: false, forMicro: true,
    indenter: "elongated_diamond_rhombic_7_11",
    bestUse: "thin_film_ceramic_brittle_layer",
  },
  leeb_rebound_portable: {
    accuracy: 6, speed: 9, forceRange: 4, portability: 10, htCost: 4,
    portable: true, forMicro: false,
    indenter: "tungsten_carbide_impact_body",
    bestUse: "field_test_installed_pipe_vessel",
  },
};

function get(t: HardnessTesterType): HardnessTesterData {
  return DATA[t];
}

export const accuracy = (t: HardnessTesterType) => get(t).accuracy;
export const speed = (t: HardnessTesterType) => get(t).speed;
export const forceRange = (t: HardnessTesterType) => get(t).forceRange;
export const portability = (t: HardnessTesterType) => get(t).portability;
export const htCost = (t: HardnessTesterType) => get(t).htCost;
export const portable = (t: HardnessTesterType) => get(t).portable;
export const forMicro = (t: HardnessTesterType) => get(t).forMicro;
export const indenter = (t: HardnessTesterType) => get(t).indenter;
export const bestUse = (t: HardnessTesterType) => get(t).bestUse;
export const hardnessTesterTypes = (): HardnessTesterType[] =>
  Object.keys(DATA) as HardnessTesterType[];
