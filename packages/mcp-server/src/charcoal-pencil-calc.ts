export type CharcoalPencilType = "vine_willow_soft" | "compressed_hard_stick" | "charcoal_pencil_wood" | "white_charcoal_highlight" | "powdered_loose_blend";

export function darkRange(t: CharcoalPencilType): number {
  const m: Record<CharcoalPencilType, number> = {
    vine_willow_soft: 7, compressed_hard_stick: 10, charcoal_pencil_wood: 6, white_charcoal_highlight: 2, powdered_loose_blend: 8,
  };
  return m[t];
}

export function blendAbility(t: CharcoalPencilType): number {
  const m: Record<CharcoalPencilType, number> = {
    vine_willow_soft: 10, compressed_hard_stick: 5, charcoal_pencil_wood: 6, white_charcoal_highlight: 7, powdered_loose_blend: 9,
  };
  return m[t];
}

export function detailControl(t: CharcoalPencilType): number {
  const m: Record<CharcoalPencilType, number> = {
    vine_willow_soft: 4, compressed_hard_stick: 7, charcoal_pencil_wood: 10, white_charcoal_highlight: 8, powdered_loose_blend: 3,
  };
  return m[t];
}

export function erasability(t: CharcoalPencilType): number {
  const m: Record<CharcoalPencilType, number> = {
    vine_willow_soft: 10, compressed_hard_stick: 3, charcoal_pencil_wood: 5, white_charcoal_highlight: 6, powdered_loose_blend: 8,
  };
  return m[t];
}

export function pencilCost(t: CharcoalPencilType): number {
  const m: Record<CharcoalPencilType, number> = {
    vine_willow_soft: 3, compressed_hard_stick: 4, charcoal_pencil_wood: 5, white_charcoal_highlight: 6, powdered_loose_blend: 4,
  };
  return m[t];
}

export function messyToUse(t: CharcoalPencilType): boolean {
  const m: Record<CharcoalPencilType, boolean> = {
    vine_willow_soft: true, compressed_hard_stick: false, charcoal_pencil_wood: false, white_charcoal_highlight: false, powdered_loose_blend: true,
  };
  return m[t];
}

export function needsFixative(t: CharcoalPencilType): boolean {
  const m: Record<CharcoalPencilType, boolean> = {
    vine_willow_soft: true, compressed_hard_stick: true, charcoal_pencil_wood: true, white_charcoal_highlight: true, powdered_loose_blend: true,
  };
  return m[t];
}

export function charcoalSource(t: CharcoalPencilType): string {
  const m: Record<CharcoalPencilType, string> = {
    vine_willow_soft: "natural_willow_branch",
    compressed_hard_stick: "charcoal_binder_pressed",
    charcoal_pencil_wood: "cedar_cased_charcoal",
    white_charcoal_highlight: "calcium_carbonate_chalk",
    powdered_loose_blend: "ground_charcoal_dust",
  };
  return m[t];
}

export function bestTechnique(t: CharcoalPencilType): string {
  const m: Record<CharcoalPencilType, string> = {
    vine_willow_soft: "gesture_drawing_warmup",
    compressed_hard_stick: "bold_contrast_shadow",
    charcoal_pencil_wood: "fine_detail_portrait",
    white_charcoal_highlight: "toned_paper_highlight",
    powdered_loose_blend: "atmospheric_smooth_tone",
  };
  return m[t];
}

export function charcoalPencils(): CharcoalPencilType[] {
  return ["vine_willow_soft", "compressed_hard_stick", "charcoal_pencil_wood", "white_charcoal_highlight", "powdered_loose_blend"];
}
