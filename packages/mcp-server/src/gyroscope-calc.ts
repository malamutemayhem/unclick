export type GyroscopeType = "mechanical" | "mems" | "fiber_optic" | "ring_laser" | "vibrating";

export function angularMomentum(momentOfInertia: number, angularVelocityRad: number): number {
  return parseFloat((momentOfInertia * angularVelocityRad).toFixed(4));
}

export function precessionRate(torque: number, angularMomentum: number): number {
  if (angularMomentum <= 0) return 0;
  return parseFloat((torque / angularMomentum).toFixed(4));
}

export function momentOfInertia(massKg: number, radiusM: number): number {
  return parseFloat((0.5 * massKg * radiusM * radiusM).toFixed(6));
}

export function rpmToRadPerSec(rpm: number): number {
  return parseFloat((rpm * 2 * Math.PI / 60).toFixed(4));
}

export function radPerSecToRpm(radPerSec: number): number {
  return parseFloat((radPerSec * 60 / (2 * Math.PI)).toFixed(1));
}

export function nutationFreq(spinRate: number, tiltAngleDeg: number): number {
  const tiltRad = tiltAngleDeg * Math.PI / 180;
  return parseFloat((spinRate * Math.cos(tiltRad)).toFixed(2));
}

export function kineticEnergy(momentOfInertia: number, angularVelocityRad: number): number {
  return parseFloat((0.5 * momentOfInertia * angularVelocityRad * angularVelocityRad).toFixed(4));
}

export function spindownTime(momentOfInertia: number, frictionTorque: number, initialRpm: number): number {
  if (frictionTorque <= 0) return Infinity;
  const omega = rpmToRadPerSec(initialRpm);
  return parseFloat((momentOfInertia * omega / frictionTorque).toFixed(1));
}

export function sensitivity(type: GyroscopeType): number {
  const degPerHour: Record<GyroscopeType, number> = {
    mechanical: 1, mems: 10, fiber_optic: 0.001,
    ring_laser: 0.0001, vibrating: 5,
  };
  return degPerHour[type];
}

export function driftRate(type: GyroscopeType): number {
  const drift: Record<GyroscopeType, number> = {
    mechanical: 0.1, mems: 1, fiber_optic: 0.001,
    ring_laser: 0.0001, vibrating: 0.5,
  };
  return drift[type];
}

export function gyroscopeTypes(): GyroscopeType[] {
  return ["mechanical", "mems", "fiber_optic", "ring_laser", "vibrating"];
}
