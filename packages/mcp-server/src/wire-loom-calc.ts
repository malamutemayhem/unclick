export type WireLoomType =
  | "split_convoluted_tube"
  | "braided_expandable"
  | "corrugated_solid_tube"
  | "spiral_wrap_band"
  | "woven_fabric_sleeve";

const DATA: Record<WireLoomType, {
  abrasionResist: number; flexibility: number; heatResist: number;
  installEase: number; loomCost: number; splitOpen: boolean;
  forHighTemp: boolean; material: string; bestUse: string;
}> = {
  split_convoluted_tube: { abrasionResist: 7, flexibility: 6, heatResist: 6, installEase: 9, loomCost: 2, splitOpen: true, forHighTemp: false, material: "polyethylene_convolute", bestUse: "automotive_harness_route" },
  braided_expandable: { abrasionResist: 8, flexibility: 9, heatResist: 7, installEase: 7, loomCost: 4, splitOpen: false, forHighTemp: false, material: "pet_monofilament_braid", bestUse: "custom_pc_cable_sleeve" },
  corrugated_solid_tube: { abrasionResist: 9, flexibility: 4, heatResist: 7, installEase: 5, loomCost: 3, splitOpen: false, forHighTemp: false, material: "nylon_corrugated_wall", bestUse: "underground_conduit_run" },
  spiral_wrap_band: { abrasionResist: 5, flexibility: 8, heatResist: 5, installEase: 10, loomCost: 2, splitOpen: true, forHighTemp: false, material: "polyethylene_spiral", bestUse: "desk_cable_organize" },
  woven_fabric_sleeve: { abrasionResist: 7, flexibility: 10, heatResist: 10, installEase: 6, loomCost: 6, splitOpen: false, forHighTemp: true, material: "fiberglass_woven_wrap", bestUse: "engine_bay_wire_protect" },
};

const get = (t: WireLoomType) => DATA[t];

export const abrasionResist = (t: WireLoomType) => get(t).abrasionResist;
export const flexibility = (t: WireLoomType) => get(t).flexibility;
export const heatResist = (t: WireLoomType) => get(t).heatResist;
export const installEase = (t: WireLoomType) => get(t).installEase;
export const loomCost = (t: WireLoomType) => get(t).loomCost;
export const splitOpen = (t: WireLoomType) => get(t).splitOpen;
export const forHighTemp = (t: WireLoomType) => get(t).forHighTemp;
export const material = (t: WireLoomType) => get(t).material;
export const bestUse = (t: WireLoomType) => get(t).bestUse;
export const wireLooms = (): WireLoomType[] => Object.keys(DATA) as WireLoomType[];
