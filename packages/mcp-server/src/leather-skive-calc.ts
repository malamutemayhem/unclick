export type LeatherSkiveType = "safety_skiver_pull" | "french_skiver_push" | "bell_skiver_machine" | "paring_knife_round" | "splitter_machine_even";

export function thinPrecision(t: LeatherSkiveType): number {
  const m: Record<LeatherSkiveType, number> = {
    safety_skiver_pull: 6, french_skiver_push: 8, bell_skiver_machine: 9, paring_knife_round: 10, splitter_machine_even: 7,
  };
  return m[t];
}

export function speedOutput(t: LeatherSkiveType): number {
  const m: Record<LeatherSkiveType, number> = {
    safety_skiver_pull: 7, french_skiver_push: 5, bell_skiver_machine: 9, paring_knife_round: 4, splitter_machine_even: 10,
  };
  return m[t];
}

export function controlFeel(t: LeatherSkiveType): number {
  const m: Record<LeatherSkiveType, number> = {
    safety_skiver_pull: 7, french_skiver_push: 9, bell_skiver_machine: 6, paring_knife_round: 10, splitter_machine_even: 5,
  };
  return m[t];
}

export function safetyLevel(t: LeatherSkiveType): number {
  const m: Record<LeatherSkiveType, number> = {
    safety_skiver_pull: 10, french_skiver_push: 5, bell_skiver_machine: 7, paring_knife_round: 4, splitter_machine_even: 8,
  };
  return m[t];
}

export function skiveCost(t: LeatherSkiveType): number {
  const m: Record<LeatherSkiveType, number> = {
    safety_skiver_pull: 1, french_skiver_push: 2, bell_skiver_machine: 4, paring_knife_round: 2, splitter_machine_even: 5,
  };
  return m[t];
}

export function replaceBlade(t: LeatherSkiveType): boolean {
  const m: Record<LeatherSkiveType, boolean> = {
    safety_skiver_pull: true, french_skiver_push: false, bell_skiver_machine: true, paring_knife_round: false, splitter_machine_even: true,
  };
  return m[t];
}

export function machineAssist(t: LeatherSkiveType): boolean {
  const m: Record<LeatherSkiveType, boolean> = {
    safety_skiver_pull: false, french_skiver_push: false, bell_skiver_machine: true, paring_knife_round: false, splitter_machine_even: true,
  };
  return m[t];
}

export function bladeProfile(t: LeatherSkiveType): string {
  const m: Record<LeatherSkiveType, string> = {
    safety_skiver_pull: "guarded_pull_blade",
    french_skiver_push: "angled_push_edge",
    bell_skiver_machine: "rotating_bell_blade",
    paring_knife_round: "curved_round_edge",
    splitter_machine_even: "roller_band_knife",
  };
  return m[t];
}

export function bestTask(t: LeatherSkiveType): string {
  const m: Record<LeatherSkiveType, string> = {
    safety_skiver_pull: "edge_thin_fold",
    french_skiver_push: "precise_bevel_edge",
    bell_skiver_machine: "production_skive_batch",
    paring_knife_round: "bookbind_pare_spine",
    splitter_machine_even: "split_hide_uniform",
  };
  return m[t];
}

export function leatherSkives(): LeatherSkiveType[] {
  return ["safety_skiver_pull", "french_skiver_push", "bell_skiver_machine", "paring_knife_round", "splitter_machine_even"];
}
