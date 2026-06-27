export type CopticVariant = "basic" | "paired" | "caterpillar" | "crossed" | "ethiopian";

export function stationsCount(spineHeightCm: number): number {
  return Math.max(3, Math.ceil(spineHeightCm / 3));
}

export function threadLength(signatures: number, spineHeightCm: number): number {
  return Math.round(signatures * spineHeightCm * 2.5);
}

export function chainLinkHeight(variant: CopticVariant): number {
  const heights: Record<CopticVariant, number> = {
    basic: 3, paired: 5, caterpillar: 4, crossed: 6, ethiopian: 4,
  };
  return heights[variant];
}

export function laysFlat(variant: CopticVariant): boolean {
  return variant !== "ethiopian";
}

export function decorativeRating(variant: CopticVariant): number {
  const dec: Record<CopticVariant, number> = {
    basic: 3, paired: 4, caterpillar: 5, crossed: 5, ethiopian: 4,
  };
  return dec[variant];
}

export function difficultyRating(variant: CopticVariant): number {
  const diff: Record<CopticVariant, number> = {
    basic: 1, paired: 3, caterpillar: 4, crossed: 5, ethiopian: 3,
  };
  return diff[variant];
}

export function sewingTimeMinutesPerSig(variant: CopticVariant): number {
  const mins: Record<CopticVariant, number> = {
    basic: 5, paired: 8, caterpillar: 10, crossed: 12, ethiopian: 7,
  };
  return mins[variant];
}

export function coverRequired(): boolean {
  return false;
}

export function costPerBook(variant: CopticVariant): number {
  const costs: Record<CopticVariant, number> = {
    basic: 5, paired: 7, caterpillar: 9, crossed: 11, ethiopian: 8,
  };
  return costs[variant];
}

export function copticVariants(): CopticVariant[] {
  return ["basic", "paired", "caterpillar", "crossed", "ethiopian"];
}
