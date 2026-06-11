export type DiffuserType =
  | "square_ceiling_multi_cone"
  | "round_ceiling_radial_vane"
  | "slot_linear_continuous"
  | "swirl_jet_high_induction"
  | "displacement_floor_low_vel";

interface DiffuserData {
  throw_: number;
  spread: number;
  induction: number;
  noise: number;
  dfCost: number;
  adjustable: boolean;
  forVav: boolean;
  pattern: string;
  bestUse: string;
}

const DATA: Record<DiffuserType, DiffuserData> = {
  square_ceiling_multi_cone: {
    throw_: 7, spread: 8, induction: 7, noise: 5, dfCost: 4,
    adjustable: true, forVav: true,
    pattern: "four_way_horizontal_ceiling_hug",
    bestUse: "office_classroom_standard_ceiling",
  },
  round_ceiling_radial_vane: {
    throw_: 6, spread: 9, induction: 7, noise: 5, dfCost: 4,
    adjustable: true, forVav: true,
    pattern: "radial_360_degree_ceiling_spread",
    bestUse: "open_plan_lobby_circular_coverage",
  },
  slot_linear_continuous: {
    throw_: 8, spread: 6, induction: 8, noise: 4, dfCost: 7,
    adjustable: false, forVav: true,
    pattern: "linear_coanda_ceiling_attach",
    bestUse: "perimeter_window_modern_aesthetic",
  },
  swirl_jet_high_induction: {
    throw_: 5, spread: 7, induction: 10, noise: 6, dfCost: 6,
    adjustable: false, forVav: false,
    pattern: "tangential_swirl_rapid_mix",
    bestUse: "high_ceiling_atrium_rapid_temp_mix",
  },
  displacement_floor_low_vel: {
    throw_: 3, spread: 4, induction: 3, noise: 2, dfCost: 8,
    adjustable: false, forVav: false,
    pattern: "low_velocity_upward_stratify",
    bestUse: "theater_auditorium_clean_room_quiet",
  },
};

function get(t: DiffuserType): DiffuserData {
  return DATA[t];
}

export const throw_ = (t: DiffuserType) => get(t).throw_;
export const spread = (t: DiffuserType) => get(t).spread;
export const induction = (t: DiffuserType) => get(t).induction;
export const noise = (t: DiffuserType) => get(t).noise;
export const dfCost = (t: DiffuserType) => get(t).dfCost;
export const adjustable = (t: DiffuserType) => get(t).adjustable;
export const forVav = (t: DiffuserType) => get(t).forVav;
export const pattern = (t: DiffuserType) => get(t).pattern;
export const bestUse = (t: DiffuserType) => get(t).bestUse;
export const diffuserTypes = (): DiffuserType[] =>
  Object.keys(DATA) as DiffuserType[];
