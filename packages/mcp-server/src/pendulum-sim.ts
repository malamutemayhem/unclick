export interface PendulumState {
  angle: number;
  angularVelocity: number;
}

export class PendulumSim {
  static step(state: PendulumState, length: number, dt: number, g = 9.81, damping = 0): PendulumState {
    const angAccel = -(g / length) * Math.sin(state.angle) - damping * state.angularVelocity;
    const newVel = state.angularVelocity + angAccel * dt;
    const newAngle = state.angle + newVel * dt;
    return {
      angle: Math.round(newAngle * 10000) / 10000,
      angularVelocity: Math.round(newVel * 10000) / 10000,
    };
  }

  static simulate(initial: PendulumState, length: number, dt: number, steps: number, g = 9.81, damping = 0): PendulumState[] {
    const states: PendulumState[] = [initial];
    let current = initial;
    for (let i = 0; i < steps; i++) {
      current = PendulumSim.step(current, length, dt, g, damping);
      states.push(current);
    }
    return states;
  }

  static period(length: number, g = 9.81): number {
    return Math.round(2 * Math.PI * Math.sqrt(length / g) * 10000) / 10000;
  }

  static maxVelocity(angle0: number, length: number, g = 9.81): number {
    return Math.round(Math.sqrt(2 * g * length * (1 - Math.cos(angle0))) / length * 10000) / 10000;
  }

  static energy(state: PendulumState, length: number, mass: number, g = 9.81): {
    kinetic: number; potential: number; total: number;
  } {
    const v = state.angularVelocity * length;
    const kinetic = 0.5 * mass * v * v;
    const potential = mass * g * length * (1 - Math.cos(state.angle));
    return {
      kinetic: Math.round(kinetic * 10000) / 10000,
      potential: Math.round(potential * 10000) / 10000,
      total: Math.round((kinetic + potential) * 10000) / 10000,
    };
  }

  static position(state: PendulumState, length: number): { x: number; y: number } {
    return {
      x: Math.round(length * Math.sin(state.angle) * 10000) / 10000,
      y: Math.round(-length * Math.cos(state.angle) * 10000) / 10000,
    };
  }

  static doublePendulumStep(
    a1: number, a2: number, w1: number, w2: number,
    l1: number, l2: number, m1: number, m2: number,
    dt: number, g = 9.81,
  ): { a1: number; a2: number; w1: number; w2: number } {
    const da = a1 - a2;
    const den1 = (2 * m1 + m2 - m2 * Math.cos(2 * da));
    const num1 = -g * (2 * m1 + m2) * Math.sin(a1)
      - m2 * g * Math.sin(a1 - 2 * a2)
      - 2 * Math.sin(da) * m2 * (w2 * w2 * l2 + w1 * w1 * l1 * Math.cos(da));
    const alpha1 = num1 / (l1 * den1);

    const num2 = 2 * Math.sin(da) * (
      w1 * w1 * l1 * (m1 + m2)
      + g * (m1 + m2) * Math.cos(a1)
      + w2 * w2 * l2 * m2 * Math.cos(da)
    );
    const alpha2 = num2 / (l2 * den1);

    const nw1 = w1 + alpha1 * dt;
    const nw2 = w2 + alpha2 * dt;
    return {
      a1: Math.round((a1 + nw1 * dt) * 10000) / 10000,
      a2: Math.round((a2 + nw2 * dt) * 10000) / 10000,
      w1: Math.round(nw1 * 10000) / 10000,
      w2: Math.round(nw2 * 10000) / 10000,
    };
  }
}
