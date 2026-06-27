export type BracedFrameType =
  | "special_concentric_scbf"
  | "ordinary_concentric_ocbf"
  | "eccentric_link_ebf"
  | "buckling_restrained_brbf"
  | "knee_braced_kbf";

interface BracedFrameData {
  stiffness: number;
  ductility: number;
  drift: number;
  detailing: number;
  bfCost: number;
  special: boolean;
  forSeismic: boolean;
  brace: string;
  bestUse: string;
}

const DATA: Record<BracedFrameType, BracedFrameData> = {
  special_concentric_scbf: {
    stiffness: 9, ductility: 7, drift: 9, detailing: 4, bfCost: 7,
    special: true, forSeismic: true,
    brace: "hss_tube_concentric_diagonal",
    bestUse: "high_seismic_braced_core",
  },
  ordinary_concentric_ocbf: {
    stiffness: 8, ductility: 4, drift: 8, detailing: 8, bfCost: 4,
    special: false, forSeismic: false,
    brace: "angle_wt_simple_diagonal",
    bestUse: "low_seismic_wind_bracing",
  },
  eccentric_link_ebf: {
    stiffness: 7, ductility: 9, drift: 7, detailing: 3, bfCost: 8,
    special: true, forSeismic: true,
    brace: "link_beam_eccentric_offset",
    bestUse: "seismic_with_door_opening",
  },
  buckling_restrained_brbf: {
    stiffness: 8, ductility: 10, drift: 8, detailing: 5, bfCost: 9,
    special: true, forSeismic: true,
    brace: "core_plate_mortar_casing",
    bestUse: "high_seismic_predictable_yield",
  },
  knee_braced_kbf: {
    stiffness: 6, ductility: 6, drift: 6, detailing: 7, bfCost: 5,
    special: false, forSeismic: false,
    brace: "knee_gusset_column_beam",
    bestUse: "industrial_portal_clear_span",
  },
};

function get(t: BracedFrameType): BracedFrameData {
  return DATA[t];
}

export const stiffness = (t: BracedFrameType) => get(t).stiffness;
export const ductility = (t: BracedFrameType) => get(t).ductility;
export const drift = (t: BracedFrameType) => get(t).drift;
export const detailing = (t: BracedFrameType) => get(t).detailing;
export const bfCost = (t: BracedFrameType) => get(t).bfCost;
export const special = (t: BracedFrameType) => get(t).special;
export const forSeismic = (t: BracedFrameType) => get(t).forSeismic;
export const brace = (t: BracedFrameType) => get(t).brace;
export const bestUse = (t: BracedFrameType) => get(t).bestUse;
export const bracedFrameTypes = (): BracedFrameType[] =>
  Object.keys(DATA) as BracedFrameType[];
