export type BikeLockType = "u_lock_hardened" | "chain_heavy" | "folding_link" | "cable_coil" | "smart_alarm";

export function securityLevel(t: BikeLockType): number {
  const m: Record<BikeLockType, number> = {
    u_lock_hardened: 10, chain_heavy: 9, folding_link: 7, cable_coil: 3, smart_alarm: 6,
  };
  return m[t];
}

export function lockWeight(t: BikeLockType): number {
  const m: Record<BikeLockType, number> = {
    u_lock_hardened: 4, chain_heavy: 2, folding_link: 6, cable_coil: 9, smart_alarm: 7,
  };
  return m[t];
}

export function flexibility(t: BikeLockType): number {
  const m: Record<BikeLockType, number> = {
    u_lock_hardened: 3, chain_heavy: 8, folding_link: 7, cable_coil: 10, smart_alarm: 5,
  };
  return m[t];
}

export function lockEase(t: BikeLockType): number {
  const m: Record<BikeLockType, number> = {
    u_lock_hardened: 7, chain_heavy: 5, folding_link: 8, cable_coil: 10, smart_alarm: 9,
  };
  return m[t];
}

export function lockCost(t: BikeLockType): number {
  const m: Record<BikeLockType, number> = {
    u_lock_hardened: 6, chain_heavy: 7, folding_link: 8, cable_coil: 2, smart_alarm: 9,
  };
  return m[t];
}

export function cutResistant(t: BikeLockType): boolean {
  const m: Record<BikeLockType, boolean> = {
    u_lock_hardened: true, chain_heavy: true, folding_link: true, cable_coil: false, smart_alarm: false,
  };
  return m[t];
}

export function hasAlarm(t: BikeLockType): boolean {
  const m: Record<BikeLockType, boolean> = {
    u_lock_hardened: false, chain_heavy: false, folding_link: false, cable_coil: false, smart_alarm: true,
  };
  return m[t];
}

export function material(t: BikeLockType): string {
  const m: Record<BikeLockType, string> = {
    u_lock_hardened: "hardened_steel_shackle", chain_heavy: "manganese_steel_links",
    folding_link: "riveted_steel_bars", cable_coil: "braided_steel_cable",
    smart_alarm: "zinc_alloy_bluetooth",
  };
  return m[t];
}

export function bestUse(t: BikeLockType): string {
  const m: Record<BikeLockType, string> = {
    u_lock_hardened: "high_theft_city_parking", chain_heavy: "fixed_object_overnight",
    folding_link: "commuter_portable_secure", cable_coil: "low_risk_quick_stop",
    smart_alarm: "gps_tracking_alert_theft",
  };
  return m[t];
}

export function bikeLocks(): BikeLockType[] {
  return ["u_lock_hardened", "chain_heavy", "folding_link", "cable_coil", "smart_alarm"];
}
