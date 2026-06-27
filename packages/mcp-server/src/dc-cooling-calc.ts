export type DcCooling =
  | "air_crah_raised_floor"
  | "rear_door_heat_exchanger"
  | "direct_liquid_cold_plate"
  | "immersion_single_phase"
  | "immersion_two_phase";

const DATA: Record<DcCooling, {
  capacity: number; pue: number; density: number;
  reliability: number; coolCost: number; waterless: boolean;
  forAiRack: boolean; medium: string; bestUse: string;
}> = {
  air_crah_raised_floor: {
    capacity: 4, pue: 4, density: 3,
    reliability: 9, coolCost: 3, waterless: true,
    forAiRack: false, medium: "chilled_air_perimeter",
    bestUse: "traditional_enterprise_dc",
  },
  rear_door_heat_exchanger: {
    capacity: 6, pue: 6, density: 6,
    reliability: 8, coolCost: 5, waterless: false,
    forAiRack: false, medium: "water_loop_rear_coil",
    bestUse: "retrofit_high_density",
  },
  direct_liquid_cold_plate: {
    capacity: 8, pue: 8, density: 8,
    reliability: 7, coolCost: 7, waterless: false,
    forAiRack: true, medium: "water_glycol_cold_plate",
    bestUse: "gpu_cluster_100kw_rack",
  },
  immersion_single_phase: {
    capacity: 9, pue: 9, density: 9,
    reliability: 7, coolCost: 8, waterless: true,
    forAiRack: true, medium: "dielectric_fluid_tank",
    bestUse: "hpc_overclocked_dense",
  },
  immersion_two_phase: {
    capacity: 10, pue: 10, density: 10,
    reliability: 6, coolCost: 10, waterless: true,
    forAiRack: true, medium: "fluorocarbon_boil_condense",
    bestUse: "200kw_ai_supercompute",
  },
};

const get = (t: DcCooling) => DATA[t];

export const capacity = (t: DcCooling) => get(t).capacity;
export const pue = (t: DcCooling) => get(t).pue;
export const density = (t: DcCooling) => get(t).density;
export const reliability = (t: DcCooling) => get(t).reliability;
export const coolCost = (t: DcCooling) => get(t).coolCost;
export const waterless = (t: DcCooling) => get(t).waterless;
export const forAiRack = (t: DcCooling) => get(t).forAiRack;
export const medium = (t: DcCooling) => get(t).medium;
export const bestUse = (t: DcCooling) => get(t).bestUse;
export const dcCoolings = (): DcCooling[] => Object.keys(DATA) as DcCooling[];
