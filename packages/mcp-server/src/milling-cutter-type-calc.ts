export type MillingCutterType =
  | "flat_end_mill_square"
  | "ball_nose_end_mill"
  | "face_mill_indexable"
  | "slab_mill_plain_cylindrical"
  | "form_cutter_concave_convex";

interface MillingCutterData {
  mrr: number;
  finish_: number;
  versatility: number;
  toolLife: number;
  mcCost: number;
  indexable: boolean;
  forSlot: boolean;
  geometry: string;
  bestUse: string;
}

const DATA: Record<MillingCutterType, MillingCutterData> = {
  flat_end_mill_square: {
    mrr: 7, finish_: 6, versatility: 9, toolLife: 6, mcCost: 3,
    indexable: false, forSlot: true,
    geometry: "square_end_helical_flute",
    bestUse: "general_purpose_slot_pocket",
  },
  ball_nose_end_mill: {
    mrr: 5, finish_: 9, versatility: 7, toolLife: 5, mcCost: 4,
    indexable: false, forSlot: false,
    geometry: "hemispherical_tip_helical",
    bestUse: "3d_contour_mold_surface",
  },
  face_mill_indexable: {
    mrr: 10, finish_: 7, versatility: 5, toolLife: 9, mcCost: 7,
    indexable: true, forSlot: false,
    geometry: "large_diameter_insert_ring",
    bestUse: "flat_surface_heavy_stock_removal",
  },
  slab_mill_plain_cylindrical: {
    mrr: 8, finish_: 5, versatility: 3, toolLife: 8, mcCost: 5,
    indexable: false, forSlot: false,
    geometry: "cylindrical_peripheral_teeth",
    bestUse: "wide_flat_surface_horizontal_mill",
  },
  form_cutter_concave_convex: {
    mrr: 4, finish_: 8, versatility: 2, toolLife: 7, mcCost: 6,
    indexable: false, forSlot: false,
    geometry: "profile_shaped_ground_form",
    bestUse: "gear_tooth_radius_special_profile",
  },
};

function get(t: MillingCutterType): MillingCutterData {
  return DATA[t];
}

export const mrr = (t: MillingCutterType) => get(t).mrr;
export const finish_ = (t: MillingCutterType) => get(t).finish_;
export const versatility = (t: MillingCutterType) => get(t).versatility;
export const toolLife = (t: MillingCutterType) => get(t).toolLife;
export const mcCost = (t: MillingCutterType) => get(t).mcCost;
export const indexable = (t: MillingCutterType) => get(t).indexable;
export const forSlot = (t: MillingCutterType) => get(t).forSlot;
export const geometry = (t: MillingCutterType) => get(t).geometry;
export const bestUse = (t: MillingCutterType) => get(t).bestUse;
export const millingCutterTypes = (): MillingCutterType[] =>
  Object.keys(DATA) as MillingCutterType[];
