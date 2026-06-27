export type SandpaperGrit = "coarse" | "medium" | "fine" | "very_fine" | "ultra_fine";

export function gritNumber(s: SandpaperGrit): number {
  const m: Record<SandpaperGrit, number> = {
    coarse: 60, medium: 120, fine: 220, very_fine: 400, ultra_fine: 1000,
  };
  return m[s];
}

export function materialRemoval(s: SandpaperGrit): number {
  const m: Record<SandpaperGrit, number> = {
    coarse: 10, medium: 7, fine: 4, very_fine: 2, ultra_fine: 1,
  };
  return m[s];
}

export function surfaceQuality(s: SandpaperGrit): number {
  const m: Record<SandpaperGrit, number> = {
    coarse: 2, medium: 5, fine: 7, very_fine: 9, ultra_fine: 10,
  };
  return m[s];
}

export function durability(s: SandpaperGrit): number {
  const m: Record<SandpaperGrit, number> = {
    coarse: 8, medium: 7, fine: 5, very_fine: 3, ultra_fine: 2,
  };
  return m[s];
}

export function dustProduction(s: SandpaperGrit): number {
  const m: Record<SandpaperGrit, number> = {
    coarse: 10, medium: 7, fine: 5, very_fine: 3, ultra_fine: 1,
  };
  return m[s];
}

export function usedByHand(s: SandpaperGrit): boolean {
  const m: Record<SandpaperGrit, boolean> = {
    coarse: false, medium: true, fine: true, very_fine: true, ultra_fine: true,
  };
  return m[s];
}

export function suitableForFinishPrep(s: SandpaperGrit): boolean {
  const m: Record<SandpaperGrit, boolean> = {
    coarse: false, medium: false, fine: true, very_fine: true, ultra_fine: true,
  };
  return m[s];
}

export function primaryTask(s: SandpaperGrit): string {
  const m: Record<SandpaperGrit, string> = {
    coarse: "shaping_stripping", medium: "general_smoothing",
    fine: "pre_finish_sanding", very_fine: "between_coat_sanding",
    ultra_fine: "polishing_buffing",
  };
  return m[s];
}

export function backingType(s: SandpaperGrit): string {
  const m: Record<SandpaperGrit, string> = {
    coarse: "cloth_heavy", medium: "paper_c_weight",
    fine: "paper_a_weight", very_fine: "paper_a_weight",
    ultra_fine: "film_backed",
  };
  return m[s];
}

export function sandpaperGrits(): SandpaperGrit[] {
  return ["coarse", "medium", "fine", "very_fine", "ultra_fine"];
}
