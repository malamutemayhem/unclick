export interface Body {
  x: number;
  y: number;
  vx: number;
  vy: number;
  mass: number;
}

export interface NBodyState {
  bodies: Body[];
  time: number;
  dt: number;
  G: number;
}

export function createBody(x: number, y: number, vx: number, vy: number, mass: number): Body {
  return { x, y, vx, vy, mass };
}

export function createState(bodies: Body[], dt = 0.01, G = 1): NBodyState {
  return { bodies: bodies.map(b => ({ ...b })), time: 0, dt, G };
}

function computeAccelerations(bodies: Body[], G: number, softening = 0.01): { ax: number; ay: number }[] {
  const n = bodies.length;
  const acc = new Array(n);
  for (let i = 0; i < n; i++) acc[i] = { ax: 0, ay: 0 };

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const dx = bodies[j].x - bodies[i].x;
      const dy = bodies[j].y - bodies[i].y;
      const r2 = dx * dx + dy * dy + softening * softening;
      const r = Math.sqrt(r2);
      const force = G / (r2 * r);

      const fx = force * dx;
      const fy = force * dy;

      acc[i].ax += fx * bodies[j].mass;
      acc[i].ay += fy * bodies[j].mass;
      acc[j].ax -= fx * bodies[i].mass;
      acc[j].ay -= fy * bodies[i].mass;
    }
  }
  return acc;
}

export function step(state: NBodyState): NBodyState {
  const { bodies, dt, G } = state;
  const acc = computeAccelerations(bodies, G);

  const newBodies = bodies.map((b, i) => {
    const vx = b.vx + acc[i].ax * dt;
    const vy = b.vy + acc[i].ay * dt;
    return {
      x: b.x + vx * dt,
      y: b.y + vy * dt,
      vx,
      vy,
      mass: b.mass,
    };
  });

  return { bodies: newBodies, time: state.time + dt, dt, G };
}

export function stepLeapfrog(state: NBodyState): NBodyState {
  const { bodies, dt, G } = state;
  const acc1 = computeAccelerations(bodies, G);

  const halfVel = bodies.map((b, i) => ({
    vx: b.vx + acc1[i].ax * dt * 0.5,
    vy: b.vy + acc1[i].ay * dt * 0.5,
  }));

  const midBodies = bodies.map((b, i) => ({
    ...b,
    x: b.x + halfVel[i].vx * dt,
    y: b.y + halfVel[i].vy * dt,
  }));

  const acc2 = computeAccelerations(midBodies, G);

  const newBodies = midBodies.map((b, i) => ({
    x: b.x,
    y: b.y,
    vx: halfVel[i].vx + acc2[i].ax * dt * 0.5,
    vy: halfVel[i].vy + acc2[i].ay * dt * 0.5,
    mass: b.mass,
  }));

  return { bodies: newBodies, time: state.time + dt, dt, G };
}

export function run(state: NBodyState, steps: number): NBodyState {
  let current = state;
  for (let i = 0; i < steps; i++) {
    current = step(current);
  }
  return current;
}

export function kineticEnergy(state: NBodyState): number {
  let ke = 0;
  for (const b of state.bodies) {
    ke += 0.5 * b.mass * (b.vx * b.vx + b.vy * b.vy);
  }
  return ke;
}

export function potentialEnergy(state: NBodyState): number {
  let pe = 0;
  const { bodies, G } = state;
  for (let i = 0; i < bodies.length; i++) {
    for (let j = i + 1; j < bodies.length; j++) {
      const dx = bodies[j].x - bodies[i].x;
      const dy = bodies[j].y - bodies[i].y;
      const r = Math.sqrt(dx * dx + dy * dy);
      if (r > 0) pe -= G * bodies[i].mass * bodies[j].mass / r;
    }
  }
  return pe;
}

export function totalEnergy(state: NBodyState): number {
  return kineticEnergy(state) + potentialEnergy(state);
}

export function centerOfMass(state: NBodyState): { x: number; y: number; mass: number } {
  let totalMass = 0, cx = 0, cy = 0;
  for (const b of state.bodies) {
    cx += b.x * b.mass;
    cy += b.y * b.mass;
    totalMass += b.mass;
  }
  return { x: cx / totalMass, y: cy / totalMass, mass: totalMass };
}

export function momentum(state: NBodyState): { px: number; py: number } {
  let px = 0, py = 0;
  for (const b of state.bodies) {
    px += b.mass * b.vx;
    py += b.mass * b.vy;
  }
  return { px, py };
}

export function angularMomentum(state: NBodyState): number {
  let L = 0;
  for (const b of state.bodies) {
    L += b.mass * (b.x * b.vy - b.y * b.vx);
  }
  return L;
}

export function distance(a: Body, b: Body): number {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  return Math.sqrt(dx * dx + dy * dy);
}

export function createTwoBody(m1: number, m2: number, separation: number, G = 1): NBodyState {
  const totalMass = m1 + m2;
  const v = Math.sqrt(G * totalMass / separation);
  const r1 = separation * m2 / totalMass;
  const r2 = separation * m1 / totalMass;
  const v1 = v * m2 / totalMass;
  const v2 = v * m1 / totalMass;

  return createState([
    createBody(-r1, 0, 0, -v1, m1),
    createBody(r2, 0, 0, v2, m2),
  ], 0.01, G);
}

export function createFigureEight(G = 1): NBodyState {
  const p = 0.347111;
  const q = 0.532728;
  return createState([
    createBody(-1, 0, p, q, 1),
    createBody(1, 0, p, q, 1),
    createBody(0, 0, -2 * p, -2 * q, 1),
  ], 0.001, G);
}
