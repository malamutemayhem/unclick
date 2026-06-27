export type PendulumType = "seconds" | "half_seconds" | "royal" | "gridiron" | "mercury";

export function periodSeconds(lengthM: number): number {
  return parseFloat((2 * Math.PI * Math.sqrt(lengthM / 9.81)).toFixed(4));
}

export function lengthForPeriodM(periodSeconds: number): number {
  return parseFloat((9.81 * periodSeconds * periodSeconds / (4 * Math.PI * Math.PI)).toFixed(4));
}

export function beatsPerHour(periodSeconds: number): number {
  if (periodSeconds <= 0) return 0;
  return Math.round(3600 / periodSeconds);
}

export function bobWeightKg(pendulumType: PendulumType): number {
  const weights: Record<PendulumType, number> = {
    seconds: 2, half_seconds: 1, royal: 5, gridiron: 3, mercury: 4,
  };
  return weights[pendulumType];
}

export function temperatureCompensation(pendulumType: PendulumType): boolean {
  return pendulumType === "gridiron" || pendulumType === "mercury";
}

export function arcDegrees(pendulumType: PendulumType): number {
  const arcs: Record<PendulumType, number> = {
    seconds: 3, half_seconds: 4, royal: 2, gridiron: 3, mercury: 2.5,
  };
  return arcs[pendulumType];
}

export function drivingWeightKg(pendulumType: PendulumType): number {
  const weights: Record<PendulumType, number> = {
    seconds: 4, half_seconds: 3, royal: 8, gridiron: 5, mercury: 6,
  };
  return weights[pendulumType];
}

export function accuracySecondsPerDay(pendulumType: PendulumType): number {
  const accuracy: Record<PendulumType, number> = {
    seconds: 2, half_seconds: 5, royal: 0.5, gridiron: 0.3, mercury: 0.2,
  };
  return accuracy[pendulumType];
}

export function costEstimate(pendulumType: PendulumType): number {
  const costs: Record<PendulumType, number> = {
    seconds: 200, half_seconds: 150, royal: 800, gridiron: 500, mercury: 600,
  };
  return costs[pendulumType];
}

export function pendulumTypes(): PendulumType[] {
  return ["seconds", "half_seconds", "royal", "gridiron", "mercury"];
}
