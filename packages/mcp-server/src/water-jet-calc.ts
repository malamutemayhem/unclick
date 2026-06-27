export type WaterJetType =
  | "pure_water_high_pressure"
  | "abrasive_garnet_cutting"
  | "micro_abrasive_precision"
  | "dynamic_5_axis_bevel"
  | "robotic_surface_prep";

interface WaterJetData {
  precision: number;
  speed: number;
  thickness: number;
  heatAffect: number;
  wjCost: number;
  abrasive: boolean;
  forMetal: boolean;
  pressure: string;
  bestUse: string;
}

const DATA: Record<WaterJetType, WaterJetData> = {
  pure_water_high_pressure: {
    precision: 7, speed: 9, thickness: 3, heatAffect: 10, wjCost: 4,
    abrasive: false, forMetal: false,
    pressure: "60000_psi_intensifier_pure",
    bestUse: "foam_rubber_gasket_food_cutting",
  },
  abrasive_garnet_cutting: {
    precision: 8, speed: 7, thickness: 9, heatAffect: 10, wjCost: 7,
    abrasive: true, forMetal: true,
    pressure: "60000_87000_psi_garnet_80_mesh",
    bestUse: "steel_aluminum_stone_plate_cut",
  },
  micro_abrasive_precision: {
    precision: 10, speed: 5, thickness: 5, heatAffect: 10, wjCost: 8,
    abrasive: true, forMetal: true,
    pressure: "micro_nozzle_fine_abrasive_kerf",
    bestUse: "medical_device_electronics_fine",
  },
  dynamic_5_axis_bevel: {
    precision: 9, speed: 7, thickness: 9, heatAffect: 10, wjCost: 10,
    abrasive: true, forMetal: true,
    pressure: "87000_psi_taper_compensation",
    bestUse: "aerospace_3d_contour_titanium",
  },
  robotic_surface_prep: {
    precision: 6, speed: 8, thickness: 2, heatAffect: 10, wjCost: 6,
    abrasive: true, forMetal: false,
    pressure: "40000_psi_uhp_surface_removal",
    bestUse: "coating_removal_ship_hull_concrete",
  },
};

function get(t: WaterJetType): WaterJetData {
  return DATA[t];
}

export const precision = (t: WaterJetType) => get(t).precision;
export const speed = (t: WaterJetType) => get(t).speed;
export const thickness = (t: WaterJetType) => get(t).thickness;
export const heatAffect = (t: WaterJetType) => get(t).heatAffect;
export const wjCost = (t: WaterJetType) => get(t).wjCost;
export const abrasive = (t: WaterJetType) => get(t).abrasive;
export const forMetal = (t: WaterJetType) => get(t).forMetal;
export const pressure = (t: WaterJetType) => get(t).pressure;
export const bestUse = (t: WaterJetType) => get(t).bestUse;
export const waterJetTypes = (): WaterJetType[] =>
  Object.keys(DATA) as WaterJetType[];
