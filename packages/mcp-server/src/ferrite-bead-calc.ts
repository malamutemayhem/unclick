export type FerriteBeadType =
  | "smd_chip_0603"
  | "through_hole_axial"
  | "snap_on_cable_clamp"
  | "toroid_core_wound"
  | "flat_cable_clip";

const DATA: Record<FerriteBeadType, {
  impedance: number; freqRange: number; currentHandle: number;
  sizeCompact: number; beadCost: number; removable: boolean;
  forPcb: boolean; mountMethod: string; bestUse: string;
}> = {
  smd_chip_0603: { impedance: 6, freqRange: 8, currentHandle: 4, sizeCompact: 10, beadCost: 1, removable: false, forPcb: true, mountMethod: "smd_reflow_solder", bestUse: "power_line_emi_filter" },
  through_hole_axial: { impedance: 7, freqRange: 7, currentHandle: 6, sizeCompact: 5, beadCost: 2, removable: false, forPcb: true, mountMethod: "through_hole_solder", bestUse: "prototype_emi_suppress" },
  snap_on_cable_clamp: { impedance: 8, freqRange: 6, currentHandle: 9, sizeCompact: 2, beadCost: 4, removable: true, forPcb: false, mountMethod: "snap_clamp_cable", bestUse: "usb_cable_noise_fix" },
  toroid_core_wound: { impedance: 10, freqRange: 5, currentHandle: 10, sizeCompact: 1, beadCost: 5, removable: false, forPcb: false, mountMethod: "wire_wound_core", bestUse: "high_current_choke" },
  flat_cable_clip: { impedance: 5, freqRange: 6, currentHandle: 7, sizeCompact: 4, beadCost: 3, removable: true, forPcb: false, mountMethod: "clip_flat_ribbon", bestUse: "ribbon_cable_filter" },
};

const get = (t: FerriteBeadType) => DATA[t];

export const impedance = (t: FerriteBeadType) => get(t).impedance;
export const freqRange = (t: FerriteBeadType) => get(t).freqRange;
export const currentHandle = (t: FerriteBeadType) => get(t).currentHandle;
export const sizeCompact = (t: FerriteBeadType) => get(t).sizeCompact;
export const beadCost = (t: FerriteBeadType) => get(t).beadCost;
export const removable = (t: FerriteBeadType) => get(t).removable;
export const forPcb = (t: FerriteBeadType) => get(t).forPcb;
export const mountMethod = (t: FerriteBeadType) => get(t).mountMethod;
export const bestUse = (t: FerriteBeadType) => get(t).bestUse;
export const ferriteBeads = (): FerriteBeadType[] => Object.keys(DATA) as FerriteBeadType[];
