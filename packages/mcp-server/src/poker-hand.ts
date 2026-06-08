import type { Card, Rank, Suit } from "./card-deck.js";

export type HandRank =
  | "high-card"
  | "one-pair"
  | "two-pair"
  | "three-of-a-kind"
  | "straight"
  | "flush"
  | "full-house"
  | "four-of-a-kind"
  | "straight-flush"
  | "royal-flush";

const RANK_VALUES: Record<Rank, number> = {
  "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8,
  "9": 9, "10": 10, "J": 11, "Q": 12, "K": 13, "A": 14,
};

const HAND_RANK_VALUES: Record<HandRank, number> = {
  "high-card": 0,
  "one-pair": 1,
  "two-pair": 2,
  "three-of-a-kind": 3,
  "straight": 4,
  "flush": 5,
  "full-house": 6,
  "four-of-a-kind": 7,
  "straight-flush": 8,
  "royal-flush": 9,
};

export interface HandEvaluation {
  rank: HandRank;
  rankValue: number;
  highCards: number[];
  description: string;
}

export class PokerEvaluator {
  static evaluate(cards: Card[]): HandEvaluation {
    if (cards.length < 5) {
      return {
        rank: "high-card",
        rankValue: 0,
        highCards: cards
          .map((c) => RANK_VALUES[c.rank])
          .sort((a, b) => b - a),
        description: "Not enough cards",
      };
    }

    const hand = cards.slice(0, 5);
    const values = hand.map((c) => RANK_VALUES[c.rank]).sort((a, b) => b - a);
    const suits = hand.map((c) => c.suit);

    const isFlush = suits.every((s) => s === suits[0]);
    const isStraight = PokerEvaluator.checkStraight(values);

    const counts = PokerEvaluator.countRanks(hand);
    const groups = Object.values(counts).sort((a, b) => b - a);

    if (isFlush && isStraight && values[0] === 14 && values[1] === 13) {
      return { rank: "royal-flush", rankValue: 9, highCards: values, description: "Royal Flush" };
    }
    if (isFlush && isStraight) {
      return { rank: "straight-flush", rankValue: 8, highCards: values, description: `Straight Flush, ${values[0]} high` };
    }
    if (groups[0] === 4) {
      return { rank: "four-of-a-kind", rankValue: 7, highCards: values, description: "Four of a Kind" };
    }
    if (groups[0] === 3 && groups[1] === 2) {
      return { rank: "full-house", rankValue: 6, highCards: values, description: "Full House" };
    }
    if (isFlush) {
      return { rank: "flush", rankValue: 5, highCards: values, description: `Flush, ${values[0]} high` };
    }
    if (isStraight) {
      return { rank: "straight", rankValue: 4, highCards: values, description: `Straight, ${values[0]} high` };
    }
    if (groups[0] === 3) {
      return { rank: "three-of-a-kind", rankValue: 3, highCards: values, description: "Three of a Kind" };
    }
    if (groups[0] === 2 && groups[1] === 2) {
      return { rank: "two-pair", rankValue: 2, highCards: values, description: "Two Pair" };
    }
    if (groups[0] === 2) {
      return { rank: "one-pair", rankValue: 1, highCards: values, description: "One Pair" };
    }

    return { rank: "high-card", rankValue: 0, highCards: values, description: `High Card ${values[0]}` };
  }

  static compare(a: Card[], b: Card[]): number {
    const evalA = PokerEvaluator.evaluate(a);
    const evalB = PokerEvaluator.evaluate(b);
    if (evalA.rankValue !== evalB.rankValue) {
      return evalA.rankValue - evalB.rankValue;
    }
    for (let i = 0; i < evalA.highCards.length; i++) {
      if (evalA.highCards[i] !== evalB.highCards[i]) {
        return evalA.highCards[i] - evalB.highCards[i];
      }
    }
    return 0;
  }

  static handRankValue(rank: HandRank): number {
    return HAND_RANK_VALUES[rank];
  }

  private static checkStraight(sortedValues: number[]): boolean {
    for (let i = 0; i < sortedValues.length - 1; i++) {
      if (sortedValues[i] - sortedValues[i + 1] !== 1) {
        if (
          i === 0 &&
          sortedValues[0] === 14 &&
          sortedValues[1] === 5
        ) {
          continue;
        }
        return false;
      }
    }
    return true;
  }

  private static countRanks(cards: Card[]): Record<string, number> {
    const counts: Record<string, number> = {};
    for (const card of cards) {
      counts[card.rank] = (counts[card.rank] || 0) + 1;
    }
    return counts;
  }
}
