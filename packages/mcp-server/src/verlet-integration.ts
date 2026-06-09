export interface VerletParticle {
  x: number;
  y: number;
  prevX: number;
  prevY: number;
  ax: number;
  ay: number;
  radius: number;
  pinned: boolean;
}

export interface VerletConstraint {
  a: number;
  b: number;
  length: number;
  stiffness: number;
}

export interface VerletSystem {
  particles: VerletParticle[];
  constraints: VerletConstraint[];
  gravity: number;
  damping: number;
  boundsWidth: number;
  boundsHeight: number;
}

export function createParticle(
  x: number, y: number,
  radius = 5,
  pinned = false
): VerletParticle {
  return { x, y, prevX: x, prevY: y, ax: 0, ay: 0, radius, pinned };
}

export function createConstraint(a: number, b: number, length: number, stiffness = 1): VerletConstraint {
  return { a, b, length, stiffness };
}

export function createSystem(
  particles: VerletParticle[] = [],
  constraints: VerletConstraint[] = [],
  gravity = 0.5,
  damping = 0.99,
  boundsWidth = 500,
  boundsHeight = 500
): VerletSystem {
  return {
    particles: particles.map(p => ({ ...p })),
    constraints: constraints.map(c => ({ ...c })),
    gravity,
    damping,
    boundsWidth,
    boundsHeight,
  };
}

export function addParticle(system: VerletSystem, p: VerletParticle): number {
  system.particles.push({ ...p });
  return system.particles.length - 1;
}

export function addConstraint(system: VerletSystem, c: VerletConstraint): void {
  system.constraints.push({ ...c });
}

export function autoConstraint(system: VerletSystem, a: number, b: number, stiffness = 1): void {
  const pa = system.particles[a];
  const pb = system.particles[b];
  const dx = pb.x - pa.x;
  const dy = pb.y - pa.y;
  const length = Math.sqrt(dx * dx + dy * dy);
  system.constraints.push({ a, b, length, stiffness });
}

function integrateParticles(system: VerletSystem, dt: number): void {
  for (const p of system.particles) {
    if (p.pinned) continue;

    const vx = (p.x - p.prevX) * system.damping;
    const vy = (p.y - p.prevY) * system.damping;

    p.prevX = p.x;
    p.prevY = p.y;

    p.x += vx + (p.ax + 0) * dt * dt;
    p.y += vy + (p.ay + system.gravity) * dt * dt;

    p.ax = 0;
    p.ay = 0;
  }
}

function solveConstraints(system: VerletSystem): void {
  for (const c of system.constraints) {
    const pa = system.particles[c.a];
    const pb = system.particles[c.b];

    const dx = pb.x - pa.x;
    const dy = pb.y - pa.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist === 0) continue;

    const diff = (c.length - dist) / dist * c.stiffness;
    const offsetX = dx * diff * 0.5;
    const offsetY = dy * diff * 0.5;

    if (!pa.pinned) { pa.x -= offsetX; pa.y -= offsetY; }
    if (!pb.pinned) { pb.x += offsetX; pb.y += offsetY; }
  }
}

function applyBounds(system: VerletSystem): void {
  for (const p of system.particles) {
    if (p.pinned) continue;
    if (p.x - p.radius < 0) { p.x = p.radius; }
    if (p.x + p.radius > system.boundsWidth) { p.x = system.boundsWidth - p.radius; }
    if (p.y - p.radius < 0) { p.y = p.radius; }
    if (p.y + p.radius > system.boundsHeight) { p.y = system.boundsHeight - p.radius; }
  }
}

export function step(system: VerletSystem, dt = 1, constraintIterations = 3): VerletSystem {
  const s: VerletSystem = {
    ...system,
    particles: system.particles.map(p => ({ ...p })),
    constraints: system.constraints.map(c => ({ ...c })),
  };

  integrateParticles(s, dt);
  for (let i = 0; i < constraintIterations; i++) {
    solveConstraints(s);
  }
  applyBounds(s);

  return s;
}

export function run(system: VerletSystem, steps: number, dt = 1): VerletSystem {
  let current = system;
  for (let i = 0; i < steps; i++) {
    current = step(current, dt);
  }
  return current;
}

export function applyForce(system: VerletSystem, index: number, fx: number, fy: number): void {
  if (index >= 0 && index < system.particles.length) {
    system.particles[index].ax += fx;
    system.particles[index].ay += fy;
  }
}

export function distance(system: VerletSystem, a: number, b: number): number {
  const pa = system.particles[a];
  const pb = system.particles[b];
  const dx = pb.x - pa.x;
  const dy = pb.y - pa.y;
  return Math.sqrt(dx * dx + dy * dy);
}

export function velocity(p: VerletParticle): { vx: number; vy: number; speed: number } {
  const vx = p.x - p.prevX;
  const vy = p.y - p.prevY;
  return { vx, vy, speed: Math.sqrt(vx * vx + vy * vy) };
}

export function totalKineticEnergy(system: VerletSystem): number {
  let ke = 0;
  for (const p of system.particles) {
    if (p.pinned) continue;
    const v = velocity(p);
    ke += 0.5 * v.speed * v.speed;
  }
  return ke;
}

export function createRope(
  x1: number, y1: number,
  x2: number, y2: number,
  segments: number,
  pinFirst = true,
  pinLast = false
): VerletSystem {
  const particles: VerletParticle[] = [];
  const constraints: VerletConstraint[] = [];
  const dx = (x2 - x1) / segments;
  const dy = (y2 - y1) / segments;
  const segLen = Math.sqrt(dx * dx + dy * dy);

  for (let i = 0; i <= segments; i++) {
    const pinned = (i === 0 && pinFirst) || (i === segments && pinLast);
    particles.push(createParticle(x1 + dx * i, y1 + dy * i, 2, pinned));
  }

  for (let i = 0; i < segments; i++) {
    constraints.push(createConstraint(i, i + 1, segLen));
  }

  return createSystem(particles, constraints);
}

export function createBridge(
  x1: number, y1: number,
  x2: number, y2: number,
  segments: number
): VerletSystem {
  return createRope(x1, y1, x2, y2, segments, true, true);
}
