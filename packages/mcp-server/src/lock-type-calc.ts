export type LockTypeType =
  | "mortise_lock_body_lever"
  | "cylindrical_lock_knob_lever"
  | "deadbolt_single_cylinder"
  | "electric_strike_fail_secure"
  | "magnetic_lock_electromagnetic";

interface LockTypeData {
  security: number;
  durability: number;
  ease: number;
  rekeying: number;
  ltCost: number;
  electric: boolean;
  forHighSecurity: boolean;
  keyway: string;
  bestUse: string;
}

const DATA: Record<LockTypeType, LockTypeData> = {
  mortise_lock_body_lever: {
    security: 9, durability: 10, ease: 6, rekeying: 7, ltCost: 9,
    electric: false, forHighSecurity: true,
    keyway: "best_sfic_small_format_core",
    bestUse: "commercial_office_entry_high_traffic",
  },
  cylindrical_lock_knob_lever: {
    security: 6, durability: 7, ease: 8, rekeying: 8, ltCost: 4,
    electric: false, forHighSecurity: false,
    keyway: "schlage_c_keyway_standard",
    bestUse: "residential_interior_classroom_door",
  },
  deadbolt_single_cylinder: {
    security: 8, durability: 8, ease: 7, rekeying: 9, ltCost: 3,
    electric: false, forHighSecurity: true,
    keyway: "kwikset_smartkey_rekeyable",
    bestUse: "residential_exterior_entry_security",
  },
  electric_strike_fail_secure: {
    security: 8, durability: 7, ease: 9, rekeying: 5, ltCost: 7,
    electric: true, forHighSecurity: true,
    keyway: "integrated_access_control_card",
    bestUse: "access_controlled_office_suite_entry",
  },
  magnetic_lock_electromagnetic: {
    security: 7, durability: 9, ease: 10, rekeying: 3, ltCost: 8,
    electric: true, forHighSecurity: false,
    keyway: "no_keyway_mag_release_button",
    bestUse: "interior_secure_area_fail_safe_fire",
  },
};

function get(t: LockTypeType): LockTypeData {
  return DATA[t];
}

export const security = (t: LockTypeType) => get(t).security;
export const durability = (t: LockTypeType) => get(t).durability;
export const ease = (t: LockTypeType) => get(t).ease;
export const rekeying = (t: LockTypeType) => get(t).rekeying;
export const ltCost = (t: LockTypeType) => get(t).ltCost;
export const electric = (t: LockTypeType) => get(t).electric;
export const forHighSecurity = (t: LockTypeType) => get(t).forHighSecurity;
export const keyway = (t: LockTypeType) => get(t).keyway;
export const bestUse = (t: LockTypeType) => get(t).bestUse;
export const lockTypeTypes = (): LockTypeType[] =>
  Object.keys(DATA) as LockTypeType[];
