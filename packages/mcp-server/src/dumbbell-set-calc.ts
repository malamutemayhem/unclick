export type DumbbellSet = "fixed_rubber" | "adjustable_dial" | "olympic_plate" | "vinyl_coated" | "loadable_handle";

export function weightRange(d: DumbbellSet): number {
  const m: Record<DumbbellSet, number> = {
    fixed_rubber: 6, adjustable_dial: 8, olympic_plate: 10, vinyl_coated: 3, loadable_handle: 9,
  };
  return m[d];
}

export function adjustSpeed(d: DumbbellSet): number {
  const m: Record<DumbbellSet, number> = {
    fixed_rubber: 10, adjustable_dial: 9, olympic_plate: 3, vinyl_coated: 10, loadable_handle: 4,
  };
  return m[d];
}

export function gripComfort(d: DumbbellSet): number {
  const m: Record<DumbbellSet, number> = {
    fixed_rubber: 8, adjustable_dial: 7, olympic_plate: 6, vinyl_coated: 5, loadable_handle: 7,
  };
  return m[d];
}

export function storageSpace(d: DumbbellSet): number {
  const m: Record<DumbbellSet, number> = {
    fixed_rubber: 2, adjustable_dial: 9, olympic_plate: 3, vinyl_coated: 4, loadable_handle: 8,
  };
  return m[d];
}

export function setCost(d: DumbbellSet): number {
  const m: Record<DumbbellSet, number> = {
    fixed_rubber: 7, adjustable_dial: 8, olympic_plate: 5, vinyl_coated: 3, loadable_handle: 4,
  };
  return m[d];
}

export function dropSafe(d: DumbbellSet): boolean {
  const m: Record<DumbbellSet, boolean> = {
    fixed_rubber: true, adjustable_dial: false, olympic_plate: true, vinyl_coated: false, loadable_handle: true,
  };
  return m[d];
}

export function compactStorage(d: DumbbellSet): boolean {
  const m: Record<DumbbellSet, boolean> = {
    fixed_rubber: false, adjustable_dial: true, olympic_plate: false, vinyl_coated: false, loadable_handle: true,
  };
  return m[d];
}

export function construction(d: DumbbellSet): string {
  const m: Record<DumbbellSet, string> = {
    fixed_rubber: "solid_cast_iron_rubber_hex", adjustable_dial: "selector_pin_weight_stack",
    olympic_plate: "chrome_bar_standard_plates", vinyl_coated: "cement_fill_vinyl_shell",
    loadable_handle: "threaded_bar_spin_lock_collar",
  };
  return m[d];
}

export function bestTraining(d: DumbbellSet): string {
  const m: Record<DumbbellSet, string> = {
    fixed_rubber: "gym_rack_quick_superset", adjustable_dial: "home_gym_space_efficient",
    olympic_plate: "powerlifting_heavy_compound", vinyl_coated: "light_rehab_beginner",
    loadable_handle: "garage_gym_budget_heavy",
  };
  return m[d];
}

export function dumbbellSets(): DumbbellSet[] {
  return ["fixed_rubber", "adjustable_dial", "olympic_plate", "vinyl_coated", "loadable_handle"];
}
