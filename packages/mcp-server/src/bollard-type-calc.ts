export type BollardType =
  | "tee_head_cast_steel"
  | "kidney_double_bitt"
  | "horn_cleat_deck_mount"
  | "quick_release_hook"
  | "recessed_flush_deck";

interface BollardData {
  swl: number;
  ease: number;
  durability: number;
  lineAngle: number;
  boCost: number;
  quickRelease: boolean;
  forQuay: boolean;
  mount: string;
  bestUse: string;
}

const DATA: Record<BollardType, BollardData> = {
  tee_head_cast_steel: {
    swl: 9, ease: 7, durability: 9, lineAngle: 7, boCost: 6,
    quickRelease: false, forQuay: true,
    mount: "cast_steel_bolted_foundation",
    bestUse: "commercial_port_container_berth",
  },
  kidney_double_bitt: {
    swl: 10, ease: 6, durability: 10, lineAngle: 8, boCost: 7,
    quickRelease: false, forQuay: true,
    mount: "twin_post_heavy_base_plate",
    bestUse: "heavy_bulk_tanker_berth",
  },
  horn_cleat_deck_mount: {
    swl: 5, ease: 9, durability: 7, lineAngle: 5, boCost: 3,
    quickRelease: false, forQuay: false,
    mount: "through_bolt_deck_plate",
    bestUse: "small_craft_marina_pontoon",
  },
  quick_release_hook: {
    swl: 8, ease: 10, durability: 8, lineAngle: 9, boCost: 9,
    quickRelease: true, forQuay: true,
    mount: "hydraulic_hook_powered_release",
    bestUse: "tanker_terminal_emergency_release",
  },
  recessed_flush_deck: {
    swl: 7, ease: 6, durability: 8, lineAngle: 6, boCost: 8,
    quickRelease: false, forQuay: true,
    mount: "below_deck_retractable_head",
    bestUse: "ro_ro_terminal_flush_surface",
  },
};

function get(t: BollardType): BollardData {
  return DATA[t];
}

export const swl = (t: BollardType) => get(t).swl;
export const ease = (t: BollardType) => get(t).ease;
export const durability = (t: BollardType) => get(t).durability;
export const lineAngle = (t: BollardType) => get(t).lineAngle;
export const boCost = (t: BollardType) => get(t).boCost;
export const quickRelease = (t: BollardType) => get(t).quickRelease;
export const forQuay = (t: BollardType) => get(t).forQuay;
export const mount = (t: BollardType) => get(t).mount;
export const bestUse = (t: BollardType) => get(t).bestUse;
export const bollardTypes = (): BollardType[] =>
  Object.keys(DATA) as BollardType[];
