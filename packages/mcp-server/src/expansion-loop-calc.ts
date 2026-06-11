export type ExpansionLoopType =
  | "u_bend_loop_natural_flex"
  | "z_bend_offset_direction"
  | "l_bend_corner_change"
  | "bellows_expansion_joint"
  | "slip_joint_packing_gland";

interface ExpansionLoopData {
  movement: number;
  pressure: number;
  space: number;
  maintenance: number;
  elCost: number;
  guided: boolean;
  forSteam: boolean;
  method: string;
  bestUse: string;
}

const DATA: Record<ExpansionLoopType, ExpansionLoopData> = {
  u_bend_loop_natural_flex: {
    movement: 8, pressure: 9, space: 3, maintenance: 9, elCost: 5,
    guided: false, forSteam: true,
    method: "pipe_bend_natural_flexibility",
    bestUse: "long_run_steam_hot_water_outdoor",
  },
  z_bend_offset_direction: {
    movement: 6, pressure: 8, space: 5, maintenance: 9, elCost: 4,
    guided: false, forSteam: true,
    method: "offset_bend_directional_absorb",
    bestUse: "moderate_movement_direction_change",
  },
  l_bend_corner_change: {
    movement: 4, pressure: 9, space: 8, maintenance: 10, elCost: 2,
    guided: false, forSteam: true,
    method: "corner_elbow_natural_flex",
    bestUse: "small_movement_existing_corner",
  },
  bellows_expansion_joint: {
    movement: 10, pressure: 6, space: 10, maintenance: 5, elCost: 8,
    guided: true, forSteam: true,
    method: "metal_bellows_convolution_flex",
    bestUse: "space_limited_high_movement_axial",
  },
  slip_joint_packing_gland: {
    movement: 9, pressure: 7, space: 9, maintenance: 4, elCost: 6,
    guided: true, forSteam: false,
    method: "telescoping_sleeve_packing_seal",
    bestUse: "large_bore_low_pressure_duct",
  },
};

function get(t: ExpansionLoopType): ExpansionLoopData {
  return DATA[t];
}

export const movement = (t: ExpansionLoopType) => get(t).movement;
export const pressure = (t: ExpansionLoopType) => get(t).pressure;
export const space = (t: ExpansionLoopType) => get(t).space;
export const maintenance = (t: ExpansionLoopType) => get(t).maintenance;
export const elCost = (t: ExpansionLoopType) => get(t).elCost;
export const guided = (t: ExpansionLoopType) => get(t).guided;
export const forSteam = (t: ExpansionLoopType) => get(t).forSteam;
export const method = (t: ExpansionLoopType) => get(t).method;
export const bestUse = (t: ExpansionLoopType) => get(t).bestUse;
export const expansionLoopTypes = (): ExpansionLoopType[] =>
  Object.keys(DATA) as ExpansionLoopType[];
