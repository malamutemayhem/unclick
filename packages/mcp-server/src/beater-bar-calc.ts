// Beater bar calculator - weaving weft beating tools

export type BeaterBarType =
  | "overhead_beater_pivot"
  | "bottom_swing_pendulum"
  | "hand_beater_comb"
  | "weighted_bar_heavy"
  | "tapestry_fork_fine";

const BEATER_DATA: Record<
  BeaterBarType,
  {
    beatForce: number;
    evenness: number;
    controlFeel: number;
    fabricRange: number;
    cost: number;
    freeSwing: boolean;
    forTapestry: boolean;
    swingPath: string;
    bestUse: string;
  }
> = {
  overhead_beater_pivot: {
    beatForce: 9,
    evenness: 9,
    controlFeel: 8,
    fabricRange: 8,
    cost: 7,
    freeSwing: true,
    forTapestry: false,
    swingPath: "overhead_arc_pivot",
    bestUse: "floor_loom_general",
  },
  bottom_swing_pendulum: {
    beatForce: 8,
    evenness: 8,
    controlFeel: 7,
    fabricRange: 7,
    cost: 6,
    freeSwing: true,
    forTapestry: false,
    swingPath: "bottom_pendulum_arc",
    bestUse: "counterbalance_loom",
  },
  hand_beater_comb: {
    beatForce: 5,
    evenness: 7,
    controlFeel: 9,
    fabricRange: 5,
    cost: 3,
    freeSwing: false,
    forTapestry: false,
    swingPath: "hand_held_stroke",
    bestUse: "rigid_heddle_beat",
  },
  weighted_bar_heavy: {
    beatForce: 10,
    evenness: 8,
    controlFeel: 6,
    fabricRange: 6,
    cost: 5,
    freeSwing: true,
    forTapestry: false,
    swingPath: "gravity_weight_drop",
    bestUse: "dense_rug_weave",
  },
  tapestry_fork_fine: {
    beatForce: 4,
    evenness: 9,
    controlFeel: 10,
    fabricRange: 4,
    cost: 4,
    freeSwing: false,
    forTapestry: true,
    swingPath: "hand_fork_press",
    bestUse: "tapestry_weft_pack",
  },
};

export function beatForce(type: BeaterBarType): number {
  return BEATER_DATA[type].beatForce;
}
export function evenness(type: BeaterBarType): number {
  return BEATER_DATA[type].evenness;
}
export function controlFeel(type: BeaterBarType): number {
  return BEATER_DATA[type].controlFeel;
}
export function fabricRange(type: BeaterBarType): number {
  return BEATER_DATA[type].fabricRange;
}
export function beaterCost(type: BeaterBarType): number {
  return BEATER_DATA[type].cost;
}
export function freeSwing(type: BeaterBarType): boolean {
  return BEATER_DATA[type].freeSwing;
}
export function forTapestry(type: BeaterBarType): boolean {
  return BEATER_DATA[type].forTapestry;
}
export function swingPath(type: BeaterBarType): string {
  return BEATER_DATA[type].swingPath;
}
export function bestUse(type: BeaterBarType): string {
  return BEATER_DATA[type].bestUse;
}
export function beaterBars(): BeaterBarType[] {
  return Object.keys(BEATER_DATA) as BeaterBarType[];
}
