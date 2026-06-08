export class FluidDynamics {
  static reynoldsNumber(velocity: number, charLength: number, kinematicViscosity: number): number {
    return Math.round((velocity * charLength / kinematicViscosity) * 10000) / 10000;
  }

  static bernoulli(density: number, v1: number, h1: number, p1: number, v2: number, h2: number, g = 9.81): number {
    return Math.round((p1 + 0.5 * density * v1 * v1 + density * g * h1
      - 0.5 * density * v2 * v2 - density * g * h2) * 10000) / 10000;
  }

  static dragForce(density: number, velocity: number, dragCoeff: number, area: number): number {
    return Math.round((0.5 * density * velocity * velocity * dragCoeff * area) * 10000) / 10000;
  }

  static liftForce(density: number, velocity: number, liftCoeff: number, area: number): number {
    return Math.round((0.5 * density * velocity * velocity * liftCoeff * area) * 10000) / 10000;
  }

  static machNumber(velocity: number, speedOfSound: number): number {
    return Math.round((velocity / speedOfSound) * 10000) / 10000;
  }

  static flowRate(area: number, velocity: number): number {
    return Math.round((area * velocity) * 10000) / 10000;
  }

  static pressureDrop(friction: number, length: number, diameter: number, density: number, velocity: number): number {
    return Math.round((friction * (length / diameter) * 0.5 * density * velocity * velocity) * 10000) / 10000;
  }

  static buoyancy(fluidDensity: number, volume: number, g = 9.81): number {
    return Math.round((fluidDensity * volume * g) * 10000) / 10000;
  }

  static terminalVelocity(mass: number, dragCoeff: number, density: number, area: number, g = 9.81): number {
    return Math.round(Math.sqrt((2 * mass * g) / (density * dragCoeff * area)) * 10000) / 10000;
  }

  static stokesLaw(viscosity: number, radius: number, velocity: number): number {
    return Math.round((6 * Math.PI * viscosity * radius * velocity) * 10000) / 10000;
  }

  static hydraulicDiameter(area: number, perimeter: number): number {
    return Math.round((4 * area / perimeter) * 10000) / 10000;
  }

  static froudeNumber(velocity: number, depth: number, g = 9.81): number {
    return Math.round((velocity / Math.sqrt(g * depth)) * 10000) / 10000;
  }
}
