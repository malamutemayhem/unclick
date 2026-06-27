export type MirrorConfig = "2_mirror" | "3_mirror" | "4_mirror" | "tapered";
export type ObjectType = "beads" | "oil" | "wheels" | "teleidoscope" | "polarized";

export function reflections(mirrors: number): number {
  if (mirrors < 2) return 1;
  return Math.round(360 / (180 / mirrors)) - 1;
}

export function symmetryFold(mirrorAngleDeg: number): number {
  if (mirrorAngleDeg <= 0) return 0;
  return Math.round(360 / mirrorAngleDeg);
}

export function mirrorAngle(config: MirrorConfig): number {
  const angles: Record<MirrorConfig, number> = {
    "2_mirror": 60, "3_mirror": 60, "4_mirror": 45, tapered: 30,
  };
  return angles[config];
}

export function tubeLength(diameterCm: number, ratio: number = 6): number {
  return parseFloat((diameterCm * ratio).toFixed(1));
}

export function mirrorWidth(tubeDiameterCm: number, config: MirrorConfig): number {
  const factor: Record<MirrorConfig, number> = {
    "2_mirror": 0.45, "3_mirror": 0.42, "4_mirror": 0.35, tapered: 0.5,
  };
  return parseFloat((tubeDiameterCm * factor[config]).toFixed(2));
}

export function mirrorLength(tubeLengthCm: number): number {
  return parseFloat((tubeLengthCm * 0.9).toFixed(1));
}

export function objectChamberDepth(tubeDiameterCm: number): number {
  return parseFloat((tubeDiameterCm * 0.5).toFixed(1));
}

export function eyepieceDiameter(tubeDiameterCm: number): number {
  return parseFloat((tubeDiameterCm * 0.3).toFixed(1));
}

export function imageSegments(mirrorAngleDeg: number): number {
  if (mirrorAngleDeg <= 0) return 0;
  const n = 360 / mirrorAngleDeg;
  return Math.round(n);
}

export function rotationSpeed(rpm: number): number {
  return parseFloat((rpm / 60).toFixed(3));
}

export function colorCount(objectType: ObjectType): number {
  const colors: Record<ObjectType, number> = {
    beads: 12, oil: 6, wheels: 8, teleidoscope: 0, polarized: 3,
  };
  return colors[objectType];
}

export function optimalViewing(tubeLengthCm: number): number {
  return parseFloat((tubeLengthCm * 0.1 + 15).toFixed(0));
}

export function materialCost(mirrorConfig: MirrorConfig, tubeLengthCm: number): number {
  const mirrorCostPerCm = 0.5;
  const mirrors = mirrorConfig === "2_mirror" ? 2 : mirrorConfig === "3_mirror" ? 3 : 4;
  const tubeCost = tubeLengthCm * 0.3;
  return parseFloat((mirrors * tubeLengthCm * mirrorCostPerCm + tubeCost + 5).toFixed(2));
}

export function mirrorConfigs(): MirrorConfig[] {
  return ["2_mirror", "3_mirror", "4_mirror", "tapered"];
}
