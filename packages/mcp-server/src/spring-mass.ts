export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  mass: number;
  fixed: boolean;
}

export interface Spring {
  a: number;
  b: number;
  restLength: number;
  stiffness: number;
  damping: number;
}

export interface SpringMassState {
  particles: Particle[];
  springs: Spring[];
  time: number;
  gravity: number;
}

export function createParticle(x: number, y: number, mass = 1, fixed = false): Particle {
  return { x, y, vx: 0, vy: 0, mass, fixed };
}

export function createSpring(a: number, b: number, restLength: number, stiffness = 100, damping = 1): Spring {
  return { a, b, restLength, stiffness, damping };
}

export function createState(particles: Particle[], springs: Spring[], gravity = 9.8): SpringMassState {
  return {
    particles: particles.map(p => ({ ...p })),
    springs: springs.map(s => ({ ...s })),
    time: 0,
    gravity,
  };
}

export function step(state: SpringMassState, dt = 0.001): SpringMassState {
  const n = state.particles.length;
  const fx = new Float64Array(n);
  const fy = new Float64Array(n);

  for (let i = 0; i < n; i++) {
    if (!state.particles[i].fixed) {
      fy[i] = state.particles[i].mass * state.gravity;
    }
  }

  for (const spring of state.springs) {
    const pa = state.particles[spring.a];
    const pb = state.particles[spring.b];
    const dx = pb.x - pa.x;
    const dy = pb.y - pa.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist === 0) continue;

    const stretch = dist - spring.restLength;
    const nx = dx / dist;
    const ny = dy / dist;

    const relVx = pb.vx - pa.vx;
    const relVy = pb.vy - pa.vy;
    const relVn = relVx * nx + relVy * ny;

    const force = spring.stiffness * stretch + spring.damping * relVn;

    fx[spring.a] += force * nx;
    fy[spring.a] += force * ny;
    fx[spring.b] -= force * nx;
    fy[spring.b] -= force * ny;
  }

  const newParticles = state.particles.map((p, i) => {
    if (p.fixed) return { ...p };
    const ax = fx[i] / p.mass;
    const ay = fy[i] / p.mass;
    return {
      ...p,
      vx: p.vx + ax * dt,
      vy: p.vy + ay * dt,
      x: p.x + (p.vx + ax * dt) * dt,
      y: p.y + (p.vy + ay * dt) * dt,
    };
  });

  return { ...state, particles: newParticles, time: state.time + dt };
}

export function run(state: SpringMassState, steps: number, dt = 0.001): SpringMassState {
  let current = state;
  for (let i = 0; i < steps; i++) {
    current = step(current, dt);
  }
  return current;
}

export function kineticEnergy(state: SpringMassState): number {
  let ke = 0;
  for (const p of state.particles) {
    if (!p.fixed) {
      ke += 0.5 * p.mass * (p.vx * p.vx + p.vy * p.vy);
    }
  }
  return ke;
}

export function potentialEnergy(state: SpringMassState): number {
  let pe = 0;
  for (const spring of state.springs) {
    const pa = state.particles[spring.a];
    const pb = state.particles[spring.b];
    const dx = pb.x - pa.x;
    const dy = pb.y - pa.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const stretch = dist - spring.restLength;
    pe += 0.5 * spring.stiffness * stretch * stretch;
  }
  return pe;
}

export function gravitationalPE(state: SpringMassState, refY = 0): number {
  let pe = 0;
  for (const p of state.particles) {
    if (!p.fixed) {
      pe += p.mass * state.gravity * (p.y - refY);
    }
  }
  return pe;
}

export function springLength(state: SpringMassState, springIndex: number): number {
  const spring = state.springs[springIndex];
  const pa = state.particles[spring.a];
  const pb = state.particles[spring.b];
  const dx = pb.x - pa.x;
  const dy = pb.y - pa.y;
  return Math.sqrt(dx * dx + dy * dy);
}

export function springStrain(state: SpringMassState, springIndex: number): number {
  const spring = state.springs[springIndex];
  const len = springLength(state, springIndex);
  return (len - spring.restLength) / spring.restLength;
}

export function createChain(
  startX: number, startY: number,
  count: number, spacing: number,
  stiffness = 100, damping = 1,
  fixFirst = true
): SpringMassState {
  const particles: Particle[] = [];
  const springs: Spring[] = [];

  for (let i = 0; i < count; i++) {
    particles.push(createParticle(startX + i * spacing, startY, 1, i === 0 && fixFirst));
  }

  for (let i = 0; i < count - 1; i++) {
    springs.push(createSpring(i, i + 1, spacing, stiffness, damping));
  }

  return createState(particles, springs);
}

export function createGrid(
  startX: number, startY: number,
  cols: number, rows: number,
  spacing: number, stiffness = 100, damping = 1
): SpringMassState {
  const particles: Particle[] = [];
  const springs: Spring[] = [];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const fixed = r === 0;
      particles.push(createParticle(startX + c * spacing, startY + r * spacing, 1, fixed));
    }
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const idx = r * cols + c;
      if (c < cols - 1) springs.push(createSpring(idx, idx + 1, spacing, stiffness, damping));
      if (r < rows - 1) springs.push(createSpring(idx, idx + cols, spacing, stiffness, damping));
    }
  }

  return createState(particles, springs);
}

export function createPendulum(
  length: number,
  angle: number,
  pivotX = 0,
  pivotY = 0,
  stiffness = 10000,
  damping = 0.1
): SpringMassState {
  const bobX = pivotX + length * Math.sin(angle);
  const bobY = pivotY + length * Math.cos(angle);

  return createState(
    [createParticle(pivotX, pivotY, 1, true), createParticle(bobX, bobY, 1, false)],
    [createSpring(0, 1, length, stiffness, damping)],
    9.8
  );
}
