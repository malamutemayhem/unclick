export type DecanterCentrifugeType =
  | "horizontal_scroll_std"
  | "high_speed_clarifier"
  | "two_phase_separator"
  | "three_phase_tricanter"
  | "vertical_conic_screen";

interface DecanterCentrifugeData {
  throughput: number;
  separation: number;
  dryness: number;
  versatility: number;
  dcCost: number;
  threePhase: boolean;
  forSludge: boolean;
  discharge: string;
  bestUse: string;
}

const DATA: Record<DecanterCentrifugeType, DecanterCentrifugeData> = {
  horizontal_scroll_std: {
    throughput: 9, separation: 7, dryness: 8, versatility: 8, dcCost: 6,
    threePhase: false, forSludge: true,
    discharge: "scroll_conveyor_continuous_solids_discharge",
    bestUse: "wastewater_sludge_mining_slurry_dewatering",
  },
  high_speed_clarifier: {
    throughput: 7, separation: 10, dryness: 6, versatility: 6, dcCost: 8,
    threePhase: false, forSludge: false,
    discharge: "high_g_force_clarification_fine_solids_removal",
    bestUse: "beverage_juice_wine_fine_particle_clarification",
  },
  two_phase_separator: {
    throughput: 8, separation: 8, dryness: 9, versatility: 7, dcCost: 6,
    threePhase: false, forSludge: true,
    discharge: "solid_liquid_two_phase_scroll_cake_discharge",
    bestUse: "chemical_mineral_industrial_solid_liquid_split",
  },
  three_phase_tricanter: {
    throughput: 7, separation: 9, dryness: 7, versatility: 10, dcCost: 9,
    threePhase: true, forSludge: false,
    discharge: "three_phase_solid_light_heavy_liquid_weir",
    bestUse: "olive_oil_fish_oil_palm_oil_three_phase_split",
  },
  vertical_conic_screen: {
    throughput: 8, separation: 7, dryness: 10, versatility: 5, dcCost: 7,
    threePhase: false, forSludge: false,
    discharge: "conical_screen_basket_centrifugal_filtration",
    bestUse: "sugar_crystal_salt_plastic_pellet_dewatering",
  },
};

function get(t: DecanterCentrifugeType): DecanterCentrifugeData {
  return DATA[t];
}

export const throughput = (t: DecanterCentrifugeType) => get(t).throughput;
export const separation = (t: DecanterCentrifugeType) => get(t).separation;
export const dryness = (t: DecanterCentrifugeType) => get(t).dryness;
export const versatility = (t: DecanterCentrifugeType) => get(t).versatility;
export const dcCost = (t: DecanterCentrifugeType) => get(t).dcCost;
export const threePhase = (t: DecanterCentrifugeType) => get(t).threePhase;
export const forSludge = (t: DecanterCentrifugeType) => get(t).forSludge;
export const discharge = (t: DecanterCentrifugeType) => get(t).discharge;
export const bestUse = (t: DecanterCentrifugeType) => get(t).bestUse;
export const decanterCentrifugeTypes = (): DecanterCentrifugeType[] =>
  Object.keys(DATA) as DecanterCentrifugeType[];
