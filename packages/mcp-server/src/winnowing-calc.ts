export type WinnowingMethod = "hand_toss" | "basket_fan" | "wind_tunnel" | "bellows" | "fanning_mill";

export function throughputKgPerHour(method: WinnowingMethod): number {
  const t: Record<WinnowingMethod, number> = {
    hand_toss: 10, basket_fan: 15, wind_tunnel: 30, bellows: 20, fanning_mill: 50,
  };
  return t[method];
}

export function chaffRemovalPercent(method: WinnowingMethod): number {
  const c: Record<WinnowingMethod, number> = {
    hand_toss: 70, basket_fan: 80, wind_tunnel: 90, bellows: 85, fanning_mill: 95,
  };
  return c[method];
}

export function grainLossPercent(method: WinnowingMethod): number {
  const l: Record<WinnowingMethod, number> = {
    hand_toss: 8, basket_fan: 5, wind_tunnel: 3, bellows: 4, fanning_mill: 2,
  };
  return l[method];
}

export function windDependence(method: WinnowingMethod): boolean {
  return method === "hand_toss" || method === "wind_tunnel";
}

export function operatorsNeeded(method: WinnowingMethod): number {
  const o: Record<WinnowingMethod, number> = {
    hand_toss: 1, basket_fan: 1, wind_tunnel: 2, bellows: 2, fanning_mill: 1,
  };
  return o[method];
}

export function skillLevel(method: WinnowingMethod): number {
  const s: Record<WinnowingMethod, number> = {
    hand_toss: 6, basket_fan: 4, wind_tunnel: 3, bellows: 5, fanning_mill: 2,
  };
  return s[method];
}

export function dustExposure(method: WinnowingMethod): number {
  const d: Record<WinnowingMethod, number> = {
    hand_toss: 8, basket_fan: 6, wind_tunnel: 4, bellows: 7, fanning_mill: 3,
  };
  return d[method];
}

export function portability(method: WinnowingMethod): boolean {
  return method === "hand_toss" || method === "basket_fan";
}

export function costEstimate(method: WinnowingMethod): number {
  const c: Record<WinnowingMethod, number> = {
    hand_toss: 0, basket_fan: 10, wind_tunnel: 50, bellows: 30, fanning_mill: 200,
  };
  return c[method];
}

export function winnowingMethods(): WinnowingMethod[] {
  return ["hand_toss", "basket_fan", "wind_tunnel", "bellows", "fanning_mill"];
}
