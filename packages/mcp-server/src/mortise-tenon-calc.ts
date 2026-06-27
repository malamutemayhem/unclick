export type JointType = "through" | "blind" | "wedged" | "haunched" | "tusk";

export function tenonThicknessMm(stockThicknessMm: number): number {
  return Math.round(stockThicknessMm / 3);
}

export function tenonWidthMm(stockWidthMm: number, joint: JointType): number {
  const factors: Record<JointType, number> = {
    through: 0.8, blind: 0.7, wedged: 0.75, haunched: 0.6, tusk: 0.85,
  };
  return Math.round(stockWidthMm * factors[joint]);
}

export function mortiseDepthMm(stockThicknessMm: number, joint: JointType): number {
  const factors: Record<JointType, number> = {
    through: 1.0, blind: 0.67, wedged: 1.0, haunched: 0.67, tusk: 1.0,
  };
  return Math.round(stockThicknessMm * factors[joint]);
}

export function shoulderCount(joint: JointType): number {
  const counts: Record<JointType, number> = {
    through: 4, blind: 4, wedged: 4, haunched: 3, tusk: 2,
  };
  return counts[joint];
}

export function glueSurfaceAreaFactor(joint: JointType): number {
  const factors: Record<JointType, number> = {
    through: 1.0, blind: 0.8, wedged: 1.2, haunched: 0.7, tusk: 0.9,
  };
  return factors[joint];
}

export function strengthRating(joint: JointType): number {
  const ratings: Record<JointType, number> = {
    through: 4, blind: 3, wedged: 5, haunched: 3, tusk: 4,
  };
  return ratings[joint];
}

export function difficultyRating(joint: JointType): number {
  const ratings: Record<JointType, number> = {
    through: 2, blind: 3, wedged: 4, haunched: 3, tusk: 5,
  };
  return ratings[joint];
}

export function chiselsNeeded(): number {
  return 3;
}

export function cuttingTimeMinutes(joint: JointType): number {
  const times: Record<JointType, number> = {
    through: 30, blind: 40, wedged: 50, haunched: 45, tusk: 60,
  };
  return times[joint];
}

export function jointTypes(): JointType[] {
  return ["through", "blind", "wedged", "haunched", "tusk"];
}
