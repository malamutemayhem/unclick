export type LockType = "pin_tumbler" | "wafer" | "disc_detainer" | "lever" | "dimple" | "tubular";
export type PickTool = "hook" | "rake" | "diamond" | "ball" | "snake" | "tension_wrench";

export function pinCount(type: LockType): number {
  const pins: Record<LockType, number> = {
    pin_tumbler: 5, wafer: 4, disc_detainer: 11, lever: 5, dimple: 5, tubular: 7,
  };
  return pins[type];
}

export function keyCombinations(pins: number, heights: number): number {
  return Math.pow(heights, pins);
}

export function securityRating(pins: number, spoolPins: number, serrated: number): number {
  const base = pins * 10;
  const bonus = spoolPins * 15 + serrated * 10;
  return Math.min(100, base + bonus);
}

export function pickTime(secRating: number, skillLevel: number): number {
  const base = secRating * 3;
  const factor = Math.max(0.1, 1 - skillLevel * 0.08);
  return Math.round(base * factor);
}

export function tensionDirection(keyway: "top" | "bottom"): string {
  return keyway === "top" ? "bottom of keyway (BOK)" : "top of keyway (TOK)";
}

export function bindingOrder(pins: number): number[] {
  const order: number[] = [];
  for (let i = 0; i < pins; i++) {
    order.push(i + 1);
  }
  return order;
}

export function masterKeyPins(masterHeight: number, operatingHeight: number): number {
  return Math.abs(masterHeight - operatingHeight);
}

export function bumpKeyDepth(maxDepth: number): number {
  return maxDepth - 1;
}

export function decodePinHeight(keyBitting: number[], position: number): number {
  if (position < 0 || position >= keyBitting.length) return 0;
  return keyBitting[position];
}

export function shearLineGap(toleranceMm: number): number {
  return parseFloat((toleranceMm * 2).toFixed(3));
}

export function springTensionG(wireGauge: number): number {
  return parseFloat((wireGauge * 12).toFixed(0));
}

export function rekeyCost(pins: number, locks: number): number {
  return parseFloat((pins * locks * 0.5 + locks * 5).toFixed(2));
}

export function difficultyLevel(type: LockType): number {
  const levels: Record<LockType, number> = {
    wafer: 1, pin_tumbler: 3, dimple: 5, lever: 4, disc_detainer: 7, tubular: 6,
  };
  return levels[type];
}

export function lockTypes(): LockType[] {
  return ["pin_tumbler", "wafer", "disc_detainer", "lever", "dimple", "tubular"];
}
