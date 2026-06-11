export type DredgeType =
  | "cutter_suction_hydraulic"
  | "trailing_suction_hopper"
  | "bucket_ladder_mechanical"
  | "grab_clamshell_crane"
  | "water_injection_agitation";

interface DredgeData {
  output: number;
  depth: number;
  precision: number;
  mobility: number;
  drCost: number;
  selfPropelled: boolean;
  forCapital: boolean;
  method: string;
  bestUse: string;
}

const DATA: Record<DredgeType, DredgeData> = {
  cutter_suction_hydraulic: {
    output: 9, depth: 8, precision: 7, mobility: 4, drCost: 8,
    selfPropelled: false, forCapital: true,
    method: "rotating_cutter_suction_pump",
    bestUse: "channel_deepening_land_reclaim",
  },
  trailing_suction_hopper: {
    output: 8, depth: 7, precision: 5, mobility: 10, drCost: 9,
    selfPropelled: true, forCapital: true,
    method: "drag_head_suction_hopper_store",
    bestUse: "maintenance_dredge_open_sea",
  },
  bucket_ladder_mechanical: {
    output: 5, depth: 6, precision: 8, mobility: 3, drCost: 6,
    selfPropelled: false, forCapital: false,
    method: "continuous_bucket_chain_ladder",
    bestUse: "hard_clay_gravel_precise_profile",
  },
  grab_clamshell_crane: {
    output: 4, depth: 9, precision: 6, mobility: 7, drCost: 5,
    selfPropelled: false, forCapital: false,
    method: "crane_mounted_grab_bucket_drop",
    bestUse: "confined_area_berth_cleanup",
  },
  water_injection_agitation: {
    output: 7, depth: 4, precision: 3, mobility: 8, drCost: 3,
    selfPropelled: true, forCapital: false,
    method: "low_pressure_water_jet_fluidize",
    bestUse: "silt_maintenance_navigation_channel",
  },
};

function get(t: DredgeType): DredgeData {
  return DATA[t];
}

export const output = (t: DredgeType) => get(t).output;
export const depth = (t: DredgeType) => get(t).depth;
export const precision = (t: DredgeType) => get(t).precision;
export const mobility = (t: DredgeType) => get(t).mobility;
export const drCost = (t: DredgeType) => get(t).drCost;
export const selfPropelled = (t: DredgeType) => get(t).selfPropelled;
export const forCapital = (t: DredgeType) => get(t).forCapital;
export const method = (t: DredgeType) => get(t).method;
export const bestUse = (t: DredgeType) => get(t).bestUse;
export const dredgeTypes = (): DredgeType[] =>
  Object.keys(DATA) as DredgeType[];
