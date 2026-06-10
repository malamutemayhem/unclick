export type WinnowMethod = "tossing" | "fan" | "sieve" | "wind_tunnel" | "basket";

export function windSpeedMPerSec(method: WinnowMethod): number {
  const speeds: Record<WinnowMethod, number> = {
    tossing: 3, fan: 5, sieve: 0, wind_tunnel: 8, basket: 2,
  };
  return speeds[method];
}

export function separationRateKgPerHour(method: WinnowMethod): number {
  const rates: Record<WinnowMethod, number> = {
    tossing: 30, fan: 80, sieve: 20, wind_tunnel: 150, basket: 25,
  };
  return rates[method];
}

export function chaffLossPercent(method: WinnowMethod): number {
  const loss: Record<WinnowMethod, number> = {
    tossing: 3, fan: 1, sieve: 5, wind_tunnel: 0.5, basket: 4,
  };
  return loss[method];
}

export function cleanlinessRating(method: WinnowMethod): number {
  const ratings: Record<WinnowMethod, number> = {
    tossing: 3, fan: 4, sieve: 3, wind_tunnel: 5, basket: 2,
  };
  return ratings[method];
}

export function dropHeightCm(method: WinnowMethod): number {
  const heights: Record<WinnowMethod, number> = {
    tossing: 100, fan: 60, sieve: 30, wind_tunnel: 80, basket: 50,
  };
  return heights[method];
}

export function passesRequired(method: WinnowMethod): number {
  const passes: Record<WinnowMethod, number> = {
    tossing: 3, fan: 2, sieve: 4, wind_tunnel: 1, basket: 4,
  };
  return passes[method];
}

export function toolWeightKg(method: WinnowMethod): number {
  const weights: Record<WinnowMethod, number> = {
    tossing: 0.5, fan: 3, sieve: 1, wind_tunnel: 15, basket: 0.8,
  };
  return weights[method];
}

export function laborersNeeded(method: WinnowMethod): number {
  const count: Record<WinnowMethod, number> = {
    tossing: 2, fan: 1, sieve: 1, wind_tunnel: 1, basket: 2,
  };
  return count[method];
}

export function costEstimate(method: WinnowMethod): number {
  const costs: Record<WinnowMethod, number> = {
    tossing: 5, fan: 40, sieve: 15, wind_tunnel: 200, basket: 10,
  };
  return costs[method];
}

export function winnowMethods(): WinnowMethod[] {
  return ["tossing", "fan", "sieve", "wind_tunnel", "basket"];
}
