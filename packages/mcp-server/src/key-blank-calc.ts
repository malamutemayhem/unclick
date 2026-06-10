export type KeyBlank = "standard" | "restricted" | "dimple" | "tubular" | "skeleton";

export function duplicationDifficulty(k: KeyBlank): number {
  const m: Record<KeyBlank, number> = {
    standard: 2, restricted: 9, dimple: 7, tubular: 6, skeleton: 3,
  };
  return m[k];
}

export function securityRating(k: KeyBlank): number {
  const m: Record<KeyBlank, number> = {
    standard: 4, restricted: 10, dimple: 8, tubular: 5, skeleton: 2,
  };
  return m[k];
}

export function availabilityScore(k: KeyBlank): number {
  const m: Record<KeyBlank, number> = {
    standard: 10, restricted: 2, dimple: 5, tubular: 7, skeleton: 6,
  };
  return m[k];
}

export function precisionRequired(k: KeyBlank): number {
  const m: Record<KeyBlank, number> = {
    standard: 4, restricted: 9, dimple: 8, tubular: 6, skeleton: 3,
  };
  return m[k];
}

export function costPerKey(k: KeyBlank): number {
  const m: Record<KeyBlank, number> = {
    standard: 2, restricted: 9, dimple: 6, tubular: 4, skeleton: 3,
  };
  return m[k];
}

export function patentProtected(k: KeyBlank): boolean {
  const m: Record<KeyBlank, boolean> = {
    standard: false, restricted: true, dimple: false, tubular: false, skeleton: false,
  };
  return m[k];
}

export function cuttableBySelf(k: KeyBlank): boolean {
  const m: Record<KeyBlank, boolean> = {
    standard: true, restricted: false, dimple: false, tubular: false, skeleton: true,
  };
  return m[k];
}

export function typicalLockType(k: KeyBlank): string {
  const m: Record<KeyBlank, string> = {
    standard: "pin_tumbler_residential", restricted: "high_security_commercial",
    dimple: "european_high_security", tubular: "vending_bike_locks",
    skeleton: "antique_warded_locks",
  };
  return m[k];
}

export function bittingStyle(k: KeyBlank): string {
  const m: Record<KeyBlank, string> = {
    standard: "edge_cut", restricted: "sidebar_edge_cut",
    dimple: "surface_dimples", tubular: "circular_cuts",
    skeleton: "notch_profile",
  };
  return m[k];
}

export function keyBlanks(): KeyBlank[] {
  return ["standard", "restricted", "dimple", "tubular", "skeleton"];
}
