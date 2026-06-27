export type DropMechanism = "hinged" | "fixed" | "propped" | "sliding";

export function dropHeight(counterweightArmM: number, pivotHeightM: number): number {
  return parseFloat((counterweightArmM + pivotHeightM).toFixed(1));
}

export function potentialEnergyJ(massKg: number, heightM: number): number {
  return parseFloat((massKg * 9.81 * heightM).toFixed(0));
}

export function efficiencyPercent(mechanism: DropMechanism): number {
  const eff: Record<DropMechanism, number> = { hinged: 85, fixed: 60, propped: 70, sliding: 75 };
  return eff[mechanism];
}

export function kineticEnergyJ(potentialJ: number, efficiency: number): number {
  return parseFloat((potentialJ * efficiency / 100).toFixed(0));
}

export function dropTimeS(heightM: number): number {
  if (heightM <= 0) return 0;
  return parseFloat(Math.sqrt(2 * heightM / 9.81).toFixed(2));
}

export function impactVelocity(heightM: number): number {
  if (heightM <= 0) return 0;
  return parseFloat(Math.sqrt(2 * 9.81 * heightM).toFixed(1));
}

export function counterweightBoxVolume(massKg: number, fillDensity: number): number {
  if (fillDensity <= 0) return 0;
  return parseFloat((massKg / fillDensity).toFixed(2));
}

export function pivotLoadKn(counterweightKg: number, projectileKg: number): number {
  return parseFloat(((counterweightKg + projectileKg) * 9.81 / 1000).toFixed(1));
}

export function frameStress(pivotLoadKn: number, beamAreaCm2: number): number {
  if (beamAreaCm2 <= 0) return 0;
  return parseFloat((pivotLoadKn * 1000 / beamAreaCm2).toFixed(1));
}

export function safetyFactor(yieldStrength: number, stress: number): number {
  if (stress <= 0) return 0;
  return parseFloat((yieldStrength / stress).toFixed(1));
}

export function dropMechanisms(): DropMechanism[] {
  return ["hinged", "fixed", "propped", "sliding"];
}
