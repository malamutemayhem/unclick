export type ArtTapeType = "masking_cream_low_tack" | "washi_decorative_pattern" | "drafting_blue_precise" | "artists_white_acid_free" | "chart_tape_thin_line";

export function lineSharpness(t: ArtTapeType): number {
  const m: Record<ArtTapeType, number> = {
    masking_cream_low_tack: 7, washi_decorative_pattern: 5, drafting_blue_precise: 10, artists_white_acid_free: 8, chart_tape_thin_line: 9,
  };
  return m[t];
}

export function surfaceSafe(t: ArtTapeType): number {
  const m: Record<ArtTapeType, number> = {
    masking_cream_low_tack: 9, washi_decorative_pattern: 10, drafting_blue_precise: 8, artists_white_acid_free: 9, chart_tape_thin_line: 7,
  };
  return m[t];
}

export function repositionability(t: ArtTapeType): number {
  const m: Record<ArtTapeType, number> = {
    masking_cream_low_tack: 9, washi_decorative_pattern: 8, drafting_blue_precise: 7, artists_white_acid_free: 6, chart_tape_thin_line: 4,
  };
  return m[t];
}

export function versatility(t: ArtTapeType): number {
  const m: Record<ArtTapeType, number> = {
    masking_cream_low_tack: 8, washi_decorative_pattern: 9, drafting_blue_precise: 6, artists_white_acid_free: 7, chart_tape_thin_line: 5,
  };
  return m[t];
}

export function tapeCost(t: ArtTapeType): number {
  const m: Record<ArtTapeType, number> = {
    masking_cream_low_tack: 2, washi_decorative_pattern: 2, drafting_blue_precise: 3, artists_white_acid_free: 3, chart_tape_thin_line: 3,
  };
  return m[t];
}

export function acidFree(t: ArtTapeType): boolean {
  const m: Record<ArtTapeType, boolean> = {
    masking_cream_low_tack: false, washi_decorative_pattern: true, drafting_blue_precise: false, artists_white_acid_free: true, chart_tape_thin_line: false,
  };
  return m[t];
}

export function tearByHand(t: ArtTapeType): boolean {
  const m: Record<ArtTapeType, boolean> = {
    masking_cream_low_tack: true, washi_decorative_pattern: true, drafting_blue_precise: false, artists_white_acid_free: true, chart_tape_thin_line: false,
  };
  return m[t];
}

export function adhesiveType(t: ArtTapeType): string {
  const m: Record<ArtTapeType, string> = {
    masking_cream_low_tack: "rubber_low_tack",
    washi_decorative_pattern: "rice_paper_gentle",
    drafting_blue_precise: "acrylic_medium_tack",
    artists_white_acid_free: "ph_neutral_archival",
    chart_tape_thin_line: "permanent_thin_bond",
  };
  return m[t];
}

export function bestUse(t: ArtTapeType): string {
  const m: Record<ArtTapeType, string> = {
    masking_cream_low_tack: "watercolor_edge_mask",
    washi_decorative_pattern: "journal_scrapbook_decor",
    drafting_blue_precise: "technical_drawing_line",
    artists_white_acid_free: "mat_board_framing",
    chart_tape_thin_line: "design_layout_border",
  };
  return m[t];
}

export function artTapes(): ArtTapeType[] {
  return ["masking_cream_low_tack", "washi_decorative_pattern", "drafting_blue_precise", "artists_white_acid_free", "chart_tape_thin_line"];
}
