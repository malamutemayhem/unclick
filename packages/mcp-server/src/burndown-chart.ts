export interface BurndownEntry {
  day: number;
  planned: number;
  actual: number;
  remaining: number;
}

export class BurndownChart {
  static generate(
    totalPoints: number,
    sprintDays: number,
    dailyCompleted: number[],
  ): BurndownEntry[] {
    const idealPerDay = totalPoints / sprintDays;
    const entries: BurndownEntry[] = [];
    let remaining = totalPoints;

    for (let day = 0; day <= sprintDays; day++) {
      const planned = Math.round((totalPoints - idealPerDay * day) * 100) / 100;
      if (day > 0 && day <= dailyCompleted.length) {
        remaining -= dailyCompleted[day - 1];
      }
      entries.push({
        day,
        planned: Math.max(0, planned),
        actual: Math.max(0, remaining),
        remaining: Math.max(0, remaining),
      });
    }
    return entries;
  }

  static render(entries: BurndownEntry[], width: number = 50): string {
    const maxPoints = entries[0].planned;
    const lines: string[] = [];
    lines.push("Day | Planned | Actual | Chart");
    lines.push("-".repeat(60));
    for (const entry of entries) {
      const plannedBar = Math.round((entry.planned / maxPoints) * width);
      const actualBar = Math.round((entry.actual / maxPoints) * width);
      const pBar = "-".repeat(plannedBar);
      const aBar = "#".repeat(actualBar);
      lines.push(
        `${String(entry.day).padStart(3)} | ${String(entry.planned).padStart(7)} | ${String(entry.actual).padStart(6)} | ${pBar} ${aBar}`,
      );
    }
    return lines.join("\n");
  }

  static status(entries: BurndownEntry[]): {
    onTrack: boolean;
    deviation: number;
    projectedCompletion: number | null;
    completionRate: number;
  } {
    const latest = entries[entries.length - 1];
    const deviation = Math.round((latest.actual - latest.planned) * 100) / 100;
    const daysPassed = latest.day;

    const totalPoints = entries[0].planned;
    const completed = totalPoints - latest.actual;
    const completionRate = daysPassed === 0 ? 0 : Math.round((completed / daysPassed) * 100) / 100;

    let projectedCompletion: number | null = null;
    if (completionRate > 0) {
      projectedCompletion = Math.ceil(latest.actual / completionRate) + daysPassed;
    }

    return {
      onTrack: latest.actual <= latest.planned,
      deviation,
      projectedCompletion,
      completionRate,
    };
  }

  static scope(
    entries: BurndownEntry[],
    addedPoints: number[],
  ): BurndownEntry[] {
    return entries.map((entry, i) => {
      const added = addedPoints.slice(0, i).reduce((s, p) => s + p, 0);
      return {
        ...entry,
        planned: Math.round((entry.planned + added) * 100) / 100,
        actual: Math.round((entry.actual + added) * 100) / 100,
        remaining: Math.round((entry.remaining + added) * 100) / 100,
      };
    });
  }

  static idealLine(totalPoints: number, days: number): number[] {
    const step = totalPoints / days;
    return Array.from({ length: days + 1 }, (_, i) => Math.round((totalPoints - step * i) * 100) / 100);
  }
}
