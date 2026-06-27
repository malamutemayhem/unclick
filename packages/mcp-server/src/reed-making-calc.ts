export type ReedType = "single_clarinet" | "single_sax" | "double_oboe" | "double_bassoon" | "bagpipe";

export function caneAgingMonths(type: ReedType): number {
  const m: Record<ReedType, number> = {
    single_clarinet: 24, single_sax: 24, double_oboe: 36,
    double_bassoon: 36, bagpipe: 18,
  };
  return m[type];
}

export function tipThicknessMm(type: ReedType): number {
  const t: Record<ReedType, number> = {
    single_clarinet: 0.1, single_sax: 0.12, double_oboe: 0.06,
    double_bassoon: 0.08, bagpipe: 0.15,
  };
  return t[type];
}

export function totalLengthMm(type: ReedType): number {
  const l: Record<ReedType, number> = {
    single_clarinet: 68, single_sax: 75, double_oboe: 47,
    double_bassoon: 54, bagpipe: 30,
  };
  return l[type];
}

export function scrapingPasses(type: ReedType): number {
  const p: Record<ReedType, number> = {
    single_clarinet: 0, single_sax: 0, double_oboe: 50,
    double_bassoon: 40, bagpipe: 20,
  };
  return p[type];
}

export function soakingTimeMinutes(type: ReedType): number {
  const s: Record<ReedType, number> = {
    single_clarinet: 3, single_sax: 3, double_oboe: 5,
    double_bassoon: 10, bagpipe: 15,
  };
  return s[type];
}

export function lifespanHours(type: ReedType): number {
  const h: Record<ReedType, number> = {
    single_clarinet: 30, single_sax: 25, double_oboe: 15,
    double_bassoon: 20, bagpipe: 100,
  };
  return h[type];
}

export function makingTimeMinutes(type: ReedType): number {
  const m: Record<ReedType, number> = {
    single_clarinet: 0, single_sax: 0, double_oboe: 45,
    double_bassoon: 60, bagpipe: 20,
  };
  return m[type];
}

export function handMade(type: ReedType): boolean {
  return type === "double_oboe" || type === "double_bassoon" || type === "bagpipe";
}

export function costPerReed(type: ReedType): number {
  const c: Record<ReedType, number> = {
    single_clarinet: 3, single_sax: 4, double_oboe: 20,
    double_bassoon: 25, bagpipe: 15,
  };
  return c[type];
}

export function reedTypes(): ReedType[] {
  return ["single_clarinet", "single_sax", "double_oboe", "double_bassoon", "bagpipe"];
}
