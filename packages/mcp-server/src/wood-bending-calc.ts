export type BendMethod = "steam" | "lamination" | "kerf" | "hot_pipe" | "boiling";

export function minRadiusMm(thicknessMm: number, method: BendMethod): number {
  const factors: Record<BendMethod, number> = {
    steam: 8, lamination: 5, kerf: 3, hot_pipe: 10, boiling: 12,
  };
  return Math.round(thicknessMm * factors[method]);
}

export function prepTimeMinutes(method: BendMethod): number {
  const times: Record<BendMethod, number> = {
    steam: 60, lamination: 30, kerf: 15, hot_pipe: 20, boiling: 45,
  };
  return times[method];
}

export function bendTimeMinutes(thicknessMm: number, method: BendMethod): number {
  const factors: Record<BendMethod, number> = {
    steam: 1.0, lamination: 0.5, kerf: 0.3, hot_pipe: 0.8, boiling: 1.2,
  };
  return Math.round(thicknessMm * factors[method]);
}

export function dryingTimeHours(method: BendMethod): number {
  const hours: Record<BendMethod, number> = {
    steam: 48, lamination: 24, kerf: 2, hot_pipe: 24, boiling: 72,
  };
  return hours[method];
}

export function springbackPercent(method: BendMethod): number {
  const pct: Record<BendMethod, number> = {
    steam: 5, lamination: 2, kerf: 1, hot_pipe: 8, boiling: 10,
  };
  return pct[method];
}

export function strengthRetention(method: BendMethod): number {
  const ratings: Record<BendMethod, number> = {
    steam: 5, lamination: 4, kerf: 2, hot_pipe: 4, boiling: 3,
  };
  return ratings[method];
}

export function formRequired(method: BendMethod): boolean {
  return method !== "kerf";
}

export function failureRiskPercent(method: BendMethod): number {
  const risk: Record<BendMethod, number> = {
    steam: 10, lamination: 5, kerf: 2, hot_pipe: 15, boiling: 20,
  };
  return risk[method];
}

export function costRating(method: BendMethod): number {
  const costs: Record<BendMethod, number> = {
    steam: 3, lamination: 4, kerf: 2, hot_pipe: 3, boiling: 1,
  };
  return costs[method];
}

export function bendMethods(): BendMethod[] {
  return ["steam", "lamination", "kerf", "hot_pipe", "boiling"];
}
