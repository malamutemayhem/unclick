export type TrussType = "king_post" | "queen_post" | "howe" | "pratt" | "warren";

export function spanMeters(truss: TrussType): number {
  const m: Record<TrussType, number> = {
    king_post: 8, queen_post: 12, howe: 30, pratt: 35, warren: 40,
  };
  return m[truss];
}

export function loadCapacityKn(truss: TrussType): number {
  const m: Record<TrussType, number> = {
    king_post: 50, queen_post: 80, howe: 200, pratt: 250, warren: 220,
  };
  return m[truss];
}

export function memberCount(truss: TrussType): number {
  const m: Record<TrussType, number> = {
    king_post: 5, queen_post: 7, howe: 15, pratt: 15, warren: 11,
  };
  return m[truss];
}

export function fabricationComplexity(truss: TrussType): number {
  const m: Record<TrussType, number> = {
    king_post: 2, queen_post: 4, howe: 7, pratt: 7, warren: 5,
  };
  return m[truss];
}

export function deflectionResistance(truss: TrussType): number {
  const m: Record<TrussType, number> = {
    king_post: 4, queen_post: 6, howe: 8, pratt: 9, warren: 8,
  };
  return m[truss];
}

export function woodSuitable(truss: TrussType): boolean {
  const m: Record<TrussType, boolean> = {
    king_post: true, queen_post: true, howe: true, pratt: false, warren: false,
  };
  return m[truss];
}

export function steelRequired(truss: TrussType): boolean {
  const m: Record<TrussType, boolean> = {
    king_post: false, queen_post: false, howe: false, pratt: true, warren: true,
  };
  return m[truss];
}

export function bestApplication(truss: TrussType): string {
  const m: Record<TrussType, string> = {
    king_post: "small_roof", queen_post: "barn", howe: "bridge",
    pratt: "industrial_roof", warren: "long_span_bridge",
  };
  return m[truss];
}

export function costPerMeter(truss: TrussType): number {
  const m: Record<TrussType, number> = {
    king_post: 150, queen_post: 250, howe: 500, pratt: 600, warren: 550,
  };
  return m[truss];
}

export function trussTypes(): TrussType[] {
  return ["king_post", "queen_post", "howe", "pratt", "warren"];
}
