export type HoneProcessType =
  | "single_pass_mandrel"
  | "multi_stroke_bore"
  | "plateau_crosshatch"
  | "flexible_ball_hone"
  | "laser_hone_textured";

interface HoneProcessData {
  roundness: number;
  speed: number;
  surfaceFinish: number;
  sizeControl: number;
  hpCost: number;
  automated: boolean;
  forEngine: boolean;
  abrasive: string;
  bestUse: string;
}

const DATA: Record<HoneProcessType, HoneProcessData> = {
  single_pass_mandrel: {
    roundness: 8, speed: 10, surfaceFinish: 7, sizeControl: 9, hpCost: 7,
    automated: true, forEngine: false,
    abrasive: "diamond_plated_expandable_mandrel",
    bestUse: "connecting_rod_gear_bore_finish",
  },
  multi_stroke_bore: {
    roundness: 10, speed: 6, surfaceFinish: 9, sizeControl: 10, hpCost: 6,
    automated: true, forEngine: true,
    abrasive: "cbn_vitrified_stone_set",
    bestUse: "engine_block_cylinder_bore",
  },
  plateau_crosshatch: {
    roundness: 9, speed: 7, surfaceFinish: 10, sizeControl: 9, hpCost: 8,
    automated: true, forEngine: true,
    abrasive: "diamond_brush_plateau_stone",
    bestUse: "cylinder_liner_oil_retention",
  },
  flexible_ball_hone: {
    roundness: 6, speed: 9, surfaceFinish: 6, sizeControl: 5, hpCost: 3,
    automated: false, forEngine: false,
    abrasive: "silicon_carbide_nylon_globe",
    bestUse: "deburr_crosshole_port_cleanup",
  },
  laser_hone_textured: {
    roundness: 8, speed: 5, surfaceFinish: 10, sizeControl: 8, hpCost: 10,
    automated: true, forEngine: true,
    abrasive: "femtosecond_laser_micro_dimple",
    bestUse: "tribology_piston_ring_friction",
  },
};

function get(t: HoneProcessType): HoneProcessData {
  return DATA[t];
}

export const roundness = (t: HoneProcessType) => get(t).roundness;
export const speed = (t: HoneProcessType) => get(t).speed;
export const surfaceFinish = (t: HoneProcessType) => get(t).surfaceFinish;
export const sizeControl = (t: HoneProcessType) => get(t).sizeControl;
export const hpCost = (t: HoneProcessType) => get(t).hpCost;
export const automated = (t: HoneProcessType) => get(t).automated;
export const forEngine = (t: HoneProcessType) => get(t).forEngine;
export const abrasive = (t: HoneProcessType) => get(t).abrasive;
export const bestUse = (t: HoneProcessType) => get(t).bestUse;
export const honeProcessTypes = (): HoneProcessType[] =>
  Object.keys(DATA) as HoneProcessType[];
