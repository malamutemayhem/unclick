export type SlabRollerType = "tabletop_hand_crank" | "floor_standing_heavy" | "rolling_pin_manual" | "extruder_press_shape" | "adjustable_thickness_guide";

export function slabConsistency(t: SlabRollerType): number {
  const m: Record<SlabRollerType, number> = {
    tabletop_hand_crank: 9, floor_standing_heavy: 10, rolling_pin_manual: 5, extruder_press_shape: 8, adjustable_thickness_guide: 7,
  };
  return m[t];
}

export function maxWidth(t: SlabRollerType): number {
  const m: Record<SlabRollerType, number> = {
    tabletop_hand_crank: 8, floor_standing_heavy: 10, rolling_pin_manual: 6, extruder_press_shape: 5, adjustable_thickness_guide: 7,
  };
  return m[t];
}

export function easeOfUse(t: SlabRollerType): number {
  const m: Record<SlabRollerType, number> = {
    tabletop_hand_crank: 8, floor_standing_heavy: 9, rolling_pin_manual: 10, extruder_press_shape: 7, adjustable_thickness_guide: 8,
  };
  return m[t];
}

export function spaceNeeded(t: SlabRollerType): number {
  const m: Record<SlabRollerType, number> = {
    tabletop_hand_crank: 6, floor_standing_heavy: 2, rolling_pin_manual: 10, extruder_press_shape: 5, adjustable_thickness_guide: 8,
  };
  return m[t];
}

export function rollerCost(t: SlabRollerType): number {
  const m: Record<SlabRollerType, number> = {
    tabletop_hand_crank: 3, floor_standing_heavy: 4, rolling_pin_manual: 1, extruder_press_shape: 3, adjustable_thickness_guide: 2,
  };
  return m[t];
}

export function thicknessControl(t: SlabRollerType): boolean {
  const m: Record<SlabRollerType, boolean> = {
    tabletop_hand_crank: true, floor_standing_heavy: true, rolling_pin_manual: false, extruder_press_shape: true, adjustable_thickness_guide: true,
  };
  return m[t];
}

export function portable(t: SlabRollerType): boolean {
  const m: Record<SlabRollerType, boolean> = {
    tabletop_hand_crank: false, floor_standing_heavy: false, rolling_pin_manual: true, extruder_press_shape: false, adjustable_thickness_guide: true,
  };
  return m[t];
}

export function rollMechanism(t: SlabRollerType): string {
  const m: Record<SlabRollerType, string> = {
    tabletop_hand_crank: "gear_crank_roller",
    floor_standing_heavy: "dual_roller_spring",
    rolling_pin_manual: "hand_pressure_roll",
    extruder_press_shape: "piston_press_die",
    adjustable_thickness_guide: "rail_guide_strip",
  };
  return m[t];
}

export function bestProject(t: SlabRollerType): string {
  const m: Record<SlabRollerType, string> = {
    tabletop_hand_crank: "tile_platter_studio",
    floor_standing_heavy: "large_sculpture_panel",
    rolling_pin_manual: "beginner_home_craft",
    extruder_press_shape: "hollow_form_coil",
    adjustable_thickness_guide: "precise_tile_set",
  };
  return m[t];
}

export function slabRollers(): SlabRollerType[] {
  return ["tabletop_hand_crank", "floor_standing_heavy", "rolling_pin_manual", "extruder_press_shape", "adjustable_thickness_guide"];
}
