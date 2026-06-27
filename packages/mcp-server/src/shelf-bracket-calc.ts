export type ShelfBracketType = "l_bracket_steel" | "floating_hidden" | "pipe_industrial" | "corner_triangle" | "adjustable_track";

export function loadCapacity(t: ShelfBracketType): number {
  const m: Record<ShelfBracketType, number> = {
    l_bracket_steel: 8, floating_hidden: 5, pipe_industrial: 9, corner_triangle: 6, adjustable_track: 10,
  };
  return m[t];
}

export function aestheticClean(t: ShelfBracketType): number {
  const m: Record<ShelfBracketType, number> = {
    l_bracket_steel: 4, floating_hidden: 10, pipe_industrial: 7, corner_triangle: 5, adjustable_track: 6,
  };
  return m[t];
}

export function installEase(t: ShelfBracketType): number {
  const m: Record<ShelfBracketType, number> = {
    l_bracket_steel: 9, floating_hidden: 4, pipe_industrial: 6, corner_triangle: 8, adjustable_track: 5,
  };
  return m[t];
}

export function adjustability(t: ShelfBracketType): number {
  const m: Record<ShelfBracketType, number> = {
    l_bracket_steel: 2, floating_hidden: 1, pipe_industrial: 3, corner_triangle: 2, adjustable_track: 10,
  };
  return m[t];
}

export function bracketCost(t: ShelfBracketType): number {
  const m: Record<ShelfBracketType, number> = {
    l_bracket_steel: 1, floating_hidden: 5, pipe_industrial: 6, corner_triangle: 2, adjustable_track: 7,
  };
  return m[t];
}

export function hiddenHardware(t: ShelfBracketType): boolean {
  const m: Record<ShelfBracketType, boolean> = {
    l_bracket_steel: false, floating_hidden: true, pipe_industrial: false, corner_triangle: false, adjustable_track: false,
  };
  return m[t];
}

export function repositionable(t: ShelfBracketType): boolean {
  const m: Record<ShelfBracketType, boolean> = {
    l_bracket_steel: false, floating_hidden: false, pipe_industrial: false, corner_triangle: false, adjustable_track: true,
  };
  return m[t];
}

export function mountStyle(t: ShelfBracketType): string {
  const m: Record<ShelfBracketType, string> = {
    l_bracket_steel: "screw_wall_right_angle",
    floating_hidden: "rod_insert_concealed",
    pipe_industrial: "flange_pipe_fitting",
    corner_triangle: "diagonal_brace_stud",
    adjustable_track: "vertical_rail_clip_slot",
  };
  return m[t];
}

export function bestProject(t: ShelfBracketType): string {
  const m: Record<ShelfBracketType, string> = {
    l_bracket_steel: "garage_utility_quick",
    floating_hidden: "modern_living_room_display",
    pipe_industrial: "loft_rustic_decor",
    corner_triangle: "closet_pantry_support",
    adjustable_track: "retail_store_flexible",
  };
  return m[t];
}

export function shelfBrackets(): ShelfBracketType[] {
  return ["l_bracket_steel", "floating_hidden", "pipe_industrial", "corner_triangle", "adjustable_track"];
}
