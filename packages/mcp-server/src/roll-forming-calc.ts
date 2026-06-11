export type RollFormingType =
  | "standard_inline_profile"
  | "pre_punch_notch_inline"
  | "post_cut_flying_shear"
  | "rafted_quick_change"
  | "flexible_roll_servo";

interface RollFormingData {
  speed: number;
  precision: number;
  complexity: number;
  changeover: number;
  rfCost: number;
  servo: boolean;
  forStructural: boolean;
  tooling: string;
  bestUse: string;
}

const DATA: Record<RollFormingType, RollFormingData> = {
  standard_inline_profile: {
    speed: 10, precision: 8, complexity: 6, changeover: 4, rfCost: 5,
    servo: false, forStructural: true,
    tooling: "fixed_roller_station_hardened",
    bestUse: "c_channel_z_purlin_roof_panel",
  },
  pre_punch_notch_inline: {
    speed: 8, precision: 9, complexity: 8, changeover: 5, rfCost: 7,
    servo: false, forStructural: true,
    tooling: "pre_punch_die_inline_notch",
    bestUse: "stud_track_framing_pre_punched",
  },
  post_cut_flying_shear: {
    speed: 10, precision: 7, complexity: 5, changeover: 4, rfCost: 6,
    servo: false, forStructural: true,
    tooling: "flying_shear_rotary_cut_off",
    bestUse: "downspout_gutter_tube_continuous",
  },
  rafted_quick_change: {
    speed: 9, precision: 8, complexity: 7, changeover: 9, rfCost: 8,
    servo: false, forStructural: false,
    tooling: "cassette_raft_quick_change_set",
    bestUse: "multi_profile_short_run_switch",
  },
  flexible_roll_servo: {
    speed: 7, precision: 10, complexity: 10, changeover: 10, rfCost: 10,
    servo: true, forStructural: false,
    tooling: "servo_adjustable_flower_pattern",
    bestUse: "variable_width_auto_bumper_beam",
  },
};

function get(t: RollFormingType): RollFormingData {
  return DATA[t];
}

export const speed = (t: RollFormingType) => get(t).speed;
export const precision = (t: RollFormingType) => get(t).precision;
export const complexity = (t: RollFormingType) => get(t).complexity;
export const changeover = (t: RollFormingType) => get(t).changeover;
export const rfCost = (t: RollFormingType) => get(t).rfCost;
export const servo = (t: RollFormingType) => get(t).servo;
export const forStructural = (t: RollFormingType) => get(t).forStructural;
export const tooling = (t: RollFormingType) => get(t).tooling;
export const bestUse = (t: RollFormingType) => get(t).bestUse;
export const rollFormingTypes = (): RollFormingType[] =>
  Object.keys(DATA) as RollFormingType[];
