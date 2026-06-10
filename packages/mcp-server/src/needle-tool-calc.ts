export type NeedleToolType = "pottery_needle_steel" | "fettling_knife_flex" | "hole_cutter_circle" | "sgrafitto_loop_carve" | "chattering_tool_trim";

export function cutPrecision(t: NeedleToolType): number {
  const m: Record<NeedleToolType, number> = {
    pottery_needle_steel: 9, fettling_knife_flex: 8, hole_cutter_circle: 10, sgrafitto_loop_carve: 7, chattering_tool_trim: 5,
  };
  return m[t];
}

export function versatility(t: NeedleToolType): number {
  const m: Record<NeedleToolType, number> = {
    pottery_needle_steel: 10, fettling_knife_flex: 9, hole_cutter_circle: 4, sgrafitto_loop_carve: 6, chattering_tool_trim: 3,
  };
  return m[t];
}

export function decorateAbility(t: NeedleToolType): number {
  const m: Record<NeedleToolType, number> = {
    pottery_needle_steel: 6, fettling_knife_flex: 5, hole_cutter_circle: 3, sgrafitto_loop_carve: 10, chattering_tool_trim: 9,
  };
  return m[t];
}

export function controlFeel(t: NeedleToolType): number {
  const m: Record<NeedleToolType, number> = {
    pottery_needle_steel: 9, fettling_knife_flex: 8, hole_cutter_circle: 7, sgrafitto_loop_carve: 8, chattering_tool_trim: 6,
  };
  return m[t];
}

export function toolCost(t: NeedleToolType): number {
  const m: Record<NeedleToolType, number> = {
    pottery_needle_steel: 1, fettling_knife_flex: 1, hole_cutter_circle: 2, sgrafitto_loop_carve: 2, chattering_tool_trim: 2,
  };
  return m[t];
}

export function forGreenware(t: NeedleToolType): boolean {
  const m: Record<NeedleToolType, boolean> = {
    pottery_needle_steel: true, fettling_knife_flex: true, hole_cutter_circle: true, sgrafitto_loop_carve: true, chattering_tool_trim: false,
  };
  return m[t];
}

export function patternMaking(t: NeedleToolType): boolean {
  const m: Record<NeedleToolType, boolean> = {
    pottery_needle_steel: false, fettling_knife_flex: false, hole_cutter_circle: false, sgrafitto_loop_carve: true, chattering_tool_trim: true,
  };
  return m[t];
}

export function tipShape(t: NeedleToolType): string {
  const m: Record<NeedleToolType, string> = {
    pottery_needle_steel: "sharp_point_pin",
    fettling_knife_flex: "thin_blade_flex",
    hole_cutter_circle: "adjustable_arm_blade",
    sgrafitto_loop_carve: "wire_loop_scrape",
    chattering_tool_trim: "spring_steel_vibrate",
  };
  return m[t];
}

export function bestTask(t: NeedleToolType): string {
  const m: Record<NeedleToolType, string> = {
    pottery_needle_steel: "score_trim_measure",
    fettling_knife_flex: "clean_seam_edge",
    hole_cutter_circle: "drain_hole_cutout",
    sgrafitto_loop_carve: "carve_through_glaze",
    chattering_tool_trim: "chatter_pattern_decor",
  };
  return m[t];
}

export function needleTools(): NeedleToolType[] {
  return ["pottery_needle_steel", "fettling_knife_flex", "hole_cutter_circle", "sgrafitto_loop_carve", "chattering_tool_trim"];
}
