export type ProjectileType = "stone" | "sand_bag" | "water_balloon" | "pumpkin" | "tennis_ball";

export function counterweightMass(projectileMassKg: number, ratio: number = 100): number {
  return parseFloat((projectileMassKg * ratio).toFixed(1));
}

export function armLength(pivotHeightM: number): number {
  return parseFloat((pivotHeightM * 3).toFixed(1));
}

export function shortArmLength(totalArmM: number, ratio: number = 0.25): number {
  return parseFloat((totalArmM * ratio).toFixed(2));
}

export function longArmLength(totalArmM: number, ratio: number = 0.25): number {
  return parseFloat((totalArmM * (1 - ratio)).toFixed(2));
}

export function slingLength(longArmM: number): number {
  return parseFloat((longArmM * 0.8).toFixed(2));
}

export function releaseAngle(rangeM: number): number {
  return parseFloat((45 - rangeM * 0.05).toFixed(1));
}

export function launchVelocity(rangeM: number, angleDeg: number): number {
  const angleRad = angleDeg * Math.PI / 180;
  const sin2a = Math.sin(2 * angleRad);
  if (sin2a <= 0) return 0;
  return parseFloat(Math.sqrt(rangeM * 9.81 / sin2a).toFixed(1));
}

export function maxRange(velocityMs: number, angleDeg: number = 45): number {
  const angleRad = angleDeg * Math.PI / 180;
  return parseFloat((velocityMs * velocityMs * Math.sin(2 * angleRad) / 9.81).toFixed(1));
}

export function flightTime(velocityMs: number, angleDeg: number): number {
  const angleRad = angleDeg * Math.PI / 180;
  return parseFloat((2 * velocityMs * Math.sin(angleRad) / 9.81).toFixed(2));
}

export function maxHeight(velocityMs: number, angleDeg: number): number {
  const angleRad = angleDeg * Math.PI / 180;
  const vy = velocityMs * Math.sin(angleRad);
  return parseFloat((vy * vy / (2 * 9.81)).toFixed(1));
}

export function efficiency(projectileMassKg: number, counterweightMassKg: number, rangeM: number, heightM: number): number {
  const peIn = counterweightMassKg * 9.81 * heightM;
  const keOut = 0.5 * projectileMassKg * (rangeM * 9.81 / Math.sin(Math.PI / 2));
  if (peIn <= 0) return 0;
  return parseFloat((Math.min(100, keOut / peIn * 100)).toFixed(1));
}

export function projectileWeight(type: ProjectileType): number {
  const kg: Record<ProjectileType, number> = {
    stone: 5, sand_bag: 10, water_balloon: 1, pumpkin: 4, tennis_ball: 0.06,
  };
  return kg[type];
}

export function projectileTypes(): ProjectileType[] {
  return ["stone", "sand_bag", "water_balloon", "pumpkin", "tennis_ball"];
}
