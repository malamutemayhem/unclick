export type ReamerType =
  | "hand_reamer_straight_flute"
  | "machine_chucking_spiral"
  | "adjustable_expansion_blade"
  | "shell_reamer_arbor_mount"
  | "carbide_tipped_precision";

interface ReamerData {
  finish_: number;
  accuracy: number;
  speed: number;
  adjustRange: number;
  rmCost: number;
  adjustable: boolean;
  forCnc: boolean;
  flute: string;
  bestUse: string;
}

const DATA: Record<ReamerType, ReamerData> = {
  hand_reamer_straight_flute: {
    finish_: 6, accuracy: 6, speed: 3, adjustRange: 1, rmCost: 2,
    adjustable: false, forCnc: false,
    flute: "straight_flute_square_shank",
    bestUse: "maintenance_repair_manual_sizing",
  },
  machine_chucking_spiral: {
    finish_: 8, accuracy: 8, speed: 8, adjustRange: 1, rmCost: 4,
    adjustable: false, forCnc: true,
    flute: "spiral_flute_straight_shank",
    bestUse: "production_through_hole_blind_hole",
  },
  adjustable_expansion_blade: {
    finish_: 7, accuracy: 7, speed: 4, adjustRange: 8, rmCost: 5,
    adjustable: true, forCnc: false,
    flute: "replaceable_blade_expanding_body",
    bestUse: "oversize_repair_custom_fit_bore",
  },
  shell_reamer_arbor_mount: {
    finish_: 8, accuracy: 8, speed: 7, adjustRange: 3, rmCost: 6,
    adjustable: false, forCnc: true,
    flute: "helical_flute_arbor_drive_slot",
    bestUse: "large_bore_finishing_production",
  },
  carbide_tipped_precision: {
    finish_: 10, accuracy: 10, speed: 9, adjustRange: 1, rmCost: 8,
    adjustable: false, forCnc: true,
    flute: "carbide_tip_ground_margin",
    bestUse: "high_tolerance_aerospace_medical",
  },
};

function get(t: ReamerType): ReamerData {
  return DATA[t];
}

export const finish_ = (t: ReamerType) => get(t).finish_;
export const accuracy = (t: ReamerType) => get(t).accuracy;
export const speed = (t: ReamerType) => get(t).speed;
export const adjustRange = (t: ReamerType) => get(t).adjustRange;
export const rmCost = (t: ReamerType) => get(t).rmCost;
export const adjustable = (t: ReamerType) => get(t).adjustable;
export const forCnc = (t: ReamerType) => get(t).forCnc;
export const flute = (t: ReamerType) => get(t).flute;
export const bestUse = (t: ReamerType) => get(t).bestUse;
export const reamerTypes = (): ReamerType[] =>
  Object.keys(DATA) as ReamerType[];
