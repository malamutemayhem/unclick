export type CastingMethod =
  | "sand_green_mold"
  | "investment_lost_wax"
  | "die_high_pressure"
  | "centrifugal_spin_tube"
  | "continuous_strand_slab";

const DATA: Record<CastingMethod, {
  surfaceFinish: number; tolerance: number; volume: number;
  complexity: number; caCost: number; reusableMold: boolean;
  forPrototype: boolean; mold: string; bestUse: string;
}> = {
  sand_green_mold: {
    surfaceFinish: 3, tolerance: 3, volume: 8,
    complexity: 6, caCost: 1, reusableMold: false,
    forPrototype: true, mold: "green_sand_clay_bonded",
    bestUse: "engine_block_large_iron_cast",
  },
  investment_lost_wax: {
    surfaceFinish: 10, tolerance: 9, volume: 4,
    complexity: 10, caCost: 4, reusableMold: false,
    forPrototype: false, mold: "ceramic_shell_wax_pattern",
    bestUse: "turbine_blade_superalloy_complex",
  },
  die_high_pressure: {
    surfaceFinish: 8, tolerance: 8, volume: 10,
    complexity: 7, caCost: 3, reusableMold: true,
    forPrototype: false, mold: "hardened_steel_permanent_die",
    bestUse: "aluminum_housing_mass_produce",
  },
  centrifugal_spin_tube: {
    surfaceFinish: 6, tolerance: 6, volume: 6,
    complexity: 3, caCost: 2, reusableMold: true,
    forPrototype: false, mold: "rotating_metal_cylindrical",
    bestUse: "pipe_bushing_cylindrical_part",
  },
  continuous_strand_slab: {
    surfaceFinish: 5, tolerance: 5, volume: 10,
    complexity: 2, caCost: 5, reusableMold: true,
    forPrototype: false, mold: "water_cooled_copper_mold",
    bestUse: "steel_slab_billet_mill_feed",
  },
};

const get = (t: CastingMethod) => DATA[t];

export const surfaceFinish = (t: CastingMethod) => get(t).surfaceFinish;
export const tolerance = (t: CastingMethod) => get(t).tolerance;
export const volume = (t: CastingMethod) => get(t).volume;
export const complexity = (t: CastingMethod) => get(t).complexity;
export const caCost = (t: CastingMethod) => get(t).caCost;
export const reusableMold = (t: CastingMethod) => get(t).reusableMold;
export const forPrototype = (t: CastingMethod) => get(t).forPrototype;
export const mold = (t: CastingMethod) => get(t).mold;
export const bestUse = (t: CastingMethod) => get(t).bestUse;
export const castingMethods = (): CastingMethod[] => Object.keys(DATA) as CastingMethod[];
