export type CameraBag = "backpack" | "shoulder_sling" | "rolling_case" | "holster_pouch" | "hard_shell";

export function gearCapacity(c: CameraBag): number {
  const m: Record<CameraBag, number> = {
    backpack: 9, shoulder_sling: 5, rolling_case: 10, holster_pouch: 2, hard_shell: 8,
  };
  return m[c];
}

export function accessSpeed(c: CameraBag): number {
  const m: Record<CameraBag, number> = {
    backpack: 4, shoulder_sling: 9, rolling_case: 5, holster_pouch: 10, hard_shell: 3,
  };
  return m[c];
}

export function weatherProtection(c: CameraBag): number {
  const m: Record<CameraBag, number> = {
    backpack: 7, shoulder_sling: 5, rolling_case: 8, holster_pouch: 4, hard_shell: 10,
  };
  return m[c];
}

export function comfortRating(c: CameraBag): number {
  const m: Record<CameraBag, number> = {
    backpack: 9, shoulder_sling: 7, rolling_case: 6, holster_pouch: 8, hard_shell: 3,
  };
  return m[c];
}

export function bagCost(c: CameraBag): number {
  const m: Record<CameraBag, number> = {
    backpack: 6, shoulder_sling: 4, rolling_case: 8, holster_pouch: 3, hard_shell: 9,
  };
  return m[c];
}

export function hasWheels(c: CameraBag): boolean {
  const m: Record<CameraBag, boolean> = {
    backpack: false, shoulder_sling: false, rolling_case: true, holster_pouch: false, hard_shell: false,
  };
  return m[c];
}

export function tsa_approved(c: CameraBag): boolean {
  const m: Record<CameraBag, boolean> = {
    backpack: true, shoulder_sling: true, rolling_case: true, holster_pouch: true, hard_shell: false,
  };
  return m[c];
}

export function closureType(c: CameraBag): string {
  const m: Record<CameraBag, string> = {
    backpack: "top_load_zippered_padded", shoulder_sling: "quick_flap_magnetic_buckle",
    rolling_case: "telescoping_handle_zipper", holster_pouch: "drawstring_velcro_quick",
    hard_shell: "latched_foam_lined_pelican",
  };
  return m[c];
}

export function bestScenario(c: CameraBag): string {
  const m: Record<CameraBag, string> = {
    backpack: "hiking_travel_all_day", shoulder_sling: "street_event_quick_draw",
    rolling_case: "studio_airport_heavy_kit", holster_pouch: "single_body_walk_around",
    hard_shell: "shipping_extreme_protection",
  };
  return m[c];
}

export function cameraBags(): CameraBag[] {
  return ["backpack", "shoulder_sling", "rolling_case", "holster_pouch", "hard_shell"];
}
