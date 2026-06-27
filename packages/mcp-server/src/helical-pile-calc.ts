export type HelicalPileType =
  | "round_shaft_light_duty"
  | "square_shaft_heavy"
  | "combo_shaft_hybrid"
  | "grouted_shaft_high_cap"
  | "micro_pile_underpinning";

interface HelicalPileData {
  capacity: number;
  installSpeed: number;
  vibration: number;
  versatility: number;
  hpCost: number;
  tensionRated: boolean;
  forRetrofit: boolean;
  helix: string;
  bestUse: string;
}

const DATA: Record<HelicalPileType, HelicalPileData> = {
  round_shaft_light_duty: {
    capacity: 4, installSpeed: 9, vibration: 10, versatility: 6, hpCost: 3,
    tensionRated: true, forRetrofit: false,
    helix: "single_helix_8in_round_shaft",
    bestUse: "residential_deck_solar_mount",
  },
  square_shaft_heavy: {
    capacity: 8, installSpeed: 7, vibration: 9, versatility: 7, hpCost: 6,
    tensionRated: true, forRetrofit: false,
    helix: "multi_helix_1_75in_sq_shaft",
    bestUse: "commercial_foundation_new",
  },
  combo_shaft_hybrid: {
    capacity: 7, installSpeed: 7, vibration: 9, versatility: 9, hpCost: 7,
    tensionRated: true, forRetrofit: true,
    helix: "round_lead_square_ext_hybrid",
    bestUse: "mixed_soil_variable_condition",
  },
  grouted_shaft_high_cap: {
    capacity: 10, installSpeed: 5, vibration: 7, versatility: 6, hpCost: 9,
    tensionRated: false, forRetrofit: false,
    helix: "grouted_shaft_12in_high_torque",
    bestUse: "heavy_industrial_high_load",
  },
  micro_pile_underpinning: {
    capacity: 6, installSpeed: 6, vibration: 10, versatility: 10, hpCost: 8,
    tensionRated: true, forRetrofit: true,
    helix: "micro_1_5in_shaft_low_headroom",
    bestUse: "existing_foundation_underpin",
  },
};

function get(t: HelicalPileType): HelicalPileData {
  return DATA[t];
}

export const capacity = (t: HelicalPileType) => get(t).capacity;
export const installSpeed = (t: HelicalPileType) => get(t).installSpeed;
export const vibration = (t: HelicalPileType) => get(t).vibration;
export const versatility = (t: HelicalPileType) => get(t).versatility;
export const hpCost = (t: HelicalPileType) => get(t).hpCost;
export const tensionRated = (t: HelicalPileType) => get(t).tensionRated;
export const forRetrofit = (t: HelicalPileType) => get(t).forRetrofit;
export const helix = (t: HelicalPileType) => get(t).helix;
export const bestUse = (t: HelicalPileType) => get(t).bestUse;
export const helicalPileTypes = (): HelicalPileType[] =>
  Object.keys(DATA) as HelicalPileType[];
