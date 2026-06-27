export type ConduitType =
  | "emt_steel_thin"
  | "pvc_schedule_40"
  | "flexible_liquid_tight"
  | "rigid_galvanized"
  | "innerduct_hdpe";

const DATA: Record<ConduitType, {
  fillCapacity: number; durability: number; flexibility: number;
  installEase: number; conduitCost: number; metalBody: boolean;
  forUnderground: boolean; material: string; bestUse: string;
}> = {
  emt_steel_thin: { fillCapacity: 7, durability: 7, flexibility: 3, installEase: 6, conduitCost: 4, metalBody: true, forUnderground: false, material: "galvanized_steel_thin", bestUse: "indoor_commercial_run" },
  pvc_schedule_40: { fillCapacity: 8, durability: 8, flexibility: 2, installEase: 7, conduitCost: 3, metalBody: false, forUnderground: true, material: "rigid_pvc_gray", bestUse: "underground_cable_path" },
  flexible_liquid_tight: { fillCapacity: 5, durability: 6, flexibility: 10, installEase: 9, conduitCost: 6, metalBody: false, forUnderground: false, material: "pvc_flex_corrugated", bestUse: "tight_bend_equipment_whip" },
  rigid_galvanized: { fillCapacity: 9, durability: 10, flexibility: 1, installEase: 3, conduitCost: 7, metalBody: true, forUnderground: false, material: "heavy_galvanized_steel", bestUse: "hazardous_location_path" },
  innerduct_hdpe: { fillCapacity: 6, durability: 7, flexibility: 7, installEase: 8, conduitCost: 3, metalBody: false, forUnderground: true, material: "hdpe_smooth_wall", bestUse: "fiber_sub_duct_pull" },
};

const get = (t: ConduitType) => DATA[t];

export const fillCapacity = (t: ConduitType) => get(t).fillCapacity;
export const durability = (t: ConduitType) => get(t).durability;
export const flexibility = (t: ConduitType) => get(t).flexibility;
export const installEase = (t: ConduitType) => get(t).installEase;
export const conduitCost = (t: ConduitType) => get(t).conduitCost;
export const metalBody = (t: ConduitType) => get(t).metalBody;
export const forUnderground = (t: ConduitType) => get(t).forUnderground;
export const material = (t: ConduitType) => get(t).material;
export const bestUse = (t: ConduitType) => get(t).bestUse;
export const conduits = (): ConduitType[] => Object.keys(DATA) as ConduitType[];
