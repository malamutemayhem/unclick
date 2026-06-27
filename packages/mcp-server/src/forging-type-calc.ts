export type ForgingType =
  | "open_die_flat_anvil"
  | "closed_die_impression"
  | "rolled_ring_seamless"
  | "upset_heading_bolt"
  | "isothermal_superalloy";

const DATA: Record<ForgingType, {
  strength: number; surfaceFinish: number; materialUtil: number;
  complexity: number; fgCost: number; nearNetShape: boolean;
  forAerospace: boolean; temperature: string; bestUse: string;
}> = {
  open_die_flat_anvil: {
    strength: 8, surfaceFinish: 3, materialUtil: 4,
    complexity: 3, fgCost: 2, nearNetShape: false,
    forAerospace: false, temperature: "hot_above_recrystallize",
    bestUse: "large_shaft_rough_shape_forge",
  },
  closed_die_impression: {
    strength: 9, surfaceFinish: 7, materialUtil: 7,
    complexity: 8, fgCost: 3, nearNetShape: true,
    forAerospace: true, temperature: "hot_or_warm_controlled",
    bestUse: "crankshaft_connecting_rod_auto",
  },
  rolled_ring_seamless: {
    strength: 10, surfaceFinish: 6, materialUtil: 9,
    complexity: 4, fgCost: 3, nearNetShape: true,
    forAerospace: true, temperature: "hot_ring_rolling_radial",
    bestUse: "jet_engine_turbine_ring_case",
  },
  upset_heading_bolt: {
    strength: 7, surfaceFinish: 8, materialUtil: 10,
    complexity: 5, fgCost: 1, nearNetShape: true,
    forAerospace: false, temperature: "cold_room_temp_strain",
    bestUse: "fastener_bolt_high_volume",
  },
  isothermal_superalloy: {
    strength: 10, surfaceFinish: 9, materialUtil: 8,
    complexity: 10, fgCost: 5, nearNetShape: true,
    forAerospace: true, temperature: "isothermal_heated_die_slow",
    bestUse: "nickel_superalloy_disk_blade",
  },
};

const get = (t: ForgingType) => DATA[t];

export const strength = (t: ForgingType) => get(t).strength;
export const surfaceFinish = (t: ForgingType) => get(t).surfaceFinish;
export const materialUtil = (t: ForgingType) => get(t).materialUtil;
export const complexity = (t: ForgingType) => get(t).complexity;
export const fgCost = (t: ForgingType) => get(t).fgCost;
export const nearNetShape = (t: ForgingType) => get(t).nearNetShape;
export const forAerospace = (t: ForgingType) => get(t).forAerospace;
export const temperature = (t: ForgingType) => get(t).temperature;
export const bestUse = (t: ForgingType) => get(t).bestUse;
export const forgingTypes = (): ForgingType[] => Object.keys(DATA) as ForgingType[];
