export type LobePumpType =
  | "rotary_bi_wing"
  | "rotary_tri_lobe"
  | "circumferential_piston"
  | "sanitary_front_loaded"
  | "high_viscosity_heated";

interface LobePumpData {
  flow: number;
  pressure: number;
  gentleness: number;
  cleanability: number;
  lpCost: number;
  cip: boolean;
  forFood: boolean;
  rotor: string;
  bestUse: string;
}

const DATA: Record<LobePumpType, LobePumpData> = {
  rotary_bi_wing: {
    flow: 7, pressure: 7, gentleness: 8, cleanability: 7, lpCost: 5,
    cip: false, forFood: false,
    rotor: "two_lobe_synchronized_timing",
    bestUse: "general_process_moderate_viscosity",
  },
  rotary_tri_lobe: {
    flow: 8, pressure: 8, gentleness: 8, cleanability: 9, lpCost: 7,
    cip: true, forFood: true,
    rotor: "three_lobe_sanitary_polished",
    bestUse: "dairy_beverage_sauce_transfer",
  },
  circumferential_piston: {
    flow: 9, pressure: 9, gentleness: 7, cleanability: 8, lpCost: 8,
    cip: true, forFood: true,
    rotor: "two_piston_close_clearance",
    bestUse: "high_viscosity_paste_filling",
  },
  sanitary_front_loaded: {
    flow: 7, pressure: 7, gentleness: 9, cleanability: 10, lpCost: 8,
    cip: true, forFood: true,
    rotor: "front_pull_out_quick_service",
    bestUse: "pharma_biotech_gentle_product",
  },
  high_viscosity_heated: {
    flow: 8, pressure: 8, gentleness: 6, cleanability: 6, lpCost: 9,
    cip: false, forFood: false,
    rotor: "jacketed_heated_body_rotor",
    bestUse: "polymer_adhesive_hot_melt",
  },
};

function get(t: LobePumpType): LobePumpData {
  return DATA[t];
}

export const flow = (t: LobePumpType) => get(t).flow;
export const pressure = (t: LobePumpType) => get(t).pressure;
export const gentleness = (t: LobePumpType) => get(t).gentleness;
export const cleanability = (t: LobePumpType) => get(t).cleanability;
export const lpCost = (t: LobePumpType) => get(t).lpCost;
export const cip = (t: LobePumpType) => get(t).cip;
export const forFood = (t: LobePumpType) => get(t).forFood;
export const rotor = (t: LobePumpType) => get(t).rotor;
export const bestUse = (t: LobePumpType) => get(t).bestUse;
export const lobePumpTypes = (): LobePumpType[] =>
  Object.keys(DATA) as LobePumpType[];
