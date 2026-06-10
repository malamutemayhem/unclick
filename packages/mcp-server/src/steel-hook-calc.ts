export type SteelHookType = "inline_head_tapered" | "round_head_smooth" | "comfort_grip_rubber" | "lace_extra_fine" | "bent_handle_ergo";

export function threadControl(t: SteelHookType): number {
  const m: Record<SteelHookType, number> = {
    inline_head_tapered: 9, round_head_smooth: 8, comfort_grip_rubber: 7, lace_extra_fine: 10, bent_handle_ergo: 7,
  };
  return m[t];
}

export function speedFactor(t: SteelHookType): number {
  const m: Record<SteelHookType, number> = {
    inline_head_tapered: 9, round_head_smooth: 10, comfort_grip_rubber: 7, lace_extra_fine: 6, bent_handle_ergo: 8,
  };
  return m[t];
}

export function handComfort(t: SteelHookType): number {
  const m: Record<SteelHookType, number> = {
    inline_head_tapered: 6, round_head_smooth: 7, comfort_grip_rubber: 10, lace_extra_fine: 5, bent_handle_ergo: 9,
  };
  return m[t];
}

export function precision(t: SteelHookType): number {
  const m: Record<SteelHookType, number> = {
    inline_head_tapered: 9, round_head_smooth: 7, comfort_grip_rubber: 6, lace_extra_fine: 10, bent_handle_ergo: 7,
  };
  return m[t];
}

export function hookCost(t: SteelHookType): number {
  const m: Record<SteelHookType, number> = {
    inline_head_tapered: 2, round_head_smooth: 2, comfort_grip_rubber: 3, lace_extra_fine: 3, bent_handle_ergo: 4,
  };
  return m[t];
}

export function forLace(t: SteelHookType): boolean {
  const m: Record<SteelHookType, boolean> = {
    inline_head_tapered: false, round_head_smooth: false, comfort_grip_rubber: false, lace_extra_fine: true, bent_handle_ergo: false,
  };
  return m[t];
}

export function hasGrip(t: SteelHookType): boolean {
  const m: Record<SteelHookType, boolean> = {
    inline_head_tapered: false, round_head_smooth: false, comfort_grip_rubber: true, lace_extra_fine: false, bent_handle_ergo: true,
  };
  return m[t];
}

export function hookFinish(t: SteelHookType): string {
  const m: Record<SteelHookType, string> = {
    inline_head_tapered: "nickel_plated_smooth",
    round_head_smooth: "chrome_polished_round",
    comfort_grip_rubber: "steel_rubber_sleeve",
    lace_extra_fine: "hardened_steel_fine",
    bent_handle_ergo: "aluminum_bent_shaft",
  };
  return m[t];
}

export function bestProject(t: SteelHookType): string {
  const m: Record<SteelHookType, string> = {
    inline_head_tapered: "amigurumi_tight_stitch",
    round_head_smooth: "thread_doily_fast",
    comfort_grip_rubber: "long_session_crochet",
    lace_extra_fine: "fine_lace_tablecloth",
    bent_handle_ergo: "arthritis_friendly_work",
  };
  return m[t];
}

export function steelHooks(): SteelHookType[] {
  return ["inline_head_tapered", "round_head_smooth", "comfort_grip_rubber", "lace_extra_fine", "bent_handle_ergo"];
}
