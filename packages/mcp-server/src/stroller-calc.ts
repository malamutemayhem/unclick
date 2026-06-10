export type StrollerType = "full_size_travel" | "lightweight_umbrella" | "jogging_three_wheel" | "double_tandem" | "convertible_modular";

export function safetyRating(t: StrollerType): number {
  const m: Record<StrollerType, number> = {
    full_size_travel: 9, lightweight_umbrella: 6, jogging_three_wheel: 8, double_tandem: 8, convertible_modular: 9,
  };
  return m[t];
}

export function maneuverability(t: StrollerType): number {
  const m: Record<StrollerType, number> = {
    full_size_travel: 7, lightweight_umbrella: 9, jogging_three_wheel: 6, double_tandem: 4, convertible_modular: 7,
  };
  return m[t];
}

export function storageSpace(t: StrollerType): number {
  const m: Record<StrollerType, number> = {
    full_size_travel: 9, lightweight_umbrella: 3, jogging_three_wheel: 6, double_tandem: 8, convertible_modular: 8,
  };
  return m[t];
}

export function foldCompact(t: StrollerType): number {
  const m: Record<StrollerType, number> = {
    full_size_travel: 5, lightweight_umbrella: 10, jogging_three_wheel: 3, double_tandem: 2, convertible_modular: 6,
  };
  return m[t];
}

export function strollerCost(t: StrollerType): number {
  const m: Record<StrollerType, number> = {
    full_size_travel: 6, lightweight_umbrella: 2, jogging_three_wheel: 7, double_tandem: 8, convertible_modular: 10,
  };
  return m[t];
}

export function carSeatCompatible(t: StrollerType): boolean {
  const m: Record<StrollerType, boolean> = {
    full_size_travel: true, lightweight_umbrella: false, jogging_three_wheel: true, double_tandem: true, convertible_modular: true,
  };
  return m[t];
}

export function allTerrain(t: StrollerType): boolean {
  const m: Record<StrollerType, boolean> = {
    full_size_travel: false, lightweight_umbrella: false, jogging_three_wheel: true, double_tandem: false, convertible_modular: false,
  };
  return m[t];
}

export function wheelDesign(t: StrollerType): string {
  const m: Record<StrollerType, string> = {
    full_size_travel: "swivel_front_lockable_rear", lightweight_umbrella: "small_double_wheel_set",
    jogging_three_wheel: "air_filled_fixed_front", double_tandem: "dual_swivel_linked_frame",
    convertible_modular: "quick_release_foam_fill",
  };
  return m[t];
}

export function bestFamily(t: StrollerType): string {
  const m: Record<StrollerType, string> = {
    full_size_travel: "newborn_to_toddler_daily", lightweight_umbrella: "travel_quick_errand",
    jogging_three_wheel: "runner_trail_active_parent", double_tandem: "twins_siblings_close_age",
    convertible_modular: "growing_family_multi_config",
  };
  return m[t];
}

export function strollers(): StrollerType[] {
  return ["full_size_travel", "lightweight_umbrella", "jogging_three_wheel", "double_tandem", "convertible_modular"];
}
