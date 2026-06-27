export type JoistTypeType =
  | "open_web_steel_bar"
  | "wood_i_joist_engineered"
  | "solid_sawn_dimensional"
  | "cold_formed_cfs_track"
  | "concrete_prestress_plank";

interface JoistTypeData {
  span: number;
  depth: number;
  loadCapacity: number;
  fireRating: number;
  jtCost: number;
  engineered: boolean;
  forLongSpan: boolean;
  web: string;
  bestUse: string;
}

const DATA: Record<JoistTypeType, JoistTypeData> = {
  open_web_steel_bar: {
    span: 9, depth: 7, loadCapacity: 8, fireRating: 6, jtCost: 6,
    engineered: true, forLongSpan: true,
    web: "round_bar_diagonal_welded",
    bestUse: "commercial_roof_long_span_open",
  },
  wood_i_joist_engineered: {
    span: 7, depth: 8, loadCapacity: 7, fireRating: 4, jtCost: 5,
    engineered: true, forLongSpan: false,
    web: "osb_plywood_continuous_panel",
    bestUse: "residential_floor_uniform_depth",
  },
  solid_sawn_dimensional: {
    span: 4, depth: 5, loadCapacity: 5, fireRating: 5, jtCost: 3,
    engineered: false, forLongSpan: false,
    web: "solid_wood_rectangular_section",
    bestUse: "light_frame_residential_simple",
  },
  cold_formed_cfs_track: {
    span: 6, depth: 6, loadCapacity: 6, fireRating: 7, jtCost: 4,
    engineered: true, forLongSpan: false,
    web: "punched_steel_stiffened_lip",
    bestUse: "mid_rise_steel_stud_floor",
  },
  concrete_prestress_plank: {
    span: 10, depth: 9, loadCapacity: 10, fireRating: 10, jtCost: 8,
    engineered: true, forLongSpan: true,
    web: "hollow_core_prestress_strand",
    bestUse: "parking_garage_heavy_load_floor",
  },
};

function get(t: JoistTypeType): JoistTypeData {
  return DATA[t];
}

export const span = (t: JoistTypeType) => get(t).span;
export const depth = (t: JoistTypeType) => get(t).depth;
export const loadCapacity = (t: JoistTypeType) => get(t).loadCapacity;
export const fireRating = (t: JoistTypeType) => get(t).fireRating;
export const jtCost = (t: JoistTypeType) => get(t).jtCost;
export const engineered = (t: JoistTypeType) => get(t).engineered;
export const forLongSpan = (t: JoistTypeType) => get(t).forLongSpan;
export const web = (t: JoistTypeType) => get(t).web;
export const bestUse = (t: JoistTypeType) => get(t).bestUse;
export const joistTypeTypes = (): JoistTypeType[] =>
  Object.keys(DATA) as JoistTypeType[];
