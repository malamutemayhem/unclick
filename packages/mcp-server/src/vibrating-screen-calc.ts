export type VibratingScreenType =
  | "inclined_circular_motion"
  | "horizontal_linear_motion"
  | "high_frequency_dewatering"
  | "banana_multi_slope"
  | "flip_flow_elastic_panel";

interface VibratingScreenData {
  capacity: number;
  efficiency: number;
  moisture: number;
  durability: number;
  vsCost: number;
  selfCleaning: boolean;
  forFines: boolean;
  motion: string;
  bestUse: string;
}

const DATA: Record<VibratingScreenType, VibratingScreenData> = {
  inclined_circular_motion: {
    capacity: 8, efficiency: 7, moisture: 6, durability: 8, vsCost: 5,
    selfCleaning: false, forFines: false,
    motion: "circular_throw_single_shaft",
    bestUse: "aggregate_quarry_primary_screen",
  },
  horizontal_linear_motion: {
    capacity: 9, efficiency: 8, moisture: 7, durability: 8, vsCost: 6,
    selfCleaning: false, forFines: false,
    motion: "linear_dual_shaft_counter_rotate",
    bestUse: "mining_coal_classification",
  },
  high_frequency_dewatering: {
    capacity: 6, efficiency: 9, moisture: 10, durability: 7, vsCost: 7,
    selfCleaning: false, forFines: true,
    motion: "high_frequency_low_amplitude",
    bestUse: "fine_material_dewatering_tailings",
  },
  banana_multi_slope: {
    capacity: 10, efficiency: 8, moisture: 7, durability: 8, vsCost: 8,
    selfCleaning: true, forFines: false,
    motion: "variable_slope_declining_angle",
    bestUse: "high_capacity_iron_ore_coal",
  },
  flip_flow_elastic_panel: {
    capacity: 7, efficiency: 10, moisture: 9, durability: 9, vsCost: 9,
    selfCleaning: true, forFines: true,
    motion: "elastic_panel_acceleration_flip",
    bestUse: "sticky_clay_wet_difficult_screen",
  },
};

function get(t: VibratingScreenType): VibratingScreenData {
  return DATA[t];
}

export const capacity = (t: VibratingScreenType) => get(t).capacity;
export const efficiency = (t: VibratingScreenType) => get(t).efficiency;
export const moisture = (t: VibratingScreenType) => get(t).moisture;
export const durability = (t: VibratingScreenType) => get(t).durability;
export const vsCost = (t: VibratingScreenType) => get(t).vsCost;
export const selfCleaning = (t: VibratingScreenType) => get(t).selfCleaning;
export const forFines = (t: VibratingScreenType) => get(t).forFines;
export const motion = (t: VibratingScreenType) => get(t).motion;
export const bestUse = (t: VibratingScreenType) => get(t).bestUse;
export const vibratingScreenTypes = (): VibratingScreenType[] =>
  Object.keys(DATA) as VibratingScreenType[];
