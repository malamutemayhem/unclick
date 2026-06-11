export type DuctFittingType =
  | "elbow_90_smooth_radius"
  | "tee_branch_takeoff"
  | "reducer_concentric_taper"
  | "offset_s_shaped_transition"
  | "vane_turning_square_elbow";

interface DuctFittingData {
  pressureLoss: number;
  turbulence: number;
  space: number;
  fabrication: number;
  dfCost: number;
  vaned: boolean;
  forMain: boolean;
  geometry: string;
  bestUse: string;
}

const DATA: Record<DuctFittingType, DuctFittingData> = {
  elbow_90_smooth_radius: {
    pressureLoss: 5, turbulence: 4, space: 4, fabrication: 5, dfCost: 4,
    vaned: false, forMain: true,
    geometry: "curved_radius_1_5d_smooth_turn",
    bestUse: "main_duct_direction_change_standard",
  },
  tee_branch_takeoff: {
    pressureLoss: 7, turbulence: 7, space: 6, fabrication: 6, dfCost: 5,
    vaned: false, forMain: true,
    geometry: "perpendicular_branch_main_split",
    bestUse: "branch_connection_zone_split_supply",
  },
  reducer_concentric_taper: {
    pressureLoss: 3, turbulence: 3, space: 7, fabrication: 4, dfCost: 3,
    vaned: false, forMain: true,
    geometry: "tapered_cone_gradual_size_change",
    bestUse: "duct_size_transition_velocity_adjust",
  },
  offset_s_shaped_transition: {
    pressureLoss: 6, turbulence: 6, space: 3, fabrication: 7, dfCost: 6,
    vaned: false, forMain: false,
    geometry: "double_angle_s_shape_lateral_shift",
    bestUse: "obstacle_bypass_beam_pipe_avoid",
  },
  vane_turning_square_elbow: {
    pressureLoss: 3, turbulence: 2, space: 8, fabrication: 8, dfCost: 7,
    vaned: true, forMain: true,
    geometry: "square_throat_internal_turning_vane",
    bestUse: "tight_space_square_turn_low_loss",
  },
};

function get(t: DuctFittingType): DuctFittingData {
  return DATA[t];
}

export const pressureLoss = (t: DuctFittingType) => get(t).pressureLoss;
export const turbulence = (t: DuctFittingType) => get(t).turbulence;
export const space = (t: DuctFittingType) => get(t).space;
export const fabrication = (t: DuctFittingType) => get(t).fabrication;
export const dfCost = (t: DuctFittingType) => get(t).dfCost;
export const vaned = (t: DuctFittingType) => get(t).vaned;
export const forMain = (t: DuctFittingType) => get(t).forMain;
export const geometry = (t: DuctFittingType) => get(t).geometry;
export const bestUse = (t: DuctFittingType) => get(t).bestUse;
export const ductFittingTypes = (): DuctFittingType[] =>
  Object.keys(DATA) as DuctFittingType[];
