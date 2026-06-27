// rabbet-plane-calc - rabbet plane types for joinery

export type RabbetPlane =
  | "wooden_rabbet_classic"
  | "metal_rabbet_adjustable"
  | "shoulder_rabbet_fine"
  | "moving_fillister_fence"
  | "skewed_rabbet_cross";

const DATA: Record<RabbetPlane, {
  cutClean: number; depthControl: number; widthRange: number; durability: number;
  cost: number; hasFence: boolean; forEndGrain: boolean; bladeMount: string; bestUse: string;
}> = {
  wooden_rabbet_classic:    { cutClean: 7, depthControl: 6, widthRange: 5, durability: 7, cost: 4, hasFence: false, forEndGrain: false, bladeMount: "wedge_held_iron", bestUse: "traditional_rabbet_cut" },
  metal_rabbet_adjustable:  { cutClean: 8, depthControl: 9, widthRange: 7, durability: 9, cost: 7, hasFence: true, forEndGrain: false, bladeMount: "lever_cap_adjust", bestUse: "precision_rabbet_joint" },
  shoulder_rabbet_fine:     { cutClean: 10, depthControl: 8, widthRange: 4, durability: 8, cost: 8, hasFence: false, forEndGrain: true, bladeMount: "full_width_iron", bestUse: "tenon_shoulder_trim" },
  moving_fillister_fence:   { cutClean: 8, depthControl: 10, widthRange: 9, durability: 8, cost: 9, hasFence: true, forEndGrain: false, bladeMount: "nicker_depth_stop", bestUse: "consistent_width_rabbet" },
  skewed_rabbet_cross:      { cutClean: 9, depthControl: 7, widthRange: 6, durability: 7, cost: 6, hasFence: false, forEndGrain: true, bladeMount: "skewed_angle_iron", bestUse: "cross_grain_rabbet" },
};

const get = (p: RabbetPlane) => DATA[p];
export const cutClean = (p: RabbetPlane) => get(p).cutClean;
export const depthControl = (p: RabbetPlane) => get(p).depthControl;
export const widthRange = (p: RabbetPlane) => get(p).widthRange;
export const durability = (p: RabbetPlane) => get(p).durability;
export const planeCost = (p: RabbetPlane) => get(p).cost;
export const hasFence = (p: RabbetPlane) => get(p).hasFence;
export const forEndGrain = (p: RabbetPlane) => get(p).forEndGrain;
export const bladeMount = (p: RabbetPlane) => get(p).bladeMount;
export const bestUse = (p: RabbetPlane) => get(p).bestUse;
export const rabbetPlanes = (): RabbetPlane[] => Object.keys(DATA) as RabbetPlane[];
