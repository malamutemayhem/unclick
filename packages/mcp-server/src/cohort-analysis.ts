export interface CohortData {
  cohort: string;
  periods: number[];
}

export interface CohortRetention {
  cohort: string;
  initialSize: number;
  retention: number[];
  retentionRates: number[];
}

export class CohortAnalysis {
  static retention(cohorts: CohortData[]): CohortRetention[] {
    return cohorts.map((c) => {
      const initial = c.periods[0] || 0;
      return {
        cohort: c.cohort,
        initialSize: initial,
        retention: c.periods,
        retentionRates: c.periods.map((p) =>
          initial === 0 ? 0 : Math.round((p / initial) * 1000) / 10,
        ),
      };
    });
  }

  static churnRate(cohort: CohortData): number[] {
    const rates: number[] = [];
    for (let i = 1; i < cohort.periods.length; i++) {
      const prev = cohort.periods[i - 1];
      const curr = cohort.periods[i];
      rates.push(prev === 0 ? 0 : Math.round(((prev - curr) / prev) * 1000) / 10);
    }
    return rates;
  }

  static averageRetention(cohorts: CohortData[]): number[] {
    if (cohorts.length === 0) return [];
    const maxPeriods = Math.max(...cohorts.map((c) => c.periods.length));
    const averages: number[] = [];
    for (let p = 0; p < maxPeriods; p++) {
      let sum = 0;
      let count = 0;
      for (const c of cohorts) {
        if (p < c.periods.length) {
          const initial = c.periods[0] || 1;
          sum += c.periods[p] / initial;
          count++;
        }
      }
      averages.push(count === 0 ? 0 : Math.round((sum / count) * 1000) / 10);
    }
    return averages;
  }

  static ltv(cohort: CohortData, revenuePerUser: number): number {
    const initial = cohort.periods[0];
    if (initial === 0) return 0;
    let totalUserPeriods = 0;
    for (const p of cohort.periods) {
      totalUserPeriods += p;
    }
    return Math.round((totalUserPeriods / initial) * revenuePerUser * 100) / 100;
  }

  static render(cohorts: CohortData[]): string {
    const analyzed = CohortAnalysis.retention(cohorts);
    const lines: string[] = [];
    const header = ["Cohort", "Size", ...analyzed[0]?.retentionRates.map((_, i) => `P${i}`) || []];
    lines.push(header.join("\t"));
    for (const c of analyzed) {
      const row = [c.cohort, String(c.initialSize), ...c.retentionRates.map((r) => `${r}%`)];
      lines.push(row.join("\t"));
    }
    return lines.join("\n");
  }

  static bestCohort(cohorts: CohortData[], period: number): string | null {
    let best: string | null = null;
    let bestRate = -1;
    for (const c of cohorts) {
      if (period >= c.periods.length) continue;
      const initial = c.periods[0];
      if (initial === 0) continue;
      const rate = c.periods[period] / initial;
      if (rate > bestRate) {
        bestRate = rate;
        best = c.cohort;
      }
    }
    return best;
  }

  static halfLife(cohort: CohortData): number | null {
    const initial = cohort.periods[0];
    if (initial === 0) return null;
    const half = initial / 2;
    for (let i = 1; i < cohort.periods.length; i++) {
      if (cohort.periods[i] <= half) return i;
    }
    return null;
  }

  static growthRate(cohorts: CohortData[]): number[] {
    const rates: number[] = [];
    for (let i = 1; i < cohorts.length; i++) {
      const prev = cohorts[i - 1].periods[0];
      const curr = cohorts[i].periods[0];
      rates.push(prev === 0 ? 0 : Math.round(((curr - prev) / prev) * 1000) / 10);
    }
    return rates;
  }
}
