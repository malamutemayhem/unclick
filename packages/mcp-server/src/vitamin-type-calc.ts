export type VitaminType = "a" | "b12" | "c" | "d" | "k";

export function dailyValueMcg(v: VitaminType): number {
  const m: Record<VitaminType, number> = {
    a: 900, b12: 2.4, c: 90000, d: 20, k: 120,
  };
  return m[v];
}

export function deficiencyRisk(v: VitaminType): number {
  const m: Record<VitaminType, number> = {
    a: 4, b12: 7, c: 3, d: 9, k: 2,
  };
  return m[v];
}

export function absorptionEase(v: VitaminType): number {
  const m: Record<VitaminType, number> = {
    a: 7, b12: 4, c: 9, d: 6, k: 7,
  };
  return m[v];
}

export function storageCapability(v: VitaminType): number {
  const m: Record<VitaminType, number> = {
    a: 9, b12: 8, c: 2, d: 7, k: 5,
  };
  return m[v];
}

export function toxicityRisk(v: VitaminType): number {
  const m: Record<VitaminType, number> = {
    a: 7, b12: 1, c: 2, d: 6, k: 3,
  };
  return m[v];
}

export function fatSoluble(v: VitaminType): boolean {
  const m: Record<VitaminType, boolean> = {
    a: true, b12: false, c: false, d: true, k: true,
  };
  return m[v];
}

export function synthesizedByBody(v: VitaminType): boolean {
  const m: Record<VitaminType, boolean> = {
    a: false, b12: false, c: false, d: true, k: true,
  };
  return m[v];
}

export function bestSource(v: VitaminType): string {
  const m: Record<VitaminType, string> = {
    a: "liver", b12: "shellfish", c: "citrus_fruits",
    d: "sunlight", k: "leafy_greens",
  };
  return m[v];
}

export function primaryFunction(v: VitaminType): string {
  const m: Record<VitaminType, string> = {
    a: "vision", b12: "nerve_function", c: "immune_support",
    d: "calcium_absorption", k: "blood_clotting",
  };
  return m[v];
}

export function vitaminTypes(): VitaminType[] {
  return ["a", "b12", "c", "d", "k"];
}
