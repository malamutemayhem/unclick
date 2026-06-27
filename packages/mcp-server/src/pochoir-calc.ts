// pochoir-calc - pochoir stencil printing types

export type Pochoir =
  | "metal_stencil_precise"
  | "acetate_stencil_clear"
  | "paper_stencil_disposable"
  | "mylar_stencil_durable"
  | "brass_stencil_fine";

const DATA: Record<Pochoir, {
  edgeCrisp: number; durability: number; cutEase: number; detailFine: number;
  cost: number; reusable: boolean; transparent: boolean; stencilBase: string; bestUse: string;
}> = {
  metal_stencil_precise:     { edgeCrisp: 9, durability: 10, cutEase: 4, detailFine: 8, cost: 9, reusable: true, transparent: false, stencilBase: "thin_zinc_sheet", bestUse: "production_pochoir_run" },
  acetate_stencil_clear:     { edgeCrisp: 7, durability: 6, cutEase: 8, detailFine: 7, cost: 4, reusable: true, transparent: true, stencilBase: "clear_acetate_film", bestUse: "general_pochoir_print" },
  paper_stencil_disposable:  { edgeCrisp: 5, durability: 2, cutEase: 10, detailFine: 4, cost: 2, reusable: false, transparent: false, stencilBase: "heavy_card_stock", bestUse: "single_use_stencil" },
  mylar_stencil_durable:     { edgeCrisp: 8, durability: 8, cutEase: 7, detailFine: 7, cost: 6, reusable: true, transparent: true, stencilBase: "polyester_mylar_film", bestUse: "multi_use_pochoir" },
  brass_stencil_fine:        { edgeCrisp: 10, durability: 10, cutEase: 3, detailFine: 10, cost: 10, reusable: true, transparent: false, stencilBase: "etched_brass_plate", bestUse: "fine_art_pochoir" },
};

const get = (p: Pochoir) => DATA[p];
export const edgeCrisp = (p: Pochoir) => get(p).edgeCrisp;
export const durability = (p: Pochoir) => get(p).durability;
export const cutEase = (p: Pochoir) => get(p).cutEase;
export const detailFine = (p: Pochoir) => get(p).detailFine;
export const pochoirCost = (p: Pochoir) => get(p).cost;
export const reusable = (p: Pochoir) => get(p).reusable;
export const transparent = (p: Pochoir) => get(p).transparent;
export const stencilBase = (p: Pochoir) => get(p).stencilBase;
export const bestUse = (p: Pochoir) => get(p).bestUse;
export const pochoirs = (): Pochoir[] => Object.keys(DATA) as Pochoir[];
