export interface TournamentMatch {
  round: number;
  matchIndex: number;
  player1: string | null;
  player2: string | null;
  winner: string | null;
}

export interface TournamentBracketData {
  players: string[];
  rounds: TournamentMatch[][];
  totalRounds: number;
}

export class TournamentBracket {
  static singleElimination(players: string[]): TournamentBracketData {
    const size = TournamentBracket.nextPowerOf2(players.length);
    const seeded = TournamentBracket.seed(players, size);
    const totalRounds = Math.log2(size);
    const rounds: TournamentMatch[][] = [];

    const firstRound: TournamentMatch[] = [];
    for (let i = 0; i < size; i += 2) {
      firstRound.push({
        round: 1,
        matchIndex: i / 2,
        player1: seeded[i],
        player2: seeded[i + 1],
        winner: null,
      });
    }
    rounds.push(firstRound);

    for (let r = 2; r <= totalRounds; r++) {
      const prevMatches = rounds[r - 2].length;
      const roundMatches: TournamentMatch[] = [];
      for (let i = 0; i < prevMatches / 2; i++) {
        roundMatches.push({
          round: r,
          matchIndex: i,
          player1: null,
          player2: null,
          winner: null,
        });
      }
      rounds.push(roundMatches);
    }

    return { players, rounds, totalRounds };
  }

  static reportResult(bracket: TournamentBracketData, round: number, matchIndex: number, winner: string): void {
    const match = bracket.rounds[round - 1][matchIndex];
    match.winner = winner;

    if (round < bracket.totalRounds) {
      const nextMatchIndex = Math.floor(matchIndex / 2);
      const nextMatch = bracket.rounds[round][nextMatchIndex];
      if (matchIndex % 2 === 0) {
        nextMatch.player1 = winner;
      } else {
        nextMatch.player2 = winner;
      }
    }
  }

  static roundRobin(players: string[]): Array<[string, string]> {
    const list = [...players];
    if (list.length % 2 !== 0) list.push("BYE");
    const n = list.length;
    const pairs: Array<[string, string]> = [];

    for (let round = 0; round < n - 1; round++) {
      for (let i = 0; i < n / 2; i++) {
        const home = list[i];
        const away = list[n - 1 - i];
        if (home !== "BYE" && away !== "BYE") {
          pairs.push([home, away]);
        }
      }
      const last = list.pop()!;
      list.splice(1, 0, last);
    }
    return pairs;
  }

  static swiss(players: string[], standings: Map<string, number>): Array<[string, string]> {
    const sorted = [...players].sort((a, b) => (standings.get(b) || 0) - (standings.get(a) || 0));
    const pairs: Array<[string, string]> = [];
    const used = new Set<string>();
    for (let i = 0; i < sorted.length - 1; i++) {
      if (used.has(sorted[i])) continue;
      for (let j = i + 1; j < sorted.length; j++) {
        if (!used.has(sorted[j])) {
          pairs.push([sorted[i], sorted[j]]);
          used.add(sorted[i]);
          used.add(sorted[j]);
          break;
        }
      }
    }
    return pairs;
  }

  static render(bracket: TournamentBracketData): string {
    const lines: string[] = [];
    for (let r = 0; r < bracket.rounds.length; r++) {
      lines.push(`Round ${r + 1}:`);
      for (const match of bracket.rounds[r]) {
        const p1 = match.player1 || "TBD";
        const p2 = match.player2 || "TBD";
        const w = match.winner ? ` -> ${match.winner}` : "";
        lines.push(`  ${p1} vs ${p2}${w}`);
      }
    }
    return lines.join("\n");
  }

  static champion(bracket: TournamentBracketData): string | null {
    const finalRound = bracket.rounds[bracket.rounds.length - 1];
    return finalRound[0].winner;
  }

  static isComplete(bracket: TournamentBracketData): boolean {
    return bracket.rounds.every((round) => round.every((m) => m.winner !== null));
  }

  private static nextPowerOf2(n: number): number {
    let p = 1;
    while (p < n) p *= 2;
    return p;
  }

  private static seed(players: string[], size: number): (string | null)[] {
    const seeded: (string | null)[] = new Array(size).fill(null);
    for (let i = 0; i < players.length; i++) {
      seeded[i] = players[i];
    }
    return seeded;
  }
}
