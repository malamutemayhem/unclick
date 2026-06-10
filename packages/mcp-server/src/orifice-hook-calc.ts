export type OrificeHookType = "wire_bent_basic" | "wood_handle_comfort" | "threader_loop_pull" | "ergonomic_ball_end" | "long_reach_deep";

export function threadEase(t: OrificeHookType): number {
  const m: Record<OrificeHookType, number> = {
    wire_bent_basic: 7, wood_handle_comfort: 8, threader_loop_pull: 10, ergonomic_ball_end: 7, long_reach_deep: 6,
  };
  return m[t];
}

export function gripComfort(t: OrificeHookType): number {
  const m: Record<OrificeHookType, number> = {
    wire_bent_basic: 4, wood_handle_comfort: 9, threader_loop_pull: 6, ergonomic_ball_end: 10, long_reach_deep: 7,
  };
  return m[t];
}

export function reachDepth(t: OrificeHookType): number {
  const m: Record<OrificeHookType, number> = {
    wire_bent_basic: 5, wood_handle_comfort: 6, threader_loop_pull: 7, ergonomic_ball_end: 6, long_reach_deep: 10,
  };
  return m[t];
}

export function yarnSafe(t: OrificeHookType): number {
  const m: Record<OrificeHookType, number> = {
    wire_bent_basic: 6, wood_handle_comfort: 8, threader_loop_pull: 9, ergonomic_ball_end: 8, long_reach_deep: 5,
  };
  return m[t];
}

export function hookCost(t: OrificeHookType): number {
  const m: Record<OrificeHookType, number> = {
    wire_bent_basic: 1, wood_handle_comfort: 1, threader_loop_pull: 1, ergonomic_ball_end: 2, long_reach_deep: 1,
  };
  return m[t];
}

export function loopThreader(t: OrificeHookType): boolean {
  const m: Record<OrificeHookType, boolean> = {
    wire_bent_basic: false, wood_handle_comfort: false, threader_loop_pull: true, ergonomic_ball_end: false, long_reach_deep: false,
  };
  return m[t];
}

export function hasHandle(t: OrificeHookType): boolean {
  const m: Record<OrificeHookType, boolean> = {
    wire_bent_basic: false, wood_handle_comfort: true, threader_loop_pull: false, ergonomic_ball_end: true, long_reach_deep: true,
  };
  return m[t];
}

export function hookShape(t: OrificeHookType): string {
  const m: Record<OrificeHookType, string> = {
    wire_bent_basic: "simple_bent_wire",
    wood_handle_comfort: "turned_handle_hook",
    threader_loop_pull: "flexible_loop_wire",
    ergonomic_ball_end: "ball_grip_hook",
    long_reach_deep: "extended_shaft_hook",
  };
  return m[t];
}

export function bestUse(t: OrificeHookType): string {
  const m: Record<OrificeHookType, string> = {
    wire_bent_basic: "quick_thread_pull",
    wood_handle_comfort: "comfort_long_spin",
    threader_loop_pull: "fragile_yarn_thread",
    ergonomic_ball_end: "arthritis_friendly",
    long_reach_deep: "deep_orifice_reach",
  };
  return m[t];
}

export function orificeHooks(): OrificeHookType[] {
  return ["wire_bent_basic", "wood_handle_comfort", "threader_loop_pull", "ergonomic_ball_end", "long_reach_deep"];
}
