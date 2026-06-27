export type PoulticeType = "clay" | "herbal_fresh" | "charcoal" | "flaxseed" | "mustard";

export function drawingPower(poultice: PoulticeType): number {
  const m: Record<PoulticeType, number> = {
    clay: 8, herbal_fresh: 5, charcoal: 9, flaxseed: 4, mustard: 7,
  };
  return m[poultice];
}

export function applicationMinutes(poultice: PoulticeType): number {
  const m: Record<PoulticeType, number> = {
    clay: 30, herbal_fresh: 20, charcoal: 60, flaxseed: 45, mustard: 15,
  };
  return m[poultice];
}

export function heatRetention(poultice: PoulticeType): number {
  const m: Record<PoulticeType, number> = {
    clay: 7, herbal_fresh: 4, charcoal: 5, flaxseed: 9, mustard: 8,
  };
  return m[poultice];
}

export function skinSensitivity(poultice: PoulticeType): number {
  const m: Record<PoulticeType, number> = {
    clay: 2, herbal_fresh: 3, charcoal: 1, flaxseed: 1, mustard: 8,
  };
  return m[poultice];
}

export function prepComplexity(poultice: PoulticeType): number {
  const m: Record<PoulticeType, number> = {
    clay: 3, herbal_fresh: 5, charcoal: 4, flaxseed: 6, mustard: 3,
  };
  return m[poultice];
}

export function reusable(poultice: PoulticeType): boolean {
  const m: Record<PoulticeType, boolean> = {
    clay: true, herbal_fresh: false, charcoal: false, flaxseed: false, mustard: false,
  };
  return m[poultice];
}

export function heatingRequired(poultice: PoulticeType): boolean {
  const m: Record<PoulticeType, boolean> = {
    clay: false, herbal_fresh: false, charcoal: false, flaxseed: true, mustard: true,
  };
  return m[poultice];
}

export function bestApplication(poultice: PoulticeType): string {
  const m: Record<PoulticeType, string> = {
    clay: "insect_bites", herbal_fresh: "bruises", charcoal: "toxin_drawing",
    flaxseed: "chest_congestion", mustard: "muscle_pain",
  };
  return m[poultice];
}

export function costPerUse(poultice: PoulticeType): number {
  const m: Record<PoulticeType, number> = {
    clay: 2, herbal_fresh: 1, charcoal: 3, flaxseed: 1.5, mustard: 1,
  };
  return m[poultice];
}

export function poulticeTypes(): PoulticeType[] {
  return ["clay", "herbal_fresh", "charcoal", "flaxseed", "mustard"];
}
