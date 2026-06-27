export interface Vec2 {
  x: number;
  y: number;
}

export interface PointCharge {
  position: Vec2;
  charge: number;
}

const K_COULOMB = 8.99e9;

export function createCharge(x: number, y: number, charge: number): PointCharge {
  return { position: { x, y }, charge };
}

export function electricField(charges: PointCharge[], point: Vec2): Vec2 {
  let ex = 0, ey = 0;

  for (const c of charges) {
    const dx = point.x - c.position.x;
    const dy = point.y - c.position.y;
    const r2 = dx * dx + dy * dy;
    if (r2 < 1e-10) continue;
    const r = Math.sqrt(r2);
    const magnitude = K_COULOMB * c.charge / r2;
    ex += magnitude * (dx / r);
    ey += magnitude * (dy / r);
  }

  return { x: ex, y: ey };
}

export function potential(charges: PointCharge[], point: Vec2): number {
  let v = 0;
  for (const c of charges) {
    const dx = point.x - c.position.x;
    const dy = point.y - c.position.y;
    const r = Math.sqrt(dx * dx + dy * dy);
    if (r < 1e-10) continue;
    v += K_COULOMB * c.charge / r;
  }
  return v;
}

export function fieldMagnitude(field: Vec2): number {
  return Math.sqrt(field.x * field.x + field.y * field.y);
}

export function fieldDirection(field: Vec2): number {
  return Math.atan2(field.y, field.x) * (180 / Math.PI);
}

export function force(charge: number, field: Vec2): Vec2 {
  return { x: charge * field.x, y: charge * field.y };
}

export function fieldGrid(
  charges: PointCharge[],
  xMin: number, xMax: number, yMin: number, yMax: number,
  resolution: number
): { x: number; y: number; field: Vec2 }[] {
  const points: { x: number; y: number; field: Vec2 }[] = [];
  const dx = (xMax - xMin) / resolution;
  const dy = (yMax - yMin) / resolution;

  for (let yi = 0; yi <= resolution; yi++) {
    for (let xi = 0; xi <= resolution; xi++) {
      const x = xMin + xi * dx;
      const y = yMin + yi * dy;
      points.push({ x, y, field: electricField(charges, { x, y }) });
    }
  }

  return points;
}

export function fieldLine(
  charges: PointCharge[],
  start: Vec2,
  steps: number,
  stepSize: number,
  direction: 1 | -1 = 1
): Vec2[] {
  const points: Vec2[] = [{ ...start }];
  let current = { ...start };

  for (let i = 0; i < steps; i++) {
    const e = electricField(charges, current);
    const mag = fieldMagnitude(e);
    if (mag < 1e-10) break;

    current = {
      x: current.x + direction * stepSize * (e.x / mag),
      y: current.y + direction * stepSize * (e.y / mag),
    };
    points.push({ ...current });
  }

  return points;
}

export function dipoleMoment(positive: PointCharge, negative: PointCharge): Vec2 {
  const q = Math.abs(positive.charge);
  return {
    x: q * (positive.position.x - negative.position.x),
    y: q * (positive.position.y - negative.position.y),
  };
}

export function capacitorField(plateDistance: number, voltage: number): number {
  return voltage / plateDistance;
}

export function energyDensity(fieldMag: number, epsilon0 = 8.854e-12): number {
  return 0.5 * epsilon0 * fieldMag * fieldMag;
}
