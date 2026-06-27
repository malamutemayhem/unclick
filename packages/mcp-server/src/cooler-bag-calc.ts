export type CoolerBagType = "soft_sided_lunch" | "hard_shell_rotomold" | "backpack_hands_free" | "rolling_wheeled_large" | "collapsible_flat_fold";

export function iceRetention(t: CoolerBagType): number {
  const m: Record<CoolerBagType, number> = {
    soft_sided_lunch: 3, hard_shell_rotomold: 10, backpack_hands_free: 5, rolling_wheeled_large: 8, collapsible_flat_fold: 4,
  };
  return m[t];
}

export function capacity(t: CoolerBagType): number {
  const m: Record<CoolerBagType, number> = {
    soft_sided_lunch: 3, hard_shell_rotomold: 9, backpack_hands_free: 5, rolling_wheeled_large: 10, collapsible_flat_fold: 6,
  };
  return m[t];
}

export function portability(t: CoolerBagType): number {
  const m: Record<CoolerBagType, number> = {
    soft_sided_lunch: 9, hard_shell_rotomold: 2, backpack_hands_free: 10, rolling_wheeled_large: 6, collapsible_flat_fold: 8,
  };
  return m[t];
}

export function storageWhenEmpty(t: CoolerBagType): number {
  const m: Record<CoolerBagType, number> = {
    soft_sided_lunch: 7, hard_shell_rotomold: 1, backpack_hands_free: 5, rolling_wheeled_large: 2, collapsible_flat_fold: 10,
  };
  return m[t];
}

export function coolerCost(t: CoolerBagType): number {
  const m: Record<CoolerBagType, number> = {
    soft_sided_lunch: 2, hard_shell_rotomold: 9, backpack_hands_free: 5, rolling_wheeled_large: 7, collapsible_flat_fold: 3,
  };
  return m[t];
}

export function leakProof(t: CoolerBagType): boolean {
  const m: Record<CoolerBagType, boolean> = {
    soft_sided_lunch: false, hard_shell_rotomold: true, backpack_hands_free: false, rolling_wheeled_large: true, collapsible_flat_fold: false,
  };
  return m[t];
}

export function hasWheels(t: CoolerBagType): boolean {
  const m: Record<CoolerBagType, boolean> = {
    soft_sided_lunch: false, hard_shell_rotomold: false, backpack_hands_free: false, rolling_wheeled_large: true, collapsible_flat_fold: false,
  };
  return m[t];
}

export function insulationType(t: CoolerBagType): string {
  const m: Record<CoolerBagType, string> = {
    soft_sided_lunch: "foam_liner_peva",
    hard_shell_rotomold: "polyurethane_injection_thick",
    backpack_hands_free: "closed_cell_foam_nylon",
    rolling_wheeled_large: "pu_foam_hard_shell",
    collapsible_flat_fold: "thin_foil_liner_fold",
  };
  return m[t];
}

export function bestOuting(t: CoolerBagType): string {
  const m: Record<CoolerBagType, string> = {
    soft_sided_lunch: "office_lunch_school",
    hard_shell_rotomold: "multi_day_camping_trip",
    backpack_hands_free: "hiking_beach_walk",
    rolling_wheeled_large: "tailgate_party_event",
    collapsible_flat_fold: "grocery_store_run",
  };
  return m[t];
}

export function coolerBags(): CoolerBagType[] {
  return ["soft_sided_lunch", "hard_shell_rotomold", "backpack_hands_free", "rolling_wheeled_large", "collapsible_flat_fold"];
}
