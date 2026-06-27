export type BandMaterial = "latex" | "theraband" | "natural_rubber" | "surgical_tubing";
export type AmmoType = "steel_ball" | "clay" | "marble" | "lead";

export function bandForce(drawLengthCm: number, bandStrengthKgPerCm: number): number {
  return parseFloat((drawLengthCm * bandStrengthKgPerCm).toFixed(1));
}

export function launchVelocity(forceN: number, drawLengthM: number, ammoMassKg: number): number {
  if (ammoMassKg <= 0) return 0;
  return parseFloat(Math.sqrt(forceN * drawLengthM / ammoMassKg).toFixed(1));
}

export function kineticEnergy(massKg: number, velocityMs: number): number {
  return parseFloat((0.5 * massKg * velocityMs * velocityMs).toFixed(2));
}

export function effectiveRange(velocityMs: number): number {
  return parseFloat((velocityMs * 1.5).toFixed(0));
}

export function ammoWeight(type: AmmoType, diameterMm: number): number {
  const density: Record<AmmoType, number> = {
    steel_ball: 7.85, clay: 1.8, marble: 2.5, lead: 11.34,
  };
  const r = diameterMm / 2 / 10;
  const vol = (4 / 3) * Math.PI * r * r * r;
  return parseFloat((vol * density[type]).toFixed(1));
}

export function bandLifeShots(material: BandMaterial): number {
  const shots: Record<BandMaterial, number> = {
    latex: 2000, theraband: 3000, natural_rubber: 1500, surgical_tubing: 2500,
  };
  return shots[material];
}

export function drawWeight(bandCount: number, bandStrengthKg: number): number {
  return parseFloat((bandCount * bandStrengthKg).toFixed(1));
}

export function forkWidth(ammoMaxDiameterMm: number): number {
  return parseFloat((ammoMaxDiameterMm * 3).toFixed(0));
}

export function pouchSize(ammoDiameterMm: number): number {
  return parseFloat((ammoDiameterMm * 2.5).toFixed(0));
}

export function bandLength(drawLengthCm: number): number {
  return parseFloat((drawLengthCm * 1.4).toFixed(1));
}

export function accuracy(distance: number, skill: number): number {
  const base = Math.max(0, 100 - distance * 2);
  return parseFloat((base * (skill / 10)).toFixed(0));
}

export function safetyDistance(maxRangeM: number): number {
  return parseFloat((maxRangeM * 1.5).toFixed(0));
}

export function bandMaterials(): BandMaterial[] {
  return ["latex", "theraband", "natural_rubber", "surgical_tubing"];
}
