export type SafetyHarnessType =
  | "full_body_dorsal_d_ring"
  | "vest_style_high_vis"
  | "construction_tool_belt"
  | "rescue_suspension_rated"
  | "tower_climbing_front_back";

interface SafetyHarnessData {
  comfort: number;
  protection: number;
  mobility: number;
  durability: number;
  shCost: number;
  rescueRated: boolean;
  forConstruction: boolean;
  connection: string;
  bestUse: string;
}

const DATA: Record<SafetyHarnessType, SafetyHarnessData> = {
  full_body_dorsal_d_ring: {
    comfort: 7, protection: 8, mobility: 7, durability: 8, shCost: 5,
    rescueRated: false, forConstruction: true,
    connection: "dorsal_d_ring_fall_arrest_back",
    bestUse: "general_fall_arrest_roof_scaffold",
  },
  vest_style_high_vis: {
    comfort: 9, protection: 7, mobility: 8, durability: 7, shCost: 7,
    rescueRated: false, forConstruction: true,
    connection: "integrated_vest_reflective_d_ring",
    bestUse: "roadwork_high_vis_fall_protect_combo",
  },
  construction_tool_belt: {
    comfort: 6, protection: 8, mobility: 5, durability: 9, shCost: 8,
    rescueRated: false, forConstruction: true,
    connection: "waist_belt_tool_loop_side_d_ring",
    bestUse: "ironwork_steel_erection_tool_carry",
  },
  rescue_suspension_rated: {
    comfort: 5, protection: 10, mobility: 4, durability: 9, shCost: 9,
    rescueRated: true, forConstruction: false,
    connection: "front_dorsal_sternal_multi_point",
    bestUse: "confined_space_rescue_lowering_raise",
  },
  tower_climbing_front_back: {
    comfort: 6, protection: 9, mobility: 6, durability: 9, shCost: 8,
    rescueRated: true, forConstruction: false,
    connection: "chest_dorsal_side_d_ring_tower",
    bestUse: "telecom_tower_wind_turbine_climb",
  },
};

function get(t: SafetyHarnessType): SafetyHarnessData {
  return DATA[t];
}

export const comfort = (t: SafetyHarnessType) => get(t).comfort;
export const protection = (t: SafetyHarnessType) => get(t).protection;
export const mobility = (t: SafetyHarnessType) => get(t).mobility;
export const durability = (t: SafetyHarnessType) => get(t).durability;
export const shCost = (t: SafetyHarnessType) => get(t).shCost;
export const rescueRated = (t: SafetyHarnessType) => get(t).rescueRated;
export const forConstruction = (t: SafetyHarnessType) => get(t).forConstruction;
export const connection = (t: SafetyHarnessType) => get(t).connection;
export const bestUse = (t: SafetyHarnessType) => get(t).bestUse;
export const safetyHarnessTypes = (): SafetyHarnessType[] =>
  Object.keys(DATA) as SafetyHarnessType[];
