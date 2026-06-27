export type QuillFeather = "goose" | "swan" | "turkey" | "crow" | "ostrich";

export function barrelLengthCm(feather: QuillFeather): number {
  const lengths: Record<QuillFeather, number> = {
    goose: 20, swan: 25, turkey: 22, crow: 12, ostrich: 30,
  };
  return lengths[feather];
}

export function nibWidthMm(feather: QuillFeather): number {
  const widths: Record<QuillFeather, number> = {
    goose: 1.5, swan: 2.0, turkey: 1.8, crow: 0.5, ostrich: 2.5,
  };
  return widths[feather];
}

export function temperingTempCelsius(): number {
  return 60;
}

export function temperingTimeMinutes(): number {
  return 15;
}

export function cutsPerSharpening(feather: QuillFeather): number {
  const cuts: Record<QuillFeather, number> = {
    goose: 3, swan: 2, turkey: 3, crow: 4, ostrich: 2,
  };
  return cuts[feather];
}

export function inkCapacityMl(feather: QuillFeather): number {
  const ml: Record<QuillFeather, number> = {
    goose: 0.3, swan: 0.5, turkey: 0.35, crow: 0.1, ostrich: 0.6,
  };
  return ml[feather];
}

export function wordsPerDip(feather: QuillFeather): number {
  const words: Record<QuillFeather, number> = {
    goose: 8, swan: 12, turkey: 9, crow: 4, ostrich: 15,
  };
  return words[feather];
}

export function flexibilityRating(feather: QuillFeather): number {
  const flex: Record<QuillFeather, number> = {
    goose: 4, swan: 3, turkey: 4, crow: 5, ostrich: 2,
  };
  return flex[feather];
}

export function costPerQuill(feather: QuillFeather): number {
  const costs: Record<QuillFeather, number> = {
    goose: 3, swan: 8, turkey: 2, crow: 5, ostrich: 12,
  };
  return costs[feather];
}

export function quillFeathers(): QuillFeather[] {
  return ["goose", "swan", "turkey", "crow", "ostrich"];
}
