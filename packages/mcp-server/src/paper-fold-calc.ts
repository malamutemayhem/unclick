export type PaperFold = "half_fold" | "tri_fold" | "z_fold" | "gate_fold" | "roll_fold";

export function panelCount(p: PaperFold): number {
  const m: Record<PaperFold, number> = {
    half_fold: 4, tri_fold: 6, z_fold: 6, gate_fold: 6, roll_fold: 8,
  };
  return m[p];
}

export function contentArea(p: PaperFold): number {
  const m: Record<PaperFold, number> = {
    half_fold: 4, tri_fold: 7, z_fold: 7, gate_fold: 8, roll_fold: 9,
  };
  return m[p];
}

export function foldComplexity(p: PaperFold): number {
  const m: Record<PaperFold, number> = {
    half_fold: 1, tri_fold: 4, z_fold: 5, gate_fold: 7, roll_fold: 6,
  };
  return m[p];
}

export function mailingEase(p: PaperFold): number {
  const m: Record<PaperFold, number> = {
    half_fold: 8, tri_fold: 10, z_fold: 9, gate_fold: 5, roll_fold: 7,
  };
  return m[p];
}

export function productionCost(p: PaperFold): number {
  const m: Record<PaperFold, number> = {
    half_fold: 2, tri_fold: 4, z_fold: 5, gate_fold: 8, roll_fold: 6,
  };
  return m[p];
}

export function selfMailer(p: PaperFold): boolean {
  const m: Record<PaperFold, boolean> = {
    half_fold: true, tri_fold: true, z_fold: true, gate_fold: false, roll_fold: false,
  };
  return m[p];
}

export function requiresScoring(p: PaperFold): boolean {
  const m: Record<PaperFold, boolean> = {
    half_fold: false, tri_fold: true, z_fold: true, gate_fold: true, roll_fold: true,
  };
  return m[p];
}

export function foldDirection(p: PaperFold): string {
  const m: Record<PaperFold, string> = {
    half_fold: "single_center_crease", tri_fold: "two_parallel_inward",
    z_fold: "two_parallel_accordion", gate_fold: "two_panels_meet_center",
    roll_fold: "sequential_inward_wrap",
  };
  return m[p];
}

export function bestUse(p: PaperFold): string {
  const m: Record<PaperFold, string> = {
    half_fold: "greeting_card_program", tri_fold: "brochure_direct_mail",
    z_fold: "map_reference_guide", gate_fold: "product_reveal_presentation",
    roll_fold: "multi_step_instruction",
  };
  return m[p];
}

export function paperFolds(): PaperFold[] {
  return ["half_fold", "tri_fold", "z_fold", "gate_fold", "roll_fold"];
}
