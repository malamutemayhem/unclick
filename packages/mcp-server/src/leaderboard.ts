export interface LeaderboardEntry {
  id: string;
  score: number;
  rank: number;
  metadata?: Record<string, unknown>;
}

export class Leaderboard {
  private entries: Map<string, { score: number; metadata?: Record<string, unknown> }> = new Map();

  addScore(id: string, score: number, metadata?: Record<string, unknown>): void {
    const existing = this.entries.get(id);
    if (existing) {
      existing.score = Math.max(existing.score, score);
      if (metadata) existing.metadata = { ...existing.metadata, ...metadata };
    } else {
      this.entries.set(id, { score, metadata });
    }
  }

  incrementScore(id: string, delta: number): number {
    const existing = this.entries.get(id);
    if (existing) {
      existing.score += delta;
      return existing.score;
    }
    this.entries.set(id, { score: delta });
    return delta;
  }

  getScore(id: string): number | null {
    const entry = this.entries.get(id);
    return entry ? entry.score : null;
  }

  getRank(id: string): number | null {
    const sorted = this.topN(this.entries.size);
    const idx = sorted.findIndex((e) => e.id === id);
    return idx === -1 ? null : idx + 1;
  }

  topN(n: number): LeaderboardEntry[] {
    const sorted = [...this.entries.entries()]
      .sort((a, b) => b[1].score - a[1].score)
      .slice(0, n);
    return sorted.map(([id, data], i) => ({
      id,
      score: data.score,
      rank: i + 1,
      metadata: data.metadata,
    }));
  }

  bottomN(n: number): LeaderboardEntry[] {
    const sorted = [...this.entries.entries()]
      .sort((a, b) => a[1].score - b[1].score)
      .slice(0, n);
    return sorted.map(([id, data], i) => ({
      id,
      score: data.score,
      rank: this.entries.size - n + i + 1,
      metadata: data.metadata,
    }));
  }

  around(id: string, count: number = 2): LeaderboardEntry[] {
    const all = this.topN(this.entries.size);
    const idx = all.findIndex((e) => e.id === id);
    if (idx === -1) return [];
    const start = Math.max(0, idx - count);
    const end = Math.min(all.length, idx + count + 1);
    return all.slice(start, end);
  }

  percentile(id: string): number | null {
    const rank = this.getRank(id);
    if (rank === null) return null;
    return Math.round(((this.entries.size - rank) / this.entries.size) * 1000) / 10;
  }

  remove(id: string): boolean {
    return this.entries.delete(id);
  }

  clear(): void {
    this.entries.clear();
  }

  size(): number {
    return this.entries.size;
  }

  average(): number {
    if (this.entries.size === 0) return 0;
    const sum = [...this.entries.values()].reduce((s, e) => s + e.score, 0);
    return Math.round((sum / this.entries.size) * 100) / 100;
  }

  median(): number {
    const scores = [...this.entries.values()].map((e) => e.score).sort((a, b) => a - b);
    if (scores.length === 0) return 0;
    const mid = Math.floor(scores.length / 2);
    return scores.length % 2 === 0 ? (scores[mid - 1] + scores[mid]) / 2 : scores[mid];
  }

  tiers(boundaries: number[]): Map<string, LeaderboardEntry[]> {
    const sorted = boundaries.sort((a, b) => b - a);
    const result = new Map<string, LeaderboardEntry[]>();
    const all = this.topN(this.entries.size);
    for (const entry of all) {
      let tier = "below";
      for (let i = 0; i < sorted.length; i++) {
        if (entry.score >= sorted[i]) {
          tier = `>=${sorted[i]}`;
          break;
        }
      }
      if (!result.has(tier)) result.set(tier, []);
      result.get(tier)!.push(entry);
    }
    return result;
  }
}
