export interface Vec2 {
  x: number;
  y: number;
}

function v2(x: number, y: number): Vec2 { return { x, y }; }

function v2Add(a: Vec2, b: Vec2): Vec2 { return v2(a.x + b.x, a.y + b.y); }
function v2Sub(a: Vec2, b: Vec2): Vec2 { return v2(a.x - b.x, a.y - b.y); }
function v2Scale(v: Vec2, s: number): Vec2 { return v2(v.x * s, v.y * s); }
function v2Len(v: Vec2): number { return Math.sqrt(v.x * v.x + v.y * v.y); }
function v2Normalize(v: Vec2): Vec2 {
  const len = v2Len(v);
  return len > 0 ? v2Scale(v, 1 / len) : v2(0, 0);
}
function v2Truncate(v: Vec2, maxLen: number): Vec2 {
  const len = v2Len(v);
  return len > maxLen ? v2Scale(v, maxLen / len) : v;
}
function v2Dist(a: Vec2, b: Vec2): number { return v2Len(v2Sub(a, b)); }

export class SteeringAgent {
  position: Vec2;
  velocity: Vec2;
  maxSpeed: number;
  maxForce: number;
  mass: number;

  constructor(x = 0, y = 0, maxSpeed = 5, maxForce = 0.5) {
    this.position = v2(x, y);
    this.velocity = v2(0, 0);
    this.maxSpeed = maxSpeed;
    this.maxForce = maxForce;
    this.mass = 1;
  }

  seek(target: Vec2): Vec2 {
    const desired = v2Normalize(v2Sub(target, this.position));
    const scaled = v2Scale(desired, this.maxSpeed);
    return v2Truncate(v2Sub(scaled, this.velocity), this.maxForce);
  }

  flee(target: Vec2): Vec2 {
    const desired = v2Normalize(v2Sub(this.position, target));
    const scaled = v2Scale(desired, this.maxSpeed);
    return v2Truncate(v2Sub(scaled, this.velocity), this.maxForce);
  }

  arrive(target: Vec2, slowingRadius = 50): Vec2 {
    const offset = v2Sub(target, this.position);
    const dist = v2Len(offset);
    if (dist < 0.001) return v2(0, 0);
    const speed = dist < slowingRadius ? this.maxSpeed * (dist / slowingRadius) : this.maxSpeed;
    const desired = v2Scale(v2Normalize(offset), speed);
    return v2Truncate(v2Sub(desired, this.velocity), this.maxForce);
  }

  pursue(target: SteeringAgent, predictionTime = 1): Vec2 {
    const futurePos = v2Add(target.position, v2Scale(target.velocity, predictionTime));
    return this.seek(futurePos);
  }

  evade(target: SteeringAgent, predictionTime = 1): Vec2 {
    const futurePos = v2Add(target.position, v2Scale(target.velocity, predictionTime));
    return this.flee(futurePos);
  }

  wander(wanderRadius = 20, wanderDist = 40, jitter = 3, seed = 42): Vec2 {
    let s = seed;
    const rng = () => {
      s = (s * 1103515245 + 12345) & 0x7fffffff;
      return (s / 0x7fffffff) * 2 - 1;
    };

    const circleCenter = v2Scale(v2Normalize(this.velocity), wanderDist);
    const displacement = v2(rng() * jitter, rng() * jitter);
    const normalized = v2Normalize(displacement);
    const wanderTarget = v2Add(this.position, v2Add(circleCenter, v2Scale(normalized, wanderRadius)));
    return this.seek(wanderTarget);
  }

  separate(neighbors: SteeringAgent[], desiredSep = 25): Vec2 {
    let steer = v2(0, 0);
    let count = 0;
    for (const other of neighbors) {
      const d = v2Dist(this.position, other.position);
      if (d > 0 && d < desiredSep) {
        const diff = v2Normalize(v2Sub(this.position, other.position));
        steer = v2Add(steer, v2Scale(diff, 1 / d));
        count++;
      }
    }
    if (count > 0) {
      steer = v2Scale(steer, 1 / count);
      steer = v2Scale(v2Normalize(steer), this.maxSpeed);
      steer = v2Sub(steer, this.velocity);
      steer = v2Truncate(steer, this.maxForce);
    }
    return steer;
  }

  update(steering: Vec2, dt = 1): void {
    const acceleration = v2Scale(steering, 1 / this.mass);
    this.velocity = v2Truncate(v2Add(this.velocity, v2Scale(acceleration, dt)), this.maxSpeed);
    this.position = v2Add(this.position, v2Scale(this.velocity, dt));
  }

  get speed(): number { return v2Len(this.velocity); }
}

export { v2, v2Add, v2Sub, v2Scale, v2Len, v2Normalize, v2Truncate, v2Dist };
