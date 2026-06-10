export type HiveFrame = "langstroth_deep" | "langstroth_medium" | "langstroth_shallow" | "top_bar" | "warre";

export function honeyCapacity(f: HiveFrame): number {
  const m: Record<HiveFrame, number> = {
    langstroth_deep: 9, langstroth_medium: 7, langstroth_shallow: 5, top_bar: 6, warre: 4,
  };
  return m[f];
}

export function broodSpace(f: HiveFrame): number {
  const m: Record<HiveFrame, number> = {
    langstroth_deep: 10, langstroth_medium: 7, langstroth_shallow: 3, top_bar: 6, warre: 5,
  };
  return m[f];
}

export function liftingWeight(f: HiveFrame): number {
  const m: Record<HiveFrame, number> = {
    langstroth_deep: 10, langstroth_medium: 7, langstroth_shallow: 4, top_bar: 5, warre: 6,
  };
  return m[f];
}

export function inspectionEase(f: HiveFrame): number {
  const m: Record<HiveFrame, number> = {
    langstroth_deep: 6, langstroth_medium: 7, langstroth_shallow: 8, top_bar: 10, warre: 4,
  };
  return m[f];
}

export function availabilityScore(f: HiveFrame): number {
  const m: Record<HiveFrame, number> = {
    langstroth_deep: 10, langstroth_medium: 10, langstroth_shallow: 9, top_bar: 5, warre: 3,
  };
  return m[f];
}

export function foundationRequired(f: HiveFrame): boolean {
  const m: Record<HiveFrame, boolean> = {
    langstroth_deep: true, langstroth_medium: true, langstroth_shallow: true, top_bar: false, warre: false,
  };
  return m[f];
}

export function extractorCompatible(f: HiveFrame): boolean {
  const m: Record<HiveFrame, boolean> = {
    langstroth_deep: true, langstroth_medium: true, langstroth_shallow: true, top_bar: false, warre: false,
  };
  return m[f];
}

export function typicalUse(f: HiveFrame): string {
  const m: Record<HiveFrame, string> = {
    langstroth_deep: "brood_chamber", langstroth_medium: "honey_super_brood",
    langstroth_shallow: "honey_super_only", top_bar: "natural_beekeeping",
    warre: "minimal_intervention",
  };
  return m[f];
}

export function combStyle(f: HiveFrame): string {
  const m: Record<HiveFrame, string> = {
    langstroth_deep: "wired_foundation", langstroth_medium: "wired_foundation",
    langstroth_shallow: "thin_foundation", top_bar: "natural_free_form",
    warre: "natural_top_bar",
  };
  return m[f];
}

export function hiveFrames(): HiveFrame[] {
  return ["langstroth_deep", "langstroth_medium", "langstroth_shallow", "top_bar", "warre"];
}
