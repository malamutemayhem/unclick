export type BowType = "recurve" | "compound" | "longbow" | "crossbow" | "flatbow";

export function drawWeight(b: BowType): number {
  const m: Record<BowType, number> = {
    recurve: 6, compound: 8, longbow: 7, crossbow: 10, flatbow: 5,
  };
  return m[b];
}

export function accuracy(b: BowType): number {
  const m: Record<BowType, number> = {
    recurve: 7, compound: 10, longbow: 5, crossbow: 9, flatbow: 4,
  };
  return m[b];
}

export function portability(b: BowType): number {
  const m: Record<BowType, number> = {
    recurve: 8, compound: 5, longbow: 4, crossbow: 6, flatbow: 7,
  };
  return m[b];
}

export function letoff(b: BowType): number {
  const m: Record<BowType, number> = {
    recurve: 0, compound: 9, longbow: 0, crossbow: 10, flatbow: 0,
  };
  return m[b];
}

export function historicalAge(b: BowType): number {
  const m: Record<BowType, number> = {
    recurve: 8, compound: 2, longbow: 10, crossbow: 7, flatbow: 9,
  };
  return m[b];
}

export function usesCams(b: BowType): boolean {
  const m: Record<BowType, boolean> = {
    recurve: false, compound: true, longbow: false, crossbow: false, flatbow: false,
  };
  return m[b];
}

export function olympicSport(b: BowType): boolean {
  const m: Record<BowType, boolean> = {
    recurve: true, compound: false, longbow: false, crossbow: false, flatbow: false,
  };
  return m[b];
}

export function bestUse(b: BowType): string {
  const m: Record<BowType, string> = {
    recurve: "target_olympic", compound: "hunting_target",
    longbow: "traditional_historical", crossbow: "hunting_tactical",
    flatbow: "primitive_survival",
  };
  return m[b];
}

export function materialTypical(b: BowType): string {
  const m: Record<BowType, string> = {
    recurve: "fiberglass_carbon_wood", compound: "aluminum_carbon",
    longbow: "yew_ash_elm", crossbow: "composite_metal",
    flatbow: "osage_hickory",
  };
  return m[b];
}

export function bowTypes(): BowType[] {
  return ["recurve", "compound", "longbow", "crossbow", "flatbow"];
}
