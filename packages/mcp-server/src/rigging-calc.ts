export type RigType = "square" | "lateen" | "gaff" | "bermuda" | "junk";

export function mastHeightM(hullLengthM: number, rigType: RigType): number {
  const ratios: Record<RigType, number> = {
    square: 0.9, lateen: 0.85, gaff: 0.8, bermuda: 1.1, junk: 0.7,
  };
  return parseFloat((hullLengthM * ratios[rigType]).toFixed(2));
}

export function sailAreaM2(mastHeightM: number, rigType: RigType): number {
  const factors: Record<RigType, number> = {
    square: 1.5, lateen: 1.2, gaff: 1.3, bermuda: 1.0, junk: 1.4,
  };
  return parseFloat((mastHeightM ** 2 * factors[rigType]).toFixed(1));
}

export function standingRiggingLengthM(mastHeightM: number): number {
  return parseFloat((mastHeightM * 4.5).toFixed(1));
}

export function runningRiggingLengthM(mastHeightM: number, rigType: RigType): number {
  const factors: Record<RigType, number> = {
    square: 8, lateen: 5, gaff: 6, bermuda: 4, junk: 3,
  };
  return parseFloat((mastHeightM * factors[rigType]).toFixed(1));
}

export function shroudCount(mastHeightM: number): number {
  return Math.max(4, Math.ceil(mastHeightM / 3) * 2);
}

export function blockCount(rigType: RigType, mastCount: number): number {
  const blocksPerMast: Record<RigType, number> = {
    square: 20, lateen: 8, gaff: 12, bermuda: 6, junk: 4,
  };
  return blocksPerMast[rigType] * mastCount;
}

export function ropeDiameterMm(sailAreaM2: number): number {
  return parseFloat((Math.sqrt(sailAreaM2) * 0.8 + 8).toFixed(1));
}

export function windForceKn(sailAreaM2: number, windSpeedKnots: number): number {
  const windMps = windSpeedKnots * 0.5144;
  return parseFloat((0.5 * 1.225 * windMps ** 2 * sailAreaM2 / 1000).toFixed(1));
}

export function reefPoints(sailAreaM2: number): number {
  return Math.max(1, Math.ceil(sailAreaM2 / 30));
}

export function riggingCost(rigType: RigType, mastHeightM: number, baseCost: number): number {
  const multipliers: Record<RigType, number> = {
    square: 2.5, lateen: 1.5, gaff: 2.0, bermuda: 1.8, junk: 1.2,
  };
  return parseFloat((mastHeightM * baseCost * multipliers[rigType]).toFixed(2));
}

export function rigTypes(): RigType[] {
  return ["square", "lateen", "gaff", "bermuda", "junk"];
}
