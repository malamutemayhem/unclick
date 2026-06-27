export type VacuumType = "upright_corded" | "canister_bag" | "stick_cordless" | "robot_auto" | "handheld_mini";

export function suctionPower(t: VacuumType): number {
  const m: Record<VacuumType, number> = {
    upright_corded: 10, canister_bag: 9, stick_cordless: 6, robot_auto: 4, handheld_mini: 5,
  };
  return m[t];
}

export function runtimeMinutes(t: VacuumType): number {
  const m: Record<VacuumType, number> = {
    upright_corded: 10, canister_bag: 10, stick_cordless: 5, robot_auto: 7, handheld_mini: 3,
  };
  return m[t];
}

export function vacWeight(t: VacuumType): number {
  const m: Record<VacuumType, number> = {
    upright_corded: 3, canister_bag: 5, stick_cordless: 8, robot_auto: 10, handheld_mini: 10,
  };
  return m[t];
}

export function noiseLevel(t: VacuumType): number {
  const m: Record<VacuumType, number> = {
    upright_corded: 3, canister_bag: 5, stick_cordless: 7, robot_auto: 9, handheld_mini: 7,
  };
  return m[t];
}

export function vacCost(t: VacuumType): number {
  const m: Record<VacuumType, number> = {
    upright_corded: 4, canister_bag: 6, stick_cordless: 7, robot_auto: 9, handheld_mini: 3,
  };
  return m[t];
}

export function hepaFilter(t: VacuumType): boolean {
  const m: Record<VacuumType, boolean> = {
    upright_corded: true, canister_bag: true, stick_cordless: true, robot_auto: false, handheld_mini: false,
  };
  return m[t];
}

export function selfEmpty(t: VacuumType): boolean {
  const m: Record<VacuumType, boolean> = {
    upright_corded: false, canister_bag: false, stick_cordless: false, robot_auto: true, handheld_mini: false,
  };
  return m[t];
}

export function dustSystem(t: VacuumType): string {
  const m: Record<VacuumType, string> = {
    upright_corded: "bagless_cyclone_canister", canister_bag: "sealed_bag_filtration",
    stick_cordless: "compact_dustbin_cyclone", robot_auto: "auto_empty_dock_bin",
    handheld_mini: "small_cup_quick_release",
  };
  return m[t];
}

export function bestFloor(t: VacuumType): string {
  const m: Record<VacuumType, string> = {
    upright_corded: "deep_carpet_whole_house", canister_bag: "hard_floor_allergy_home",
    stick_cordless: "quick_clean_multi_surface", robot_auto: "daily_maintenance_hands_free",
    handheld_mini: "car_stairs_spot_clean",
  };
  return m[t];
}

export function vacuumTypes(): VacuumType[] {
  return ["upright_corded", "canister_bag", "stick_cordless", "robot_auto", "handheld_mini"];
}
