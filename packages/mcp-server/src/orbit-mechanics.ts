export interface OrbitalElements {
  semiMajorAxis: number;
  eccentricity: number;
  period: number;
  apoapsis: number;
  periapsis: number;
}

export class OrbitMechanics {
  static orbitalPeriod(semiMajorAxis: number, centralMass: number, G = 6.674e-11): number {
    return Math.round(2 * Math.PI * Math.sqrt(Math.pow(semiMajorAxis, 3) / (G * centralMass)) * 10000) / 10000;
  }

  static orbitalVelocity(radius: number, centralMass: number, G = 6.674e-11): number {
    return Math.round(Math.sqrt(G * centralMass / radius) * 10000) / 10000;
  }

  static escapeVelocity(radius: number, mass: number, G = 6.674e-11): number {
    return Math.round(Math.sqrt(2 * G * mass / radius) * 10000) / 10000;
  }

  static elements(periapsis: number, apoapsis: number, centralMass: number, G = 6.674e-11): OrbitalElements {
    const semiMajorAxis = (periapsis + apoapsis) / 2;
    const eccentricity = (apoapsis - periapsis) / (apoapsis + periapsis);
    const period = OrbitMechanics.orbitalPeriod(semiMajorAxis, centralMass, G);
    return {
      semiMajorAxis: Math.round(semiMajorAxis * 10000) / 10000,
      eccentricity: Math.round(eccentricity * 10000) / 10000,
      period,
      apoapsis: Math.round(apoapsis * 10000) / 10000,
      periapsis: Math.round(periapsis * 10000) / 10000,
    };
  }

  static position(semiMajorAxis: number, eccentricity: number, trueAnomaly: number): { x: number; y: number } {
    const r = semiMajorAxis * (1 - eccentricity * eccentricity) / (1 + eccentricity * Math.cos(trueAnomaly));
    return {
      x: Math.round(r * Math.cos(trueAnomaly) * 10000) / 10000,
      y: Math.round(r * Math.sin(trueAnomaly) * 10000) / 10000,
    };
  }

  static hohmannTransfer(r1: number, r2: number, centralMass: number, G = 6.674e-11): {
    deltaV1: number;
    deltaV2: number;
    totalDeltaV: number;
    transferTime: number;
  } {
    const mu = G * centralMass;
    const v1 = Math.sqrt(mu / r1);
    const v2 = Math.sqrt(mu / r2);
    const aTransfer = (r1 + r2) / 2;
    const vTransfer1 = Math.sqrt(mu * (2 / r1 - 1 / aTransfer));
    const vTransfer2 = Math.sqrt(mu * (2 / r2 - 1 / aTransfer));
    const dv1 = Math.abs(vTransfer1 - v1);
    const dv2 = Math.abs(v2 - vTransfer2);
    const transferTime = Math.PI * Math.sqrt(Math.pow(aTransfer, 3) / mu);

    return {
      deltaV1: Math.round(dv1 * 10000) / 10000,
      deltaV2: Math.round(dv2 * 10000) / 10000,
      totalDeltaV: Math.round((dv1 + dv2) * 10000) / 10000,
      transferTime: Math.round(transferTime * 10000) / 10000,
    };
  }

  static gravitationalParameter(mass: number, G = 6.674e-11): number {
    return Math.round(G * mass * 10000) / 10000;
  }

  static hillSphere(semiMajorAxis: number, bodyMass: number, centralMass: number): number {
    return Math.round(semiMajorAxis * Math.pow(bodyMass / (3 * centralMass), 1 / 3) * 10000) / 10000;
  }

  static orbitPath(semiMajorAxis: number, eccentricity: number, samples = 100): { x: number; y: number }[] {
    const points: { x: number; y: number }[] = [];
    for (let i = 0; i <= samples; i++) {
      const angle = (2 * Math.PI * i) / samples;
      points.push(OrbitMechanics.position(semiMajorAxis, eccentricity, angle));
    }
    return points;
  }
}
