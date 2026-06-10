export type EmbossFolderType = "plastic_template_press" | "metal_stencil_deep" | "3d_textured_multi" | "border_strip_edge" | "die_cut_combo_dual";

export function embossDepth(t: EmbossFolderType): number {
  const m: Record<EmbossFolderType, number> = {
    plastic_template_press: 6, metal_stencil_deep: 10, "3d_textured_multi": 9, border_strip_edge: 5, die_cut_combo_dual: 8,
  };
  return m[t];
}

export function detailLevel(t: EmbossFolderType): number {
  const m: Record<EmbossFolderType, number> = {
    plastic_template_press: 7, metal_stencil_deep: 9, "3d_textured_multi": 10, border_strip_edge: 6, die_cut_combo_dual: 8,
  };
  return m[t];
}

export function designVariety(t: EmbossFolderType): number {
  const m: Record<EmbossFolderType, number> = {
    plastic_template_press: 10, metal_stencil_deep: 7, "3d_textured_multi": 8, border_strip_edge: 6, die_cut_combo_dual: 5,
  };
  return m[t];
}

export function easeOfUse(t: EmbossFolderType): number {
  const m: Record<EmbossFolderType, number> = {
    plastic_template_press: 10, metal_stencil_deep: 7, "3d_textured_multi": 8, border_strip_edge: 9, die_cut_combo_dual: 6,
  };
  return m[t];
}

export function folderCost(t: EmbossFolderType): number {
  const m: Record<EmbossFolderType, number> = {
    plastic_template_press: 1, metal_stencil_deep: 3, "3d_textured_multi": 2, border_strip_edge: 1, die_cut_combo_dual: 3,
  };
  return m[t];
}

export function needsMachine(t: EmbossFolderType): boolean {
  const m: Record<EmbossFolderType, boolean> = {
    plastic_template_press: true, metal_stencil_deep: true, "3d_textured_multi": true, border_strip_edge: true, die_cut_combo_dual: true,
  };
  return m[t];
}

export function cutAndEmboss(t: EmbossFolderType): boolean {
  const m: Record<EmbossFolderType, boolean> = {
    plastic_template_press: false, metal_stencil_deep: false, "3d_textured_multi": false, border_strip_edge: false, die_cut_combo_dual: true,
  };
  return m[t];
}

export function folderMaterial(t: EmbossFolderType): string {
  const m: Record<EmbossFolderType, string> = {
    plastic_template_press: "clear_polycarbonate",
    metal_stencil_deep: "etched_steel_plate",
    "3d_textured_multi": "layered_polymer_3d",
    border_strip_edge: "narrow_plastic_strip",
    die_cut_combo_dual: "steel_rule_die_combo",
  };
  return m[t];
}

export function bestProject(t: EmbossFolderType): string {
  const m: Record<EmbossFolderType, string> = {
    plastic_template_press: "card_background_texture",
    metal_stencil_deep: "invitation_formal_deep",
    "3d_textured_multi": "floral_scene_layered",
    border_strip_edge: "frame_edge_accent",
    die_cut_combo_dual: "shaped_card_topper",
  };
  return m[t];
}

export function embossFolders(): EmbossFolderType[] {
  return ["plastic_template_press", "metal_stencil_deep", "3d_textured_multi", "border_strip_edge", "die_cut_combo_dual"];
}
