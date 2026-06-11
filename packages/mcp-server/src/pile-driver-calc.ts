export type PileDriverType =
  | "drop_hammer_gravity_fall"
  | "diesel_hammer_combustion"
  | "hydraulic_impact_ram"
  | "vibratory_oscillator_clamp"
  | "press_in_silent_hydraulic";

interface PileDriverData {
  force: number;
  speed: number;
  noise: number;
  depth: number;
  pdCost: number;
  lowNoise: boolean;
  forSheet: boolean;
  mechanism: string;
  bestUse: string;
}

const DATA: Record<PileDriverType, PileDriverData> = {
  drop_hammer_gravity_fall: {
    force: 7, speed: 4, noise: 3, depth: 6, pdCost: 2,
    lowNoise: false, forSheet: false,
    mechanism: "weight_drop_free_fall_winch",
    bestUse: "simple_timber_small_concrete_pile",
  },
  diesel_hammer_combustion: {
    force: 9, speed: 8, noise: 2, depth: 9, pdCost: 5,
    lowNoise: false, forSheet: false,
    mechanism: "diesel_combustion_ram_rebound",
    bestUse: "large_concrete_steel_pipe_pile",
  },
  hydraulic_impact_ram: {
    force: 10, speed: 9, noise: 5, depth: 10, pdCost: 8,
    lowNoise: false, forSheet: false,
    mechanism: "hydraulic_cylinder_controlled_blow",
    bestUse: "offshore_heavy_pile_variable_energy",
  },
  vibratory_oscillator_clamp: {
    force: 6, speed: 10, noise: 6, depth: 7, pdCost: 6,
    lowNoise: false, forSheet: true,
    mechanism: "eccentric_weight_vibration_clamp",
    bestUse: "sheet_pile_h_pile_granular_soil",
  },
  press_in_silent_hydraulic: {
    force: 5, speed: 5, noise: 10, depth: 6, pdCost: 7,
    lowNoise: true, forSheet: true,
    mechanism: "hydraulic_press_reaction_pile",
    bestUse: "urban_sensitive_low_vibration",
  },
};

function get(t: PileDriverType): PileDriverData {
  return DATA[t];
}

export const force = (t: PileDriverType) => get(t).force;
export const speed = (t: PileDriverType) => get(t).speed;
export const noise = (t: PileDriverType) => get(t).noise;
export const depth = (t: PileDriverType) => get(t).depth;
export const pdCost = (t: PileDriverType) => get(t).pdCost;
export const lowNoise = (t: PileDriverType) => get(t).lowNoise;
export const forSheet = (t: PileDriverType) => get(t).forSheet;
export const mechanism = (t: PileDriverType) => get(t).mechanism;
export const bestUse = (t: PileDriverType) => get(t).bestUse;
export const pileDriverTypes = (): PileDriverType[] =>
  Object.keys(DATA) as PileDriverType[];
