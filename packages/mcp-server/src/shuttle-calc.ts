export type ShuttleType = "boat" | "stick" | "rag" | "end_feed" | "ski";

export function shuttleLengthCm(type: ShuttleType): number {
  const lengths: Record<ShuttleType, number> = {
    boat: 30, stick: 45, rag: 35, end_feed: 28, ski: 50,
  };
  return lengths[type];
}

export function shuttleWidthMm(type: ShuttleType): number {
  const widths: Record<ShuttleType, number> = {
    boat: 45, stick: 25, rag: 60, end_feed: 40, ski: 30,
  };
  return widths[type];
}

export function weightEmptyG(type: ShuttleType): number {
  const weights: Record<ShuttleType, number> = {
    boat: 180, stick: 90, rag: 150, end_feed: 200, ski: 120,
  };
  return weights[type];
}

export function throwSpeedMPerSec(type: ShuttleType): number {
  const speeds: Record<ShuttleType, number> = {
    boat: 8, stick: 3, rag: 4, end_feed: 10, ski: 5,
  };
  return speeds[type];
}

export function picksPerMinute(type: ShuttleType): number {
  const ppm: Record<ShuttleType, number> = {
    boat: 60, stick: 20, rag: 25, end_feed: 80, ski: 30,
  };
  return ppm[type];
}

export function maxWeavingWidthCm(type: ShuttleType): number {
  const widths: Record<ShuttleType, number> = {
    boat: 120, stick: 200, rag: 100, end_feed: 150, ski: 180,
  };
  return widths[type];
}

export function woodType(type: ShuttleType): string {
  const woods: Record<ShuttleType, string> = {
    boat: "dogwood", stick: "pine", rag: "cherry", end_feed: "persimmon", ski: "maple",
  };
  return woods[type];
}

export function lifespanYears(type: ShuttleType): number {
  const years: Record<ShuttleType, number> = {
    boat: 30, stick: 10, rag: 20, end_feed: 15, ski: 25,
  };
  return years[type];
}

export function costEstimate(type: ShuttleType): number {
  const costs: Record<ShuttleType, number> = {
    boat: 45, stick: 15, rag: 35, end_feed: 65, ski: 40,
  };
  return costs[type];
}

export function shuttleTypes(): ShuttleType[] {
  return ["boat", "stick", "rag", "end_feed", "ski"];
}
