export type WalkInCoolerType =
  | "standard_box_cooler"
  | "standard_box_freezer"
  | "combo_cooler_freezer"
  | "outdoor_remote_condenser"
  | "blast_chiller_rapid";

interface WalkInCoolerData {
  capacity: number;
  efficiency: number;
  tempRange: number;
  insulation: number;
  wcCost: number;
  subZero: boolean;
  forRestaurant: boolean;
  refrigerant: string;
  bestUse: string;
}

const DATA: Record<WalkInCoolerType, WalkInCoolerData> = {
  standard_box_cooler: {
    capacity: 6, efficiency: 7, tempRange: 4, insulation: 6, wcCost: 4,
    subZero: false, forRestaurant: true,
    refrigerant: "r448a_self_contained_top_mount",
    bestUse: "restaurant_produce_dairy_store",
  },
  standard_box_freezer: {
    capacity: 6, efficiency: 6, tempRange: 8, insulation: 8, wcCost: 6,
    subZero: true, forRestaurant: true,
    refrigerant: "r448a_self_contained_low_temp",
    bestUse: "restaurant_frozen_food_storage",
  },
  combo_cooler_freezer: {
    capacity: 8, efficiency: 6, tempRange: 8, insulation: 8, wcCost: 7,
    subZero: true, forRestaurant: true,
    refrigerant: "dual_system_shared_compressor",
    bestUse: "catering_dual_temp_flexibility",
  },
  outdoor_remote_condenser: {
    capacity: 9, efficiency: 9, tempRange: 7, insulation: 9, wcCost: 8,
    subZero: false, forRestaurant: false,
    refrigerant: "remote_condenser_low_charge",
    bestUse: "supermarket_distribution_large",
  },
  blast_chiller_rapid: {
    capacity: 5, efficiency: 5, tempRange: 10, insulation: 9, wcCost: 9,
    subZero: true, forRestaurant: true,
    refrigerant: "high_capacity_rapid_pull_down",
    bestUse: "haccp_compliance_rapid_chill",
  },
};

function get(t: WalkInCoolerType): WalkInCoolerData {
  return DATA[t];
}

export const capacity = (t: WalkInCoolerType) => get(t).capacity;
export const efficiency = (t: WalkInCoolerType) => get(t).efficiency;
export const tempRange = (t: WalkInCoolerType) => get(t).tempRange;
export const insulation = (t: WalkInCoolerType) => get(t).insulation;
export const wcCost = (t: WalkInCoolerType) => get(t).wcCost;
export const subZero = (t: WalkInCoolerType) => get(t).subZero;
export const forRestaurant = (t: WalkInCoolerType) => get(t).forRestaurant;
export const refrigerant = (t: WalkInCoolerType) => get(t).refrigerant;
export const bestUse = (t: WalkInCoolerType) => get(t).bestUse;
export const walkInCoolerTypes = (): WalkInCoolerType[] =>
  Object.keys(DATA) as WalkInCoolerType[];
