export type PipeFittingType =
  | "elbow_90_long_radius"
  | "tee_equal_branch_outlet"
  | "reducer_concentric_butt"
  | "coupling_full_threaded"
  | "union_three_piece_disconnect";

interface PipeFittingData {
  pressureLoss: number;
  strength: number;
  installEase: number;
  versatility: number;
  pfCost: number;
  threaded: boolean;
  forWelded: boolean;
  joint: string;
  bestUse: string;
}

const DATA: Record<PipeFittingType, PipeFittingData> = {
  elbow_90_long_radius: {
    pressureLoss: 7, strength: 9, installEase: 5, versatility: 8, pfCost: 5,
    threaded: false, forWelded: true,
    joint: "butt_weld_bevel_end",
    bestUse: "process_pipe_direction_change_smooth",
  },
  tee_equal_branch_outlet: {
    pressureLoss: 5, strength: 8, installEase: 5, versatility: 9, pfCost: 6,
    threaded: false, forWelded: true,
    joint: "butt_weld_three_way_branch",
    bestUse: "main_to_branch_line_distribution",
  },
  reducer_concentric_butt: {
    pressureLoss: 8, strength: 8, installEase: 6, versatility: 6, pfCost: 4,
    threaded: false, forWelded: true,
    joint: "butt_weld_taper_transition",
    bestUse: "pump_suction_discharge_size_change",
  },
  coupling_full_threaded: {
    pressureLoss: 9, strength: 5, installEase: 10, versatility: 5, pfCost: 2,
    threaded: true, forWelded: false,
    joint: "npt_threaded_pipe_connect",
    bestUse: "small_bore_utility_line_quick_join",
  },
  union_three_piece_disconnect: {
    pressureLoss: 8, strength: 6, installEase: 9, versatility: 7, pfCost: 5,
    threaded: true, forWelded: false,
    joint: "threaded_union_nut_seat_tail",
    bestUse: "equipment_connection_maintenance_break",
  },
};

function get(t: PipeFittingType): PipeFittingData {
  return DATA[t];
}

export const pressureLoss = (t: PipeFittingType) => get(t).pressureLoss;
export const strength = (t: PipeFittingType) => get(t).strength;
export const installEase = (t: PipeFittingType) => get(t).installEase;
export const versatility = (t: PipeFittingType) => get(t).versatility;
export const pfCost = (t: PipeFittingType) => get(t).pfCost;
export const threaded = (t: PipeFittingType) => get(t).threaded;
export const forWelded = (t: PipeFittingType) => get(t).forWelded;
export const joint = (t: PipeFittingType) => get(t).joint;
export const bestUse = (t: PipeFittingType) => get(t).bestUse;
export const pipeFittingTypes = (): PipeFittingType[] =>
  Object.keys(DATA) as PipeFittingType[];
