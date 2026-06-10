export type WheelMaterial = "rosined_wood" | "leather" | "cotton" | "synthetic";

export function wheelDiameterCm(stringLength: number): number {
  return parseFloat((stringLength * 0.08 + 8).toFixed(1));
}

export function crankRpm(tempo: string): number {
  const rpms: Record<string, number> = { slow: 40, moderate: 70, fast: 100, drone: 30 };
  return rpms[tempo] || 70;
}

export function stringTensionN(pitchHz: number, lengthCm: number, massGPerCm: number): number {
  return parseFloat((4 * Math.pow(lengthCm / 100, 2) * Math.pow(pitchHz, 2) * massGPerCm / 1000).toFixed(1));
}

export function keyCount(chromatic: boolean, octaves: number): number {
  return chromatic ? octaves * 12 : octaves * 7;
}

export function droneStrings(style: string): number {
  const drones: Record<string, number> = { french: 2, german: 1, hungarian: 3, medieval: 1 };
  return drones[style] || 2;
}

export function tangentHeight(keyTravel: number): number {
  return parseFloat((keyTravel * 0.6).toFixed(1));
}

export function wheelPressure(crankForceN: number, contactAreaCm2: number): number {
  if (contactAreaCm2 <= 0) return 0;
  return parseFloat((crankForceN / contactAreaCm2).toFixed(2));
}

export function rosinInterval(playHours: number, wheelMaterial: WheelMaterial): number {
  const factor: Record<WheelMaterial, number> = { rosined_wood: 2, leather: 4, cotton: 1, synthetic: 6 };
  return parseFloat((playHours / factor[wheelMaterial]).toFixed(1));
}

export function soundVolumeDba(wheelSpeed: number, stringCount: number): number {
  return parseFloat((50 + wheelSpeed * 0.2 + stringCount * 3).toFixed(0));
}

export function tuningPegs(melodyStrings: number, droneStrings: number, sympatheticStrings: number): number {
  return melodyStrings + droneStrings + sympatheticStrings;
}

export function wheelMaterials(): WheelMaterial[] {
  return ["rosined_wood", "leather", "cotton", "synthetic"];
}
