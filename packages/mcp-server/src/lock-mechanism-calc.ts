export type LockMechanism = "pin_tumbler" | "wafer" | "disc_detainer" | "lever" | "magnetic";

export function pickResistance(l: LockMechanism): number {
  const m: Record<LockMechanism, number> = {
    pin_tumbler: 5, wafer: 3, disc_detainer: 8, lever: 6, magnetic: 9,
  };
  return m[l];
}

export function bumpResistance(l: LockMechanism): number {
  const m: Record<LockMechanism, number> = {
    pin_tumbler: 4, wafer: 3, disc_detainer: 9, lever: 7, magnetic: 10,
  };
  return m[l];
}

export function durabilityRating(l: LockMechanism): number {
  const m: Record<LockMechanism, number> = {
    pin_tumbler: 7, wafer: 5, disc_detainer: 9, lever: 8, magnetic: 6,
  };
  return m[l];
}

export function costFactor(l: LockMechanism): number {
  const m: Record<LockMechanism, number> = {
    pin_tumbler: 4, wafer: 2, disc_detainer: 8, lever: 6, magnetic: 9,
  };
  return m[l];
}

export function keyComplexity(l: LockMechanism): number {
  const m: Record<LockMechanism, number> = {
    pin_tumbler: 5, wafer: 3, disc_detainer: 8, lever: 6, magnetic: 9,
  };
  return m[l];
}

export function rekeyable(l: LockMechanism): boolean {
  const m: Record<LockMechanism, boolean> = {
    pin_tumbler: true, wafer: false, disc_detainer: false, lever: true, magnetic: false,
  };
  return m[l];
}

export function masterKeyCapable(l: LockMechanism): boolean {
  const m: Record<LockMechanism, boolean> = {
    pin_tumbler: true, wafer: true, disc_detainer: false, lever: true, magnetic: false,
  };
  return m[l];
}

export function commonApplication(l: LockMechanism): string {
  const m: Record<LockMechanism, string> = {
    pin_tumbler: "residential_commercial", wafer: "cabinets_automotive",
    disc_detainer: "high_security_padlocks", lever: "safes_mortise_locks",
    magnetic: "hotel_restricted_access",
  };
  return m[l];
}

export function originCountry(l: LockMechanism): string {
  const m: Record<LockMechanism, string> = {
    pin_tumbler: "egypt_ancient", wafer: "united_states",
    disc_detainer: "finland", lever: "england",
    magnetic: "japan",
  };
  return m[l];
}

export function lockMechanisms(): LockMechanism[] {
  return ["pin_tumbler", "wafer", "disc_detainer", "lever", "magnetic"];
}
