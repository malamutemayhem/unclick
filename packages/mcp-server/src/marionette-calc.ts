export type MarionetteType = "hand" | "rod" | "shadow" | "bunraku" | "marionette";
export type JointType = "hinge" | "ball" | "pivot" | "universal";

export function stringCount(type: MarionetteType): number {
  const counts: Record<MarionetteType, number> = {
    hand: 0, rod: 2, shadow: 0, bunraku: 0, marionette: 9,
  };
  return counts[type];
}

export function controlBarWidth(puppetHeightCm: number): number {
  return parseFloat((puppetHeightCm * 0.6).toFixed(1));
}

export function stringLength(stageHeightCm: number): number {
  return parseFloat((stageHeightCm * 0.7).toFixed(1));
}

export function jointRange(joint: JointType): number {
  const deg: Record<JointType, number> = {
    hinge: 120, ball: 270, pivot: 360, universal: 180,
  };
  return deg[joint];
}

export function weightLimit(stringDiameterMm: number, stringCount: number): number {
  const perString = stringDiameterMm * stringDiameterMm * 50;
  return parseFloat((perString * stringCount).toFixed(0));
}

export function bodySegments(): number {
  return 8;
}

export function headWeight(totalWeightG: number): number {
  return parseFloat((totalWeightG * 0.25).toFixed(0));
}

export function limbLength(totalHeightCm: number, segment: string): number {
  const ratios: Record<string, number> = {
    head: 0.15, torso: 0.3, upper_arm: 0.13, forearm: 0.12,
    upper_leg: 0.15, lower_leg: 0.15,
  };
  const ratio = ratios[segment] ?? 0.1;
  return parseFloat((totalHeightCm * ratio).toFixed(1));
}

export function walkCycleFrames(): number {
  return 16;
}

export function operatorHeight(stageTopCm: number): number {
  return parseFloat((stageTopCm + 30).toFixed(0));
}

export function rehearsalHours(complexity: number): number {
  return Math.max(1, complexity * 3);
}

export function marionetteTypes(): MarionetteType[] {
  return ["hand", "rod", "shadow", "bunraku", "marionette"];
}
