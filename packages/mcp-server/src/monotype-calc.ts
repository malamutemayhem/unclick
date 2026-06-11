// monotype-calc - monotype printmaking plate types

export type Monotype =
  | "glass_plate_smooth"
  | "plexiglass_plate_light"
  | "gelatin_plate_soft"
  | "metal_plate_durable"
  | "mylar_sheet_clear";

const DATA: Record<Monotype, {
  inkHold: number; detailTransfer: number; durability: number; cleanEase: number;
  cost: number; transparent: boolean; reusable: boolean; surfaceFinish: string; bestUse: string;
}> = {
  glass_plate_smooth:     { inkHold: 8, detailTransfer: 9, durability: 6, cleanEase: 9, cost: 5, transparent: true, reusable: true, surfaceFinish: "polished_flat_glass", bestUse: "general_monotype_print" },
  plexiglass_plate_light: { inkHold: 7, detailTransfer: 8, durability: 7, cleanEase: 8, cost: 6, transparent: true, reusable: true, surfaceFinish: "clear_acrylic_sheet", bestUse: "lightweight_studio_print" },
  gelatin_plate_soft:     { inkHold: 10, detailTransfer: 7, durability: 3, cleanEase: 7, cost: 4, transparent: false, reusable: false, surfaceFinish: "soft_gelatin_layer", bestUse: "beginner_mono_print" },
  metal_plate_durable:    { inkHold: 9, detailTransfer: 10, durability: 10, cleanEase: 6, cost: 9, transparent: false, reusable: true, surfaceFinish: "polished_copper_zinc", bestUse: "pro_detail_mono_print" },
  mylar_sheet_clear:      { inkHold: 6, detailTransfer: 7, durability: 5, cleanEase: 10, cost: 3, transparent: true, reusable: false, surfaceFinish: "smooth_polyester_film", bestUse: "disposable_quick_print" },
};

const get = (m: Monotype) => DATA[m];
export const inkHold = (m: Monotype) => get(m).inkHold;
export const detailTransfer = (m: Monotype) => get(m).detailTransfer;
export const durability = (m: Monotype) => get(m).durability;
export const cleanEase = (m: Monotype) => get(m).cleanEase;
export const monoCost = (m: Monotype) => get(m).cost;
export const transparent = (m: Monotype) => get(m).transparent;
export const reusable = (m: Monotype) => get(m).reusable;
export const surfaceFinish = (m: Monotype) => get(m).surfaceFinish;
export const bestUse = (m: Monotype) => get(m).bestUse;
export const monotypes = (): Monotype[] => Object.keys(DATA) as Monotype[];
