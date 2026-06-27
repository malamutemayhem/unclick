export interface EloPlayer {
  id: string;
  rating: number;
  wins: number;
  losses: number;
  draws: number;
}

export interface EloMatchResult {
  winnerId: string;
  loserId: string;
  winnerNewRating: number;
  loserNewRating: number;
  winnerDelta: number;
  loserDelta: number;
}

export class EloRating {
  static expectedScore(ratingA: number, ratingB: number): number {
    return 1 / (1 + Math.pow(10, (ratingB - ratingA) / 400));
  }

  static newRating(rating: number, expected: number, actual: number, k: number = 32): number {
    return Math.round(rating + k * (actual - expected));
  }

  static match(winnerRating: number, loserRating: number, k: number = 32): { winner: number; loser: number } {
    const expectedWin = EloRating.expectedScore(winnerRating, loserRating);
    const expectedLose = EloRating.expectedScore(loserRating, winnerRating);
    return {
      winner: EloRating.newRating(winnerRating, expectedWin, 1, k),
      loser: EloRating.newRating(loserRating, expectedLose, 0, k),
    };
  }

  static draw(ratingA: number, ratingB: number, k: number = 32): { a: number; b: number } {
    const expectedA = EloRating.expectedScore(ratingA, ratingB);
    const expectedB = EloRating.expectedScore(ratingB, ratingA);
    return {
      a: EloRating.newRating(ratingA, expectedA, 0.5, k),
      b: EloRating.newRating(ratingB, expectedB, 0.5, k),
    };
  }

  static processMatch(
    players: Map<string, EloPlayer>,
    winnerId: string,
    loserId: string,
    k: number = 32,
  ): EloMatchResult {
    const winner = players.get(winnerId)!;
    const loser = players.get(loserId)!;
    const result = EloRating.match(winner.rating, loser.rating, k);
    const winnerDelta = result.winner - winner.rating;
    const loserDelta = result.loser - loser.rating;
    winner.rating = result.winner;
    winner.wins++;
    loser.rating = result.loser;
    loser.losses++;
    return {
      winnerId,
      loserId,
      winnerNewRating: result.winner,
      loserNewRating: result.loser,
      winnerDelta,
      loserDelta,
    };
  }

  static createPlayer(id: string, rating: number = 1200): EloPlayer {
    return { id, rating, wins: 0, losses: 0, draws: 0 };
  }

  static rankings(players: Map<string, EloPlayer>): EloPlayer[] {
    return [...players.values()].sort((a, b) => b.rating - a.rating);
  }

  static winProbability(ratingA: number, ratingB: number): number {
    return Math.round(EloRating.expectedScore(ratingA, ratingB) * 1000) / 1000;
  }

  static ratingClass(rating: number): string {
    if (rating >= 2400) return "Grandmaster";
    if (rating >= 2200) return "Master";
    if (rating >= 2000) return "Expert";
    if (rating >= 1800) return "Class A";
    if (rating >= 1600) return "Class B";
    if (rating >= 1400) return "Class C";
    if (rating >= 1200) return "Class D";
    return "Beginner";
  }

  static kFactor(rating: number, gamesPlayed: number): number {
    if (gamesPlayed < 30) return 40;
    if (rating < 2400) return 20;
    return 10;
  }
}
