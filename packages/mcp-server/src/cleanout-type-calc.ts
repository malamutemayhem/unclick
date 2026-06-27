export type CleanoutType =
  | "floor_access_round"
  | "wall_access_recessed"
  | "test_tee_wye_branch"
  | "two_way_directional"
  | "roof_vent_combo";

interface CleanoutData {
  accessibility: number;
  flow: number;
  durability: number;
  installEase: number;
  coCost: number;
  adjustable: boolean;
  forMainline: boolean;
  plug: string;
  bestUse: string;
}

const DATA: Record<CleanoutType, CleanoutData> = {
  floor_access_round: {
    accessibility: 8, flow: 7, durability: 8, installEase: 7, coCost: 3,
    adjustable: true, forMainline: false,
    plug: "brass_countersunk_square_head",
    bestUse: "restroom_basement_floor_access",
  },
  wall_access_recessed: {
    accessibility: 9, flow: 7, durability: 7, installEase: 6, coCost: 4,
    adjustable: false, forMainline: false,
    plug: "chrome_round_wall_plate_plug",
    bestUse: "finished_wall_hidden_access",
  },
  test_tee_wye_branch: {
    accessibility: 7, flow: 8, durability: 9, installEase: 8, coCost: 2,
    adjustable: false, forMainline: true,
    plug: "pvc_threaded_test_tee_plug",
    bestUse: "horizontal_branch_test_point",
  },
  two_way_directional: {
    accessibility: 8, flow: 9, durability: 8, installEase: 5, coCost: 5,
    adjustable: false, forMainline: true,
    plug: "dual_plug_bidirectional_body",
    bestUse: "main_sewer_line_snake_both",
  },
  roof_vent_combo: {
    accessibility: 6, flow: 6, durability: 8, installEase: 7, coCost: 4,
    adjustable: false, forMainline: false,
    plug: "cast_iron_roof_flashing_plug",
    bestUse: "vent_stack_through_roof_access",
  },
};

function get(t: CleanoutType): CleanoutData {
  return DATA[t];
}

export const accessibility = (t: CleanoutType) => get(t).accessibility;
export const flow = (t: CleanoutType) => get(t).flow;
export const durability = (t: CleanoutType) => get(t).durability;
export const installEase = (t: CleanoutType) => get(t).installEase;
export const coCost = (t: CleanoutType) => get(t).coCost;
export const adjustable = (t: CleanoutType) => get(t).adjustable;
export const forMainline = (t: CleanoutType) => get(t).forMainline;
export const plug = (t: CleanoutType) => get(t).plug;
export const bestUse = (t: CleanoutType) => get(t).bestUse;
export const cleanoutTypes = (): CleanoutType[] =>
  Object.keys(DATA) as CleanoutType[];
