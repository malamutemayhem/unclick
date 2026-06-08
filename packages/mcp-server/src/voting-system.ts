export interface VoteResult {
  candidate: string;
  votes: number;
  percentage: number;
}

export interface RankedBallot {
  rankings: string[];
}

export class VotingSystem {
  static plurality(ballots: string[]): VoteResult[] {
    const counts = new Map<string, number>();
    for (const vote of ballots) {
      counts.set(vote, (counts.get(vote) || 0) + 1);
    }
    const total = ballots.length;
    return [...counts.entries()]
      .map(([candidate, votes]) => ({
        candidate,
        votes,
        percentage: total === 0 ? 0 : Math.round((votes / total) * 1000) / 10,
      }))
      .sort((a, b) => b.votes - a.votes);
  }

  static majority(ballots: string[]): { winner: string | null; results: VoteResult[] } {
    const results = VotingSystem.plurality(ballots);
    const winner = results.length > 0 && results[0].percentage > 50 ? results[0].candidate : null;
    return { winner, results };
  }

  static runoff(ballots: string[]): { winner: string; round1: VoteResult[]; round2: VoteResult[] | null } {
    const round1 = VotingSystem.plurality(ballots);
    if (round1.length === 0) return { winner: "", round1, round2: null };
    if (round1[0].percentage > 50) return { winner: round1[0].candidate, round1, round2: null };
    const top2 = new Set([round1[0].candidate, round1[1].candidate]);
    const filtered = ballots.filter((b) => top2.has(b));
    const round2 = VotingSystem.plurality(filtered);
    return { winner: round2[0].candidate, round1, round2 };
  }

  static instantRunoff(ballots: RankedBallot[]): { winner: string; rounds: VoteResult[][] } {
    let active = ballots.map((b) => [...b.rankings]);
    const eliminated = new Set<string>();
    const rounds: VoteResult[][] = [];

    while (true) {
      const firstChoices: string[] = [];
      for (const ballot of active) {
        const choice = ballot.find((c) => !eliminated.has(c));
        if (choice) firstChoices.push(choice);
      }

      const round = VotingSystem.plurality(firstChoices);
      rounds.push(round);

      if (round.length === 0) break;
      if (round[0].percentage > 50) return { winner: round[0].candidate, rounds };

      const minVotes = Math.min(...round.map((r) => r.votes));
      const toEliminate = round.filter((r) => r.votes === minVotes);
      for (const e of toEliminate) eliminated.add(e.candidate);

      if (eliminated.size >= new Set(ballots.flatMap((b) => b.rankings)).size) {
        return { winner: round[0].candidate, rounds };
      }
    }

    return { winner: "", rounds };
  }

  static borda(ballots: RankedBallot[]): VoteResult[] {
    const scores = new Map<string, number>();
    for (const ballot of ballots) {
      const n = ballot.rankings.length;
      for (let i = 0; i < n; i++) {
        const points = n - 1 - i;
        const candidate = ballot.rankings[i];
        scores.set(candidate, (scores.get(candidate) || 0) + points);
      }
    }
    const total = [...scores.values()].reduce((a, b) => a + b, 0);
    return [...scores.entries()]
      .map(([candidate, votes]) => ({
        candidate,
        votes,
        percentage: total === 0 ? 0 : Math.round((votes / total) * 1000) / 10,
      }))
      .sort((a, b) => b.votes - a.votes);
  }

  static approval(ballots: string[][]): VoteResult[] {
    const counts = new Map<string, number>();
    for (const ballot of ballots) {
      for (const candidate of ballot) {
        counts.set(candidate, (counts.get(candidate) || 0) + 1);
      }
    }
    const totalBallots = ballots.length;
    return [...counts.entries()]
      .map(([candidate, votes]) => ({
        candidate,
        votes,
        percentage: totalBallots === 0 ? 0 : Math.round((votes / totalBallots) * 1000) / 10,
      }))
      .sort((a, b) => b.votes - a.votes);
  }

  static condorcet(ballots: RankedBallot[]): string | null {
    const candidates = [...new Set(ballots.flatMap((b) => b.rankings))];
    for (const a of candidates) {
      let isWinner = true;
      for (const b of candidates) {
        if (a === b) continue;
        let aWins = 0;
        let bWins = 0;
        for (const ballot of ballots) {
          const aIdx = ballot.rankings.indexOf(a);
          const bIdx = ballot.rankings.indexOf(b);
          if (aIdx === -1 && bIdx === -1) continue;
          if (aIdx === -1) { bWins++; continue; }
          if (bIdx === -1) { aWins++; continue; }
          if (aIdx < bIdx) aWins++;
          else bWins++;
        }
        if (aWins <= bWins) { isWinner = false; break; }
      }
      if (isWinner) return a;
    }
    return null;
  }

  static quorum(ballots: string[], totalEligible: number, threshold: number = 0.5): boolean {
    return ballots.length / totalEligible >= threshold;
  }
}
