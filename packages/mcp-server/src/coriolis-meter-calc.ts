export type CoriolisMeterType =
  | "u_tube_bent_dual"
  | "straight_tube_single"
  | "micro_motion_elite"
  | "high_pressure_flanged"
  | "hygienic_tri_clamp";

interface CoriolisMeterData {
  accuracy: number;
  turndown: number;
  pressure: number;
  density: number;
  cmCost: number;
  massFlow: boolean;
  forCustody: boolean;
  tube: string;
  bestUse: string;
}

const DATA: Record<CoriolisMeterType, CoriolisMeterData> = {
  u_tube_bent_dual: {
    accuracy: 10, turndown: 9, pressure: 8, density: 10, cmCost: 8,
    massFlow: true, forCustody: true,
    tube: "dual_bent_u_tube_vibrating",
    bestUse: "custody_transfer_liquid_hydrocarbon",
  },
  straight_tube_single: {
    accuracy: 8, turndown: 8, pressure: 9, density: 8, cmCost: 7,
    massFlow: true, forCustody: false,
    tube: "single_straight_tube_balanced",
    bestUse: "process_slurry_entrained_gas",
  },
  micro_motion_elite: {
    accuracy: 10, turndown: 10, pressure: 8, density: 10, cmCost: 9,
    massFlow: true, forCustody: true,
    tube: "omega_shaped_dual_parallel",
    bestUse: "batching_blending_precision",
  },
  high_pressure_flanged: {
    accuracy: 9, turndown: 8, pressure: 10, density: 9, cmCost: 9,
    massFlow: true, forCustody: true,
    tube: "thick_wall_ansi_600_900",
    bestUse: "high_pressure_gas_supercritical",
  },
  hygienic_tri_clamp: {
    accuracy: 9, turndown: 9, pressure: 6, density: 9, cmCost: 8,
    massFlow: true, forCustody: false,
    tube: "electropolished_3a_sanitary",
    bestUse: "food_pharma_clean_in_place",
  },
};

function get(t: CoriolisMeterType): CoriolisMeterData {
  return DATA[t];
}

export const accuracy = (t: CoriolisMeterType) => get(t).accuracy;
export const turndown = (t: CoriolisMeterType) => get(t).turndown;
export const pressure = (t: CoriolisMeterType) => get(t).pressure;
export const density = (t: CoriolisMeterType) => get(t).density;
export const cmCost = (t: CoriolisMeterType) => get(t).cmCost;
export const massFlow = (t: CoriolisMeterType) => get(t).massFlow;
export const forCustody = (t: CoriolisMeterType) => get(t).forCustody;
export const tube = (t: CoriolisMeterType) => get(t).tube;
export const bestUse = (t: CoriolisMeterType) => get(t).bestUse;
export const coriolisMeterTypes = (): CoriolisMeterType[] =>
  Object.keys(DATA) as CoriolisMeterType[];
