export type BrakePadType =
  | "organic_nao_resin"
  | "semi_metallic_steel_fiber"
  | "ceramic_copper_free"
  | "sintered_metallic_race"
  | "carbon_carbon_composite";

const DATA: Record<BrakePadType, {
  friction: number; fade: number; wear: number;
  noise: number; bpCost: number; lowDust: boolean;
  forTrack: boolean; material: string; bestUse: string;
}> = {
  organic_nao_resin: {
    friction: 5, fade: 4, wear: 6,
    noise: 9, bpCost: 1, lowDust: true,
    forTrack: false, material: "kevlar_rubber_glass_fiber_resin",
    bestUse: "daily_commuter_quiet_low_dust",
  },
  semi_metallic_steel_fiber: {
    friction: 7, fade: 7, wear: 7,
    noise: 5, bpCost: 2, lowDust: false,
    forTrack: false, material: "steel_wool_copper_graphite_resin",
    bestUse: "performance_street_towing_heavy",
  },
  ceramic_copper_free: {
    friction: 6, fade: 6, wear: 8,
    noise: 8, bpCost: 3, lowDust: true,
    forTrack: false, material: "ceramic_fiber_non_ferrous_bond",
    bestUse: "premium_sedan_clean_wheel_quiet",
  },
  sintered_metallic_race: {
    friction: 9, fade: 9, wear: 5,
    noise: 3, bpCost: 4, lowDust: false,
    forTrack: true, material: "iron_bronze_sintered_powder_metal",
    bestUse: "motorsport_rally_high_temp_bite",
  },
  carbon_carbon_composite: {
    friction: 10, fade: 10, wear: 4,
    noise: 2, bpCost: 5, lowDust: false,
    forTrack: true, material: "carbon_fiber_pyrolytic_matrix",
    bestUse: "f1_aircraft_extreme_energy_brake",
  },
};

const get = (t: BrakePadType) => DATA[t];

export const friction = (t: BrakePadType) => get(t).friction;
export const fade = (t: BrakePadType) => get(t).fade;
export const wear = (t: BrakePadType) => get(t).wear;
export const noise = (t: BrakePadType) => get(t).noise;
export const bpCost = (t: BrakePadType) => get(t).bpCost;
export const lowDust = (t: BrakePadType) => get(t).lowDust;
export const forTrack = (t: BrakePadType) => get(t).forTrack;
export const material = (t: BrakePadType) => get(t).material;
export const bestUse = (t: BrakePadType) => get(t).bestUse;
export const brakePadTypes = (): BrakePadType[] => Object.keys(DATA) as BrakePadType[];
