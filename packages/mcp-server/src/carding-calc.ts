export type CardingMethod = "hand_cards" | "drum_carder" | "flick_card" | "combs" | "blending_board";

export function outputGramsPerHour(method: CardingMethod): number {
  const g: Record<CardingMethod, number> = {
    hand_cards: 30, drum_carder: 200, flick_card: 20, combs: 15, blending_board: 50,
  };
  return g[method];
}

export function fiberAlignment(method: CardingMethod): number {
  const a: Record<CardingMethod, number> = {
    hand_cards: 5, drum_carder: 4, flick_card: 7, combs: 10, blending_board: 3,
  };
  return a[method];
}

export function vmRemoval(method: CardingMethod): number {
  const v: Record<CardingMethod, number> = {
    hand_cards: 6, drum_carder: 4, flick_card: 8, combs: 9, blending_board: 3,
  };
  return v[method];
}

export function blendingCapability(method: CardingMethod): number {
  const b: Record<CardingMethod, number> = {
    hand_cards: 7, drum_carder: 9, flick_card: 3, combs: 2, blending_board: 10,
  };
  return b[method];
}

export function outputForm(method: CardingMethod): string {
  const f: Record<CardingMethod, string> = {
    hand_cards: "rolag", drum_carder: "batt", flick_card: "lock",
    combs: "top", blending_board: "rolag",
  };
  return f[method];
}

export function portability(method: CardingMethod): number {
  const p: Record<CardingMethod, number> = {
    hand_cards: 9, drum_carder: 3, flick_card: 10, combs: 7, blending_board: 6,
  };
  return p[method];
}

export function fiberWastePercent(method: CardingMethod): number {
  const w: Record<CardingMethod, number> = {
    hand_cards: 5, drum_carder: 3, flick_card: 8, combs: 20, blending_board: 2,
  };
  return w[method];
}

export function skillLevel(method: CardingMethod): number {
  const s: Record<CardingMethod, number> = {
    hand_cards: 4, drum_carder: 3, flick_card: 2, combs: 7, blending_board: 3,
  };
  return s[method];
}

export function costEstimate(method: CardingMethod): number {
  const c: Record<CardingMethod, number> = {
    hand_cards: 40, drum_carder: 300, flick_card: 15, combs: 80, blending_board: 60,
  };
  return c[method];
}

export function cardingMethods(): CardingMethod[] {
  return ["hand_cards", "drum_carder", "flick_card", "combs", "blending_board"];
}
