export type Arcana = "major" | "minor";
export type Suit = "wands" | "cups" | "swords" | "pentacles";
export type SpreadType = "single" | "three_card" | "celtic_cross" | "horseshoe" | "star";

export function deckSize(): number {
  return 78;
}

export function majorArcanaCount(): number {
  return 22;
}

export function minorArcanaCount(): number {
  return 56;
}

export function cardsPerSuit(): number {
  return 14;
}

export function spreadSize(type: SpreadType): number {
  const sizes: Record<SpreadType, number> = {
    single: 1, three_card: 3, celtic_cross: 10, horseshoe: 7, star: 6,
  };
  return sizes[type];
}

export function drawProbability(targetCards: number, deckSize: number): number {
  if (deckSize === 0) return 0;
  return parseFloat((targetCards / deckSize).toFixed(4));
}

export function majorArcanaProbability(cardsDrawn: number): number {
  if (cardsDrawn > 78 || cardsDrawn <= 0) return 0;
  const noMajor = Array.from({ length: cardsDrawn }, (_, i) => (56 - i) / (78 - i))
    .reduce((a, b) => a * b, 1);
  return parseFloat((1 - noMajor).toFixed(4));
}

export function reversalProbability(): number {
  return 0.5;
}

export function suitElement(suit: Suit): string {
  const elements: Record<Suit, string> = {
    wands: "fire", cups: "water", swords: "air", pentacles: "earth",
  };
  return elements[suit];
}

export function cardNumber(name: string): number | null {
  const court: Record<string, number> = { page: 11, knight: 12, queen: 13, king: 14 };
  const lower = name.toLowerCase();
  if (court[lower] !== undefined) return court[lower];
  const n = parseInt(lower, 10);
  if (!isNaN(n) && n >= 1 && n <= 10) return n;
  return null;
}

export function readingTime(spreadType: SpreadType): number {
  const mins: Record<SpreadType, number> = {
    single: 5, three_card: 15, celtic_cross: 45, horseshoe: 30, star: 25,
  };
  return mins[spreadType];
}

export function shufflesRecommended(): number {
  return 7;
}

export function collectionValue(deckCount: number, avgDeckCost: number): number {
  return parseFloat((deckCount * avgDeckCost).toFixed(2));
}

export function spreadTypes(): SpreadType[] {
  return ["single", "three_card", "celtic_cross", "horseshoe", "star"];
}
