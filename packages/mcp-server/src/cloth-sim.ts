export interface ClothPoint {
  x: number;
  y: number;
  prevX: number;
  prevY: number;
  pinned: boolean;
}

export interface ClothConstraint {
  a: number;
  b: number;
  restLength: number;
}

export interface ClothState {
  points: ClothPoint[];
  constraints: ClothConstraint[];
  cols: number;
  rows: number;
  gravity: number;
  damping: number;
}

export function createCloth(
  cols: number,
  rows: number,
  spacing: number,
  originX = 0,
  originY = 0,
  gravity = 0.5,
  damping = 0.99
): ClothState {
  const points: ClothPoint[] = [];
  const constraints: ClothConstraint[] = [];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = originX + c * spacing;
      const y = originY + r * spacing;
      points.push({ x, y, prevX: x, prevY: y, pinned: r === 0 });
    }
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const idx = r * cols + c;
      if (c < cols - 1) {
        constraints.push({ a: idx, b: idx + 1, restLength: spacing });
      }
      if (r < rows - 1) {
        constraints.push({ a: idx, b: idx + cols, restLength: spacing });
      }
    }
  }

  return { points, constraints, cols, rows, gravity, damping };
}

export function step(state: ClothState, dt = 1): ClothState {
  const points = state.points.map(p => {
    if (p.pinned) return { ...p };
    const vx = (p.x - p.prevX) * state.damping;
    const vy = (p.y - p.prevY) * state.damping;
    return {
      ...p,
      prevX: p.x,
      prevY: p.y,
      x: p.x + vx,
      y: p.y + vy + state.gravity * dt * dt,
    };
  });

  for (let iter = 0; iter < 3; iter++) {
    for (const c of state.constraints) {
      const pa = points[c.a];
      const pb = points[c.b];
      const dx = pb.x - pa.x;
      const dy = pb.y - pa.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist === 0) continue;
      const diff = (c.restLength - dist) / dist;
      const offsetX = dx * diff * 0.5;
      const offsetY = dy * diff * 0.5;

      if (!pa.pinned) { pa.x -= offsetX; pa.y -= offsetY; }
      if (!pb.pinned) { pb.x += offsetX; pb.y += offsetY; }
    }
  }

  return { ...state, points };
}

export function run(state: ClothState, steps: number, dt = 1): ClothState {
  let current = state;
  for (let i = 0; i < steps; i++) {
    current = step(current, dt);
  }
  return current;
}

export function pinPoint(state: ClothState, index: number): ClothState {
  const points = state.points.map((p, i) => i === index ? { ...p, pinned: true } : p);
  return { ...state, points };
}

export function unpinPoint(state: ClothState, index: number): ClothState {
  const points = state.points.map((p, i) => i === index ? { ...p, pinned: false } : p);
  return { ...state, points };
}

export function tearConstraint(state: ClothState, constraintIndex: number): ClothState {
  const constraints = state.constraints.filter((_, i) => i !== constraintIndex);
  return { ...state, constraints };
}

export function applyForce(state: ClothState, index: number, fx: number, fy: number): ClothState {
  const points = state.points.map((p, i) => {
    if (i !== index || p.pinned) return p;
    return { ...p, x: p.x + fx, y: p.y + fy };
  });
  return { ...state, points };
}

export function getPointAt(state: ClothState, row: number, col: number): ClothPoint | null {
  if (row < 0 || row >= state.rows || col < 0 || col >= state.cols) return null;
  return state.points[row * state.cols + col];
}

export function totalLength(state: ClothState): number {
  let total = 0;
  for (const c of state.constraints) {
    const pa = state.points[c.a];
    const pb = state.points[c.b];
    const dx = pb.x - pa.x;
    const dy = pb.y - pa.y;
    total += Math.sqrt(dx * dx + dy * dy);
  }
  return total;
}

export function maxStrain(state: ClothState): number {
  let maxS = 0;
  for (const c of state.constraints) {
    const pa = state.points[c.a];
    const pb = state.points[c.b];
    const dx = pb.x - pa.x;
    const dy = pb.y - pa.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const strain = Math.abs(dist - c.restLength) / c.restLength;
    if (strain > maxS) maxS = strain;
  }
  return maxS;
}
