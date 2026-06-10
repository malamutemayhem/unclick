export type WheelType = "kick" | "treadle" | "electric" | "momentum" | "hand_crank";

export function wheelSpeedRpm(type: WheelType): number {
  const speeds: Record<WheelType, number> = {
    kick: 60, treadle: 100, electric: 300, momentum: 80, hand_crank: 40,
  };
  return speeds[type];
}

export function headWeightKg(type: WheelType): number {
  const weights: Record<WheelType, number> = {
    kick: 25, treadle: 20, electric: 12, momentum: 35, hand_crank: 15,
  };
  return weights[type];
}

export function maxClayKg(type: WheelType): number {
  const max: Record<WheelType, number> = {
    kick: 15, treadle: 10, electric: 25, momentum: 20, hand_crank: 5,
  };
  return max[type];
}

export function centeringTimeSeconds(clayKg: number, skill: "beginner" | "intermediate" | "expert"): number {
  const mult: Record<string, number> = { beginner: 60, intermediate: 20, expert: 8 };
  return Math.round(clayKg * mult[skill]);
}

export function throwingTimeMinutes(heightCm: number, diameterCm: number): number {
  return parseFloat(((heightCm + diameterCm) * 0.3).toFixed(1));
}

export function trimTimeMinutes(heightCm: number): number {
  return parseFloat((heightCm * 0.5 + 2).toFixed(1));
}

export function batSizeCm(maxClayKg: number): number {
  return Math.round(maxClayKg * 2 + 20);
}

export function splashPanDiameterCm(headDiameterCm: number): number {
  return Math.round(headDiameterCm + 15);
}

export function powerConsumptionWatts(type: WheelType): number {
  const watts: Record<WheelType, number> = {
    kick: 0, treadle: 0, electric: 250, momentum: 0, hand_crank: 0,
  };
  return watts[type];
}

export function costEstimate(type: WheelType, baseCost: number): number {
  const mult: Record<WheelType, number> = {
    kick: 1.5, treadle: 2.0, electric: 3.0, momentum: 2.5, hand_crank: 1.0,
  };
  return parseFloat((baseCost * mult[type]).toFixed(2));
}

export function wheelTypes(): WheelType[] {
  return ["kick", "treadle", "electric", "momentum", "hand_crank"];
}
