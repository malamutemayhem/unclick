export type LuggageLockType = "tsa_combo_3_dial" | "tsa_key_padlock" | "cable_retractable" | "fingerprint_smart" | "zip_tie_disposable";

export function securityLevel(t: LuggageLockType): number {
  const m: Record<LuggageLockType, number> = {
    tsa_combo_3_dial: 6, tsa_key_padlock: 7, cable_retractable: 5, fingerprint_smart: 9, zip_tie_disposable: 3,
  };
  return m[t];
}

export function convenience(t: LuggageLockType): number {
  const m: Record<LuggageLockType, number> = {
    tsa_combo_3_dial: 8, tsa_key_padlock: 5, cable_retractable: 9, fingerprint_smart: 10, zip_tie_disposable: 7,
  };
  return m[t];
}

export function durability(t: LuggageLockType): number {
  const m: Record<LuggageLockType, number> = {
    tsa_combo_3_dial: 7, tsa_key_padlock: 8, cable_retractable: 5, fingerprint_smart: 6, zip_tie_disposable: 1,
  };
  return m[t];
}

export function versatility(t: LuggageLockType): number {
  const m: Record<LuggageLockType, number> = {
    tsa_combo_3_dial: 6, tsa_key_padlock: 5, cable_retractable: 10, fingerprint_smart: 7, zip_tie_disposable: 8,
  };
  return m[t];
}

export function lockCost(t: LuggageLockType): number {
  const m: Record<LuggageLockType, number> = {
    tsa_combo_3_dial: 2, tsa_key_padlock: 2, cable_retractable: 3, fingerprint_smart: 8, zip_tie_disposable: 1,
  };
  return m[t];
}

export function tsaApproved(t: LuggageLockType): boolean {
  const m: Record<LuggageLockType, boolean> = {
    tsa_combo_3_dial: true, tsa_key_padlock: true, cable_retractable: false, fingerprint_smart: true, zip_tie_disposable: false,
  };
  return m[t];
}

export function keyless(t: LuggageLockType): boolean {
  const m: Record<LuggageLockType, boolean> = {
    tsa_combo_3_dial: true, tsa_key_padlock: false, cable_retractable: true, fingerprint_smart: true, zip_tie_disposable: true,
  };
  return m[t];
}

export function lockMechanism(t: LuggageLockType): string {
  const m: Record<LuggageLockType, string> = {
    tsa_combo_3_dial: "dial_combo_shackle",
    tsa_key_padlock: "key_cylinder_shackle",
    cable_retractable: "combo_cable_loop",
    fingerprint_smart: "biometric_sensor_motor",
    zip_tie_disposable: "nylon_ratchet_snap",
  };
  return m[t];
}

export function bestTrip(t: LuggageLockType): string {
  const m: Record<LuggageLockType, string> = {
    tsa_combo_3_dial: "us_domestic_checked_bag",
    tsa_key_padlock: "shared_family_luggage",
    cable_retractable: "backpack_hostel_secure",
    fingerprint_smart: "tech_savvy_frequent",
    zip_tie_disposable: "tamper_evident_one_use",
  };
  return m[t];
}

export function luggageLocks(): LuggageLockType[] {
  return ["tsa_combo_3_dial", "tsa_key_padlock", "cable_retractable", "fingerprint_smart", "zip_tie_disposable"];
}
