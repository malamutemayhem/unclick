export interface ProjectileState {
  x: number;
  y: number;
  vx: number;
  vy: number;
  time: number;
}

export interface ProjectileConfig {
  gravity: number;
  drag: number;
  windX: number;
  windY: number;
}

export const DEFAULT_CONFIG: ProjectileConfig = {
  gravity: 9.81,
  drag: 0,
  windX: 0,
  windY: 0,
};

export function launch(
  speed: number,
  angleDeg: number,
  x0 = 0,
  y0 = 0
): ProjectileState {
  const rad = angleDeg * Math.PI / 180;
  return {
    x: x0,
    y: y0,
    vx: speed * Math.cos(rad),
    vy: speed * Math.sin(rad),
    time: 0,
  };
}

export function step(state: ProjectileState, dt: number, config: ProjectileConfig = DEFAULT_CONFIG): ProjectileState {
  let ax = config.windX;
  let ay = -config.gravity + config.windY;

  if (config.drag > 0) {
    const speed = Math.sqrt(state.vx * state.vx + state.vy * state.vy);
    if (speed > 0) {
      ax -= config.drag * state.vx * speed;
      ay -= config.drag * state.vy * speed;
    }
  }

  const vx = state.vx + ax * dt;
  const vy = state.vy + ay * dt;

  return {
    x: state.x + vx * dt,
    y: state.y + vy * dt,
    vx,
    vy,
    time: state.time + dt,
  };
}

export function simulate(
  state: ProjectileState,
  dt = 0.01,
  config: ProjectileConfig = DEFAULT_CONFIG,
  maxTime = 1000
): ProjectileState[] {
  const trajectory: ProjectileState[] = [state];
  let current = state;

  while (current.time < maxTime) {
    current = step(current, dt, config);
    trajectory.push(current);
    if (current.y < 0 && current.vy < 0) break;
  }

  return trajectory;
}

export function range(speed: number, angleDeg: number, g = 9.81): number {
  const rad = angleDeg * Math.PI / 180;
  return (speed * speed * Math.sin(2 * rad)) / g;
}

export function maxHeight(speed: number, angleDeg: number, g = 9.81): number {
  const rad = angleDeg * Math.PI / 180;
  const vy = speed * Math.sin(rad);
  return (vy * vy) / (2 * g);
}

export function timeOfFlight(speed: number, angleDeg: number, g = 9.81): number {
  const rad = angleDeg * Math.PI / 180;
  return (2 * speed * Math.sin(rad)) / g;
}

export function optimalAngle(g = 9.81): number {
  return 45;
}

export function landingPosition(
  speed: number,
  angleDeg: number,
  dt = 0.01,
  config: ProjectileConfig = DEFAULT_CONFIG
): { x: number; y: number; time: number } {
  const traj = simulate(launch(speed, angleDeg), dt, config);
  const last = traj[traj.length - 1];
  return { x: last.x, y: Math.max(0, last.y), time: last.time };
}

export function trajectoryAtTime(speed: number, angleDeg: number, t: number, g = 9.81): { x: number; y: number } {
  const rad = angleDeg * Math.PI / 180;
  const vx = speed * Math.cos(rad);
  const vy = speed * Math.sin(rad);
  return {
    x: vx * t,
    y: vy * t - 0.5 * g * t * t,
  };
}

export function speedAtTime(speed: number, angleDeg: number, t: number, g = 9.81): number {
  const rad = angleDeg * Math.PI / 180;
  const vx = speed * Math.cos(rad);
  const vy = speed * Math.sin(rad) - g * t;
  return Math.sqrt(vx * vx + vy * vy);
}

export function angleAtTime(speed: number, angleDeg: number, t: number, g = 9.81): number {
  const rad = angleDeg * Math.PI / 180;
  const vx = speed * Math.cos(rad);
  const vy = speed * Math.sin(rad) - g * t;
  return Math.atan2(vy, vx) * 180 / Math.PI;
}

export function energyAtHeight(speed: number, h: number, mass = 1, g = 9.81): { kinetic: number; potential: number; total: number } {
  const total = 0.5 * mass * speed * speed;
  const potential = mass * g * h;
  const kinetic = total - potential;
  return { kinetic: Math.max(0, kinetic), potential, total };
}
