export type CatapultType = "onager" | "mangonel" | "ballista" | "springald" | "scorpio";

export function torsionForce(ropeDiameterCm: number, turns: number): number {
  return parseFloat((Math.PI * Math.pow(ropeDiameterCm, 2) * turns * 50).toFixed(0));
}

export function projectileRange(forceN: number, massKg: number, angleDeg: number): number {
  if (massKg <= 0) return 0;
  const velocity = Math.sqrt(2 * forceN / massKg);
  const rad = angleDeg * Math.PI / 180;
  return parseFloat((velocity * velocity * Math.sin(2 * rad) / 9.81).toFixed(1));
}

export function armLength(type: CatapultType): number {
  const lengths: Record<CatapultType, number> = { onager: 300, mangonel: 250, ballista: 150, springald: 120, scorpio: 100 };
  return lengths[type];
}

export function crewSize(type: CatapultType): number {
  const crew: Record<CatapultType, number> = { onager: 8, mangonel: 6, ballista: 3, springald: 2, scorpio: 2 };
  return crew[type];
}

export function reloadTimeS(type: CatapultType): number {
  const times: Record<CatapultType, number> = { onager: 60, mangonel: 45, ballista: 30, springald: 20, scorpio: 15 };
  return times[type];
}

export function maxProjectileKg(type: CatapultType): number {
  const max: Record<CatapultType, number> = { onager: 80, mangonel: 60, ballista: 15, springald: 5, scorpio: 3 };
  return max[type];
}

export function ropeWeight(diameterCm: number, lengthM: number): number {
  return parseFloat((Math.PI * Math.pow(diameterCm / 2, 2) * lengthM * 1.2).toFixed(1));
}

export function windageEffect(windSpeed: number, projectileMass: number): number {
  if (projectileMass <= 0) return 0;
  return parseFloat((windSpeed * windSpeed * 0.1 / projectileMass).toFixed(2));
}

export function accuracyPercent(range: number, maxRange: number): number {
  if (maxRange <= 0) return 0;
  return parseFloat(Math.max(0, 100 - (range / maxRange) * 80).toFixed(0));
}

export function catapultTypes(): CatapultType[] {
  return ["onager", "mangonel", "ballista", "springald", "scorpio"];
}
