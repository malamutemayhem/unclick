export interface SpringConfig {
  stiffness: number;
  damping: number;
  mass?: number;
}

export interface SpringState {
  position: number;
  velocity: number;
  target: number;
}

export function createSpring(config: SpringConfig, target = 0): SpringState {
  return { position: 0, velocity: 0, target };
}

export function stepSpring(
  state: SpringState,
  config: SpringConfig,
  dt: number,
): SpringState {
  const mass = config.mass ?? 1;
  const force = -config.stiffness * (state.position - state.target) - config.damping * state.velocity;
  const acceleration = force / mass;
  const velocity = state.velocity + acceleration * dt;
  const position = state.position + velocity * dt;
  return { position, velocity, target: state.target };
}

export function isAtRest(
  state: SpringState,
  positionThreshold = 0.001,
  velocityThreshold = 0.001,
): boolean {
  return (
    Math.abs(state.position - state.target) < positionThreshold &&
    Math.abs(state.velocity) < velocityThreshold
  );
}

export interface Spring2D {
  x: number;
  y: number;
  vx: number;
  vy: number;
  targetX: number;
  targetY: number;
}

export function createSpring2D(targetX = 0, targetY = 0): Spring2D {
  return { x: 0, y: 0, vx: 0, vy: 0, targetX, targetY };
}

export function stepSpring2D(
  state: Spring2D,
  config: SpringConfig,
  dt: number,
): Spring2D {
  const mass = config.mass ?? 1;
  const fx = -config.stiffness * (state.x - state.targetX) - config.damping * state.vx;
  const fy = -config.stiffness * (state.y - state.targetY) - config.damping * state.vy;
  const vx = state.vx + (fx / mass) * dt;
  const vy = state.vy + (fy / mass) * dt;
  return {
    x: state.x + vx * dt,
    y: state.y + vy * dt,
    vx, vy,
    targetX: state.targetX,
    targetY: state.targetY,
  };
}

export function simulate(
  config: SpringConfig,
  target: number,
  duration: number,
  dt = 1 / 60,
): { time: number; position: number; velocity: number }[] {
  const result: { time: number; position: number; velocity: number }[] = [];
  let state = createSpring(config, target);
  for (let t = 0; t <= duration; t += dt) {
    result.push({ time: t, position: state.position, velocity: state.velocity });
    state = stepSpring(state, config, dt);
  }
  return result;
}

export function criticalDamping(stiffness: number, mass = 1): number {
  return 2 * Math.sqrt(stiffness * mass);
}

export function naturalFrequency(stiffness: number, mass = 1): number {
  return Math.sqrt(stiffness / mass);
}

export function dampingRatio(config: SpringConfig): number {
  const mass = config.mass ?? 1;
  return config.damping / (2 * Math.sqrt(config.stiffness * mass));
}
