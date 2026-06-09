export type Suit = "H" | "D" | "C" | "S";
export type Rank = "A" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "T" | "J" | "Q" | "K";

export interface Card {
  rank: Rank;
  suit: Suit;
}

export interface ScoreBreakdown {
  fifteens: number;
  pairs: number;
  runs: number;
  flush: number;
  nobs: number;
  total: number;
}

const RANK_VALUES: Record<Rank, number> = {
  A: 1, "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7,
  "8": 8, "9": 9, T: 10, J: 10, Q: 10, K: 10,
};

const RANK_ORDER: Record<Rank, number> = {
  A: 1, "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7,
  "8": 8, "9": 9, T: 10, J: 11, Q: 12, K: 13,
};

export function cardValue(card: Card): number {
  return RANK_VALUES[card.rank];
}

export function cardOrder(card: Card): number {
  return RANK_ORDER[card.rank];
}

export function createCard(rank: Rank, suit: Suit): Card {
  return { rank, suit };
}

export function parseCard(str: string): Card {
  return { rank: str[0] as Rank, suit: str[1] as Suit };
}

export function formatCard(card: Card): string {
  return `${card.rank}${card.suit}`;
}

function subsets(cards: Card[]): Card[][] {
  const result: Card[][] = [];
  const n = cards.length;
  for (let mask = 1; mask < (1 << n); mask++) {
    const subset: Card[] = [];
    for (let i = 0; i < n; i++) {
      if (mask & (1 << i)) subset.push(cards[i]);
    }
    result.push(subset);
  }
  return result;
}

export function countFifteens(cards: Card[]): number {
  let count = 0;
  for (const subset of subsets(cards)) {
    const sum = subset.reduce((acc, c) => acc + cardValue(c), 0);
    if (sum === 15) count++;
  }
  return count * 2;
}

export function countPairs(cards: Card[]): number {
  let count = 0;
  for (let i = 0; i < cards.length; i++) {
    for (let j = i + 1; j < cards.length; j++) {
      if (cards[i].rank === cards[j].rank) count++;
    }
  }
  return count * 2;
}

export function countRuns(cards: Card[]): number {
  const orders = cards.map(c => cardOrder(c)).sort((a, b) => a - b);
  let points = 0;

  for (let len = cards.length; len >= 3; len--) {
    let found = false;
    for (const subset of subsets(cards)) {
      if (subset.length !== len) continue;
      const sorted = subset.map(c => cardOrder(c)).sort((a, b) => a - b);
      let isRun = true;
      for (let i = 1; i < sorted.length; i++) {
        if (sorted[i] !== sorted[i - 1] + 1) { isRun = false; break; }
      }
      if (isRun) {
        points += len;
        found = true;
      }
    }
    if (found) return points;
  }
  return 0;
}

export function countFlush(hand: Card[], starter: Card, isCrib: boolean): number {
  const handSuits = hand.map(c => c.suit);
  const allSame = handSuits.every(s => s === handSuits[0]);
  if (!allSame) return 0;
  if (starter.suit === handSuits[0]) return 5;
  if (isCrib) return 0;
  return 4;
}

export function countNobs(hand: Card[], starter: Card): number {
  for (const card of hand) {
    if (card.rank === "J" && card.suit === starter.suit) return 1;
  }
  return 0;
}

export function scoreHand(hand: Card[], starter: Card, isCrib = false): ScoreBreakdown {
  const allCards = [...hand, starter];
  const fifteens = countFifteens(allCards);
  const pairs = countPairs(allCards);
  const runs = countRuns(allCards);
  const flush = countFlush(hand, starter, isCrib);
  const nobs = countNobs(hand, starter);
  return {
    fifteens,
    pairs,
    runs,
    flush,
    nobs,
    total: fifteens + pairs + runs + flush + nobs,
  };
}

export function pegPoints(played: Card[]): number {
  if (played.length === 0) return 0;
  let points = 0;
  const sum = played.reduce((acc, c) => acc + cardValue(c), 0);
  if (sum === 15) points += 2;
  if (sum === 31) points += 2;

  let pairCount = 0;
  const last = played[played.length - 1];
  for (let i = played.length - 2; i >= 0; i--) {
    if (played[i].rank === last.rank) pairCount++;
    else break;
  }
  if (pairCount === 1) points += 2;
  if (pairCount === 2) points += 6;
  if (pairCount === 3) points += 12;

  for (let len = played.length; len >= 3; len--) {
    const tail = played.slice(played.length - len);
    const sorted = tail.map(c => cardOrder(c)).sort((a, b) => a - b);
    let isRun = true;
    for (let i = 1; i < sorted.length; i++) {
      if (sorted[i] !== sorted[i - 1] + 1) { isRun = false; break; }
    }
    if (isRun) { points += len; break; }
  }
  return points;
}

export function maxPossibleHandScore(): number {
  return 29;
}

export function isNineteerHand(score: ScoreBreakdown): boolean {
  return score.total === 19;
}

export function bestDiscard(hand: Card[], _possibleStarters?: Card[]): { keep: Card[]; discard: Card[] } {
  let bestScore = -1;
  let bestKeep: Card[] = [];
  let bestDiscard: Card[] = [];

  for (let i = 0; i < hand.length; i++) {
    for (let j = i + 1; j < hand.length; j++) {
      const keep = hand.filter((_, idx) => idx !== i && idx !== j);
      const discard = [hand[i], hand[j]];
      let totalScore = 0;
      const ranks: Rank[] = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K"];
      const suits: Suit[] = ["H", "D", "C", "S"];
      let count = 0;
      for (const r of ranks) {
        for (const s of suits) {
          const starter = createCard(r, s);
          if (hand.some(c => c.rank === r && c.suit === s)) continue;
          totalScore += scoreHand(keep, starter).total;
          count++;
        }
      }
      const avg = count > 0 ? totalScore / count : 0;
      if (avg > bestScore) {
        bestScore = avg;
        bestKeep = keep;
        bestDiscard = discard;
      }
    }
  }
  return { keep: bestKeep, discard: bestDiscard };
}
