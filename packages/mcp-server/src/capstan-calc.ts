export type CapstanPower = "human" | "horse" | "steam" | "electric" | "hydraulic";

export function barCount(crewSize: number): number {
  return Math.ceil(crewSize / 2);
}

export function drumDiameter(ropeDiameter: number, wraps: number): number {
  return parseFloat((ropeDiameter * wraps / Math.PI + ropeDiameter * 4).toFixed(1));
}

export function mechanicalAdvantage(barLength: number, drumRadius: number): number {
  if (drumRadius <= 0) return 0;
  return parseFloat((barLength / drumRadius).toFixed(2));
}

export function liftCapacityKg(crewSize: number, forcePerPerson: number, advantage: number): number {
  return parseFloat((crewSize * forcePerPerson * advantage / 9.81).toFixed(0));
}

export function ropeSpeedMps(drumDiameter: number, rpm: number): number {
  return parseFloat((Math.PI * drumDiameter / 100 * rpm / 60).toFixed(2));
}

export function pawlCount(drumDiameter: number): number {
  return Math.ceil(drumDiameter / 15) + 2;
}

export function barLength(power: CapstanPower): number {
  const lengths: Record<CapstanPower, number> = { human: 150, horse: 300, steam: 0, electric: 0, hydraulic: 0 };
  return lengths[power];
}

export function turnsToRaise(heightM: number, drumCircumference: number): number {
  if (drumCircumference <= 0) return 0;
  return Math.ceil(heightM * 100 / drumCircumference);
}

export function brakeTorque(loadKg: number, drumRadiusCm: number): number {
  return parseFloat((loadKg * 9.81 * drumRadiusCm / 100).toFixed(1));
}

export function capstanPowers(): CapstanPower[] {
  return ["human", "horse", "steam", "electric", "hydraulic"];
}
