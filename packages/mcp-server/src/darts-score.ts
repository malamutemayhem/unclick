export type DartSegment = "S" | "D" | "T" | "B" | "DB";

export interface Dart {
  segment: DartSegment;
  number: number;
}

export interface LegState {
  startingScore: number;
  remaining: number;
  darts: Dart[];
  isFinished: boolean;
  dartsThrown: number;
}

export function dartScore(dart: Dart): number {
  if (dart.segment === "B") return 25;
  if (dart.segment === "DB") return 50;
  if (dart.segment === "D") return dart.number * 2;
  if (dart.segment === "T") return dart.number * 3;
  return dart.number;
}

export function createDart(segment: DartSegment, number: number): Dart {
  return { segment, number };
}

export function parseDart(str: string): Dart {
  const upper = str.toUpperCase();
  if (upper === "DB" || upper === "DBULL") return { segment: "DB", number: 50 };
  if (upper === "B" || upper === "BULL" || upper === "SB") return { segment: "B", number: 25 };
  const match = upper.match(/^([SDT])(\d+)$/);
  if (!match) return { segment: "S", number: 0 };
  return { segment: match[1] as DartSegment, number: parseInt(match[2], 10) };
}

export function formatDart(dart: Dart): string {
  if (dart.segment === "DB") return "D-Bull";
  if (dart.segment === "B") return "S-Bull";
  const prefix = dart.segment === "S" ? "" : dart.segment;
  return `${prefix}${dart.number}`;
}

export function createLeg(startingScore: number): LegState {
  return {
    startingScore,
    remaining: startingScore,
    darts: [],
    isFinished: false,
    dartsThrown: 0,
  };
}

export function throwDart(leg: LegState, dart: Dart): LegState {
  if (leg.isFinished) return leg;
  const score = dartScore(dart);
  const newRemaining = leg.remaining - score;

  if (newRemaining < 0 || newRemaining === 1) {
    return { ...leg, dartsThrown: leg.dartsThrown + 1 };
  }

  if (newRemaining === 0 && dart.segment !== "D" && dart.segment !== "DB") {
    return { ...leg, dartsThrown: leg.dartsThrown + 1 };
  }

  return {
    ...leg,
    remaining: newRemaining,
    darts: [...leg.darts, dart],
    dartsThrown: leg.dartsThrown + 1,
    isFinished: newRemaining === 0,
  };
}

export function checkoutOptions(remaining: number): Dart[][] {
  if (remaining > 170 || remaining <= 1) return [];
  const results: Dart[][] = [];
  const allDarts = getAllDarts();

  for (const d of allDarts) {
    if (d.segment !== "D" && d.segment !== "DB") continue;
    if (dartScore(d) === remaining) {
      results.push([d]);
    }
  }

  for (const d1 of allDarts) {
    const s1 = dartScore(d1);
    if (s1 >= remaining) continue;
    const left = remaining - s1;
    for (const d2 of allDarts) {
      if (d2.segment !== "D" && d2.segment !== "DB") continue;
      if (dartScore(d2) === left) {
        results.push([d1, d2]);
      }
    }
  }

  if (results.length > 0) return results.slice(0, 10);

  for (const d1 of allDarts) {
    const s1 = dartScore(d1);
    if (s1 >= remaining) continue;
    for (const d2 of allDarts) {
      const s2 = dartScore(d2);
      if (s1 + s2 >= remaining) continue;
      const left = remaining - s1 - s2;
      for (const d3 of allDarts) {
        if (d3.segment !== "D" && d3.segment !== "DB") continue;
        if (dartScore(d3) === left) {
          results.push([d1, d2, d3]);
          if (results.length >= 10) return results;
        }
      }
    }
  }
  return results.slice(0, 10);
}

function getAllDarts(): Dart[] {
  const darts: Dart[] = [];
  for (let n = 1; n <= 20; n++) {
    darts.push({ segment: "S", number: n });
    darts.push({ segment: "D", number: n });
    darts.push({ segment: "T", number: n });
  }
  darts.push({ segment: "B", number: 25 });
  darts.push({ segment: "DB", number: 50 });
  return darts;
}

export function isCheckoutPossible(remaining: number): boolean {
  return remaining >= 2 && remaining <= 170 && remaining !== 169 && remaining !== 168 && remaining !== 166 && remaining !== 165 && remaining !== 163 && remaining !== 162 && remaining !== 159;
}

export function highestCheckout(): number {
  return 170;
}

export function averageDarts(leg: LegState): number {
  if (leg.darts.length === 0) return 0;
  const scored = leg.startingScore - leg.remaining;
  return scored / leg.dartsThrown;
}

export function threeDartAverage(leg: LegState): number {
  return averageDarts(leg) * 3;
}

export function maxSingleDart(): number {
  return 60;
}

export function maxThreeDarts(): number {
  return 180;
}

export function is180(d1: Dart, d2: Dart, d3: Dart): boolean {
  return dartScore(d1) + dartScore(d2) + dartScore(d3) === 180;
}

export function tonPlus(d1: Dart, d2: Dart, d3: Dart): boolean {
  return dartScore(d1) + dartScore(d2) + dartScore(d3) >= 100;
}

export function nineDarter(): Dart[] {
  return [
    createDart("T", 20), createDart("T", 20), createDart("T", 20),
    createDart("T", 20), createDart("T", 20), createDart("T", 20),
    createDart("T", 20), createDart("T", 19), createDart("D", 12),
  ];
}

export function standardGameScores(): number[] {
  return [301, 501, 701, 1001];
}
