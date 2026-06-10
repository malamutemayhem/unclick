export type FertilizerType = "urea" | "npk_compound" | "bone_meal" | "fish_emulsion" | "slow_release";

export function nitrogenContent(f: FertilizerType): number {
  const m: Record<FertilizerType, number> = {
    urea: 10, npk_compound: 7, bone_meal: 2, fish_emulsion: 5, slow_release: 6,
  };
  return m[f];
}

export function phosphorusContent(f: FertilizerType): number {
  const m: Record<FertilizerType, number> = {
    urea: 0, npk_compound: 7, bone_meal: 10, fish_emulsion: 4, slow_release: 5,
  };
  return m[f];
}

export function releaseSpeed(f: FertilizerType): number {
  const m: Record<FertilizerType, number> = {
    urea: 10, npk_compound: 8, bone_meal: 3, fish_emulsion: 7, slow_release: 2,
  };
  return m[f];
}

export function burnRisk(f: FertilizerType): number {
  const m: Record<FertilizerType, number> = {
    urea: 9, npk_compound: 6, bone_meal: 1, fish_emulsion: 2, slow_release: 1,
  };
  return m[f];
}

export function soilHealthBenefit(f: FertilizerType): number {
  const m: Record<FertilizerType, number> = {
    urea: 2, npk_compound: 3, bone_meal: 7, fish_emulsion: 9, slow_release: 5,
  };
  return m[f];
}

export function organic(f: FertilizerType): boolean {
  const m: Record<FertilizerType, boolean> = {
    urea: false, npk_compound: false, bone_meal: true, fish_emulsion: true, slow_release: false,
  };
  return m[f];
}

export function waterSoluble(f: FertilizerType): boolean {
  const m: Record<FertilizerType, boolean> = {
    urea: true, npk_compound: true, bone_meal: false, fish_emulsion: true, slow_release: false,
  };
  return m[f];
}

export function bestCrop(f: FertilizerType): string {
  const m: Record<FertilizerType, string> = {
    urea: "corn", npk_compound: "vegetables", bone_meal: "bulbs",
    fish_emulsion: "tomatoes", slow_release: "lawn",
  };
  return m[f];
}

export function applicationFrequency(f: FertilizerType): number {
  const m: Record<FertilizerType, number> = {
    urea: 8, npk_compound: 6, bone_meal: 2, fish_emulsion: 8, slow_release: 2,
  };
  return m[f];
}

export function fertilizerTypes(): FertilizerType[] {
  return ["urea", "npk_compound", "bone_meal", "fish_emulsion", "slow_release"];
}
