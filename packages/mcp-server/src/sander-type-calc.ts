export type SanderType = "random_orbital" | "belt_sander" | "palm_sheet" | "detail_mouse" | "drum_stationary";

export function materialRemoval(t: SanderType): number {
  const m: Record<SanderType, number> = {
    random_orbital: 6, belt_sander: 10, palm_sheet: 3, detail_mouse: 2, drum_stationary: 9,
  };
  return m[t];
}

export function finishQuality(t: SanderType): number {
  const m: Record<SanderType, number> = {
    random_orbital: 9, belt_sander: 4, palm_sheet: 7, detail_mouse: 8, drum_stationary: 6,
  };
  return m[t];
}

export function controlEase(t: SanderType): number {
  const m: Record<SanderType, number> = {
    random_orbital: 9, belt_sander: 5, palm_sheet: 8, detail_mouse: 10, drum_stationary: 7,
  };
  return m[t];
}

export function dustExtraction(t: SanderType): number {
  const m: Record<SanderType, number> = {
    random_orbital: 8, belt_sander: 5, palm_sheet: 6, detail_mouse: 7, drum_stationary: 9,
  };
  return m[t];
}

export function sanderCost(t: SanderType): number {
  const m: Record<SanderType, number> = {
    random_orbital: 4, belt_sander: 5, palm_sheet: 2, detail_mouse: 3, drum_stationary: 10,
  };
  return m[t];
}

export function variableSpeed(t: SanderType): boolean {
  const m: Record<SanderType, boolean> = {
    random_orbital: true, belt_sander: true, palm_sheet: false, detail_mouse: true, drum_stationary: true,
  };
  return m[t];
}

export function handheld(t: SanderType): boolean {
  const m: Record<SanderType, boolean> = {
    random_orbital: true, belt_sander: true, palm_sheet: true, detail_mouse: true, drum_stationary: false,
  };
  return m[t];
}

export function abrasiveType(t: SanderType): string {
  const m: Record<SanderType, string> = {
    random_orbital: "hook_loop_disc_5inch", belt_sander: "continuous_belt_loop",
    palm_sheet: "quarter_sheet_clamp", detail_mouse: "triangular_hook_loop",
    drum_stationary: "wrapped_cylinder_sleeve",
  };
  return m[t];
}

export function bestJob(t: SanderType): string {
  const m: Record<SanderType, string> = {
    random_orbital: "furniture_finish_prep", belt_sander: "rough_stock_removal_floor",
    palm_sheet: "light_between_coat_sand", detail_mouse: "corner_trim_intricate",
    drum_stationary: "thickness_board_flatten",
  };
  return m[t];
}

export function sanderTypes(): SanderType[] {
  return ["random_orbital", "belt_sander", "palm_sheet", "detail_mouse", "drum_stationary"];
}
