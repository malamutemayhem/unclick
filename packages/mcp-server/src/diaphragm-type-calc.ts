export type DiaphragmTypeType =
  | "concrete_cast_in_place"
  | "steel_deck_welded"
  | "wood_plywood_sheathing"
  | "precast_topped_concrete"
  | "composite_deck_concrete";

interface DiaphragmTypeData {
  stiffness: number;
  strength: number;
  weight: number;
  fireRating: number;
  dCost: number;
  rigid: boolean;
  forSteel: boolean;
  connector: string;
  bestUse: string;
}

const DATA: Record<DiaphragmTypeType, DiaphragmTypeData> = {
  concrete_cast_in_place: {
    stiffness: 10, strength: 9, weight: 3, fireRating: 10, dCost: 7,
    rigid: true, forSteel: false,
    connector: "dowel_rebar_shear_key",
    bestUse: "concrete_frame_high_rise",
  },
  steel_deck_welded: {
    stiffness: 7, strength: 7, weight: 8, fireRating: 5, dCost: 5,
    rigid: false, forSteel: true,
    connector: "puddle_weld_screw_button",
    bestUse: "steel_frame_bare_deck_roof",
  },
  wood_plywood_sheathing: {
    stiffness: 4, strength: 4, weight: 9, fireRating: 3, dCost: 3,
    rigid: false, forSteel: false,
    connector: "nail_schedule_blocking_clip",
    bestUse: "residential_light_frame_floor",
  },
  precast_topped_concrete: {
    stiffness: 9, strength: 8, weight: 4, fireRating: 9, dCost: 6,
    rigid: true, forSteel: false,
    connector: "pour_strip_chord_collector",
    bestUse: "precast_parking_topped_slab",
  },
  composite_deck_concrete: {
    stiffness: 9, strength: 9, weight: 5, fireRating: 8, dCost: 6,
    rigid: true, forSteel: true,
    connector: "shear_stud_headed_welded",
    bestUse: "composite_steel_office_floor",
  },
};

function get(t: DiaphragmTypeType): DiaphragmTypeData {
  return DATA[t];
}

export const stiffness = (t: DiaphragmTypeType) => get(t).stiffness;
export const strength = (t: DiaphragmTypeType) => get(t).strength;
export const weight = (t: DiaphragmTypeType) => get(t).weight;
export const fireRating = (t: DiaphragmTypeType) => get(t).fireRating;
export const dCost = (t: DiaphragmTypeType) => get(t).dCost;
export const rigid = (t: DiaphragmTypeType) => get(t).rigid;
export const forSteel = (t: DiaphragmTypeType) => get(t).forSteel;
export const connector = (t: DiaphragmTypeType) => get(t).connector;
export const bestUse = (t: DiaphragmTypeType) => get(t).bestUse;
export const diaphragmTypeTypes = (): DiaphragmTypeType[] =>
  Object.keys(DATA) as DiaphragmTypeType[];
