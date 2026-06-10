export type WheelType = "kick" | "treadle" | "electric" | "momentum" | "stick";

export function maxSpeedRpm(type: WheelType): number {
  const rpm: Record<WheelType, number> = {
    kick: 80, treadle: 120, electric: 300, momentum: 150, stick: 200,
  };
  return rpm[type];
}

export function wheelHeadDiameterCm(type: WheelType): number {
  const dia: Record<WheelType, number> = {
    kick: 35, treadle: 30, electric: 30, momentum: 40, stick: 25,
  };
  return dia[type];
}

export function maxClayWeightKg(type: WheelType): number {
  const weight: Record<WheelType, number> = {
    kick: 12, treadle: 8, electric: 25, momentum: 15, stick: 3,
  };
  return weight[type];
}

export function speedControl(type: WheelType): number {
  const control: Record<WheelType, number> = {
    kick: 3, treadle: 4, electric: 5, momentum: 2, stick: 1,
  };
  return control[type];
}

export function portability(type: WheelType): number {
  const port: Record<WheelType, number> = {
    kick: 1, treadle: 2, electric: 3, momentum: 1, stick: 5,
  };
  return port[type];
}

export function noiseLevel(type: WheelType): number {
  const noise: Record<WheelType, number> = {
    kick: 1, treadle: 2, electric: 3, momentum: 1, stick: 1,
  };
  return noise[type];
}

export function electricityRequired(type: WheelType): boolean {
  return type === "electric";
}

export function beginnerFriendly(type: WheelType): boolean {
  return type === "electric" || type === "treadle";
}

export function costEstimate(type: WheelType): number {
  const costs: Record<WheelType, number> = {
    kick: 300, treadle: 400, electric: 600, momentum: 250, stick: 20,
  };
  return costs[type];
}

export function wheelTypes(): WheelType[] {
  return ["kick", "treadle", "electric", "momentum", "stick"];
}
