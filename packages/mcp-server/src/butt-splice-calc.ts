export type ButtSpliceType =
  | "insulated_vinyl_crimp"
  | "heat_shrink_solder"
  | "non_insulated_bare"
  | "waterproof_gel_fill"
  | "step_down_reducer";

const DATA: Record<ButtSpliceType, {
  conductivity: number; pullStrength: number; moistureSeal: number;
  installSpeed: number; spliceCost: number; insulated: boolean;
  waterproof: boolean; joinMethod: string; bestUse: string;
}> = {
  insulated_vinyl_crimp: { conductivity: 7, pullStrength: 7, moistureSeal: 4, installSpeed: 9, spliceCost: 1, insulated: true, waterproof: false, joinMethod: "barrel_crimp_indent", bestUse: "general_wire_join" },
  heat_shrink_solder: { conductivity: 9, pullStrength: 9, moistureSeal: 9, installSpeed: 4, spliceCost: 4, insulated: true, waterproof: true, joinMethod: "solder_ring_shrink", bestUse: "marine_wire_splice" },
  non_insulated_bare: { conductivity: 8, pullStrength: 6, moistureSeal: 1, installSpeed: 8, spliceCost: 1, insulated: false, waterproof: false, joinMethod: "bare_barrel_crimp", bestUse: "custom_insulate_wrap" },
  waterproof_gel_fill: { conductivity: 7, pullStrength: 7, moistureSeal: 10, installSpeed: 7, spliceCost: 5, insulated: true, waterproof: true, joinMethod: "crimp_gel_encapsulate", bestUse: "underground_splice" },
  step_down_reducer: { conductivity: 6, pullStrength: 6, moistureSeal: 4, installSpeed: 8, spliceCost: 2, insulated: true, waterproof: false, joinMethod: "tapered_barrel_crimp", bestUse: "mixed_gauge_connect" },
};

const get = (t: ButtSpliceType) => DATA[t];

export const conductivity = (t: ButtSpliceType) => get(t).conductivity;
export const pullStrength = (t: ButtSpliceType) => get(t).pullStrength;
export const moistureSeal = (t: ButtSpliceType) => get(t).moistureSeal;
export const installSpeed = (t: ButtSpliceType) => get(t).installSpeed;
export const spliceCost = (t: ButtSpliceType) => get(t).spliceCost;
export const insulated = (t: ButtSpliceType) => get(t).insulated;
export const waterproof = (t: ButtSpliceType) => get(t).waterproof;
export const joinMethod = (t: ButtSpliceType) => get(t).joinMethod;
export const bestUse = (t: ButtSpliceType) => get(t).bestUse;
export const buttSplices = (): ButtSpliceType[] => Object.keys(DATA) as ButtSpliceType[];
