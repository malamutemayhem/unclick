export type EmcGasketType =
  | "beryllium_copper_finger"
  | "conductive_elastomer"
  | "wire_mesh_strip"
  | "fabric_over_foam"
  | "spiral_wound_metal";

const DATA: Record<EmcGasketType, {
  shieldEffect: number; compression: number; durability: number;
  envResist: number; gasketCost: number; reusable: boolean;
  forOutdoor: boolean; material: string; bestUse: string;
}> = {
  beryllium_copper_finger: { shieldEffect: 10, compression: 9, durability: 8, envResist: 6, gasketCost: 8, reusable: true, forOutdoor: false, material: "becu_spring_strip", bestUse: "high_freq_enclosure_seal" },
  conductive_elastomer: { shieldEffect: 8, compression: 10, durability: 7, envResist: 8, gasketCost: 6, reusable: false, forOutdoor: true, material: "silicone_silver_fill", bestUse: "irregular_surface_seal" },
  wire_mesh_strip: { shieldEffect: 7, compression: 7, durability: 6, envResist: 5, gasketCost: 3, reusable: true, forOutdoor: false, material: "knitted_monel_mesh", bestUse: "general_door_panel_seal" },
  fabric_over_foam: { shieldEffect: 6, compression: 8, durability: 5, envResist: 4, gasketCost: 2, reusable: false, forOutdoor: false, material: "nickel_copper_fabric", bestUse: "low_cost_cover_gasket" },
  spiral_wound_metal: { shieldEffect: 9, compression: 6, durability: 10, envResist: 10, gasketCost: 9, reusable: true, forOutdoor: true, material: "stainless_graphite_wind", bestUse: "high_pressure_rf_flange" },
};

const get = (t: EmcGasketType) => DATA[t];

export const shieldEffect = (t: EmcGasketType) => get(t).shieldEffect;
export const compression = (t: EmcGasketType) => get(t).compression;
export const durability = (t: EmcGasketType) => get(t).durability;
export const envResist = (t: EmcGasketType) => get(t).envResist;
export const gasketCost = (t: EmcGasketType) => get(t).gasketCost;
export const reusable = (t: EmcGasketType) => get(t).reusable;
export const forOutdoor = (t: EmcGasketType) => get(t).forOutdoor;
export const material = (t: EmcGasketType) => get(t).material;
export const bestUse = (t: EmcGasketType) => get(t).bestUse;
export const emcGaskets = (): EmcGasketType[] => Object.keys(DATA) as EmcGasketType[];
