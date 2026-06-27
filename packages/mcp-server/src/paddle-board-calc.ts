export type PaddleBoardType = "inflatable_touring" | "hardboard_race" | "all_around_foam" | "yoga_wide_deck" | "fishing_platform";

export function glideEfficiency(t: PaddleBoardType): number {
  const m: Record<PaddleBoardType, number> = {
    inflatable_touring: 7, hardboard_race: 10, all_around_foam: 6, yoga_wide_deck: 4, fishing_platform: 5,
  };
  return m[t];
}

export function primaryStability(t: PaddleBoardType): number {
  const m: Record<PaddleBoardType, number> = {
    inflatable_touring: 7, hardboard_race: 4, all_around_foam: 8, yoga_wide_deck: 10, fishing_platform: 9,
  };
  return m[t];
}

export function storageEase(t: PaddleBoardType): number {
  const m: Record<PaddleBoardType, number> = {
    inflatable_touring: 10, hardboard_race: 3, all_around_foam: 4, yoga_wide_deck: 5, fishing_platform: 3,
  };
  return m[t];
}

export function weightCapacity(t: PaddleBoardType): number {
  const m: Record<PaddleBoardType, number> = {
    inflatable_touring: 7, hardboard_race: 5, all_around_foam: 7, yoga_wide_deck: 8, fishing_platform: 10,
  };
  return m[t];
}

export function boardCost(t: PaddleBoardType): number {
  const m: Record<PaddleBoardType, number> = {
    inflatable_touring: 6, hardboard_race: 10, all_around_foam: 4, yoga_wide_deck: 7, fishing_platform: 8,
  };
  return m[t];
}

export function deflatable(t: PaddleBoardType): boolean {
  const m: Record<PaddleBoardType, boolean> = {
    inflatable_touring: true, hardboard_race: false, all_around_foam: false, yoga_wide_deck: false, fishing_platform: false,
  };
  return m[t];
}

export function hasCargoNet(t: PaddleBoardType): boolean {
  const m: Record<PaddleBoardType, boolean> = {
    inflatable_touring: true, hardboard_race: false, all_around_foam: true, yoga_wide_deck: false, fishing_platform: true,
  };
  return m[t];
}

export function deckPad(t: PaddleBoardType): string {
  const m: Record<PaddleBoardType, string> = {
    inflatable_touring: "diamond_groove_eva",
    hardboard_race: "thin_textured_strip",
    all_around_foam: "full_deck_soft_top",
    yoga_wide_deck: "full_length_cushion_pad",
    fishing_platform: "marine_grade_traction",
  };
  return m[t];
}

export function bestActivity(t: PaddleBoardType): string {
  const m: Record<PaddleBoardType, string> = {
    inflatable_touring: "lake_river_touring",
    hardboard_race: "downwind_race_sprint",
    all_around_foam: "beginner_casual_paddle",
    yoga_wide_deck: "on_water_fitness_yoga",
    fishing_platform: "calm_water_angling",
  };
  return m[t];
}

export function paddleBoards(): PaddleBoardType[] {
  return ["inflatable_touring", "hardboard_race", "all_around_foam", "yoga_wide_deck", "fishing_platform"];
}
