// felting-mold-calc - needle felting mold types

export type FeltingMold =
  | "cookie_cutter_flat"
  | "silicone_mold_3d"
  | "foam_form_sculpt"
  | "wire_frame_shape"
  | "polystyrene_core_base";

const DATA: Record<FeltingMold, {
  shapeAccuracy: number; detailFine: number; reusability: number; sizeRange: number;
  cost: number; flexible: boolean; forBeginners: boolean; moldBase: string; bestUse: string;
}> = {
  cookie_cutter_flat:     { shapeAccuracy: 8, detailFine: 4, reusability: 10, sizeRange: 7, cost: 3, flexible: false, forBeginners: true, moldBase: "metal_outline_frame", bestUse: "flat_shape_cutout" },
  silicone_mold_3d:       { shapeAccuracy: 9, detailFine: 9, reusability: 9, sizeRange: 6, cost: 7, flexible: true, forBeginners: true, moldBase: "flexible_silicone_form", bestUse: "detailed_3d_shape" },
  foam_form_sculpt:       { shapeAccuracy: 6, detailFine: 5, reusability: 5, sizeRange: 9, cost: 2, flexible: false, forBeginners: true, moldBase: "carved_foam_core", bestUse: "large_base_shape" },
  wire_frame_shape:       { shapeAccuracy: 7, detailFine: 7, reusability: 8, sizeRange: 8, cost: 4, flexible: true, forBeginners: false, moldBase: "bent_wire_armature", bestUse: "posable_figure_frame" },
  polystyrene_core_base:  { shapeAccuracy: 7, detailFine: 3, reusability: 3, sizeRange: 10, cost: 2, flexible: false, forBeginners: true, moldBase: "solid_polystyrene_ball", bestUse: "round_form_base" },
};

const get = (m: FeltingMold) => DATA[m];
export const shapeAccuracy = (m: FeltingMold) => get(m).shapeAccuracy;
export const detailFine = (m: FeltingMold) => get(m).detailFine;
export const reusability = (m: FeltingMold) => get(m).reusability;
export const sizeRange = (m: FeltingMold) => get(m).sizeRange;
export const moldCost = (m: FeltingMold) => get(m).cost;
export const flexible = (m: FeltingMold) => get(m).flexible;
export const forBeginners = (m: FeltingMold) => get(m).forBeginners;
export const moldBase = (m: FeltingMold) => get(m).moldBase;
export const bestUse = (m: FeltingMold) => get(m).bestUse;
export const feltingMolds = (): FeltingMold[] => Object.keys(DATA) as FeltingMold[];
