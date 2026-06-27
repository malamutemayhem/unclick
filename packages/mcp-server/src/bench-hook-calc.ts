export type BenchHookType = "standard_crosscut_stop" | "shooting_board_angle" | "bench_jack_adjustable" | "planing_stop_metal" | "doe_foot_holdfast";

export function workholding(t: BenchHookType): number {
  const m: Record<BenchHookType, number> = {
    standard_crosscut_stop: 8, shooting_board_angle: 7, bench_jack_adjustable: 9, planing_stop_metal: 10, doe_foot_holdfast: 9,
  };
  return m[t];
}

export function versatility(t: BenchHookType): number {
  const m: Record<BenchHookType, number> = {
    standard_crosscut_stop: 7, shooting_board_angle: 6, bench_jack_adjustable: 10, planing_stop_metal: 5, doe_foot_holdfast: 8,
  };
  return m[t];
}

export function setupSpeed(t: BenchHookType): number {
  const m: Record<BenchHookType, number> = {
    standard_crosscut_stop: 10, shooting_board_angle: 7, bench_jack_adjustable: 6, planing_stop_metal: 9, doe_foot_holdfast: 8,
  };
  return m[t];
}

export function accuracy(t: BenchHookType): number {
  const m: Record<BenchHookType, number> = {
    standard_crosscut_stop: 8, shooting_board_angle: 10, bench_jack_adjustable: 7, planing_stop_metal: 6, doe_foot_holdfast: 6,
  };
  return m[t];
}

export function hookCost(t: BenchHookType): number {
  const m: Record<BenchHookType, number> = {
    standard_crosscut_stop: 1, shooting_board_angle: 2, bench_jack_adjustable: 3, planing_stop_metal: 2, doe_foot_holdfast: 2,
  };
  return m[t];
}

export function diyBuild(t: BenchHookType): boolean {
  const m: Record<BenchHookType, boolean> = {
    standard_crosscut_stop: true, shooting_board_angle: true, bench_jack_adjustable: false, planing_stop_metal: false, doe_foot_holdfast: false,
  };
  return m[t];
}

export function needsBenchDog(t: BenchHookType): boolean {
  const m: Record<BenchHookType, boolean> = {
    standard_crosscut_stop: false, shooting_board_angle: false, bench_jack_adjustable: false, planing_stop_metal: true, doe_foot_holdfast: true,
  };
  return m[t];
}

export function mountStyle(t: BenchHookType): string {
  const m: Record<BenchHookType, string> = {
    standard_crosscut_stop: "hook_over_edge",
    shooting_board_angle: "fence_track_guide",
    bench_jack_adjustable: "leg_vise_clamp",
    planing_stop_metal: "dog_hole_insert",
    doe_foot_holdfast: "holdfast_dog_hole",
  };
  return m[t];
}

export function bestTask(t: BenchHookType): string {
  const m: Record<BenchHookType, string> = {
    standard_crosscut_stop: "small_crosscut_saw",
    shooting_board_angle: "end_grain_trim_square",
    bench_jack_adjustable: "long_board_support",
    planing_stop_metal: "edge_planing_hold",
    doe_foot_holdfast: "carving_hold_down",
  };
  return m[t];
}

export function benchHooks(): BenchHookType[] {
  return ["standard_crosscut_stop", "shooting_board_angle", "bench_jack_adjustable", "planing_stop_metal", "doe_foot_holdfast"];
}
