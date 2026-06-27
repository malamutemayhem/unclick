export interface Vec2 {
  x: number;
  y: number;
}

export interface Boid {
  position: Vec2;
  velocity: Vec2;
}

export interface BoidConfig {
  separationWeight: number;
  alignmentWeight: number;
  cohesionWeight: number;
  maxSpeed: number;
  perceptionRadius: number;
  separationRadius: number;
  width: number;
  height: number;
}

export const DEFAULT_CONFIG: BoidConfig = {
  separationWeight: 1.5,
  alignmentWeight: 1.0,
  cohesionWeight: 1.0,
  maxSpeed: 4,
  perceptionRadius: 50,
  separationRadius: 25,
  width: 200,
  height: 200,
};

function dist(a: Vec2, b: Vec2): number {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
}

function mag(v: Vec2): number {
  return Math.sqrt(v.x * v.x + v.y * v.y);
}

function limit(v: Vec2, max: number): Vec2 {
  const m = mag(v);
  if (m > max) {
    return { x: (v.x / m) * max, y: (v.y / m) * max };
  }
  return v;
}

function sub(a: Vec2, b: Vec2): Vec2 {
  return { x: a.x - b.x, y: a.y - b.y };
}

export function createBoid(x: number, y: number, vx: number, vy: number): Boid {
  return { position: { x, y }, velocity: { x: vx, y: vy } };
}

export function createFlock(
  count: number,
  config: BoidConfig = DEFAULT_CONFIG,
  seed = 42
): Boid[] {
  let state = seed;
  const rand = () => {
    state = (state * 1103515245 + 12345) & 0x7fffffff;
    return state / 0x7fffffff;
  };

  const boids: Boid[] = [];
  for (let i = 0; i < count; i++) {
    const x = rand() * config.width;
    const y = rand() * config.height;
    const angle = rand() * Math.PI * 2;
    const speed = rand() * config.maxSpeed;
    boids.push(createBoid(x, y, Math.cos(angle) * speed, Math.sin(angle) * speed));
  }
  return boids;
}

function separation(boid: Boid, neighbors: Boid[], radius: number): Vec2 {
  let sx = 0, sy = 0, count = 0;
  for (const other of neighbors) {
    const d = dist(boid.position, other.position);
    if (d > 0 && d < radius) {
      const diff = sub(boid.position, other.position);
      sx += diff.x / d;
      sy += diff.y / d;
      count++;
    }
  }
  if (count > 0) {
    sx /= count;
    sy /= count;
  }
  return { x: sx, y: sy };
}

function alignment(boid: Boid, neighbors: Boid[]): Vec2 {
  let ax = 0, ay = 0, count = 0;
  for (const other of neighbors) {
    ax += other.velocity.x;
    ay += other.velocity.y;
    count++;
  }
  if (count > 0) {
    ax /= count;
    ay /= count;
    ax -= boid.velocity.x;
    ay -= boid.velocity.y;
  }
  return { x: ax, y: ay };
}

function cohesion(boid: Boid, neighbors: Boid[]): Vec2 {
  let cx = 0, cy = 0, count = 0;
  for (const other of neighbors) {
    cx += other.position.x;
    cy += other.position.y;
    count++;
  }
  if (count > 0) {
    cx = cx / count - boid.position.x;
    cy = cy / count - boid.position.y;
  }
  return { x: cx, y: cy };
}

function getNeighbors(boid: Boid, flock: Boid[], radius: number): Boid[] {
  return flock.filter(other =>
    other !== boid && dist(boid.position, other.position) < radius
  );
}

export function stepBoid(boid: Boid, flock: Boid[], config: BoidConfig): Boid {
  const neighbors = getNeighbors(boid, flock, config.perceptionRadius);

  let ax = 0, ay = 0;

  if (neighbors.length > 0) {
    const sep = separation(boid, neighbors, config.separationRadius);
    const ali = alignment(boid, neighbors);
    const coh = cohesion(boid, neighbors);

    ax += sep.x * config.separationWeight;
    ay += sep.y * config.separationWeight;
    ax += ali.x * config.alignmentWeight;
    ay += ali.y * config.alignmentWeight;
    ax += coh.x * config.cohesionWeight;
    ay += coh.y * config.cohesionWeight;
  }

  let vx = boid.velocity.x + ax;
  let vy = boid.velocity.y + ay;
  const vel = limit({ x: vx, y: vy }, config.maxSpeed);
  vx = vel.x;
  vy = vel.y;

  let px = boid.position.x + vx;
  let py = boid.position.y + vy;

  // Wrap around
  px = ((px % config.width) + config.width) % config.width;
  py = ((py % config.height) + config.height) % config.height;

  return { position: { x: px, y: py }, velocity: { x: vx, y: vy } };
}

export function stepFlock(flock: Boid[], config: BoidConfig = DEFAULT_CONFIG): Boid[] {
  return flock.map(boid => stepBoid(boid, flock, config));
}

export function runFlock(flock: Boid[], steps: number, config: BoidConfig = DEFAULT_CONFIG): Boid[][] {
  const history: Boid[][] = [flock];
  let current = flock;
  for (let i = 0; i < steps; i++) {
    current = stepFlock(current, config);
    history.push(current);
  }
  return history;
}

export function flockCenter(flock: Boid[]): Vec2 {
  let cx = 0, cy = 0;
  for (const b of flock) {
    cx += b.position.x;
    cy += b.position.y;
  }
  return { x: cx / flock.length, y: cy / flock.length };
}

export function flockSpread(flock: Boid[]): number {
  const center = flockCenter(flock);
  let total = 0;
  for (const b of flock) {
    total += dist(b.position, center);
  }
  return total / flock.length;
}

export function averageSpeed(flock: Boid[]): number {
  let total = 0;
  for (const b of flock) {
    total += mag(b.velocity);
  }
  return total / flock.length;
}

export function averageHeading(flock: Boid[]): number {
  let sx = 0, sy = 0;
  for (const b of flock) {
    const m = mag(b.velocity);
    if (m > 0) {
      sx += b.velocity.x / m;
      sy += b.velocity.y / m;
    }
  }
  return Math.atan2(sy / flock.length, sx / flock.length);
}
