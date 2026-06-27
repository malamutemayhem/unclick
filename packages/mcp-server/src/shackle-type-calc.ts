export type ShackleType =
  | "anchor_bow_omega"
  | "chain_dee_straight"
  | "wide_body_bolt_type"
  | "screw_pin_quick_connect"
  | "synthetic_sling_round_pin";

interface ShackleData {
  wll: number;
  sideLoad: number;
  ease: number;
  durability: number;
  skCost: number;
  quickRelease: boolean;
  forRigging: boolean;
  pin: string;
  bestUse: string;
}

const DATA: Record<ShackleType, ShackleData> = {
  anchor_bow_omega: {
    wll: 8, sideLoad: 8, ease: 7, durability: 9, skCost: 5,
    quickRelease: false, forRigging: true,
    pin: "bolt_nut_cotter_secure_anchor",
    bestUse: "multi_sling_wide_angle_rigging",
  },
  chain_dee_straight: {
    wll: 8, sideLoad: 4, ease: 7, durability: 9, skCost: 4,
    quickRelease: false, forRigging: true,
    pin: "bolt_nut_cotter_straight_dee",
    bestUse: "inline_pull_single_chain_connect",
  },
  wide_body_bolt_type: {
    wll: 10, sideLoad: 9, ease: 5, durability: 10, skCost: 8,
    quickRelease: false, forRigging: true,
    pin: "oversize_bolt_nut_safety_pin",
    bestUse: "heavy_lift_offshore_crane_block",
  },
  screw_pin_quick_connect: {
    wll: 6, sideLoad: 6, ease: 10, durability: 7, skCost: 3,
    quickRelease: true, forRigging: false,
    pin: "threaded_screw_pin_hand_tight",
    bestUse: "light_duty_temporary_quick_swap",
  },
  synthetic_sling_round_pin: {
    wll: 7, sideLoad: 7, ease: 8, durability: 8, skCost: 5,
    quickRelease: false, forRigging: true,
    pin: "smooth_round_pin_large_radius",
    bestUse: "synthetic_sling_protect_no_edge",
  },
};

function get(t: ShackleType): ShackleData {
  return DATA[t];
}

export const wll = (t: ShackleType) => get(t).wll;
export const sideLoad = (t: ShackleType) => get(t).sideLoad;
export const ease = (t: ShackleType) => get(t).ease;
export const durability = (t: ShackleType) => get(t).durability;
export const skCost = (t: ShackleType) => get(t).skCost;
export const quickRelease = (t: ShackleType) => get(t).quickRelease;
export const forRigging = (t: ShackleType) => get(t).forRigging;
export const pin = (t: ShackleType) => get(t).pin;
export const bestUse = (t: ShackleType) => get(t).bestUse;
export const shackleTypes = (): ShackleType[] =>
  Object.keys(DATA) as ShackleType[];
