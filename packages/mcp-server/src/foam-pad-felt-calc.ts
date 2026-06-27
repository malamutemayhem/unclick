// foam-pad-felt-calc - felting foam pad types

export type FoamPadFelt =
  | "dense_foam_standard"
  | "brush_mat_bristle"
  | "multi_layer_thick"
  | "travel_pad_compact"
  | "wool_pad_natural";

const DATA: Record<FoamPadFelt, {
  needleProtect: number; surfaceRebound: number; durability: number; portability: number;
  cost: number; natural: boolean; washable: boolean; padMaterial: string; bestUse: string;
}> = {
  dense_foam_standard:  { needleProtect: 8, surfaceRebound: 7, durability: 6, portability: 7, cost: 3, natural: false, washable: false, padMaterial: "high_density_polyfoam", bestUse: "general_felting_surface" },
  brush_mat_bristle:    { needleProtect: 10, surfaceRebound: 9, durability: 8, portability: 6, cost: 7, natural: false, washable: true, padMaterial: "nylon_bristle_mat", bestUse: "fine_detail_work" },
  multi_layer_thick:    { needleProtect: 9, surfaceRebound: 8, durability: 9, portability: 4, cost: 6, natural: false, washable: false, padMaterial: "layered_foam_stack", bestUse: "heavy_duty_sculpt" },
  travel_pad_compact:   { needleProtect: 6, surfaceRebound: 5, durability: 5, portability: 10, cost: 4, natural: false, washable: false, padMaterial: "compact_folding_foam", bestUse: "portable_travel_felt" },
  wool_pad_natural:     { needleProtect: 7, surfaceRebound: 6, durability: 4, portability: 8, cost: 5, natural: true, washable: true, padMaterial: "dense_wool_felt_pad", bestUse: "eco_natural_surface" },
};

const get = (p: FoamPadFelt) => DATA[p];
export const needleProtect = (p: FoamPadFelt) => get(p).needleProtect;
export const surfaceRebound = (p: FoamPadFelt) => get(p).surfaceRebound;
export const durability = (p: FoamPadFelt) => get(p).durability;
export const portability = (p: FoamPadFelt) => get(p).portability;
export const padCost = (p: FoamPadFelt) => get(p).cost;
export const natural = (p: FoamPadFelt) => get(p).natural;
export const washable = (p: FoamPadFelt) => get(p).washable;
export const padMaterial = (p: FoamPadFelt) => get(p).padMaterial;
export const bestUse = (p: FoamPadFelt) => get(p).bestUse;
export const foamPadFelts = (): FoamPadFelt[] => Object.keys(DATA) as FoamPadFelt[];
