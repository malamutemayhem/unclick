export interface Vote<T = unknown> {
  agent: string;
  choice: T;
  confidence: number;
}

export interface ConsensusResult<T = unknown> {
  winner: T | undefined;
  votes: number;
  total: number;
  agreement: number;
  tally: Map<string, number>;
}

export function majority<T>(votes: Vote<T>[]): ConsensusResult<T> {
  if (votes.length === 0) {
    return { winner: undefined, votes: 0, total: 0, agreement: 0, tally: new Map() };
  }
  const tally = new Map<string, { count: number; choice: T }>();
  for (const v of votes) {
    const key = String(v.choice);
    const entry = tally.get(key);
    if (entry) {
      entry.count++;
    } else {
      tally.set(key, { count: 1, choice: v.choice });
    }
  }
  let best = { count: 0, choice: votes[0].choice };
  for (const entry of tally.values()) {
    if (entry.count > best.count) best = entry;
  }
  const countMap = new Map<string, number>();
  for (const [k, v] of tally) countMap.set(k, v.count);
  return {
    winner: best.choice,
    votes: best.count,
    total: votes.length,
    agreement: best.count / votes.length,
    tally: countMap,
  };
}

export function weightedMajority<T>(votes: Vote<T>[]): ConsensusResult<T> {
  if (votes.length === 0) {
    return { winner: undefined, votes: 0, total: 0, agreement: 0, tally: new Map() };
  }
  const tally = new Map<string, { weight: number; choice: T }>();
  let totalWeight = 0;
  for (const v of votes) {
    totalWeight += v.confidence;
    const key = String(v.choice);
    const entry = tally.get(key);
    if (entry) {
      entry.weight += v.confidence;
    } else {
      tally.set(key, { weight: v.confidence, choice: v.choice });
    }
  }
  let best = { weight: 0, choice: votes[0].choice };
  for (const entry of tally.values()) {
    if (entry.weight > best.weight) best = entry;
  }
  const countMap = new Map<string, number>();
  for (const [k, v] of tally) countMap.set(k, v.weight);
  return {
    winner: best.choice,
    votes: votes.length,
    total: votes.length,
    agreement: totalWeight > 0 ? best.weight / totalWeight : 0,
    tally: countMap,
  };
}

export function unanimous<T>(votes: Vote<T>[]): boolean {
  if (votes.length === 0) return false;
  const first = String(votes[0].choice);
  return votes.every((v) => String(v.choice) === first);
}

export function quorum<T>(votes: Vote<T>[], minVotes: number): boolean {
  return votes.length >= minVotes;
}
