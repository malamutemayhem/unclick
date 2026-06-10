export type GrommetPressType = "hand_plier_squeeze" | "bench_press_heavy" | "mallet_die_set" | "self_pierce_snap" | "ratchet_lever_easy";

export function setForce(t: GrommetPressType): number {
  const m: Record<GrommetPressType, number> = {
    hand_plier_squeeze: 6, bench_press_heavy: 10, mallet_die_set: 8, self_pierce_snap: 5, ratchet_lever_easy: 7,
  };
  return m[t];
}

export function alignment(t: GrommetPressType): number {
  const m: Record<GrommetPressType, number> = {
    hand_plier_squeeze: 6, bench_press_heavy: 10, mallet_die_set: 7, self_pierce_snap: 5, ratchet_lever_easy: 8,
  };
  return m[t];
}

export function sizeRange(t: GrommetPressType): number {
  const m: Record<GrommetPressType, number> = {
    hand_plier_squeeze: 5, bench_press_heavy: 10, mallet_die_set: 8, self_pierce_snap: 3, ratchet_lever_easy: 7,
  };
  return m[t];
}

export function portability(t: GrommetPressType): number {
  const m: Record<GrommetPressType, number> = {
    hand_plier_squeeze: 10, bench_press_heavy: 2, mallet_die_set: 7, self_pierce_snap: 9, ratchet_lever_easy: 6,
  };
  return m[t];
}

export function pressCost(t: GrommetPressType): number {
  const m: Record<GrommetPressType, number> = {
    hand_plier_squeeze: 1, bench_press_heavy: 3, mallet_die_set: 1, self_pierce_snap: 1, ratchet_lever_easy: 2,
  };
  return m[t];
}

export function noPunchNeeded(t: GrommetPressType): boolean {
  const m: Record<GrommetPressType, boolean> = {
    hand_plier_squeeze: false, bench_press_heavy: false, mallet_die_set: false, self_pierce_snap: true, ratchet_lever_easy: false,
  };
  return m[t];
}

export function benchMounted(t: GrommetPressType): boolean {
  const m: Record<GrommetPressType, boolean> = {
    hand_plier_squeeze: false, bench_press_heavy: true, mallet_die_set: false, self_pierce_snap: false, ratchet_lever_easy: false,
  };
  return m[t];
}

export function mechanism(t: GrommetPressType): string {
  const m: Record<GrommetPressType, string> = {
    hand_plier_squeeze: "spring_plier_squeeze",
    bench_press_heavy: "lever_arbor_press",
    mallet_die_set: "anvil_die_strike",
    self_pierce_snap: "self_piercing_jaw",
    ratchet_lever_easy: "ratchet_compound_lever",
  };
  return m[t];
}

export function bestUse(t: GrommetPressType): string {
  const m: Record<GrommetPressType, string> = {
    hand_plier_squeeze: "light_fabric_grommet",
    bench_press_heavy: "production_heavy_duty",
    mallet_die_set: "canvas_tarp_grommet",
    self_pierce_snap: "quick_no_hole_set",
    ratchet_lever_easy: "medium_duty_easy",
  };
  return m[t];
}

export function grommetPresses(): GrommetPressType[] {
  return ["hand_plier_squeeze", "bench_press_heavy", "mallet_die_set", "self_pierce_snap", "ratchet_lever_easy"];
}
