export type Suit = "hearts" | "diamonds" | "clubs" | "spades";
export type Rank =
  | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10"
  | "J" | "Q" | "K" | "A";

export interface Card {
  suit: Suit;
  rank: Rank;
}

const SUITS: Suit[] = ["hearts", "diamonds", "clubs", "spades"];
const RANKS: Rank[] = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

export class Deck {
  private cards: Card[] = [];

  constructor(decks = 1) {
    for (let d = 0; d < decks; d++) {
      for (const suit of SUITS) {
        for (const rank of RANKS) {
          this.cards.push({ suit, rank });
        }
      }
    }
  }

  shuffle(): void {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  draw(): Card | undefined {
    return this.cards.pop();
  }

  drawMany(count: number): Card[] {
    const result: Card[] = [];
    for (let i = 0; i < count; i++) {
      const card = this.draw();
      if (!card) break;
      result.push(card);
    }
    return result;
  }

  peek(): Card | undefined {
    return this.cards[this.cards.length - 1];
  }

  remaining(): number {
    return this.cards.length;
  }

  isEmpty(): boolean {
    return this.cards.length === 0;
  }

  addToBottom(card: Card): void {
    this.cards.unshift(card);
  }

  addToTop(card: Card): void {
    this.cards.push(card);
  }

  cut(position?: number): void {
    const pos = position ?? Math.floor(this.cards.length / 2);
    const top = this.cards.splice(0, pos);
    this.cards.push(...top);
  }

  reset(decks = 1): void {
    this.cards = [];
    for (let d = 0; d < decks; d++) {
      for (const suit of SUITS) {
        for (const rank of RANKS) {
          this.cards.push({ suit, rank });
        }
      }
    }
  }

  static cardValue(card: Card): number {
    const index = RANKS.indexOf(card.rank);
    return index + 2;
  }

  static cardName(card: Card): string {
    return `${card.rank} of ${card.suit}`;
  }

  static compare(a: Card, b: Card): number {
    return Deck.cardValue(a) - Deck.cardValue(b);
  }

  toArray(): Card[] {
    return [...this.cards];
  }
}

export class Hand {
  private cards: Card[] = [];

  add(card: Card): void {
    this.cards.push(card);
  }

  addMany(cards: Card[]): void {
    this.cards.push(...cards);
  }

  remove(index: number): Card | undefined {
    if (index < 0 || index >= this.cards.length) return undefined;
    return this.cards.splice(index, 1)[0];
  }

  get(index: number): Card | undefined {
    return this.cards[index];
  }

  size(): number {
    return this.cards.length;
  }

  sort(): void {
    this.cards.sort(Deck.compare);
  }

  clear(): Card[] {
    const all = [...this.cards];
    this.cards = [];
    return all;
  }

  toArray(): Card[] {
    return [...this.cards];
  }

  toString(): string {
    return this.cards.map(Deck.cardName).join(", ");
  }
}
