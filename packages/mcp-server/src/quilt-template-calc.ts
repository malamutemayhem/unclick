export type QuiltTemplateType = "feather_scroll_flow" | "crosshatch_grid_line" | "stipple_meander_free" | "clamshell_arc_repeat" | "echo_outline_follow";

export function designDetail(t: QuiltTemplateType): number {
  const m: Record<QuiltTemplateType, number> = {
    feather_scroll_flow: 10, crosshatch_grid_line: 6, stipple_meander_free: 7, clamshell_arc_repeat: 8, echo_outline_follow: 5,
  };
  return m[t];
}

export function easeOfUse(t: QuiltTemplateType): number {
  const m: Record<QuiltTemplateType, number> = {
    feather_scroll_flow: 4, crosshatch_grid_line: 10, stipple_meander_free: 7, clamshell_arc_repeat: 6, echo_outline_follow: 9,
  };
  return m[t];
}

export function repeatAbility(t: QuiltTemplateType): number {
  const m: Record<QuiltTemplateType, number> = {
    feather_scroll_flow: 6, crosshatch_grid_line: 10, stipple_meander_free: 3, clamshell_arc_repeat: 9, echo_outline_follow: 8,
  };
  return m[t];
}

export function fillCoverage(t: QuiltTemplateType): number {
  const m: Record<QuiltTemplateType, number> = {
    feather_scroll_flow: 7, crosshatch_grid_line: 9, stipple_meander_free: 10, clamshell_arc_repeat: 8, echo_outline_follow: 6,
  };
  return m[t];
}

export function templateCost(t: QuiltTemplateType): number {
  const m: Record<QuiltTemplateType, number> = {
    feather_scroll_flow: 4, crosshatch_grid_line: 2, stipple_meander_free: 1, clamshell_arc_repeat: 3, echo_outline_follow: 2,
  };
  return m[t];
}

export function needsTemplate(t: QuiltTemplateType): boolean {
  const m: Record<QuiltTemplateType, boolean> = {
    feather_scroll_flow: true, crosshatch_grid_line: true, stipple_meander_free: false, clamshell_arc_repeat: true, echo_outline_follow: false,
  };
  return m[t];
}

export function freeHand(t: QuiltTemplateType): boolean {
  const m: Record<QuiltTemplateType, boolean> = {
    feather_scroll_flow: false, crosshatch_grid_line: false, stipple_meander_free: true, clamshell_arc_repeat: false, echo_outline_follow: true,
  };
  return m[t];
}

export function templateMaterial(t: QuiltTemplateType): string {
  const m: Record<QuiltTemplateType, string> = {
    feather_scroll_flow: "acrylic_laser_cut",
    crosshatch_grid_line: "plastic_grid_overlay",
    stipple_meander_free: "none_freehand_guide",
    clamshell_arc_repeat: "acrylic_arc_template",
    echo_outline_follow: "none_follow_seam",
  };
  return m[t];
}

export function bestUse(t: QuiltTemplateType): string {
  const m: Record<QuiltTemplateType, string> = {
    feather_scroll_flow: "border_sashing_elegant",
    crosshatch_grid_line: "background_fill_even",
    stipple_meander_free: "allover_fill_texture",
    clamshell_arc_repeat: "decorative_arc_pattern",
    echo_outline_follow: "block_outline_accent",
  };
  return m[t];
}

export function quiltTemplates(): QuiltTemplateType[] {
  return ["feather_scroll_flow", "crosshatch_grid_line", "stipple_meander_free", "clamshell_arc_repeat", "echo_outline_follow"];
}
