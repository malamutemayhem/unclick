export type AnvilType = "london_pattern" | "farrier" | "double_horn" | "stake" | "jeweler";

export function weightKg(anvil: AnvilType): number {
  const w: Record<AnvilType, number> = {
    london_pattern: 120, farrier: 60, double_horn: 100, stake: 15, jeweler: 2,
  };
  return w[anvil];
}

export function faceHardnessHrc(anvil: AnvilType): number {
  const f: Record<AnvilType, number> = {
    london_pattern: 55, farrier: 52, double_horn: 54, stake: 50, jeweler: 58,
  };
  return f[anvil];
}

export function reboundPercent(anvil: AnvilType): number {
  const r: Record<AnvilType, number> = {
    london_pattern: 90, farrier: 85, double_horn: 88, stake: 75, jeweler: 80,
  };
  return r[anvil];
}

export function hornCount(anvil: AnvilType): number {
  const h: Record<AnvilType, number> = {
    london_pattern: 1, farrier: 1, double_horn: 2, stake: 0, jeweler: 0,
  };
  return h[anvil];
}

export function hardyHole(anvil: AnvilType): boolean {
  const h: Record<AnvilType, boolean> = {
    london_pattern: true, farrier: true, double_horn: true, stake: false, jeweler: false,
  };
  return h[anvil];
}

export function portability(anvil: AnvilType): number {
  const p: Record<AnvilType, number> = {
    london_pattern: 1, farrier: 4, double_horn: 2, stake: 7, jeweler: 10,
  };
  return p[anvil];
}

export function bestProject(anvil: AnvilType): string {
  const b: Record<AnvilType, string> = {
    london_pattern: "general_blacksmithing", farrier: "horseshoes",
    double_horn: "artistic_metalwork", stake: "sheet_metal", jeweler: "rings",
  };
  return b[anvil];
}

export function noiseLevel(anvil: AnvilType): number {
  const n: Record<AnvilType, number> = {
    london_pattern: 9, farrier: 7, double_horn: 8, stake: 5, jeweler: 3,
  };
  return n[anvil];
}

export function costEstimate(anvil: AnvilType): number {
  const c: Record<AnvilType, number> = {
    london_pattern: 1500, farrier: 800, double_horn: 1200, stake: 200, jeweler: 150,
  };
  return c[anvil];
}

export function anvilTypes(): AnvilType[] {
  return ["london_pattern", "farrier", "double_horn", "stake", "jeweler"];
}
