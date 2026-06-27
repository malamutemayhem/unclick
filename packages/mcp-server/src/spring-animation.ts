export interface SpringConfig {
  stiffness: number;
  damping: number;
  mass: number;
}

export interface SpringState {
  position: number;
  velocity: number;
}

export class SpringAnimation {
  static simulate(
    config: SpringConfig,
    target: number,
    initial: SpringState = { position: 0, velocity: 0 },
    duration: number,
    dt = 0.016,
  ): SpringState[] {
    const states: SpringState[] = [{ ...initial }];
    let pos = initial.position;
    let vel = initial.velocity;
    const steps = Math.ceil(duration / dt);

    for (let i = 0; i < steps; i++) {
      const springForce = -config.stiffness * (pos - target);
      const dampingForce = -config.damping * vel;
      const accel = (springForce + dampingForce) / config.mass;
      vel += accel * dt;
      pos += vel * dt;
      states.push({
        position: Math.round(pos * 10000) / 10000,
        velocity: Math.round(vel * 10000) / 10000,
      });
    }

    return states;
  }

  static isSettled(states: SpringState[], target: number, threshold = 0.01): boolean {
    if (states.length === 0) return true;
    const last = states[states.length - 1];
    return Math.abs(last.position - target) < threshold && Math.abs(last.velocity) < threshold;
  }

  static settleTime(
    config: SpringConfig,
    target: number,
    threshold = 0.01,
    maxDuration = 10,
    dt = 0.016,
  ): number {
    let pos = 0;
    let vel = 0;
    const steps = Math.ceil(maxDuration / dt);

    for (let i = 0; i < steps; i++) {
      const springForce = -config.stiffness * (pos - target);
      const dampingForce = -config.damping * vel;
      const accel = (springForce + dampingForce) / config.mass;
      vel += accel * dt;
      pos += vel * dt;
      if (Math.abs(pos - target) < threshold && Math.abs(vel) < threshold) {
        return Math.round(i * dt * 10000) / 10000;
      }
    }
    return maxDuration;
  }

  static criticalDamping(stiffness: number, mass: number): number {
    return Math.round(2 * Math.sqrt(stiffness * mass) * 10000) / 10000;
  }

  static naturalFrequency(stiffness: number, mass: number): number {
    return Math.round(Math.sqrt(stiffness / mass) * 10000) / 10000;
  }

  static dampingRatio(config: SpringConfig): number {
    const critical = 2 * Math.sqrt(config.stiffness * config.mass);
    return critical === 0 ? 0 : Math.round((config.damping / critical) * 10000) / 10000;
  }

  static presets = {
    gentle: { stiffness: 120, damping: 14, mass: 1 } as SpringConfig,
    wobbly: { stiffness: 180, damping: 12, mass: 1 } as SpringConfig,
    stiff: { stiffness: 210, damping: 20, mass: 1 } as SpringConfig,
    slow: { stiffness: 280, damping: 60, mass: 1 } as SpringConfig,
    molasses: { stiffness: 280, damping: 120, mass: 1 } as SpringConfig,
  };
}
