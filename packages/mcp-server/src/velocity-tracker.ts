export interface SprintData {
  name: string;
  committed: number;
  completed: number;
  days: number;
}

export interface VelocityStats {
  average: number;
  median: number;
  trend: "improving" | "declining" | "stable";
  stdDev: number;
  predictedNext: number;
  reliability: number;
}

export class VelocityTracker {
  private sprints: SprintData[] = [];

  addSprint(sprint: SprintData): void {
    this.sprints.push(sprint);
  }

  getVelocity(): number {
    if (this.sprints.length === 0) return 0;
    const total = this.sprints.reduce((s, sp) => s + sp.completed, 0);
    return Math.round((total / this.sprints.length) * 100) / 100;
  }

  getStats(): VelocityStats {
    const velocities = this.sprints.map((s) => s.completed);
    if (velocities.length === 0) {
      return { average: 0, median: 0, trend: "stable", stdDev: 0, predictedNext: 0, reliability: 0 };
    }

    const avg = velocities.reduce((s, v) => s + v, 0) / velocities.length;
    const sorted = [...velocities].sort((a, b) => a - b);
    const median = sorted.length % 2 === 0
      ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
      : sorted[Math.floor(sorted.length / 2)];
    const variance = velocities.reduce((s, v) => s + (v - avg) ** 2, 0) / velocities.length;
    const stdDev = Math.sqrt(variance);

    let trend: "improving" | "declining" | "stable" = "stable";
    if (velocities.length >= 3) {
      const recent = velocities.slice(-3);
      const earlier = velocities.slice(0, 3);
      const recentAvg = recent.reduce((s, v) => s + v, 0) / recent.length;
      const earlierAvg = earlier.reduce((s, v) => s + v, 0) / earlier.length;
      if (recentAvg > earlierAvg * 1.1) trend = "improving";
      else if (recentAvg < earlierAvg * 0.9) trend = "declining";
    }

    const committed = this.sprints.reduce((s, sp) => s + sp.committed, 0);
    const completed = this.sprints.reduce((s, sp) => s + sp.completed, 0);
    const reliability = committed === 0 ? 0 : Math.round((completed / committed) * 1000) / 10;

    return {
      average: Math.round(avg * 100) / 100,
      median,
      trend,
      stdDev: Math.round(stdDev * 100) / 100,
      predictedNext: Math.round(avg * 100) / 100,
      reliability,
    };
  }

  forecast(totalPoints: number): { sprints: number; confidence: string } {
    const stats = this.getStats();
    if (stats.average === 0) return { sprints: Infinity, confidence: "none" };
    const sprints = Math.ceil(totalPoints / stats.average);
    const cv = stats.average === 0 ? 1 : stats.stdDev / stats.average;
    const confidence = cv < 0.15 ? "high" : cv < 0.3 ? "medium" : "low";
    return { sprints, confidence };
  }

  commitmentAccuracy(): Array<{ sprint: string; committed: number; completed: number; accuracy: number }> {
    return this.sprints.map((s) => ({
      sprint: s.name,
      committed: s.committed,
      completed: s.completed,
      accuracy: s.committed === 0 ? 0 : Math.round((s.completed / s.committed) * 1000) / 10,
    }));
  }

  throughput(): number {
    if (this.sprints.length === 0) return 0;
    const totalDays = this.sprints.reduce((s, sp) => s + sp.days, 0);
    const totalCompleted = this.sprints.reduce((s, sp) => s + sp.completed, 0);
    return totalDays === 0 ? 0 : Math.round((totalCompleted / totalDays) * 100) / 100;
  }

  sprintCount(): number {
    return this.sprints.length;
  }
}
