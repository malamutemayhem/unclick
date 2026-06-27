export type ThreadType = "linen" | "polyester" | "nylon" | "sinew" | "silk";

export function threadLengthMultiplier(): number {
  return 3.5;
}

export function stitchesPerCm(threadType: ThreadType): number {
  const spi: Record<ThreadType, number> = {
    linen: 3, polyester: 4, nylon: 4, sinew: 2, silk: 5,
  };
  return spi[threadType];
}

export function needleSizeMm(threadType: ThreadType): number {
  const sizes: Record<ThreadType, number> = {
    linen: 1.2, polyester: 1.0, nylon: 1.0, sinew: 1.5, silk: 0.8,
  };
  return sizes[threadType];
}

export function prickingIronSpacingMm(threadType: ThreadType): number {
  const spacing: Record<ThreadType, number> = {
    linen: 4, polyester: 3, nylon: 3, sinew: 5, silk: 2,
  };
  return spacing[threadType];
}

export function tensileStrengthKg(threadType: ThreadType): number {
  const strength: Record<ThreadType, number> = {
    linen: 8, polyester: 12, nylon: 15, sinew: 6, silk: 5,
  };
  return strength[threadType];
}

export function waxRequired(threadType: ThreadType): boolean {
  return threadType === "linen" || threadType === "sinew";
}

export function abrasionResistance(threadType: ThreadType): number {
  const ratings: Record<ThreadType, number> = {
    linen: 3, polyester: 5, nylon: 5, sinew: 2, silk: 1,
  };
  return ratings[threadType];
}

export function stitchingTimeMinsPerCm(threadType: ThreadType): number {
  const times: Record<ThreadType, number> = {
    linen: 2, polyester: 1.5, nylon: 1.5, sinew: 3, silk: 2.5,
  };
  return times[threadType];
}

export function costPerMeter(threadType: ThreadType): number {
  const costs: Record<ThreadType, number> = {
    linen: 1.5, polyester: 0.5, nylon: 0.8, sinew: 3, silk: 5,
  };
  return costs[threadType];
}

export function threadTypes(): ThreadType[] {
  return ["linen", "polyester", "nylon", "sinew", "silk"];
}
