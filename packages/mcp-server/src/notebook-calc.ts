export type NotebookType = "dot_grid_bullet" | "lined_college" | "blank_sketch" | "graph_engineering" | "waterproof_field";

export function paperQuality(t: NotebookType): number {
  const m: Record<NotebookType, number> = {
    dot_grid_bullet: 9, lined_college: 5, blank_sketch: 8, graph_engineering: 7, waterproof_field: 6,
  };
  return m[t];
}

export function inkBleedThrough(t: NotebookType): number {
  const m: Record<NotebookType, number> = {
    dot_grid_bullet: 2, lined_college: 7, blank_sketch: 3, graph_engineering: 4, waterproof_field: 1,
  };
  return m[t];
}

export function flexibility(t: NotebookType): number {
  const m: Record<NotebookType, number> = {
    dot_grid_bullet: 9, lined_college: 5, blank_sketch: 10, graph_engineering: 6, waterproof_field: 7,
  };
  return m[t];
}

export function ruggedness(t: NotebookType): number {
  const m: Record<NotebookType, number> = {
    dot_grid_bullet: 5, lined_college: 3, blank_sketch: 4, graph_engineering: 5, waterproof_field: 10,
  };
  return m[t];
}

export function bookCost(t: NotebookType): number {
  const m: Record<NotebookType, number> = {
    dot_grid_bullet: 7, lined_college: 2, blank_sketch: 5, graph_engineering: 4, waterproof_field: 8,
  };
  return m[t];
}

export function layFlat(t: NotebookType): boolean {
  const m: Record<NotebookType, boolean> = {
    dot_grid_bullet: true, lined_college: false, blank_sketch: true, graph_engineering: false, waterproof_field: true,
  };
  return m[t];
}

export function numberedPages(t: NotebookType): boolean {
  const m: Record<NotebookType, boolean> = {
    dot_grid_bullet: true, lined_college: false, blank_sketch: false, graph_engineering: true, waterproof_field: false,
  };
  return m[t];
}

export function pageStyle(t: NotebookType): string {
  const m: Record<NotebookType, string> = {
    dot_grid_bullet: "5mm_dot_grid_ivory",
    lined_college: "7mm_ruled_white",
    blank_sketch: "unlined_heavyweight",
    graph_engineering: "5mm_quad_green_tint",
    waterproof_field: "synthetic_poly_lined",
  };
  return m[t];
}

export function bestUse(t: NotebookType): string {
  const m: Record<NotebookType, string> = {
    dot_grid_bullet: "bullet_journal_planner",
    lined_college: "lecture_note_class",
    blank_sketch: "drawing_doodle_freeform",
    graph_engineering: "math_diagram_technical",
    waterproof_field: "rain_outdoor_fieldwork",
  };
  return m[t];
}

export function notebooks(): NotebookType[] {
  return ["dot_grid_bullet", "lined_college", "blank_sketch", "graph_engineering", "waterproof_field"];
}
