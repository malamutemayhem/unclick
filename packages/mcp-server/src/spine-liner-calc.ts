export type SpineLinerType = "mull_open_weave" | "super_cloth_tight" | "kraft_paper_strip" | "japanese_tissue_thin" | "linen_hinge_tape";

export function adhesion(t: SpineLinerType): number {
  const m: Record<SpineLinerType, number> = {
    mull_open_weave: 9, super_cloth_tight: 10, kraft_paper_strip: 6, japanese_tissue_thin: 7, linen_hinge_tape: 8,
  };
  return m[t];
}

export function flexibility(t: SpineLinerType): number {
  const m: Record<SpineLinerType, number> = {
    mull_open_weave: 8, super_cloth_tight: 6, kraft_paper_strip: 5, japanese_tissue_thin: 10, linen_hinge_tape: 7,
  };
  return m[t];
}

export function strength(t: SpineLinerType): number {
  const m: Record<SpineLinerType, number> = {
    mull_open_weave: 7, super_cloth_tight: 10, kraft_paper_strip: 6, japanese_tissue_thin: 4, linen_hinge_tape: 9,
  };
  return m[t];
}

export function transparency(t: SpineLinerType): number {
  const m: Record<SpineLinerType, number> = {
    mull_open_weave: 5, super_cloth_tight: 3, kraft_paper_strip: 2, japanese_tissue_thin: 10, linen_hinge_tape: 4,
  };
  return m[t];
}

export function linerCost(t: SpineLinerType): number {
  const m: Record<SpineLinerType, number> = {
    mull_open_weave: 1, super_cloth_tight: 2, kraft_paper_strip: 1, japanese_tissue_thin: 3, linen_hinge_tape: 3,
  };
  return m[t];
}

export function selfAdhesive(t: SpineLinerType): boolean {
  const m: Record<SpineLinerType, boolean> = {
    mull_open_weave: false, super_cloth_tight: false, kraft_paper_strip: false, japanese_tissue_thin: false, linen_hinge_tape: true,
  };
  return m[t];
}

export function archival(t: SpineLinerType): boolean {
  const m: Record<SpineLinerType, boolean> = {
    mull_open_weave: true, super_cloth_tight: true, kraft_paper_strip: false, japanese_tissue_thin: true, linen_hinge_tape: true,
  };
  return m[t];
}

export function linerFiber(t: SpineLinerType): string {
  const m: Record<SpineLinerType, string> = {
    mull_open_weave: "cotton_gauze_open",
    super_cloth_tight: "polyester_dense_weave",
    kraft_paper_strip: "wood_pulp_brown",
    japanese_tissue_thin: "kozo_long_fiber",
    linen_hinge_tape: "flax_gummed_strip",
  };
  return m[t];
}

export function bestUse(t: SpineLinerType): string {
  const m: Record<SpineLinerType, string> = {
    mull_open_weave: "case_binding_spine",
    super_cloth_tight: "heavy_text_block",
    kraft_paper_strip: "hollow_back_tube",
    japanese_tissue_thin: "repair_spine_mend",
    linen_hinge_tape: "quick_hinge_repair",
  };
  return m[t];
}

export function spineLiners(): SpineLinerType[] {
  return ["mull_open_weave", "super_cloth_tight", "kraft_paper_strip", "japanese_tissue_thin", "linen_hinge_tape"];
}
