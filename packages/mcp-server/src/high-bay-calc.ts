export type HighBayType =
  | "led_round_ufo_style"
  | "led_linear_strip"
  | "led_reflector_aisle"
  | "induction_magnetic"
  | "explosion_proof_class";

interface HighBayData {
  lumens: number;
  efficiency: number;
  lifespan: number;
  heatOutput: number;
  hbCost: number;
  dimmable: boolean;
  forHazardous: boolean;
  mounting: string;
  bestUse: string;
}

const DATA: Record<HighBayType, HighBayData> = {
  led_round_ufo_style: {
    lumens: 9, efficiency: 9, lifespan: 9, heatOutput: 8, hbCost: 5,
    dimmable: true, forHazardous: false,
    mounting: "hook_chain_pendant_ceiling",
    bestUse: "warehouse_gym_general_high_bay",
  },
  led_linear_strip: {
    lumens: 8, efficiency: 9, lifespan: 9, heatOutput: 8, hbCost: 4,
    dimmable: true, forHazardous: false,
    mounting: "surface_chain_v_hook_linear",
    bestUse: "aisle_narrow_bay_continuous",
  },
  led_reflector_aisle: {
    lumens: 8, efficiency: 8, lifespan: 8, heatOutput: 7, hbCost: 6,
    dimmable: true, forHazardous: false,
    mounting: "asymmetric_reflector_directed",
    bestUse: "rack_aisle_directed_light",
  },
  induction_magnetic: {
    lumens: 7, efficiency: 7, lifespan: 10, heatOutput: 6, hbCost: 7,
    dimmable: false, forHazardous: false,
    mounting: "pendant_surface_open_fixture",
    bestUse: "hard_to_reach_long_life_need",
  },
  explosion_proof_class: {
    lumens: 7, efficiency: 7, lifespan: 8, heatOutput: 7, hbCost: 10,
    dimmable: false, forHazardous: true,
    mounting: "sealed_fixture_conduit_mount",
    bestUse: "refinery_paint_booth_class_1",
  },
};

function get(t: HighBayType): HighBayData {
  return DATA[t];
}

export const lumens = (t: HighBayType) => get(t).lumens;
export const efficiency = (t: HighBayType) => get(t).efficiency;
export const lifespan = (t: HighBayType) => get(t).lifespan;
export const heatOutput = (t: HighBayType) => get(t).heatOutput;
export const hbCost = (t: HighBayType) => get(t).hbCost;
export const dimmable = (t: HighBayType) => get(t).dimmable;
export const forHazardous = (t: HighBayType) => get(t).forHazardous;
export const mounting = (t: HighBayType) => get(t).mounting;
export const bestUse = (t: HighBayType) => get(t).bestUse;
export const highBayTypes = (): HighBayType[] =>
  Object.keys(DATA) as HighBayType[];
