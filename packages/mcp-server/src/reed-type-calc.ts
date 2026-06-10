export type ReedType = "single_cane" | "double_cane" | "synthetic_single" | "metal_free" | "plastic_beginner";

export function responseSpeed(reed: ReedType): number {
  const m: Record<ReedType, number> = {
    single_cane: 7, double_cane: 6, synthetic_single: 8, metal_free: 9, plastic_beginner: 5,
  };
  return m[reed];
}

export function toneRichness(reed: ReedType): number {
  const m: Record<ReedType, number> = {
    single_cane: 8, double_cane: 9, synthetic_single: 6, metal_free: 7, plastic_beginner: 3,
  };
  return m[reed];
}

export function durabilityWeeks(reed: ReedType): number {
  const m: Record<ReedType, number> = {
    single_cane: 2, double_cane: 1, synthetic_single: 12, metal_free: 20, plastic_beginner: 16,
  };
  return m[reed];
}

export function consistencyRating(reed: ReedType): number {
  const m: Record<ReedType, number> = {
    single_cane: 5, double_cane: 4, synthetic_single: 9, metal_free: 8, plastic_beginner: 7,
  };
  return m[reed];
}

export function moistureSensitivity(reed: ReedType): number {
  const m: Record<ReedType, number> = {
    single_cane: 9, double_cane: 10, synthetic_single: 2, metal_free: 1, plastic_beginner: 1,
  };
  return m[reed];
}

export function handmade(reed: ReedType): boolean {
  const m: Record<ReedType, boolean> = {
    single_cane: false, double_cane: true, synthetic_single: false, metal_free: false, plastic_beginner: false,
  };
  return m[reed];
}

export function weatherProof(reed: ReedType): boolean {
  const m: Record<ReedType, boolean> = {
    single_cane: false, double_cane: false, synthetic_single: true, metal_free: true, plastic_beginner: true,
  };
  return m[reed];
}

export function bestInstrument(reed: ReedType): string {
  const m: Record<ReedType, string> = {
    single_cane: "clarinet", double_cane: "oboe", synthetic_single: "saxophone",
    metal_free: "harmonica", plastic_beginner: "recorder",
  };
  return m[reed];
}

export function costPerReed(reed: ReedType): number {
  const m: Record<ReedType, number> = {
    single_cane: 3, double_cane: 20, synthetic_single: 15, metal_free: 8, plastic_beginner: 2,
  };
  return m[reed];
}

export function reedTypes(): ReedType[] {
  return ["single_cane", "double_cane", "synthetic_single", "metal_free", "plastic_beginner"];
}
