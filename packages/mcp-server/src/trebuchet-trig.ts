export type AmmunitionShape = "sphere" | "cylinder" | "irregular" | "incendiary";

export function armRatio(counterweightArm: number, slingArm: number): number {
  if (slingArm <= 0) return 0;
  return parseFloat((counterweightArm / slingArm).toFixed(2));
}

export function releaseAngle(armRatio: number): number {
  return parseFloat((45 - armRatio * 2).toFixed(1));
}

export function counterweightKg(projectileKg: number, ratio: number, efficiency: number): number {
  if (efficiency <= 0) return 0;
  return parseFloat((projectileKg * ratio / efficiency).toFixed(1));
}

export function rangeM(releaseVelocity: number, angleDeg: number): number {
  const rad = angleDeg * Math.PI / 180;
  return parseFloat((Math.pow(releaseVelocity, 2) * Math.sin(2 * rad) / 9.81).toFixed(1));
}

export function releaseVelocity(counterweightKg: number, dropHeightM: number, projectileKg: number): number {
  if (projectileKg <= 0) return 0;
  return parseFloat(Math.sqrt(2 * 9.81 * dropHeightM * counterweightKg / projectileKg).toFixed(1));
}

export function impactEnergy(massKg: number, velocityMs: number): number {
  return parseFloat((0.5 * massKg * velocityMs * velocityMs).toFixed(0));
}

export function slingLength(armLength: number): number {
  return parseFloat((armLength * 0.8).toFixed(1));
}

export function cycleTimeS(armLength: number): number {
  return parseFloat((2 * Math.PI * Math.sqrt(armLength / 9.81) + 30).toFixed(0));
}

export function crewRequired(counterweightKg: number): number {
  return Math.ceil(counterweightKg / 50) + 2;
}

export function dragCoefficient(shape: AmmunitionShape): number {
  const cd: Record<AmmunitionShape, number> = { sphere: 0.47, cylinder: 0.82, irregular: 1.05, incendiary: 0.6 };
  return cd[shape];
}

export function ammunitionShapes(): AmmunitionShape[] {
  return ["sphere", "cylinder", "irregular", "incendiary"];
}
