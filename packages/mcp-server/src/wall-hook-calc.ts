export type WallHookType = "adhesive_strip_plastic" | "screw_in_metal" | "over_door_hanger" | "suction_cup_glass" | "toggle_bolt_heavy";

export function holdWeight(t: WallHookType): number {
  const m: Record<WallHookType, number> = {
    adhesive_strip_plastic: 4, screw_in_metal: 9, over_door_hanger: 6, suction_cup_glass: 3, toggle_bolt_heavy: 10,
  };
  return m[t];
}

export function installEase(t: WallHookType): number {
  const m: Record<WallHookType, number> = {
    adhesive_strip_plastic: 10, screw_in_metal: 5, over_door_hanger: 9, suction_cup_glass: 10, toggle_bolt_heavy: 3,
  };
  return m[t];
}

export function removeClean(t: WallHookType): number {
  const m: Record<WallHookType, number> = {
    adhesive_strip_plastic: 8, screw_in_metal: 3, over_door_hanger: 10, suction_cup_glass: 10, toggle_bolt_heavy: 2,
  };
  return m[t];
}

export function durability(t: WallHookType): number {
  const m: Record<WallHookType, number> = {
    adhesive_strip_plastic: 5, screw_in_metal: 9, over_door_hanger: 7, suction_cup_glass: 4, toggle_bolt_heavy: 10,
  };
  return m[t];
}

export function hookCost(t: WallHookType): number {
  const m: Record<WallHookType, number> = {
    adhesive_strip_plastic: 2, screw_in_metal: 4, over_door_hanger: 5, suction_cup_glass: 3, toggle_bolt_heavy: 7,
  };
  return m[t];
}

export function noDrilling(t: WallHookType): boolean {
  const m: Record<WallHookType, boolean> = {
    adhesive_strip_plastic: true, screw_in_metal: false, over_door_hanger: true, suction_cup_glass: true, toggle_bolt_heavy: false,
  };
  return m[t];
}

export function reusable(t: WallHookType): boolean {
  const m: Record<WallHookType, boolean> = {
    adhesive_strip_plastic: false, screw_in_metal: true, over_door_hanger: true, suction_cup_glass: true, toggle_bolt_heavy: true,
  };
  return m[t];
}

export function mountMethod(t: WallHookType): string {
  const m: Record<WallHookType, string> = {
    adhesive_strip_plastic: "peel_stick_foam_tape",
    screw_in_metal: "pilot_hole_wood_screw",
    over_door_hanger: "gravity_hang_door_top",
    suction_cup_glass: "vacuum_seal_smooth_surface",
    toggle_bolt_heavy: "hollow_wall_toggle_expand",
  };
  return m[t];
}

export function bestSurface(t: WallHookType): string {
  const m: Record<WallHookType, string> = {
    adhesive_strip_plastic: "painted_drywall_smooth",
    screw_in_metal: "wood_stud_solid",
    over_door_hanger: "interior_door_standard",
    suction_cup_glass: "glass_tile_glossy",
    toggle_bolt_heavy: "hollow_drywall_no_stud",
  };
  return m[t];
}

export function wallHooks(): WallHookType[] {
  return ["adhesive_strip_plastic", "screw_in_metal", "over_door_hanger", "suction_cup_glass", "toggle_bolt_heavy"];
}
