export interface DoublePendulumState {
  theta1: number;
  theta2: number;
  omega1: number;
  omega2: number;
  m1: number;
  m2: number;
  l1: number;
  l2: number;
  g: number;
  time: number;
}

export function createState(
  theta1: number, theta2: number,
  m1 = 1, m2 = 1, l1 = 1, l2 = 1, g = 9.81
): DoublePendulumState {
  return { theta1, theta2, omega1: 0, omega2: 0, m1, m2, l1, l2, g, time: 0 };
}

function derivatives(s: DoublePendulumState): { dTheta1: number; dTheta2: number; dOmega1: number; dOmega2: number } {
  const { theta1, theta2, omega1, omega2, m1, m2, l1, l2, g } = s;
  const delta = theta1 - theta2;
  const sinD = Math.sin(delta);
  const cosD = Math.cos(delta);
  const den = 2 * m1 + m2 - m2 * Math.cos(2 * delta);

  const dOmega1 = (
    -g * (2 * m1 + m2) * Math.sin(theta1)
    - m2 * g * Math.sin(theta1 - 2 * theta2)
    - 2 * sinD * m2 * (omega2 * omega2 * l2 + omega1 * omega1 * l1 * cosD)
  ) / (l1 * den);

  const dOmega2 = (
    2 * sinD * (
      omega1 * omega1 * l1 * (m1 + m2)
      + g * (m1 + m2) * Math.cos(theta1)
      + omega2 * omega2 * l2 * m2 * cosD
    )
  ) / (l2 * den);

  return { dTheta1: omega1, dTheta2: omega2, dOmega1, dOmega2 };
}

export function step(s: DoublePendulumState, dt = 0.001): DoublePendulumState {
  const d1 = derivatives(s);
  const s2: DoublePendulumState = {
    ...s,
    theta1: s.theta1 + d1.dTheta1 * dt * 0.5,
    theta2: s.theta2 + d1.dTheta2 * dt * 0.5,
    omega1: s.omega1 + d1.dOmega1 * dt * 0.5,
    omega2: s.omega2 + d1.dOmega2 * dt * 0.5,
  };
  const d2 = derivatives(s2);
  const s3: DoublePendulumState = {
    ...s,
    theta1: s.theta1 + d2.dTheta1 * dt * 0.5,
    theta2: s.theta2 + d2.dTheta2 * dt * 0.5,
    omega1: s.omega1 + d2.dOmega1 * dt * 0.5,
    omega2: s.omega2 + d2.dOmega2 * dt * 0.5,
  };
  const d3 = derivatives(s3);
  const s4: DoublePendulumState = {
    ...s,
    theta1: s.theta1 + d3.dTheta1 * dt,
    theta2: s.theta2 + d3.dTheta2 * dt,
    omega1: s.omega1 + d3.dOmega1 * dt,
    omega2: s.omega2 + d3.dOmega2 * dt,
  };
  const d4 = derivatives(s4);

  return {
    ...s,
    theta1: s.theta1 + (d1.dTheta1 + 2 * d2.dTheta1 + 2 * d3.dTheta1 + d4.dTheta1) * dt / 6,
    theta2: s.theta2 + (d1.dTheta2 + 2 * d2.dTheta2 + 2 * d3.dTheta2 + d4.dTheta2) * dt / 6,
    omega1: s.omega1 + (d1.dOmega1 + 2 * d2.dOmega1 + 2 * d3.dOmega1 + d4.dOmega1) * dt / 6,
    omega2: s.omega2 + (d1.dOmega2 + 2 * d2.dOmega2 + 2 * d3.dOmega2 + d4.dOmega2) * dt / 6,
    time: s.time + dt,
  };
}

export function run(s: DoublePendulumState, steps: number, dt = 0.001): DoublePendulumState[] {
  const history: DoublePendulumState[] = [s];
  let current = s;
  for (let i = 0; i < steps; i++) {
    current = step(current, dt);
    history.push(current);
  }
  return history;
}

export function position1(s: DoublePendulumState): { x: number; y: number } {
  return {
    x: s.l1 * Math.sin(s.theta1),
    y: s.l1 * Math.cos(s.theta1),
  };
}

export function position2(s: DoublePendulumState): { x: number; y: number } {
  const p1 = position1(s);
  return {
    x: p1.x + s.l2 * Math.sin(s.theta2),
    y: p1.y + s.l2 * Math.cos(s.theta2),
  };
}

export function kineticEnergy(s: DoublePendulumState): number {
  const { m1, m2, l1, l2, theta1, theta2, omega1, omega2 } = s;
  const ke1 = 0.5 * m1 * l1 * l1 * omega1 * omega1;
  const ke2 = 0.5 * m2 * (
    l1 * l1 * omega1 * omega1
    + l2 * l2 * omega2 * omega2
    + 2 * l1 * l2 * omega1 * omega2 * Math.cos(theta1 - theta2)
  );
  return ke1 + ke2;
}

export function potentialEnergy(s: DoublePendulumState): number {
  const { m1, m2, l1, l2, theta1, theta2, g } = s;
  const pe1 = -m1 * g * l1 * Math.cos(theta1);
  const pe2 = -m2 * g * (l1 * Math.cos(theta1) + l2 * Math.cos(theta2));
  return pe1 + pe2;
}

export function totalEnergy(s: DoublePendulumState): number {
  return kineticEnergy(s) + potentialEnergy(s);
}

export function lyapunovDivergence(
  theta1: number, theta2: number,
  perturbation: number,
  steps: number,
  dt = 0.001
): number {
  const s1 = createState(theta1, theta2);
  const s2 = createState(theta1 + perturbation, theta2);
  const r1 = run(s1, steps, dt);
  const r2 = run(s2, steps, dt);
  const p1 = position2(r1[r1.length - 1]);
  const p2 = position2(r2[r2.length - 1]);
  const dx = p1.x - p2.x;
  const dy = p1.y - p2.y;
  return Math.sqrt(dx * dx + dy * dy);
}
