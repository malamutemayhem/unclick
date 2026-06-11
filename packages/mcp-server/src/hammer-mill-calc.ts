export type HammerMillType =
  | "gravity_discharge_grain"
  | "pneumatic_discharge_fine"
  | "reversible_hard_rock"
  | "ring_hammer_coal"
  | "turbo_mill_classifier";

interface HammerMillData {
  reductionRatio: number;
  throughput: number;
  versatility: number;
  wearRate: number;
  hmCost: number;
  classifier: boolean;
  forBiomass: boolean;
  rotor: string;
  bestUse: string;
}

const DATA: Record<HammerMillType, HammerMillData> = {
  gravity_discharge_grain: {
    reductionRatio: 7, throughput: 9, versatility: 7, wearRate: 7, hmCost: 4,
    classifier: false, forBiomass: true,
    rotor: "swing_hammer_gravity_screen_grate",
    bestUse: "feed_grain_corn_biomass_pellet",
  },
  pneumatic_discharge_fine: {
    reductionRatio: 9, throughput: 7, versatility: 8, wearRate: 6, hmCost: 6,
    classifier: false, forBiomass: false,
    rotor: "pin_hammer_pneumatic_airlock",
    bestUse: "spice_chemical_sugar_fine_grind",
  },
  reversible_hard_rock: {
    reductionRatio: 6, throughput: 8, versatility: 6, wearRate: 5, hmCost: 7,
    classifier: false, forBiomass: false,
    rotor: "reversible_heavy_hammer_dual_rotor",
    bestUse: "limestone_gypsum_soft_rock_crush",
  },
  ring_hammer_coal: {
    reductionRatio: 8, throughput: 9, versatility: 5, wearRate: 6, hmCost: 5,
    classifier: false, forBiomass: false,
    rotor: "ring_hammer_screen_bar_coal",
    bestUse: "coal_crush_power_plant_size_reduce",
  },
  turbo_mill_classifier: {
    reductionRatio: 10, throughput: 6, versatility: 9, wearRate: 7, hmCost: 9,
    classifier: true, forBiomass: false,
    rotor: "turbo_pin_disc_built_in_classifier",
    bestUse: "pigment_toner_pharma_ultra_fine",
  },
};

function get(t: HammerMillType): HammerMillData {
  return DATA[t];
}

export const reductionRatio = (t: HammerMillType) => get(t).reductionRatio;
export const throughput = (t: HammerMillType) => get(t).throughput;
export const versatility = (t: HammerMillType) => get(t).versatility;
export const wearRate = (t: HammerMillType) => get(t).wearRate;
export const hmCost = (t: HammerMillType) => get(t).hmCost;
export const classifier = (t: HammerMillType) => get(t).classifier;
export const forBiomass = (t: HammerMillType) => get(t).forBiomass;
export const rotor = (t: HammerMillType) => get(t).rotor;
export const bestUse = (t: HammerMillType) => get(t).bestUse;
export const hammerMillTypes = (): HammerMillType[] =>
  Object.keys(DATA) as HammerMillType[];
