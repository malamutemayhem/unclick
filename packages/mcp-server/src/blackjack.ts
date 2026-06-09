export type Suit = "hearts" | "diamonds" | "clubs" | "spades";
export type Rank = "A" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "J" | "Q" | "K";

export interface Card {
  rank: Rank;
  suit: Suit;
}

export interface Hand {
  cards: Card[];
}

export interface BlackjackGame {
  deck: Card[];
  player: Hand;
  dealer: Hand;
  state: "betting" | "playing" | "dealer-turn" | "done";
  result: "player-win" | "dealer-win" | "push" | "blackjack" | null;
}

const RANKS: Rank[] = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
const SUITS: Suit[] = ["hearts", "diamonds", "clubs", "spades"];

export function createDeck(): Card[] {
  const deck: Card[] = [];
  for (const suit of SUITS) {
    for (const rank of RANKS) {
      deck.push({ rank, suit });
    }
  }
  return deck;
}

export function shuffleDeck(deck: Card[], seed = 42): Card[] {
  const shuffled = [...deck];
  let state = seed;
  const rand = () => {
    state = (state * 1103515245 + 12345) & 0x7fffffff;
    return state / 0x7fffffff;
  };

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function cardValue(rank: Rank): number {
  if (rank === "A") return 11;
  if (["J", "Q", "K"].includes(rank)) return 10;
  return parseInt(rank);
}

export function handValue(hand: Hand): number {
  let total = 0;
  let aces = 0;

  for (const card of hand.cards) {
    const v = cardValue(card.rank);
    total += v;
    if (card.rank === "A") aces++;
  }

  while (total > 21 && aces > 0) {
    total -= 10;
    aces--;
  }

  return total;
}

export function isBust(hand: Hand): boolean {
  return handValue(hand) > 21;
}

export function isBlackjack(hand: Hand): boolean {
  return hand.cards.length === 2 && handValue(hand) === 21;
}

export function newGame(seed = 42): BlackjackGame {
  const deck = shuffleDeck(createDeck(), seed);
  const player: Hand = { cards: [deck.pop()!, deck.pop()!] };
  const dealer: Hand = { cards: [deck.pop()!, deck.pop()!] };

  const game: BlackjackGame = {
    deck,
    player,
    dealer,
    state: "playing",
    result: null,
  };

  if (isBlackjack(player)) {
    game.state = "done";
    game.result = isBlackjack(dealer) ? "push" : "blackjack";
  }

  return game;
}

export function hit(game: BlackjackGame): Card | null {
  if (game.state !== "playing") return null;
  const card = game.deck.pop();
  if (!card) return null;

  game.player.cards.push(card);

  if (isBust(game.player)) {
    game.state = "done";
    game.result = "dealer-win";
  }

  return card;
}

export function stand(game: BlackjackGame): void {
  if (game.state !== "playing") return;
  game.state = "dealer-turn";

  while (handValue(game.dealer) < 17) {
    const card = game.deck.pop();
    if (!card) break;
    game.dealer.cards.push(card);
  }

  game.state = "done";

  const playerVal = handValue(game.player);
  const dealerVal = handValue(game.dealer);

  if (isBust(game.dealer)) {
    game.result = "player-win";
  } else if (playerVal > dealerVal) {
    game.result = "player-win";
  } else if (dealerVal > playerVal) {
    game.result = "dealer-win";
  } else {
    game.result = "push";
  }
}

export function cardToString(card: Card): string {
  const suitSymbols: Record<Suit, string> = {
    hearts: "H", diamonds: "D", clubs: "C", spades: "S",
  };
  return `${card.rank}${suitSymbols[card.suit]}`;
}

export function handToString(hand: Hand): string {
  return hand.cards.map(cardToString).join(" ");
}

export function gameStatus(game: BlackjackGame): string {
  const playerStr = handToString(game.player);
  const dealerStr = game.state === "done"
    ? handToString(game.dealer)
    : `${cardToString(game.dealer.cards[0])} ??`;

  return `Player: ${playerStr} (${handValue(game.player)})\nDealer: ${dealerStr}${game.state === "done" ? ` (${handValue(game.dealer)})` : ""}`;
}
