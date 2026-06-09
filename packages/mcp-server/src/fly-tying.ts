export type FlyStyle = "dry" | "wet" | "nymph" | "streamer" | "emerger" | "terrestrial";
export type HookType = "standard" | "curved" | "jig" | "streamer" | "scud" | "stinger";

export function hookGape(hookSize: number): number {
  if (hookSize >= 16) return 2;
  if (hookSize >= 12) return 3;
  if (hookSize >= 8) return 4;
  if (hookSize >= 4) return 6;
  return 8;
}

export function threadSize(hookSize: number): string {
  if (hookSize >= 18) return "16/0";
  if (hookSize >= 12) return "8/0";
  if (hookSize >= 6) return "6/0";
  return "3/0";
}

export function tailLength(hookGapeMm: number, style: FlyStyle): number {
  const multiplier: Record<FlyStyle, number> = {
    dry: 1.5, wet: 1, nymph: 0.5, streamer: 3, emerger: 1, terrestrial: 0,
  };
  return parseFloat((hookGapeMm * multiplier[style]).toFixed(1));
}

export function bodyLength(shankLengthMm: number): number {
  return parseFloat((shankLengthMm * 0.7).toFixed(1));
}

export function hackleWraps(style: FlyStyle): number {
  const wraps: Record<FlyStyle, number> = {
    dry: 5, wet: 3, nymph: 0, streamer: 2, emerger: 3, terrestrial: 4,
  };
  return wraps[style];
}

export function hackleSize(hookSize: number): number {
  return hookSize;
}

export function wingLength(hookGapeMm: number, style: FlyStyle): number {
  if (style === "nymph" || style === "terrestrial") return 0;
  return parseFloat((hookGapeMm * 2).toFixed(1));
}

export function headCementDrops(): number {
  return 2;
}

export function beadSize(hookSize: number): number {
  if (hookSize >= 16) return 2.0;
  if (hookSize >= 12) return 2.5;
  if (hookSize >= 8) return 3.3;
  return 4.0;
}

export function tyingTime(style: FlyStyle): number {
  const minutes: Record<FlyStyle, number> = {
    dry: 8, wet: 6, nymph: 5, streamer: 12, emerger: 7, terrestrial: 10,
  };
  return minutes[style];
}

export function materialCost(hookCost: number, threadCost: number, materialsCost: number): number {
  return parseFloat((hookCost + threadCost + materialsCost).toFixed(2));
}

export function costPerFly(materialCostVal: number, fliesPerSet: number): number {
  if (fliesPerSet === 0) return 0;
  return parseFloat((materialCostVal / fliesPerSet).toFixed(2));
}

export function dozenTime(style: FlyStyle): number {
  return tyingTime(style) * 12;
}

export function flyStyles(): FlyStyle[] {
  return ["dry", "wet", "nymph", "streamer", "emerger", "terrestrial"];
}
