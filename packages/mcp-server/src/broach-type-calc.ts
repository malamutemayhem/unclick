export type BroachType =
  | "linear_pull_internal"
  | "linear_push_short"
  | "rotary_continuous_cut"
  | "surface_slab_external"
  | "pot_broach_hollow_shell";

interface BroachData {
  mrr: number;
  finish_: number;
  accuracy: number;
  speed: number;
  brCost: number;
  internal: boolean;
  forKeyway: boolean;
  motion: string;
  bestUse: string;
}

const DATA: Record<BroachType, BroachData> = {
  linear_pull_internal: {
    mrr: 8, finish_: 9, accuracy: 9, speed: 7, brCost: 7,
    internal: true, forKeyway: true,
    motion: "linear_pull_through_bore",
    bestUse: "keyway_spline_internal_profile",
  },
  linear_push_short: {
    mrr: 6, finish_: 7, accuracy: 7, speed: 8, brCost: 4,
    internal: true, forKeyway: true,
    motion: "linear_push_short_stroke",
    bestUse: "small_bore_bushing_keyway",
  },
  rotary_continuous_cut: {
    mrr: 9, finish_: 8, accuracy: 8, speed: 10, brCost: 9,
    internal: false, forKeyway: false,
    motion: "rotary_indexing_continuous",
    bestUse: "high_volume_gear_tooth_turbine",
  },
  surface_slab_external: {
    mrr: 7, finish_: 8, accuracy: 7, speed: 6, brCost: 6,
    internal: false, forKeyway: false,
    motion: "linear_flat_surface_pass",
    bestUse: "flat_surface_dovetail_slot",
  },
  pot_broach_hollow_shell: {
    mrr: 8, finish_: 9, accuracy: 9, speed: 7, brCost: 8,
    internal: false, forKeyway: false,
    motion: "part_pushed_through_ring",
    bestUse: "external_spline_hex_round",
  },
};

function get(t: BroachType): BroachData {
  return DATA[t];
}

export const mrr = (t: BroachType) => get(t).mrr;
export const finish_ = (t: BroachType) => get(t).finish_;
export const accuracy = (t: BroachType) => get(t).accuracy;
export const speed = (t: BroachType) => get(t).speed;
export const brCost = (t: BroachType) => get(t).brCost;
export const internal = (t: BroachType) => get(t).internal;
export const forKeyway = (t: BroachType) => get(t).forKeyway;
export const motion = (t: BroachType) => get(t).motion;
export const bestUse = (t: BroachType) => get(t).bestUse;
export const broachTypes = (): BroachType[] =>
  Object.keys(DATA) as BroachType[];
