export type RollFormerType =
  | "standard_roll"
  | "pre_punch_roll"
  | "rafted_roll"
  | "duplex_roll"
  | "flexible_roll";

interface RollFormerData {
  profileAccuracy: number;
  throughput: number;
  materialRange: number;
  toolChangeTime: number;
  rfCost: number;
  inline: boolean;
  forStructural: boolean;
  formerConfig: string;
  bestUse: string;
}

const DATA: Record<RollFormerType, RollFormerData> = {
  standard_roll: {
    profileAccuracy: 8, throughput: 9, materialRange: 7, toolChangeTime: 5, rfCost: 5,
    inline: false, forStructural: true,
    formerConfig: "standard_roll_former_progressive_station_bend_c_z_channel",
    bestUse: "steel_channel_standard_roll_former_progressive_station_bend",
  },
  pre_punch_roll: {
    profileAccuracy: 8, throughput: 8, materialRange: 7, toolChangeTime: 5, rfCost: 6,
    inline: true, forStructural: true,
    formerConfig: "pre_punch_roll_former_hole_slot_notch_before_form_stud_track",
    bestUse: "wall_stud_pre_punch_roll_former_hole_slot_notch_before_form",
  },
  rafted_roll: {
    profileAccuracy: 9, throughput: 7, materialRange: 8, toolChangeTime: 8, rfCost: 8,
    inline: false, forStructural: false,
    formerConfig: "rafted_roll_former_cassette_quick_change_multi_profile_swap",
    bestUse: "multi_profile_rafted_roll_former_cassette_quick_change_swap",
  },
  duplex_roll: {
    profileAccuracy: 9, throughput: 10, materialRange: 7, toolChangeTime: 5, rfCost: 7,
    inline: true, forStructural: true,
    formerConfig: "duplex_roll_former_dual_head_two_profile_simultaneous_high_vol",
    bestUse: "high_volume_duplex_roll_former_dual_head_two_profile_parallel",
  },
  flexible_roll: {
    profileAccuracy: 10, throughput: 6, materialRange: 10, toolChangeTime: 10, rfCost: 10,
    inline: false, forStructural: false,
    formerConfig: "flexible_roll_former_cnc_servo_adjust_variable_cross_section",
    bestUse: "auto_bumper_flexible_roll_former_cnc_servo_variable_section",
  },
};

function get(t: RollFormerType): RollFormerData {
  return DATA[t];
}

export const profileAccuracy = (t: RollFormerType) => get(t).profileAccuracy;
export const throughput = (t: RollFormerType) => get(t).throughput;
export const materialRange = (t: RollFormerType) => get(t).materialRange;
export const toolChangeTime = (t: RollFormerType) => get(t).toolChangeTime;
export const rfCost = (t: RollFormerType) => get(t).rfCost;
export const inline = (t: RollFormerType) => get(t).inline;
export const forStructural = (t: RollFormerType) => get(t).forStructural;
export const formerConfig = (t: RollFormerType) => get(t).formerConfig;
export const bestUse = (t: RollFormerType) => get(t).bestUse;
export const rollFormerTypes = (): RollFormerType[] =>
  Object.keys(DATA) as RollFormerType[];
