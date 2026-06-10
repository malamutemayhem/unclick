export type StickyNoteType = "classic_square_3x3" | "super_sticky_strong" | "pop_up_dispenser" | "lined_legal_pad" | "transparent_flag_tab";

export function stickPower(t: StickyNoteType): number {
  const m: Record<StickyNoteType, number> = {
    classic_square_3x3: 5, super_sticky_strong: 10, pop_up_dispenser: 6, lined_legal_pad: 4, transparent_flag_tab: 7,
  };
  return m[t];
}

export function writeSpace(t: StickyNoteType): number {
  const m: Record<StickyNoteType, number> = {
    classic_square_3x3: 6, super_sticky_strong: 7, pop_up_dispenser: 5, lined_legal_pad: 10, transparent_flag_tab: 2,
  };
  return m[t];
}

export function dispensEase(t: StickyNoteType): number {
  const m: Record<StickyNoteType, number> = {
    classic_square_3x3: 6, super_sticky_strong: 5, pop_up_dispenser: 10, lined_legal_pad: 4, transparent_flag_tab: 8,
  };
  return m[t];
}

export function colorRange(t: StickyNoteType): number {
  const m: Record<StickyNoteType, number> = {
    classic_square_3x3: 8, super_sticky_strong: 7, pop_up_dispenser: 6, lined_legal_pad: 3, transparent_flag_tab: 9,
  };
  return m[t];
}

export function noteCost(t: StickyNoteType): number {
  const m: Record<StickyNoteType, number> = {
    classic_square_3x3: 2, super_sticky_strong: 4, pop_up_dispenser: 5, lined_legal_pad: 3, transparent_flag_tab: 4,
  };
  return m[t];
}

export function repositionable(t: StickyNoteType): boolean {
  const m: Record<StickyNoteType, boolean> = {
    classic_square_3x3: true, super_sticky_strong: true, pop_up_dispenser: true, lined_legal_pad: true, transparent_flag_tab: true,
  };
  return m[t];
}

export function seeThrough(t: StickyNoteType): boolean {
  const m: Record<StickyNoteType, boolean> = {
    classic_square_3x3: false, super_sticky_strong: false, pop_up_dispenser: false, lined_legal_pad: false, transparent_flag_tab: true,
  };
  return m[t];
}

export function adhesiveType(t: StickyNoteType): string {
  const m: Record<StickyNoteType, string> = {
    classic_square_3x3: "pressure_sensitive_acrylate",
    super_sticky_strong: "enhanced_micro_sphere",
    pop_up_dispenser: "alternating_edge_glue",
    lined_legal_pad: "top_edge_strip_standard",
    transparent_flag_tab: "clear_removable_thin_strip",
  };
  return m[t];
}

export function bestUse(t: StickyNoteType): string {
  const m: Record<StickyNoteType, string> = {
    classic_square_3x3: "desk_quick_reminder",
    super_sticky_strong: "vertical_surface_monitor",
    pop_up_dispenser: "one_hand_phone_note",
    lined_legal_pad: "meeting_detailed_notes",
    transparent_flag_tab: "textbook_page_marking",
  };
  return m[t];
}

export function stickyNotes(): StickyNoteType[] {
  return ["classic_square_3x3", "super_sticky_strong", "pop_up_dispenser", "lined_legal_pad", "transparent_flag_tab"];
}
