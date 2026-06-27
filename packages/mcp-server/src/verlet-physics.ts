export interface Particle {
  x: number;
  y: number;
  prevX: number;
  prevY: number;
  mass: number;
  pinned: boolean;
}

export interface Constraint {
  a: number;
  b: number;
  restLength: number;
  stiffness: number;
}

export interface VerletSystem {
  particles: Particle[];
  constraints: Constraint[];
  gravity: { x: number; y: number };
  bounds?: { minX: number; minY: number; maxX: number; maxY: number };
}

export function createSystem(gravity = { x: 0, y: 9.8 }): VerletSystem {
  return { particles: [], constraints: [], gravity };
}

export function addParticle(
  system: VerletSystem,
  x: number,
  y: number,
  mass = 1,
  pinned = false,
): number {
  system.particles.push({ x, y, prevX: x, prevY: y, mass, pinned });
  return system.particles.length - 1;
}

export function addConstraint(
  system: VerletSystem,
  a: number,
  b: number,
  stiffness = 1,
  restLength?: number,
): void {
  const pa = system.particles[a];
  const pb = system.particles[b];
  const dx = pb.x - pa.x;
  const dy = pb.y - pa.y;
  const len = restLength ?? Math.sqrt(dx * dx + dy * dy);
  system.constraints.push({ a, b, restLength: len, stiffness });
}

export function step(system: VerletSystem, dt: number, iterations = 3): void {
  for (const p of system.particles) {
    if (p.pinned) continue;
    const vx = p.x - p.prevX;
    const vy = p.y - p.prevY;
    p.prevX = p.x;
    p.prevY = p.y;
    p.x += vx + system.gravity.x * dt * dt;
    p.y += vy + system.gravity.y * dt * dt;
  }

  for (let iter = 0; iter < iterations; iter++) {
    for (const c of system.constraints) {
      const pa = system.particles[c.a];
      const pb = system.particles[c.b];
      const dx = pb.x - pa.x;
      const dy = pb.y - pa.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist === 0) continue;
      const diff = (dist - c.restLength) / dist * c.stiffness;
      const offsetX = dx * diff * 0.5;
      const offsetY = dy * diff * 0.5;
      if (!pa.pinned) { pa.x += offsetX; pa.y += offsetY; }
      if (!pb.pinned) { pb.x -= offsetX; pb.y -= offsetY; }
    }

    if (system.bounds) {
      const b = system.bounds;
      for (const p of system.particles) {
        if (p.pinned) continue;
        if (p.x < b.minX) p.x = b.minX;
        if (p.x > b.maxX) p.x = b.maxX;
        if (p.y < b.minY) p.y = b.minY;
        if (p.y > b.maxY) p.y = b.maxY;
      }
    }
  }
}

export function createRope(
  system: VerletSystem,
  x: number,
  y: number,
  segments: number,
  segmentLength: number,
  pinStart = true,
): number[] {
  const indices: number[] = [];
  for (let i = 0; i <= segments; i++) {
    const idx = addParticle(system, x, y + i * segmentLength, 1, i === 0 && pinStart);
    indices.push(idx);
    if (i > 0) addConstraint(system, indices[i - 1], idx);
  }
  return indices;
}

export function createCloth(
  system: VerletSystem,
  x: number,
  y: number,
  cols: number,
  rows: number,
  spacing: number,
  pinTop = true,
): number[][] {
  const grid: number[][] = [];
  for (let r = 0; r < rows; r++) {
    const row: number[] = [];
    for (let c = 0; c < cols; c++) {
      const pinned = pinTop && r === 0;
      const idx = addParticle(system, x + c * spacing, y + r * spacing, 1, pinned);
      row.push(idx);
      if (c > 0) addConstraint(system, row[c - 1], idx);
      if (r > 0) addConstraint(system, grid[r - 1][c], idx);
    }
    grid.push(row);
  }
  return grid;
}

export function particleDistance(system: VerletSystem, a: number, b: number): number {
  const pa = system.particles[a];
  const pb = system.particles[b];
  const dx = pb.x - pa.x;
  const dy = pb.y - pa.y;
  return Math.sqrt(dx * dx + dy * dy);
}
