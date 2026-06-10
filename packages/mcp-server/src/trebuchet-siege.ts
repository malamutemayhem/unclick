export type AmmunitionType = "stone" | "incendiary" | "disease" | "dead_horse" | "clay_pot";

export function optimalAngle(): number {
  return 45;
}

export function energyJoules(counterweightKg: number, dropHeightM: number): number {
  return parseFloat((counterweightKg * 9.81 * dropHeightM).toFixed(0));
}

export function rangeM(energyJ: number, projectileKg: number, angle: number): number {
  if (projectileKg <= 0) return 0;
  const angleRad = (angle * Math.PI) / 180;
  const velocity = Math.sqrt(2 * energyJ / projectileKg);
  return parseFloat((velocity * velocity * Math.sin(2 * angleRad) / 9.81).toFixed(0));
}

export function rateOfFire(crewSize: number): number {
  if (crewSize < 5) return 0.5;
  if (crewSize < 10) return 1;
  return 2;
}

export function crewSize(counterweightKg: number): number {
  return Math.ceil(counterweightKg / 100) + 5;
}

export function wallBreachShots(wallThicknessCm: number, projectileKg: number): number {
  if (projectileKg <= 0) return Infinity;
  return Math.ceil(wallThicknessCm / (projectileKg * 0.5));
}

export function constructionDays(armLengthM: number): number {
  return Math.ceil(armLengthM * 3);
}

export function timberLogs(armLengthM: number): number {
  return Math.ceil(armLengthM * 8);
}

export function ropeLengthM(armLengthM: number, slingLengthM: number): number {
  return parseFloat((armLengthM * 4 + slingLengthM * 3).toFixed(0));
}

export function ammunitionTypes(): AmmunitionType[] {
  return ["stone", "incendiary", "disease", "dead_horse", "clay_pot"];
}
