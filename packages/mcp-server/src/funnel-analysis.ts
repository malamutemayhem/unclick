export interface FunnelStep {
  name: string;
  count: number;
  rate: number;
  dropoff: number;
  dropoffRate: number;
}

export class FunnelAnalysis {
  static analyze(steps: Array<{ name: string; count: number }>): FunnelStep[] {
    if (steps.length === 0) return [];
    const first = steps[0].count;
    return steps.map((step, i) => {
      const prev = i === 0 ? step.count : steps[i - 1].count;
      const dropoff = prev - step.count;
      return {
        name: step.name,
        count: step.count,
        rate: first === 0 ? 0 : Math.round((step.count / first) * 1000) / 10,
        dropoff,
        dropoffRate: prev === 0 ? 0 : Math.round((dropoff / prev) * 1000) / 10,
      };
    });
  }

  static conversionRate(steps: Array<{ name: string; count: number }>): number {
    if (steps.length < 2) return 0;
    const first = steps[0].count;
    const last = steps[steps.length - 1].count;
    return first === 0 ? 0 : Math.round((last / first) * 10000) / 100;
  }

  static bottleneck(steps: Array<{ name: string; count: number }>): FunnelStep | null {
    const analyzed = FunnelAnalysis.analyze(steps);
    if (analyzed.length < 2) return null;
    let worst: FunnelStep | null = null;
    let worstRate = -1;
    for (let i = 1; i < analyzed.length; i++) {
      if (analyzed[i].dropoffRate > worstRate) {
        worstRate = analyzed[i].dropoffRate;
        worst = analyzed[i];
      }
    }
    return worst;
  }

  static compare(
    funnelA: Array<{ name: string; count: number }>,
    funnelB: Array<{ name: string; count: number }>,
  ): Array<{ step: string; rateA: number; rateB: number; diff: number }> {
    const a = FunnelAnalysis.analyze(funnelA);
    const b = FunnelAnalysis.analyze(funnelB);
    const len = Math.min(a.length, b.length);
    const result: Array<{ step: string; rateA: number; rateB: number; diff: number }> = [];
    for (let i = 0; i < len; i++) {
      result.push({
        step: a[i].name,
        rateA: a[i].rate,
        rateB: b[i].rate,
        diff: Math.round((b[i].rate - a[i].rate) * 10) / 10,
      });
    }
    return result;
  }

  static render(steps: Array<{ name: string; count: number }>, width: number = 40): string {
    const analyzed = FunnelAnalysis.analyze(steps);
    if (analyzed.length === 0) return "";
    const maxCount = Math.max(...analyzed.map((s) => s.count));
    return analyzed
      .map((step) => {
        const barLen = maxCount === 0 ? 0 : Math.round((step.count / maxCount) * width);
        const bar = "#".repeat(barLen);
        return `${step.name.padEnd(20)} ${bar} ${step.count} (${step.rate}%)`;
      })
      .join("\n");
  }

  static velocity(
    steps: Array<{ name: string; count: number; avgTime?: number }>,
  ): { totalTime: number; avgTimePerStep: number; slowestStep: string | null } {
    const withTime = steps.filter((s) => s.avgTime !== undefined);
    if (withTime.length === 0) return { totalTime: 0, avgTimePerStep: 0, slowestStep: null };
    const totalTime = withTime.reduce((s, step) => s + (step.avgTime || 0), 0);
    const avgTimePerStep = Math.round(totalTime / withTime.length);
    let slowest = withTime[0];
    for (const s of withTime) {
      if ((s.avgTime || 0) > (slowest.avgTime || 0)) slowest = s;
    }
    return { totalTime, avgTimePerStep, slowestStep: slowest.name };
  }

  static forecast(
    steps: Array<{ name: string; count: number }>,
    targetFinal: number,
  ): Array<{ name: string; needed: number }> {
    const analyzed = FunnelAnalysis.analyze(steps);
    if (analyzed.length === 0) return [];
    const last = analyzed[analyzed.length - 1];
    const first = analyzed[0];
    const overallRate = first.count === 0 ? 0 : last.count / first.count;
    const neededFirst = overallRate === 0 ? 0 : Math.ceil(targetFinal / overallRate);
    const multiplier = first.count === 0 ? 0 : neededFirst / first.count;
    return analyzed.map((step) => ({
      name: step.name,
      needed: Math.ceil(step.count * multiplier),
    }));
  }
}
