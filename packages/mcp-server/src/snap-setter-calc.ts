export type SnapSetterType = "hand_plier_squeeze" | "press_stud_heavy" | "mallet_anvil_set" | "rotary_punch_combo" | "bench_mount_pro";

export function setForce(t: SnapSetterType): number {
  const m: Record<SnapSetterType, number> = {
    hand_plier_squeeze: 6, press_stud_heavy: 9, mallet_anvil_set: 7, rotary_punch_combo: 5, bench_mount_pro: 10,
  };
  return m[t];
}

export function alignment(t: SnapSetterType): number {
  const m: Record<SnapSetterType, number> = {
    hand_plier_squeeze: 8, press_stud_heavy: 9, mallet_anvil_set: 5, rotary_punch_combo: 7, bench_mount_pro: 10,
  };
  return m[t];
}

export function snapVariety(t: SnapSetterType): number {
  const m: Record<SnapSetterType, number> = {
    hand_plier_squeeze: 6, press_stud_heavy: 8, mallet_anvil_set: 5, rotary_punch_combo: 7, bench_mount_pro: 10,
  };
  return m[t];
}

export function portability(t: SnapSetterType): number {
  const m: Record<SnapSetterType, number> = {
    hand_plier_squeeze: 10, press_stud_heavy: 5, mallet_anvil_set: 8, rotary_punch_combo: 9, bench_mount_pro: 2,
  };
  return m[t];
}

export function setterCost(t: SnapSetterType): number {
  const m: Record<SnapSetterType, number> = {
    hand_plier_squeeze: 1, press_stud_heavy: 2, mallet_anvil_set: 1, rotary_punch_combo: 2, bench_mount_pro: 3,
  };
  return m[t];
}

export function dieIncluded(t: SnapSetterType): boolean {
  const m: Record<SnapSetterType, boolean> = {
    hand_plier_squeeze: true, press_stud_heavy: true, mallet_anvil_set: true, rotary_punch_combo: false, bench_mount_pro: false,
  };
  return m[t];
}

export function benchMounted(t: SnapSetterType): boolean {
  const m: Record<SnapSetterType, boolean> = {
    hand_plier_squeeze: false, press_stud_heavy: false, mallet_anvil_set: false, rotary_punch_combo: false, bench_mount_pro: true,
  };
  return m[t];
}

export function mechanism(t: SnapSetterType): string {
  const m: Record<SnapSetterType, string> = {
    hand_plier_squeeze: "spring_loaded_plier",
    press_stud_heavy: "lever_action_press",
    mallet_anvil_set: "strike_anvil_die",
    rotary_punch_combo: "rotary_turret_head",
    bench_mount_pro: "rack_pinion_press",
  };
  return m[t];
}

export function bestUse(t: SnapSetterType): string {
  const m: Record<SnapSetterType, string> = {
    hand_plier_squeeze: "quick_field_repair",
    press_stud_heavy: "heavy_canvas_snap",
    mallet_anvil_set: "basic_snap_install",
    rotary_punch_combo: "punch_and_set_combo",
    bench_mount_pro: "production_batch_set",
  };
  return m[t];
}

export function snapSetters(): SnapSetterType[] {
  return ["hand_plier_squeeze", "press_stud_heavy", "mallet_anvil_set", "rotary_punch_combo", "bench_mount_pro"];
}
