export type TeaRollerType =
  | "orthodox_roller"
  | "ctc_machine"
  | "rotovane"
  | "ball_breaker"
  | "hand_roll";

interface TeaRollerData {
  leafIntegrity: number;
  throughput: number;
  cellDamage: number;
  flavorComplexity: number;
  trCost: number;
  continuous: boolean;
  forOrthodox: boolean;
  rollerConfig: string;
  bestUse: string;
}

const DATA: Record<TeaRollerType, TeaRollerData> = {
  orthodox_roller: {
    leafIntegrity: 8, throughput: 6, cellDamage: 6, flavorComplexity: 9, trCost: 6,
    continuous: false, forOrthodox: true,
    rollerConfig: "orthodox_roller_circular_table_pressure_cap_twist_bruise_leaf_cell",
    bestUse: "premium_orthodox_tea_factory_roller_whole_leaf_complex_flavor_grade",
  },
  ctc_machine: {
    leafIntegrity: 2, throughput: 10, cellDamage: 10, flavorComplexity: 4, trCost: 7,
    continuous: true, forOrthodox: false,
    rollerConfig: "ctc_machine_crush_tear_curl_serrated_roller_fine_particle_strong",
    bestUse: "bulk_black_tea_ctc_machine_tea_bag_grade_strong_quick_brew_blend",
  },
  rotovane: {
    leafIntegrity: 5, throughput: 8, cellDamage: 8, flavorComplexity: 6, trCost: 5,
    continuous: true, forOrthodox: false,
    rollerConfig: "rotovane_vane_drum_pre_condition_leaf_macerate_before_ctc_stage",
    bestUse: "mid_grade_tea_rotovane_pre_condition_leaf_before_ctc_enhance_body",
  },
  ball_breaker: {
    leafIntegrity: 4, throughput: 9, cellDamage: 9, flavorComplexity: 5, trCost: 4,
    continuous: true, forOrthodox: false,
    rollerConfig: "ball_breaker_googi_secondary_rolling_further_macerate_ctc_feed",
    bestUse: "ctc_tea_line_ball_breaker_secondary_macerate_uniform_particle_feed",
  },
  hand_roll: {
    leafIntegrity: 10, throughput: 1, cellDamage: 4, flavorComplexity: 10, trCost: 2,
    continuous: false, forOrthodox: true,
    rollerConfig: "hand_roll_artisan_manual_bamboo_tray_gentle_shape_oolong_green",
    bestUse: "artisan_oolong_green_tea_hand_roll_gentle_shape_premium_single_origin",
  },
};

function get(t: TeaRollerType): TeaRollerData {
  return DATA[t];
}

export const leafIntegrity = (t: TeaRollerType) => get(t).leafIntegrity;
export const throughput = (t: TeaRollerType) => get(t).throughput;
export const cellDamage = (t: TeaRollerType) => get(t).cellDamage;
export const flavorComplexity = (t: TeaRollerType) => get(t).flavorComplexity;
export const trCost = (t: TeaRollerType) => get(t).trCost;
export const continuous = (t: TeaRollerType) => get(t).continuous;
export const forOrthodox = (t: TeaRollerType) => get(t).forOrthodox;
export const rollerConfig = (t: TeaRollerType) => get(t).rollerConfig;
export const bestUse = (t: TeaRollerType) => get(t).bestUse;
export const teaRollerTypes = (): TeaRollerType[] =>
  Object.keys(DATA) as TeaRollerType[];
