export type Scale = "Z" | "N" | "HO" | "OO" | "S" | "O" | "G";

const SCALE_RATIOS: Record<Scale, number> = {
  Z: 220, N: 160, HO: 87, OO: 76, S: 64, O: 48, G: 22.5,
};

const TRACK_GAUGE_MM: Record<Scale, number> = {
  Z: 6.5, N: 9, HO: 16.5, OO: 16.5, S: 22.5, O: 32, G: 45,
};

export function scaleRatio(scale: Scale): number {
  return SCALE_RATIOS[scale];
}

export function trackGauge(scale: Scale): number {
  return TRACK_GAUGE_MM[scale];
}

export function realToScale(realMm: number, scale: Scale): number {
  return parseFloat((realMm / SCALE_RATIOS[scale]).toFixed(2));
}

export function scaleToReal(scaleMm: number, scale: Scale): number {
  return parseFloat((scaleMm * SCALE_RATIOS[scale]).toFixed(0));
}

export function minimumRadius(scale: Scale): number {
  const radii: Record<Scale, number> = {
    Z: 145, N: 195, HO: 380, OO: 370, S: 560, O: 760, G: 1200,
  };
  return radii[scale];
}

export function trackLength(layoutLengthCm: number, layoutWidthCm: number, loops: number = 1): number {
  const perimeter = 2 * (layoutLengthCm + layoutWidthCm) - 4 * 30;
  return parseFloat((perimeter * loops / 100).toFixed(1));
}

export function turnoutCount(switches: number): number {
  return switches;
}

export function trainSpeed(realKmh: number, scale: Scale): number {
  return parseFloat((realKmh * 1000000 / (SCALE_RATIOS[scale] * 3600)).toFixed(1));
}

export function powerSupply(locoCount: number, wattsPerLoco: number = 15, accessories: number = 5): number {
  return locoCount * wattsPerLoco + accessories;
}

export function wireGauge(totalWatts: number): number {
  if (totalWatts <= 20) return 22;
  if (totalWatts <= 40) return 18;
  if (totalWatts <= 80) return 16;
  return 14;
}

export function feederWires(trackMeters: number, intervalM: number = 1.5): number {
  return Math.ceil(trackMeters / intervalM);
}

export function sceneryArea(layoutCm2: number, trackPercent: number = 30): number {
  return parseFloat((layoutCm2 * (100 - trackPercent) / 100 / 10000).toFixed(2));
}

export function treeCount(sceneryM2: number, density: "sparse" | "medium" | "dense"): number {
  const perM2: Record<string, number> = { sparse: 5, medium: 15, dense: 30 };
  return Math.round(sceneryM2 * perM2[density]);
}

export function buildingFootprint(realM2: number, scale: Scale): number {
  return parseFloat((realM2 * 1000000 / (SCALE_RATIOS[scale] * SCALE_RATIOS[scale])).toFixed(1));
}

export function estimateCost(trackM: number, pricePerM: number, locos: number, pricePerLoco: number, buildings: number, pricePerBuilding: number): number {
  return parseFloat((trackM * pricePerM + locos * pricePerLoco + buildings * pricePerBuilding).toFixed(2));
}

export function scales(): Scale[] {
  return ["Z", "N", "HO", "OO", "S", "O", "G"];
}
